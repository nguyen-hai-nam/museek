import { revalidatePath } from "next/cache"

import SearchResultCard from "@/components/SearchResultCard"
import Status from "@/components/Status"
import { prisma } from "@/lib/prisma"

const perPage = 20
let currentPage = 1
let searchString = ""
let roleIdFilter: string | undefined = undefined

const Seek = async () => {
    const results = await prisma.user.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: {
            OR: [
                {
                    name: {
                        contains: searchString
                    }
                },
                {
                    bio: {
                        contains: searchString
                    }
                }
            ],
            roles: {
                some: {
                    roleId: roleIdFilter
                },
            }
        },
        include: {
            roles: {
                include: {
                    role: true
                }
            }
        }
    })
    const count = results.length
    const totalPages = Math.ceil(count / perPage)
    const roles = await prisma.role.findMany()

    const handleSearchStringChange = async (data: FormData) => {
        "use server"
        const newSearchString = data.get("searchString")
        searchString = newSearchString as string
        revalidatePath('/seek')
    }

    const handleRoleFilterChange = async (data: FormData) => {
        "use server"
        const newRoleIdFilter = data.get("roleIdFilter")
        roleIdFilter = newRoleIdFilter !== "" ? newRoleIdFilter as string : undefined
        revalidatePath('/seek')
    }

    const handlePagechange = async (data: FormData) => {
        "use server"
        const page = data.get("page")
        currentPage = Number(page)
        revalidatePath('/seek')
    }

    return (
        <main className="mx-auto h-full w-full grid grid-cols-9">
            <div className="col-span-2 mx-auto mt-8 w-1/2 min-w-max">
                <div className="px-4 py-2 bg-base-200 w-full min-w-max rounded-box">
                    <h1 className="mx-auto text-lg font-semibold">Roles</h1>
                    <ul className="menu">
                        <li>
                            <a className={`${!roleIdFilter && "btn-disabled bg-secondary"}`}>
                                <form action={handleRoleFilterChange}>
                                    <input type="text" name="roleIdFilter" value={""} readOnly hidden />
                                    <button type="submit">All roles</button>
                                </form>
                            </a>
                        </li>
                        {roles.map((role) => (
                            <li key={role.id}>
                                <a className={`${role.id === roleIdFilter ? "btn-disabled bg-secondary" : ""}`}>
                                    <form action={handleRoleFilterChange}>
                                        <input type="text" name="roleIdFilter" value={role.id} readOnly hidden />
                                        <button type="submit" disabled={role.id === roleIdFilter}>{role.name}</button>
                                    </form>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-start-3 col-end-9 min-w-fit flex flex-col justify-start items-center">
                <div className="my-4 w-min">
                    <Status />
                </div>
                <form action={handleSearchStringChange} className="w-full">
                    <input type="text" name="searchString" placeholder="Aa" className="input input-bordered w-full" />
                </form>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6">
                    {results.length > 0 ? results.map((data) => (
                        <SearchResultCard
                            key={data.id}
                            id={data.id}
                            avatarUrl={data.avatarUrl ? data.avatarUrl : "/vercel.svg"}
                            name={data.name}
                            bio={data.bio || ""}
                            roles={data.roles.map((item: any) => item.role.name)}
                        />
                    )) : (
                        <div className=" col-span-full">
                            <h1 className="text-lg font-semibold text-center">No results found</h1>
                        </div>
                    )}
                </div>
                {totalPages === 1 ? (
                    <button className="my-8 btn btn-disabled">1</button>
                ) : (
                    <div className="my-8 join">
                        {Array.from(new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages])).filter(page => page >= 1 && page <= totalPages).sort((a, b) => a - b).map((page) => (
                            <form key={page} action={handlePagechange} className={`join-item btn ${page === currentPage ? " btn-disabled" : "btn - primary"}`}>
                                <input type="number" name="page" value={page} readOnly hidden />
                                <button>{page}</button>
                            </form>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

export default Seek