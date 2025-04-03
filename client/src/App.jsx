import React from "react";
import GlucoseMonitor from "./components/GlucoseMonitor";
import GlucoseChart from "./components/GlucoseChart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10 gap-8">
      <ToastContainer />
      <GlucoseMonitor />
      <GlucoseChart />
    </div>
  );
}

export default App;
