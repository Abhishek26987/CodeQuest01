"use client"

import { motion } from "framer-motion"
import Confetti from "react-confetti"
import { useState, useEffect } from "react"

interface User {
  rank: number
  username: string
  score: number
  solved: number
  streak: number
}

const mockUsers: User[] = [
  { rank: 1, username: "sarah_dev", score: 2500, solved: 95, streak: 45 },
  { rank: 2, username: "coding_ninja", score: 2350, solved: 92, streak: 40 },
  { rank: 3, username: "algo_master", score: 2200, solved: 88, streak: 35 },
  // Add more mock users...
]

export default function Leaderboard() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Global Leaderboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {mockUsers.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.username}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl border border-white/20"
              onClick={() => setShowConfetti(true)}
            >
              <div className="text-4xl mb-4">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {user.username}
              </h3>
              <div className="text-gray-300">
                <p>Score: {user.score}</p>
                <p>Problems Solved: {user.solved}</p>
                <p>Streak: {user.streak} days</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Username</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Solved</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {mockUsers.map((user) => (
                <motion.tr
                  key={user.username}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-300">{user.rank}</td>
                  <td className="px-6 py-4 text-white">{user.username}</td>
                  <td className="px-6 py-4 text-gray-300">{user.score}</td>
                  <td className="px-6 py-4 text-gray-300">{user.solved}</td>
                  <td className="px-6 py-4 text-gray-300">{user.streak} days</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}