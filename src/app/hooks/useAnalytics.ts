"use client";

import { useEffect, useState } from "react";

export const useAnalytics = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateCount = async () => {
      try {
        // We use POST to increment the view
        const response = await fetch("/api/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
          const data = await response.json();
          setVisitorCount(data.count);
        }
      } catch (error) {
        console.error("Failed to update visitor count:", error);
      } finally {
        setLoading(false);
      }
    };

    // To prevent double-counting in React Strict Mode locally,
    // you might want to use a ref or session storage check here.
    // For now, we'll just run it. Using 'once' behavior is safer for prod.
    // Initial load logic
    const hasVisited = sessionStorage.getItem("visited_session");
    
    if (!hasVisited) {
      updateCount();
      sessionStorage.setItem("visited_session", "true");
    } else {
      // Just fetch the current count without incrementing
      fetch("/api/visit", { method: "GET" })
        .then(res => res.json())
        .then(data => {
            setVisitorCount(data.count);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }

    // Polling for live updates (every 10 seconds)
    const interval = setInterval(() => {
      fetch("/api/visit", { method: "GET" })
        .then(res => res.json())
        .then(data => {
          // Only update if count has changed to avoid unnecessary re-renders
          setVisitorCount(prev => (data.count > prev ? data.count : prev));
        })
        .catch(err => console.error("Polling error:", err));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return { visitorCount, loading };
};
