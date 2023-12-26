import { prisma } from "@/lib/prisma"
import { PAGE_SIZE } from "@/utils/constants"

export async function searchUsers(searchString: string | null, page: number | null) {
    const pageNumber = page ? page : 1
    const skip = (pageNumber - 1) * PAGE_SIZE
    const take = PAGE_SIZE

    if (!searchString) {
        const totalUsers = await prisma.user.count()
        const users = await prisma.user.findMany({
            skip,
            take,
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        })
        return {
            count: totalUsers,
            page: pageNumber,
            totalPages: Math.ceil(totalUsers / PAGE_SIZE),
            data: users,
        }
    }

    const totalUsersWithNameOrRole = await prisma.user.count({
        where: {
            OR: [
                {
                    name: {
                        contains: searchString
                    },
                },
                {
                    location: {
                        contains: searchString
                    }
                },
                {
                    roles: {
                        some: {
                            role: {
                                name: {
                                    contains: searchString
                                }
                            }
                        }
                    }
                }
            ]
        }
    })

    const usersWithNameOrRole = await prisma.user.findMany({
        skip,
        take: PAGE_SIZE,
        where: {
            OR: [
                {
                    name: {
                        contains: searchString
                    },
                },
                {
                    location: {
                        contains: searchString
                    }
                },
                {
                    roles: {
                        some: {
                            role: {
                                name: {
                                    contains: searchString
                                }
                            }
                        }
                    }
                }
            ]
        },
        include: {
            roles: {
                include: {
                    role: true
                }
            }
        }
    })

    return {
        count: totalUsersWithNameOrRole,
        page: pageNumber,
        totalPages: Math.ceil(totalUsersWithNameOrRole / PAGE_SIZE),
        data: usersWithNameOrRole
    }
}