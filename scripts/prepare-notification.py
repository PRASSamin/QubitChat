""" 
This script copies an audio file to the Android res/raw folder, ensuring it is correctly placed for use in the application.
"""
import os
import shutil
from . import ERROR, INFO, SUCCESS, ROOT

android_raw = os.path.join(ROOT, "android", "app", "src", "main", "res", "raw")
notification_sound = os.path.join(ROOT,  "src", "assets", "audios", "notification.mp3")

def PrepareNotification():
    INFO("Preparing Notification...")

    # Check if the raw directory exists, if not, create it
    if not os.path.exists(android_raw):
        INFO(f"Raw directory does not exist. Creating it now...")
        os.makedirs(android_raw)
        INFO(f"Raw directory created")
    
    if os.path.exists(notification_sound):
        try:
            # Copy the audio file to the Android raw folder 
            shutil.copy(notification_sound, android_raw)
            SUCCESS(f"Notification prepared successfully.")
        except Exception as e:
            ERROR(f"Error copying file: {e}")
    else:
        ERROR(f"Audio file not found at {notification_sound}. Please check the file path.")

if __name__ == "__main__":
    PrepareNotification()