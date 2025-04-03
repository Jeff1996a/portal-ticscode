"use client";
import { timeEnd } from "console";
import { useState, useEffect } from "react";

export default function Clock() {

  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formattedDateTime);
    };

    updateClock(); // Set initial time
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);
  
  return <p>{time}</p>;
}