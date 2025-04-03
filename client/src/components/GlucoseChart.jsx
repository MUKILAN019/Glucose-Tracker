import React, { useEffect, useState } from "react";
import { getGlucoseData } from "../services/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { RefreshCw } from "lucide-react";

const GlucoseChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getGlucoseData();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-yellow-400">Glucose Level Tracker</h2>
        <button
          onClick={fetchData}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center gap-2"
        >
          <RefreshCw size={16} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="Time" tick={{ fontSize: 12, fill: "#ccc" }} angle={-15} dy={5} />
            <YAxis tick={{ fontSize: 12, fill: "#ccc" }} />
            <Tooltip contentStyle={{ backgroundColor: "#222", borderRadius: "8px", color: "#fff" }} />
            <Legend wrapperStyle={{ bottom: 0, fontSize: "14px", color: "#fff" }} />
            <Line type="monotone" dataKey="Glucose Level" stroke="#fbbf24" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GlucoseChart;
