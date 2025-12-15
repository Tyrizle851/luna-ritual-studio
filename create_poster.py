#!/usr/bin/env python3
"""
Extract a frame from hero-video.mp4 to create hero-poster.jpg
"""

import sys
import os

try:
    import cv2
    print("Using OpenCV for frame extraction...")

    video_path = "public/hero-video.mp4"
    output_path = "public/hero-poster.jpg"

    # Open video
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print(f"Error: Could not open video file: {video_path}")
        sys.exit(1)

    # Get FPS and calculate frame number for 0.5 seconds
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_number = int(fps * 0.5)  # 0.5 seconds in

    # Set position to frame
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_number)

    # Read frame
    ret, frame = cap.read()

    if ret:
        # Save frame as JPEG with high quality
        cv2.imwrite(output_path, frame, [cv2.IMWRITE_JPEG_QUALITY, 95])
        print(f"SUCCESS: Poster created successfully: {output_path}")
        print(f"  Frame: {frame_number} (0.5 seconds)")
        print(f"  Size: {frame.shape[1]}x{frame.shape[0]}")
    else:
        print("Error: Could not read frame from video")
        sys.exit(1)

    cap.release()

except ImportError:
    print("OpenCV (cv2) not found. Trying moviepy...")

    try:
        from moviepy.editor import VideoFileClip

        video_path = "public/hero-video.mp4"
        output_path = "public/hero-poster.jpg"

        # Load video
        clip = VideoFileClip(video_path)

        # Extract frame at 0.5 seconds
        frame = clip.get_frame(0.5)

        # Save frame
        from PIL import Image
        img = Image.fromarray(frame)
        img.save(output_path, quality=95)

        print(f"SUCCESS: Poster created successfully: {output_path}")
        print(f"  Time: 0.5 seconds")
        print(f"  Size: {img.size[0]}x{img.size[1]}")

        clip.close()

    except ImportError:
        print("")
        print("ERROR: Neither OpenCV nor moviepy is installed.")
        print("")
        print("Please install one of these packages:")
        print("  pip install opencv-python")
        print("  OR")
        print("  pip install moviepy")
        print("")
        print("Alternatively, create the poster manually:")
        print("1. Open public/hero-video.mp4 in any video player")
        print("2. Pause at 0.5 seconds (a good representative frame)")
        print("3. Take a screenshot and save as public/hero-poster.jpg")
        sys.exit(1)
