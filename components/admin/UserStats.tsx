"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface UserStat {
  userId: string
  username: string
  totalSolved: number
  currentStreak: number
  longestStreak: number
  score: number
  lastActive: Date
}

export function UserStats() {
  const [stats, setStats] = useState<UserStat[]>([])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">User Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.userId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              {stat.username}
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Problems Solved:</span>
                <span className="text-white">{stat.totalSolved}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Current Streak:</span>
                <span className="text-white">{stat.currentStreak} days</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Longest Streak:</span>
                <span className="text-white">{stat.longestStreak} days</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Total Score:</span>
                <span className="text-white">{stat.score}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Last Active:</span>
                <span className="text-white">
                  {new Date(stat.lastActive).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}