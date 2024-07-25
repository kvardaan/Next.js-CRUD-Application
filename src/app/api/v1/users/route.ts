import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/v1/users - get all the users
export async function GET() {
	const users = await prisma?.user.findMany({
		include: { profile: true },
	})
	return new NextResponse(JSON.stringify(users))
}

// POST /api/v1/users
export async function POST(request: NextRequest) {
	const userData = await request.json()
	const hashedPassword = await bcrypt.hash(userData.password, 10)

	try {
		const createRequest: Prisma.UserCreateInput = {
			email: userData.email,
			password: hashedPassword,
			name: userData.name,
			profile: userData.bio
				? {
						create: {
							bio: userData?.bio,
						},
				  }
				: undefined,
		}
		const response = await prisma?.user.create({ data: createRequest })

		if (!response) {
			return new NextResponse(JSON.stringify({ message: 'Error adding user!' }), { status: 400 })
		}

		return new NextResponse(JSON.stringify({ message: 'User added successfully!' }), {
			status: 200,
		})
	} catch (error) {
		console.error(`Server Error: ${error}`)
		return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
	}
}
