import os
import json

def convert_files_to_single_line(src_folder_path, dest_folder_path):
    if not os.path.exists(dest_folder_path):
        os.makedirs(dest_folder_path)

    for filename in os.listdir(src_folder_path):
        src_file_path = os.path.join(src_folder_path, filename)
        dest_file_path = os.path.join(dest_folder_path, filename)

        if os.path.isfile(src_file_path) and filename.endswith('.json'):
            with open(src_file_path, 'r', encoding='utf-8') as file:
                try:
                    json_data = json.load(file)
                    json_data['name'] = filename  # Add new key with file name
                    single_line_json = json.dumps(json_data)
                    with open(dest_file_path, 'w', encoding='utf-8') as dest_file:
                        dest_file.write(single_line_json)
                        print(f"Converted {filename} to single line JSON with new key and saved to {dest_file_path}")
                except Exception as e:
                    print(f"Unable to process JSON in file {filename}: {e}")

src_folder_path = './oneline'
dest_folder_path = './nkpy'
convert_files_to_single_line(src_folder_path, dest_folder_path)
