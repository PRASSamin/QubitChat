"""
Usage: python build.py [release|debug]
Support: Android
"""
import os
import sys
import re
import shutil
import subprocess
from . import ROOT, INFO, SUCCESS, ERROR, WARNING  
import json

ANDROID_DIR = os.path.join(ROOT, "android")
BUILD_OUTPUT_DIR = os.path.join(ANDROID_DIR, "app", "build", "outputs", "apk")
DIST_DIR = os.path.join(ROOT, "build", "android")
META_SCRIPT = os.path.join(ROOT, "extracted.js")

def extract_meta():
    """Extract metadata dynamically by running a Node.js script."""
    js_code = """
    const { metadata } = require('./meta.ts');
    console.log(JSON.stringify({
        name: metadata.slug,
        version: metadata.version,
        release_label: metadata.release_label
    }));
    """

    # Write temporary JS script
    with open(META_SCRIPT, "w", encoding="utf-8") as file:
        file.write(js_code)

    try:
        result = subprocess.run(["bun", META_SCRIPT], capture_output=True, text=True, check=True)
        metadata = json.loads(result.stdout.strip())
        return metadata["name"], f"v{metadata["version"]}", metadata["release_label"]
    except Exception as e:
        ERROR(f"Failed to extract metadata: {e}")
        sys.exit(1)
    finally:
        os.remove(META_SCRIPT)


def build_apk(build_type):
    """Run Gradle command to build the APK."""
    os.chdir(ANDROID_DIR)
    try:
        INFO(f"Building {build_type} APK...")
        subprocess.run(["./gradlew", f"assemble{build_type.capitalize()}"], check=True)
        SUCCESS(f"{build_type.capitalize()} build completed successfully.")
    except subprocess.CalledProcessError:
        ERROR(f"Failed to build {build_type} APK.")
        sys.exit(1)
    finally:
        os.chdir(ROOT)  # Return to project root


def rename_and_move_apks(app_name, version, release_label, build_type):
    """Rename and move APK files to the destination directory."""
    source_dir = os.path.join(BUILD_OUTPUT_DIR, build_type)

    if not os.path.exists(source_dir):
        ERROR("APK output directory not found.")
        sys.exit(1)

    # Ensure destination directory exists
    os.makedirs(DIST_DIR, exist_ok=True)

    for apk in os.listdir(source_dir):
        if apk.endswith(".apk"):
            arch_match = re.search(r"-(arm64-v8a|armeabi-v7a)", apk)
            arch_name = f"-{arch_match.group(1)}" if arch_match else ""
            new_name = f"{app_name}{arch_name}-{version}-{release_label}.apk"

            old_path = os.path.join(source_dir, apk)
            new_path = os.path.join(DIST_DIR, new_name)

            shutil.move(old_path, new_path)
            SUCCESS(f"Renamed and moved: {new_name}")


if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] not in ["release", "debug"]:
        ERROR("Usage: python build_android.py [release|debug]")
        sys.exit(1)

    build_type = sys.argv[1]
    
    #remove dist directory
    if os.path.exists(DIST_DIR):
        shutil.rmtree(DIST_DIR)

    #extract metadata
    app_name, version, release_label = extract_meta()

    #build apk
    INFO(f"Starting {build_type} build for {app_name} ({version}, {release_label})...")
    build_apk(build_type)

    #rename and move apks
    rename_and_move_apks(app_name, version, release_label, build_type)

    SUCCESS("Build process completed successfully.")
