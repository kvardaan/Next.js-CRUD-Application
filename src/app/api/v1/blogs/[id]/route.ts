import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/v1/blogs/:id - gets the blog with an id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const id = Number(params.id)
	try {
		const blog = await prisma?.post.findMany({
			where: { id },
		})

		if (!blog) {
			return new NextResponse(JSON.stringify({ message: 'Blog not found!' }), { status: 404 })
		}

		return new NextResponse(JSON.stringify(blog), { status: 200 })
	} catch (error) {
		console.error('Error fetching blog:', error)
		return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
	}
}

// PATCH /api/v1/blogs/:id - edits a blog for a user
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
	const postId = Number(params.id)
	const blogData = await request.json()

	try {
		const response = await prisma?.post.updateMany({
			where: { id: postId },
			data: blogData,
		})

		if (response?.count === 0) {
			return new NextResponse(JSON.stringify({ message: 'Blog not found!' }), {
				status: 404,
			})
		}

		return new NextResponse(JSON.stringify({ message: 'Blog edited successfully!' }))
	} catch (error) {
		console.error('Error editing blog:', error)
		return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
	}
}

// DELETE /api/v1/blogs/:id - removes a blog of a user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const postId = Number(params.id)
	try {
		const response = await prisma?.post.deleteMany({
			where: { id: postId },
		})

		if (response?.count === 0) {
			return new NextResponse(JSON.stringify({ message: 'Blog not found!' }), {
				status: 404,
			})
		}

		return new NextResponse(JSON.stringify({ message: 'Blog deleted successfully!' }), {
			status: 200,
		})
	} catch (error) {
		console.error('Error fetching blog:', error)
		return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
	}
}
