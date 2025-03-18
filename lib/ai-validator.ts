import { validateCode } from "./code-validator"
import { calculateScore } from "./utils"

export async function validateSubmissionWithAI(submission: {
  code: string
  challengeId: string
  userId: string
}) {
  try {
    // Validate code quality and check for plagiarism
    const codeValidation = await validateCode(submission.code)
    
    // Calculate final score
    const score = calculateScore(
      codeValidation.quality,
      codeValidation.plagiarismScore
    )
    
    return {
      ...codeValidation,
      score,
      timestamp: new Date(),
      submissionId: submission.challengeId + "-" + submission.userId
    }
  } catch (error) {
    console.error("AI validation failed:", error)
    throw error
  }
}

export async function generateCodeFeedback(code: string): Promise<string[]> {
  try {
    const validation = await validateCode(code)
    
    const feedback = []
    
    // Quality feedback
    if (validation.quality < 80) {
      feedback.push("Consider improving code quality:")
      if (!validation.customValidations.hasComments) {
        feedback.push("- Add comments to explain complex logic")
      }
      if (!validation.customValidations.hasProperNaming) {
        feedback.push("- Use more descriptive variable and function names")
      }
    }
    
    // Optimization feedback
    if (!validation.customValidations.isOptimized) {
      feedback.push("Performance improvements:")
      feedback.push("- Look for opportunities to reduce nested operations")
      feedback.push("- Consider using more efficient data structures")
    }
    
    return feedback
  } catch (error) {
    console.error("Failed to generate feedback:", error)
    throw error
  }
}