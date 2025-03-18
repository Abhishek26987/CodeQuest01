"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"

interface Submission {
  id: string
  userId: string
  challengeId: string
  submittedAt: Date
  status: "pending" | "approved" | "rejected"
  codeQuality: number
  plagiarismScore: number
  githubPrUrl: string
}

export function SubmissionsTable() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(false)

  const handleAction = async (submissionId: string, action: "approve" | "reject") => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ submissionId, action }),
      })

      if (!response.ok) {
        throw new Error("Failed to update submission")
      }

      setSubmissions(prev =>
        prev.map(sub =>
          sub.id === submissionId
            ? { ...sub, status: action === "approve" ? "approved" : "rejected" }
            : sub
        )
      )
      toast.success(`Submission ${action}d successfully`)
    } catch (error) {
      toast.error("Failed to update submission")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Pending Submissions</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Challenge
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Quality
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Plagiarism
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {submission.userId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {submission.challengeId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(submission.submittedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {submission.codeQuality}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {submission.plagiarismScore}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex gap-2">
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={() => handleAction(submission.id, "approve")}
                      disabled={loading}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleAction(submission.id, "reject")}
                      disabled={loading}
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}