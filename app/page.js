"use client";
import { useState } from "react";

export default function Home() {
  const [time, setTime] = useState("Chưa bấm nút");

  const handleClick = async () => {
    const response = await fetch("/api/time");
    const data = await response.json();
    setTime(data.serverTime);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-3xl mb-6">Hello Factory 🚀</h1>
      <button
        onClick={handleClick}
        className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Show Current Time
      </button>
      {time && <p className="mt-4 text-lg">{time}</p>}
    </div>
  );
}