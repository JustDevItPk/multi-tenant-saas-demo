"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const [count, setCount] = useState(0);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socketRef.current = socket;

    socket.on("counterUpdated", (value: number) => {
      setCount(value);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const increment = () => {
    socketRef.current?.emit("increment");
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Real-Time Counter Demo
      </h1>

      <p className="mb-4">
        Count: <strong>{count}</strong>
      </p>

      <button
        onClick={increment}
        className="border px-4 py-2 rounded"
      >
        Increment
      </button>
    </main>
  );
}