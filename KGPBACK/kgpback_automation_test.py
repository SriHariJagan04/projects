import subprocess
import csv
import os
import pandas as pd
import time
import re

# =================== CONFIG ===================
exe_path = r"C:\Users\sowmy\Desktop\KGPBACK\KGPBACK.exe"
exe_dir = os.path.dirname(exe_path)
output_txt = os.path.join(exe_dir, "backout.txt")
input_file = r"C:\Users\sowmy\Desktop\KGPBACK\text.xlsx"
final_output_csv = os.path.join(exe_dir, "Final_Results.csv")

# =================== LOAD INPUT ===================
file_ext = os.path.splitext(input_file)[1].lower()

if file_ext == ".csv":
    df = pd.read_csv(input_file, encoding='utf-8', engine='python')
elif file_ext in [".xls", ".xlsx"]:
    df = pd.read_excel(input_file, engine='openpyxl')
else:
    raise ValueError(f"Unsupported file type: {file_ext}")

# Expected input columns
expected_columns = ["S.N.", "Load & TP", "N", "Spacing", "Deflection",
                    "Crust Thickness", "Poisson's ratio",
                    "BT Modulus", "GSB Modulus", "Subgrade Modulus"]

# Detect row-wise or column-wise and transpose if needed
rowwise = all(col in df.columns for col in expected_columns)
if not rowwise:
    df = df.transpose().reset_index(drop=True)

print(f"Detected input format: {'Row-wise' if rowwise else 'Column-wise'}")

# =================== PREPARE OUTPUT CSV ===================
if not os.path.exists(final_output_csv):
    with open(final_output_csv, "w", newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(expected_columns + ["Surface (MPa)", "Base (MPa)", "Subgrade (MPa)"])

# =================== FUNCTION TO PARSE OUTPUT ===================
def extract_output_values(file_path):
    surface, base, subgrade = None, None, None
    if os.path.exists(file_path) and os.path.getsize(file_path) > 0:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                for line in f:
                    if "Surface" in line:
                        match = re.search(r"=\s*([\d.]+)", line)
                        if match: surface = match.group(1)
                    elif "Base" in line:
                        match = re.search(r"=\s*([\d.]+)", line)
                        if match: base = match.group(1)
                    elif "Subgrade" in line:
                        match = re.search(r"=\s*([\d.]+)", line)
                        if match: subgrade = match.group(1)
        except Exception as e:
            print(f"⚠️ Error reading output: {e}")
    else:
        print("⚠️ Output file missing or empty.")
    return surface, base, subgrade

# =================== PROCESS EACH ROW ===================
for idx, row in df.iterrows():
    serial_no = row[0] if 'S.N.' in df.columns else idx + 1
    values = [str(x) for x in row]

    print(f"\n🚀 Processing Serial No: {serial_no}")

    # Delete old output file if exists
    if os.path.exists(output_txt):
        os.remove(output_txt)

    # Prepare input text for exe (all values pasted at once)
    input_text = "\n".join(values) + "\n"  # important final newline

    # Run exe and send input
    process = subprocess.Popen(
        [exe_path],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        cwd=exe_dir
    )
    stdout, stderr = process.communicate(input=input_text)
    process.wait()  # wait until exe fully exits

    # Wait until backout.txt is fully written (max 120s)
    start_time = time.time()
    while True:
        if os.path.exists(output_txt) and os.path.getsize(output_txt) > 0:
            break
        if time.time() - start_time > 120:
            print("⚠️ Timeout waiting for output file.")
            break
        time.sleep(1)

    # Extract Surface, Base, Subgrade
    surface, base, subgrade = extract_output_values(output_txt)

    # Append row + results to final CSV
    with open(final_output_csv, "a", newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(values + [surface, base, subgrade])

    print(f"✅ Done Serial No: {serial_no} | Surface={surface}, Base={base}, Subgrade={subgrade}")

print("\n🎉 All data processed. Results saved in Final_Results.csv")
