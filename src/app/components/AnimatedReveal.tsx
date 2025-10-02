"use client";

import React from "react";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface AnimatedRevealProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * AnimatedReveal Component
 *
 * A passthrough wrapper component for children elements.
 * Originally designed for animations but currently acts as a simple container.
 * Maintained for backward compatibility and future animation enhancements.
 *
 * @param children - React elements to be wrapped
 * @param className - Optional CSS classes to apply to the wrapper
 * @returns JSX element containing the wrapped children
 */
const AnimatedReveal: React.FC<AnimatedRevealProps> = React.memo(
  ({ children, className = "" }) => {
    return <div className={className}>{children}</div>;
  }
);

AnimatedReveal.displayName = "AnimatedReveal";

export default AnimatedReveal;
