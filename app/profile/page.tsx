"use client"

import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

interface Stats {
  totalSolved: number
  currentStreak: number
  longestStreak: number
  ranking: number
  score: number
}

const mockStats: Stats = {
  totalSolved: 75,
  currentStreak: 12,
  longestStreak: 30,
  ranking: 42,
  score: 1850,
}

const badges = [
  { name: "First Solution", icon: "🎯", description: "Submitted your first solution" },
  { name: "Week Warrior", icon: "🔥", description: "Completed 7 days streak" },
  { name: "Problem Master", icon: "⭐", description: "Solved 50 problems" },
]

export default function Profile() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Button
          variant="glass"
          size="lg"
          className="gap-2"
          onClick={() => signIn("github")}
        >
          <Github className="w-5 h-5" />
          Login with GitHub
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 mb-8">
            <div className="flex items-center gap-6 mb-8">
              <img
                src={session.user?.image || ""}
                alt={session.user?.name || ""}
                className="w-24 h-24 rounded-full border-2 border-white/20"
              />
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {session.user?.name}
                </h1>
                <p className="text-gray-300">@{session.user?.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <StatCard title="Problems Solved" value={mockStats.totalSolved} />
              <StatCard title="Current Streak" value={`${mockStats.currentStreak} days`} />
              <StatCard title="Longest Streak" value={`${mockStats.longestStreak} days`} />
              <StatCard title="Global Rank" value={`#${mockStats.ranking}`} />
              <StatCard title="Total Score" value={mockStats.score} />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-6">Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20"
              >
                <div className="text-4xl mb-4">{badge.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {badge.name}
                </h3>
                <p className="text-gray-300">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="backdrop-blur-lg bg-white/5 p-4 rounded-xl border border-white/10">
      <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  )
}