
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add animation utility function for pulsing glow
export function createGlowPulse(color: string, intensity: number = 10) {
  return `animate-pulse shadow-[0_0_${intensity}px_${color}]`
}
