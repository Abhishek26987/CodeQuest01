import { Octokit } from "@octokit/rest"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

export async function createPullRequest(options: {
  owner: string
  repo: string
  title: string
  body: string
  head: string
  base: string
}) {
  try {
    const response = await octokit.pulls.create({
      ...options,
      maintainer_can_modify: true
    })
    
    return {
      url: response.data.html_url,
      number: response.data.number
    }
  } catch (error) {
    console.error("Failed to create pull request:", error)
    throw error
  }
}

export async function getPullRequest(options: {
  owner: string
  repo: string
  pull_number: number
}) {
  try {
    const response = await octokit.pulls.get(options)
    return response.data
  } catch (error) {
    console.error("Failed to fetch pull request:", error)
    throw error
  }
}

export async function listPullRequests(options: {
  owner: string
  repo: string
  state?: "open" | "closed" | "all"
}) {
  try {
    const response = await octokit.pulls.list({
      ...options,
      per_page: 100
    })
    return response.data
  } catch (error) {
    console.error("Failed to list pull requests:", error)
    throw error
  }
}