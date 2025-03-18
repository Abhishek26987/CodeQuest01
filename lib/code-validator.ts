import { validateSubmission } from "./utils"

export async function validateCode(code: string) {
  try {
    // Validate code quality and check for plagiarism
    const result = await validateSubmission(code)
    
    // Additional custom validations
    const customValidations = {
      hasComments: /\/\/|\/\*|\*\//.test(code),
      hasProperNaming: /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(code),
      isOptimized: checkOptimization(code)
    }
    
    return {
      ...result,
      customValidations
    }
  } catch (error) {
    console.error("Code validation failed:", error)
    throw error
  }
}

function checkOptimization(code: string): boolean {
  // In a real app, this would use more sophisticated analysis
  const complexityIndicators = [
    /for.*for/g, // Nested loops
    /while.*while/g, // Nested while loops
    /if.*if.*if/g // Deeply nested conditions
  ]
  
  return !complexityIndicators.some(pattern => pattern.test(code))
}

export async function analyzeSolution(code: string, challengeId: string) {
  const validation = await validateCode(code)
  const score = calculateScore(validation)
  
  return {
    ...validation,
    score,
    feedback: generateFeedback(validation)
  }
}

function calculateScore(validation: any): number {
  const weights = {
    quality: 0.4,
    plagiarism: 0.3,
    optimization: 0.2,
    style: 0.1
  }
  
  return Math.floor(
    validation.quality * weights.quality +
    validation.plagiarismScore * weights.plagiarism +
    (validation.customValidations.isOptimized ? 100 : 0) * weights.optimization +
    ((validation.customValidations.hasComments && 
      validation.customValidations.hasProperNaming) ? 100 : 0) * weights.style
  )
}

function generateFeedback(validation: any): string[] {
  const feedback = []
  
  if (validation.quality < 80) {
    feedback.push("Consider improving code quality by following best practices")
  }
  
  if (!validation.customValidations.hasComments) {
    feedback.push("Add comments to explain complex logic")
  }
  
  if (!validation.customValidations.isOptimized) {
    feedback.push("Look for opportunities to optimize nested operations")
  }
  
  return feedback
}