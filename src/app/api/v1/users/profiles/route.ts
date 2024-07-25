import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/v1/users/profiles
export async function POST(request: NextRequest) {
	const profileData = await request.json()

	try {
		const response = await prisma?.profile.create({ data: profileData })

		if (!response) {
			return new NextResponse(JSON.stringify({ message: 'Error adding profile!' }), { status: 400 })
		}

		return new NextResponse(JSON.stringify({ message: 'Profile added successfully!' }), {
			status: 200,
		})
	} catch (error) {
		console.error(`Server Error: ${error}`)
		return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
	}
}

// PATCH /api/v1/users/profiles
export async function PATCH(request: NextRequest) {
	const profileData = await request.json()

	try {
		const response = await prisma?.profile.updateMany({
			where: { userId: profileData.userId },
			data: { bio: profileData.bio },
		})

		if (!response) {
			return new NextResponse(JSON.stringify({ message: 'Error editing profile!' }), {
				status: 400,
			})
		}

		return new NextResponse(JSON.stringify({ message: 'Profile edited successfully!' }), {
			status: 200,
		})
	} catch (error) {
		console.error(`Server Error: ${error}`)
		return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
	}
}
