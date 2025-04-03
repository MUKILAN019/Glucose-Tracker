import React, { useState } from "react";
import { getGlucoseReading, saveToCSV, saveToExcel } from "../services/api";
import { toast } from "react-toastify";
import { FaDownload, FaSyncAlt } from "react-icons/fa";

const GlucoseMonitor = () => {
  const [glucose, setGlucose] = useState(null);

  const fetchGlucose = async () => {
    const response = await getGlucoseReading();
    setGlucose(response.data);

    if (response.data["Glucose Level"] < 80) {
      toast.warning("Low Glucose Alert! Eat something.");
    } else if (response.data["Glucose Level"] > 150) {
      toast.error("High Glucose Alert! Consider taking insulin.");
    }
  };

  const handleDownloadCSV = async () => {
    await saveToCSV();
    window.location.href = "http://127.0.0.1:5000/static/glucose_data.csv";
  };

  const handleDownloadExcel = async () => {
    await saveToExcel();
    window.location.href = "http://127.0.0.1:5000/static/glucose_data.xlsx";
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-gray-800 text-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold text-center">Blood Sugar Monitoring</h2>
      <p className="text-lg text-center mt-2">
        Current Glucose Level:{" "}
        <span className="font-bold text-blue-400">{glucose ? `${glucose["Glucose Level"]} mg/dL` : "--"}</span>
      </p>
      <div className="flex justify-between mt-4">
        <button className="btn btn-primary flex items-center gap-2" onClick={fetchGlucose}>
          <FaSyncAlt /> Check Glucose
        </button>
        <button className="btn btn-secondary flex items-center gap-2" onClick={handleDownloadCSV}>
          <FaDownload /> CSV
        </button>
        <button className="btn btn-accent flex items-center gap-2" onClick={handleDownloadExcel}>
          <FaDownload /> Excel
        </button>
      </div>
    </div>
  );
};

export default GlucoseMonitor;
