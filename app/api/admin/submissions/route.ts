import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { isAdmin } from "@/lib/utils"

export async function GET() {
  const session = await getServerSession()
  
  if (!session?.user || !isAdmin(session.user)) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    // In a real app, this would fetch from a database
    const submissions = [
      {
        id: "1",
        userId: "user123",
        challengeId: "challenge1",
        submittedAt: new Date(),
        status: "pending",
        codeQuality: 85,
        plagiarismScore: 98,
        githubPrUrl: "https://github.com/org/repo/pull/1"
      }
    ]

    return NextResponse.json(submissions)
  } catch (error) {
    console.error("Failed to fetch submissions:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession()
  
  if (!session?.user || !isAdmin(session.user)) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = await request.json()
    const { action, submissionId } = body

    // In a real app, this would update a database
    const updatedSubmission = {
      id: submissionId,
      status: action === "approve" ? "approved" : "rejected",
      updatedAt: new Date()
    }

    return NextResponse.json(updatedSubmission)
  } catch (error) {
    console.error("Failed to update submission:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}