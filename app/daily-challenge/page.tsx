"use client"

import { useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

interface Challenge {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  examples: string[]
  constraints: string[]
}

const dailyChallenge: Challenge = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  examples: [
    "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1]."
  ],
  constraints: [
    "2 <= nums.length <= 104",
    "-109 <= nums[i] <= 109",
    "-109 <= target <= 109"
  ]
}

export default function DailyChallenge() {
  const [flipped, setFlipped] = useState(false)

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Daily Challenge
        </h1>

        <div className="max-w-3xl mx-auto">
          <div
            className="relative h-[500px] cursor-pointer"
            onClick={() => setFlipped(state => !state)}
          >
            <animated.div
              className="absolute w-full h-full"
              style={{
                opacity: opacity.to(o => 1 - o),
                transform,
                rotateY: "0deg",
                backfaceVisibility: "hidden"
              }}
            >
              <div className="h-full backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-white">
                    {dailyChallenge.title}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    dailyChallenge.difficulty === "Easy" ? "bg-green-500/20 text-green-300" :
                    dailyChallenge.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-300" :
                    "bg-red-500/20 text-red-300"
                  }`}>
                    {dailyChallenge.difficulty}
                  </span>
                </div>
                <p className="text-gray-300 mb-8">
                  {dailyChallenge.description}
                </p>
                <div className="text-sm text-gray-400">
                  Click to see examples and constraints
                </div>
              </div>
            </animated.div>

            <animated.div
              className="absolute w-full h-full"
              style={{
                opacity,
                transform: transform.to(t => `${t} rotateY(180deg)`),
                rotateY: "180deg",
                backfaceVisibility: "hidden"
              }}
            >
              <div className="h-full backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Examples:</h3>
                <pre className="bg-black/30 p-4 rounded-lg text-gray-300 mb-6 overflow-x-auto">
                  {dailyChallenge.examples[0]}
                </pre>

                <h3 className="text-xl font-semibold text-white mb-4">Constraints:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {dailyChallenge.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>

                <div className="mt-8 flex justify-center">
                  <Button
                    variant="glass"
                    size="lg"
                    className="gap-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open("https://github.com/your-repo/daily-challenge", "_blank")
                    }}
                  >
                    <Github className="w-5 h-5" />
                    Submit Solution
                  </Button>
                </div>
              </div>
            </animated.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}