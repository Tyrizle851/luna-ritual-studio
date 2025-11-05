#!/usr/bin/env node

/**
 * Local Watermark Removal Server
 * Accepts webhook from n8n Cloud, removes watermark, returns clean image
 */

const express = require('express');
const { exec } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = 3333;
const TEMP_DIR = '/tmp/watermark-removal';

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Endpoint: /remove-watermark
app.post('/remove-watermark', async (req, res) => {
  const { video_url } = req.body;

  if (!video_url) {
    return res.status(400).json({ error: 'video_url required' });
  }

  const videoId = Date.now();
  const videoPath = path.join(TEMP_DIR, `${videoId}.mp4`);
  const framePath = path.join(TEMP_DIR, `${videoId}_frame.jpg`);
  const cleanPath = path.join(TEMP_DIR, `${videoId}_clean.jpg`);

  try {
    console.log('📥 Downloading video:', video_url);

    // Download video
    await downloadFile(video_url, videoPath);

    console.log('🎬 Extracting frame at 2 seconds...');

    // Extract frame at 2 seconds
    await executeCommand(`ffmpeg -i ${videoPath} -ss 2 -vframes 1 ${framePath}`);

    console.log('✂️  Removing watermark (bottom 80px)...');

    // Remove watermark (crop bottom 80px)
    await executeCommand(`convert ${framePath} -gravity South -chop 0x80 ${cleanPath}`);

    console.log('📤 Reading clean image...');

    // Read clean image as base64
    const imageBase64 = fs.readFileSync(cleanPath, 'base64');
    const imageUrl = `data:image/jpeg;base64,${imageBase64}`;

    // Cleanup
    fs.unlinkSync(videoPath);
    fs.unlinkSync(framePath);
    fs.unlinkSync(cleanPath);

    console.log('✅ Success! Watermark removed.');

    res.json({
      success: true,
      image_url: imageUrl,
      message: 'Watermark removed successfully'
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Watermark removal server running' });
});

// Helper: Download file
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

// Helper: Execute command
function executeCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Watermark Removal Server running on port ${PORT}`);
  console.log(`📍 Local URL: http://localhost:${PORT}`);
  console.log(`🌐 Make this accessible to n8n Cloud via ngrok or cloudflare tunnel\n`);
});
