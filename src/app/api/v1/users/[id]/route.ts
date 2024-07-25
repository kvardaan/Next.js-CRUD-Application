import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/v1/users/:id - gets a user with ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const id = Number(params.id)
	try {
		const blog = await prisma?.user.findUnique({
			where: { id: id },
			include: { profile: true },
		})

		if (!blog) {
			return new NextResponse(JSON.stringify({ message: 'User not found!' }), { status: 404 })
		}

		return new NextResponse(JSON.stringify(blog), { status: 200 })
	} catch (error) {
		console.error('Error fetching blog:', error)
		return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
			status: 500,
		})
	}
}

// PATCH /api/v1/users/:id - edits a user info
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
	const userId = Number(params.id)
	const userData = await request.json()

	try {
		const response = await prisma?.user.updateMany({
			where: { id: userId },
			data: userData,
		})

		if (response?.count === 0) {
			return new NextResponse(JSON.stringify({ message: 'User not found!' }), {
				status: 404,
			})
		}

		return new NextResponse(JSON.stringify({ message: 'User edited successfully!' }))
	} catch (error) {
		console.error('Error editing User:', error)
		return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
	}
}

// DELETE /api/v1/users/:id - removes a user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const userId = Number(params.id)

	// Input Validation
	if (isNaN(userId) || userId <= 0) {
		return new NextResponse(JSON.stringify({ message: 'Invalid user ID provided!' }), {
			status: 400,
		})
	}

	try {
		// Check if the user exists
		const user = await prisma?.user.findUnique({
			where: { id: userId },
		})

		if (!user) {
			return new NextResponse(JSON.stringify({ message: 'User not found!' }), { status: 404 })
		}

		const response = await deleteUserAndRelatedData(userId)

		return new NextResponse(JSON.stringify({ message: 'User deleted successfully!' }), {
			status: 200,
		})
	} catch (error) {
		console.error('Error deleting user:', error)
		return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
	}
}

async function deleteUserAndRelatedData(userId: number) {
	const deletePosts = prisma?.post.deleteMany({
		where: { authorId: userId },
	})

	const deleteProfile = prisma?.profile.delete({
		where: { userId },
	})

	const deleteUser = prisma?.user.delete({
		where: { id: userId },
	})

	return await prisma?.$transaction([deletePosts, deleteProfile, deleteUser])
}
