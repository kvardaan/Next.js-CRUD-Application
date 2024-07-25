import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/v1/blogs - get all blogs
export async function GET() {
	const posts = await prisma?.post.findMany()
	return new Response(JSON.stringify(posts))
}

// POST /api/v1/blogs
export async function POST(request: NextRequest) {
	const blogData = await request.json()

	try {
		const response = await prisma?.post.create({ data: blogData })

		if (!response) {
			return new NextResponse(JSON.stringify({ message: 'Error insering blog!' }), { status: 400 })
		}

		return new NextResponse(JSON.stringify({ message: 'Blog inserted successfully!' }), {
			status: 200,
		})
	} catch (error) {
		console.error(`Server Error: ${error}`)
		return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
	}
}
