"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [serverTime, setServerTime] = useState("");
  const [clientTime, setClientTime] = useState("");
  const [requestCount, setRequestCount] = useState(0);
  const [status, setStatus] = useState("idle");
  const [serverCount, setServerCount] = useState(0);

  const fetchServerTime = async () => {
    try {
      setStatus("loading");
      const response = await fetch("/api/time");
      const data = await response.json();

      setServerTime(data.serverTime);
      setStatus(data.status);
      setRequestCount((prev) => prev + 1);
      setServerCount(data.serverRequestCount);
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchServerTime();

    const interval = setInterval(() => {
      fetchServerTime();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setClientTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-3xl mb-6">Time API Dashboard 🚀</h1>

      <div className="mb-4">
        <p>🖥 Server Time: {serverTime}</p>
        <p>💻 Client Time: {clientTime}</p>
        <p>📊 API Calls: {requestCount}</p>
        <p>🏭 Server API Calls: {serverCount}</p>
        <p>🟢 Status: {status}</p>
      </div>

      <button
        onClick={fetchServerTime}
        className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Manual Refresh
      </button>
    </div>
  );
}