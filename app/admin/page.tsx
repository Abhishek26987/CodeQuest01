"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChallengesManager } from "@/components/admin/ChallengesManager"
import { SubmissionsTable } from "@/components/admin/SubmissionsTable"
import { UserStats } from "@/components/admin/UserStats"
import { isAdmin } from "@/lib/utils"

export default function AdminPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session?.user || !isAdmin(session.user)) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Admin Dashboard
        </h1>

        <Tabs defaultValue="challenges" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 backdrop-blur-lg bg-white/10 rounded-lg">
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="challenges">
            <ChallengesManager />
          </TabsContent>

          <TabsContent value="submissions">
            <SubmissionsTable />
          </TabsContent>

          <TabsContent value="users">
            <UserStats />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}