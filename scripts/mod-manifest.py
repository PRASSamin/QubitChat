""" 
This script modifies the AndroidManifest.xml file to prevent build-time errors caused by conflicting metadata values.

When the same <meta-data> entry exists in both the main manifest and a dependency manifest with different values, it can lead to build errors. This script resolves the issue by adding the tools:replace attribute to conflicting <meta-data> elements, ensuring a smooth build process.
"""

import os
import xml.etree.ElementTree as ET
from xml.dom import minidom
from . import INFO, ERROR, SUCCESS, ROOT

android_manifest = os.path.join(
    ROOT, "android", "app", "src", "main", "AndroidManifest.xml"
)

def mod_manifest():
    if not os.path.exists(android_manifest):
        ERROR(f"{android_manifest} does not exist.")
        return

    try:
        # Parse the XML
        tree = ET.parse(android_manifest)
        root = tree.getroot()

        # namespaces
        namespaces = {
            'android': 'http://schemas.android.com/apk/res/android',
            'tools': 'http://schemas.android.com/tools'
        }
        
        ET.register_namespace("android", namespaces['android'])
        ET.register_namespace("tools", namespaces['tools'])

        def update_metadata(name, tools_replace_value):
            for meta in root.findall(".//meta-data", namespaces):
                if meta.get(f"{{{namespaces['android']}}}name") == name:
                    meta.set(f"{{{namespaces['tools']}}}replace", tools_replace_value)
        
        update_metadata("com.google.firebase.messaging.default_notification_channel_id", "android:value")
        update_metadata("com.google.firebase.messaging.default_notification_color", "android:resource")

        # Convert tree back to string
        xml_string = ET.tostring(root, encoding="utf-8")

        # Format the XML correctly using minidom
        parsed_xml = minidom.parseString(xml_string)
        formatted_xml = parsed_xml.toprettyxml(indent="  ")

        # Remove unnecessary blank lines
        formatted_xml = "\n".join([line for line in formatted_xml.split("\n") if line.strip()])

        # Remove the first line (<?xml version="1.0"?>) to keep the original structure
        formatted_xml = "\n".join(formatted_xml.split("\n")[1:])

        # Write back to the file
        with open(android_manifest, "w", encoding="utf-8") as f:
            f.write(formatted_xml)
        
        SUCCESS("AndroidManifest.xml has been updated successfully.")

    except ET.ParseError as err:
        ERROR(f"Error parsing AndroidManifest.xml: {err}")
    except Exception as err:
        ERROR(f"An unexpected error occurred: {err}")

if __name__ == "__main__":
    INFO("Starting to modify AndroidManifest.xml...")
    mod_manifest()