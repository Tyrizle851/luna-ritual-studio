"""
Serverless Watermark Remover
Deploy to Vercel/AWS Lambda/Cloudflare Workers
"""

from flask import Flask, request, jsonify
import subprocess
import requests
import base64
import os
import tempfile

app = Flask(__name__)

@app.route('/api/remove-watermark', methods=['POST'])
def remove_watermark():
    data = request.get_json()
    video_url = data.get('video_url')

    if not video_url:
        return jsonify({'error': 'video_url required'}), 400

    try:
        # Create temp files
        with tempfile.NamedTemporaryFile(suffix='.mp4', delete=False) as video_file:
            video_path = video_file.name

        frame_path = video_path.replace('.mp4', '_frame.jpg')
        clean_path = video_path.replace('.mp4', '_clean.jpg')

        # Download video
        response = requests.get(video_url)
        with open(video_path, 'wb') as f:
            f.write(response.content)

        # Extract frame at 2 seconds using ffmpeg
        subprocess.run([
            'ffmpeg', '-i', video_path,
            '-ss', '2',
            '-vframes', '1',
            frame_path
        ], check=True)

        # Remove watermark (crop bottom 80px) using ImageMagick
        subprocess.run([
            'convert', frame_path,
            '-gravity', 'South',
            '-chop', '0x80',
            clean_path
        ], check=True)

        # Read clean image as base64
        with open(clean_path, 'rb') as f:
            image_base64 = base64.b64encode(f.read()).decode()

        # Cleanup
        os.unlink(video_path)
        os.unlink(frame_path)
        os.unlink(clean_path)

        return jsonify({
            'success': True,
            'image_url': f'data:image/jpeg;base64,{image_base64}'
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True)
