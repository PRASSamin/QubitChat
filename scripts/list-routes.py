import json
import os
from . import ROOT, INFO, SUCCESS, ERROR

def list_expo_routes():
    # Adjust path to point to the app directory in the root
    app_dir = os.path.join(ROOT, "src","app")
    
    # Recursively get all .tsx files in app/ and subdirectories
    def get_all_files(dir_path):
        files = []
        for entry in os.listdir(dir_path):
            entry_path = os.path.join(dir_path, entry)
            if os.path.isdir(entry_path):
                files.extend(get_all_files(entry_path))  # Recursively scan subdirectories
            elif entry.endswith(".tsx"):
                files.append(entry_path)
        return files
      
    files = get_all_files(app_dir)

    routes = []
    for path in files:
        # Convert file path to route
        path = path.replace(os.path.join(ROOT, "src", "app/"), "")
        segments = path.replace(".tsx", "").split("/")  # Remove .tsx extension and split

        # Handle special files and route groups
        route_segments = [
            "" if segment.startswith("(") and segment.endswith(")") else segment
            for segment in segments
        ]

        # Handle special cases
        if route_segments[-1] == "index":
            route_segments.pop()  # Remove "index" for root route
        if route_segments[-1] == "_layout":
            continue  # Skip layout files
          
        # Handle dynamic routes, e.g., [...slug] -> /slug*
        route_segments = [
            segment for segment in route_segments if segment  # Remove empty segments (from route groups)
        ]
        
        route_segments = [
            f":{segment[4:-1]}*" if segment.startswith("[...") and segment.endswith("]")
            else f":{segment[1:-1]}" if segment.startswith("[") & segment.endswith("]")
            else segment
            for segment in route_segments
        ]

        # Construct the route path
        route = "/" if not route_segments else f"/{'/'.join(route_segments)}"
        routes.append(route)
        

    routes.sort()

    # Write to a JSON file
    output_path = os.path.join(ROOT, "routes.json")
    with open(output_path, "w") as f:
        json.dump(routes, f, indent=2)
    SUCCESS(f"Routes written to src/routes.json: {routes}")

if __name__ == "__main__":
    try:
        list_expo_routes()
    except Exception as e:
        ERROR(f"Error: {e}")