import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
	// Create users
	const user1 = await prisma?.user.create({
		data: {
			email: 'alice@example.com',
			password: await bcrypt.hash('alice', 10),
			name: 'Alice',
			profile: {
				create: {
					bio: 'Software developer and tech enthusiast.',
				},
			},
			posts: {
				create: [
					{
						title: 'First Post',
						content: 'This is the content of the first post.',
						published: true,
					},
					{
						title: 'Second Post',
						content: 'This is the content of the second post.',
						published: false,
					},
				],
			},
		},
	})

	const user2 = await prisma?.user.create({
		data: {
			email: 'bob@example.com',
			password: await bcrypt.hash('bob', 10),
			name: 'Bob',
			profile: {
				create: {
					bio: 'Lover of coffee and good books.',
				},
			},
			posts: {
				create: [
					{
						title: 'Hello World',
						content: 'This is my first post on this platform.',
						published: true,
					},
				],
			},
		},
	})

	console.log({ user1, user2 })
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma?.$disconnect()
	})
