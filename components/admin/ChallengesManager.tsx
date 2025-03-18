"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"

interface Challenge {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  examples: string[]
  constraints: string[]
  isActive: boolean
}

export function ChallengesManager() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(false)

  const handleToggleActive = async (challengeId: string) => {
    try {
      setLoading(true)
      // In a real app, this would call an API endpoint
      setChallenges(prev =>
        prev.map(challenge =>
          challenge.id === challengeId
            ? { ...challenge, isActive: !challenge.isActive }
            : challenge
        )
      )
      toast.success("Challenge status updated")
    } catch (error) {
      toast.error("Failed to update challenge status")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Active Challenges</h2>
        <Button variant="glass">Add New Challenge</Button>
      </div>

      <div className="grid gap-4">
        {challenges.map(challenge => (
          <div
            key={challenge.id}
            className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {challenge.title}
                </h3>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                    challenge.difficulty === "Easy"
                      ? "bg-green-500/20 text-green-300"
                      : challenge.difficulty === "Medium"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {challenge.difficulty}
                </span>
              </div>
              <Button
                variant={challenge.isActive ? "destructive" : "glass"}
                size="sm"
                onClick={() => handleToggleActive(challenge.id)}
                disabled={loading}
              >
                {challenge.isActive ? "Deactivate" : "Activate"}
              </Button>
            </div>

            <p className="text-gray-300 mb-4">{challenge.description}</p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">
                  Examples:
                </h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {challenge.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-2">
                  Constraints:
                </h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {challenge.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}