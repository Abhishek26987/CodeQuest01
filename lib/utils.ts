import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAdmin(user: any): boolean {
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || []
  return adminEmails.includes(user.email)
}

export async function validateSubmission(code: string) {
  // In a real app, this would use SonarCloud or similar for code analysis
  const quality = Math.floor(Math.random() * 30) + 70 // Random score between 70-100
  const plagiarismScore = Math.floor(Math.random() * 20) + 80 // Random score between 80-100
  
  return {
    quality,
    plagiarismScore,
    issues: [],
    suggestions: []
  }
}

export function calculateScore(quality: number, plagiarismScore: number): number {
  // Basic scoring algorithm
  const baseScore = 100
  const qualityWeight = 0.6
  const plagiarismWeight = 0.4
  
  return Math.floor(
    baseScore * (
      (quality / 100 * qualityWeight) +
      (plagiarismScore / 100 * plagiarismWeight)
    )
  )
}