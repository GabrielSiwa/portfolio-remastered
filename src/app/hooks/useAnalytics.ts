"use client";

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket | null = null;

export const useAnalytics = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    // Only connect once
    if (!socket) {
      const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";
      socket = io(socketUrl, {
        transports: ["websocket"],
        autoConnect: true,
      });
    }

    if (!socket) return;

    // Listen for updates
    socket.on("connect", () => {
      console.log("✅ Connected to analytics server");
      // Track page view on connection
      socket?.emit("page_view", window.location.pathname);
    });

    socket.on("update_count", (count: number) => {
      setVisitorCount(count);
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("update_count");
        socket.off("error");
      }
    };
  }, []);

  // Track page view logic if we were using a router event listener
  useEffect(() => {
    if (socket && socket.connected) {
      socket.emit("page_view", window.location.pathname);
    }
  }, []);

  return { visitorCount };
};
