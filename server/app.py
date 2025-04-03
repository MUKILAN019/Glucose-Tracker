from flask import Flask, jsonify, request, send_file
import pandas as pd
import random
from datetime import datetime
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

glucose_readings = []

EXCEL_FILE = "static/glucose_data.xlsx"
CSV_FILE = "static/glucose_data.csv"


os.makedirs("static", exist_ok=True)

@app.route('/api/glucose', methods=['GET'])
def generate_glucose():
    value = random.randint(70, 180)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  

   
    if glucose_readings and glucose_readings[-1]["Time"] == timestamp:
        return jsonify(glucose_readings[-1])  

    new_reading = {"Time": timestamp, "Glucose Level": value}
    glucose_readings.append(new_reading)

    return jsonify(new_reading)

@app.route('/api/glucose-data', methods=['GET'])
def get_glucose_data():
    return jsonify(glucose_readings)

@app.route('/api/save-csv', methods=['POST'])
def save_csv():
    df = pd.DataFrame(glucose_readings)

    if os.path.exists(CSV_FILE):
        df_existing = pd.read_csv(CSV_FILE)
        df = pd.concat([df_existing, df]).drop_duplicates().reset_index(drop=True)  

    df.to_csv(CSV_FILE, index=False)
    return jsonify({"message": "Data saved to CSV successfully!"})

@app.route('/api/save-excel', methods=['POST'])
def save_excel():
    df = pd.DataFrame(glucose_readings)

    if os.path.exists(EXCEL_FILE):
        try:
            df_existing = pd.read_excel(EXCEL_FILE, engine="openpyxl")
            df = pd.concat([df_existing, df]).drop_duplicates().reset_index(drop=True) 
        except Exception as e:
            print(f"Error reading Excel file: {e}")  
            df_existing = pd.DataFrame() 

    with pd.ExcelWriter(EXCEL_FILE, mode='w', engine="openpyxl") as writer:
        df.to_excel(writer, index=False)

    return jsonify({"message": "Data saved to Excel successfully!"})


@app.route('/api/download-csv', methods=['GET'])
def download_csv():
    if os.path.exists(CSV_FILE):
        return send_file(CSV_FILE, as_attachment=True)
    return jsonify({"error": "CSV file not found!"}), 404


@app.route('/api/download-excel', methods=['GET'])
def download_excel():
    if os.path.exists(EXCEL_FILE):
        return send_file(EXCEL_FILE, as_attachment=True)
    return jsonify({"error": "Excel file not found!"}), 404

if __name__ == '__main__':
    app.run(debug=True)
