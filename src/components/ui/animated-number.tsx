'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type AnimatedNumberProps = {
  value: number;
  formatter?: (value: number) => string;
  duration?: number;
  className?: string;
};

export function AnimatedNumber({
  value,
  formatter = (current) => current.toString(),
  duration = 1,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(latest),
    });

    return () => controls.stop();
  }, [duration, isInView, value]);

  return (
    <span ref={ref} className={className}>
      {formatter(Math.round(displayValue))}
    </span>
  );
}
