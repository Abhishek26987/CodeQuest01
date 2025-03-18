import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

export async function GET() {
  const session = await getServerSession()
  
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    // In a real app, this would fetch from a database
    const submissions = [
      {
        id: "1",
        challengeId: "challenge1",
        submittedAt: new Date(),
        status: "pending",
        score: 0
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
  
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = await request.json()
    const { challengeId, solution, githubPrUrl } = body

    // In a real app, this would save to a database
    const submission = {
      id: Math.random().toString(36).substr(2, 9),
      userId: session.user.id,
      challengeId,
      solution,
      githubPrUrl,
      submittedAt: new Date(),
      status: "pending"
    }

    return NextResponse.json(submission)
  } catch (error) {
    console.error("Failed to create submission:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}