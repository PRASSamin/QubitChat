import os
import sys
from . import ROOT, INFO, SUCCESS, ERROR, WARNING
import re

def add_splits_to_gradle(gradle_file_path, arch_list=None):
    default_archs = {"armeabi-v7a", "arm64-v8a", "x86", "x86_64"}
    
    # Merge provided architectures with the default ones
    if arch_list:
        archs = default_archs.union(set(arch_list))
    else:
        archs = default_archs
    
    splits_block = f"""
    splits {{
        abi {{
            enable true
            reset()
            include {', '.join(f'\"{arch}\"' for arch in sorted(archs))} 
            universalApk true
        }}
    }}
    """.strip()
    
    with open(gradle_file_path, "r", encoding="utf-8") as file:
        gradle_content = file.read()
    
    # Check if the splits block already exists
    if "splits {" in gradle_content:
        gradle_content = re.sub(r"splits \{.*?\}\n", splits_block, gradle_content, flags=re.DOTALL)
    else:
        gradle_content = gradle_content.replace("android {", f"android {{\n    {splits_block}", 1)
    
    with open(gradle_file_path, "w", encoding="utf-8") as file:
        file.write(gradle_content)
    
    SUCCESS(f"✅ Successfully added multi-arch support to {gradle_file_path}")

if __name__ == "__main__":
    gradle_path = os.path.join(ROOT, "android", "app", "build.gradle")
    additional_archs = sys.argv[1:] if len(sys.argv) > 1 else []
    add_splits_to_gradle(gradle_path, additional_archs)