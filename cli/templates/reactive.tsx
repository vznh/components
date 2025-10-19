"use client"
import * as React from "react";
import { motion } from "framer-motion";

interface ReactiveProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  duration?: number; // default 500ms
  decimal?: number; // only if number

  className?: string;
  children?: React.ReactNode | ((value: number) => React.ReactNode);

  blur?: number; // px
  animationOpacity?: number; // [0, 1]
}

const Reactive: React.FC<ReactiveProps> = ({
  value,
  duration = 500,
  decimal = 2,
  blur = 5,
  animationOpacity = 0.7,
  className,
  children
}) => {
  const [displayValue, setDisplayValue] = React.useState<number>(0);
  const [animating, setAnimating] = React.useState<boolean>(false);

  const animationRef = React.useRef<number>(0);
  const timeRef = React.useRef<number>(0);
  const valueRef = React.useRef<number>(value);

  React.useEffect(() => {
    if (value === displayValue) return;

    setAnimating(true);
    valueRef.current = displayValue;
    timeRef.current = performance.now();

    const animate = (currentTime: number) => {
      if (!timeRef.current) return;

      const elapsed = currentTime - timeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const eoc = 1 - Math.pow(1 - progress, 3); // easing func used for smooth animations
      const current = valueRef.current + (value - valueRef.current) * eoc;

      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [value, duration]);

  const format = (value: number) => {
    return decimal ? value.toLocaleString('en-US', {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal
    }) : ""
  }

  if (children) {
    return <motion.span
      className={className}
      animate={{
        filter: animating ? `blur(${blur}px)` : `blur(0px)`,
        opacity: animating ? animationOpacity : 1
      }}
      transition={{ duration: 0.2 }}
    >
      {typeof children === 'function' ? children(displayValue) : children}
    </motion.span>
  }

  return <motion.span
    className={className}
    animate={{
      filter: animating ? `blur(${blur}px)` : 'blur(0px)',
      opacity: animating ? animationOpacity : 1
    }}
    transition={{ duration: 0.2 }}
  >
    {format(displayValue)}
  </motion.span>
}

export { Reactive, ReactiveProps };
