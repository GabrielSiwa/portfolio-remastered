import React from "react";

export default function AnimatedReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Animation removed per user request — passthrough wrapper
  return <div className={className}>{children}</div>;
}
