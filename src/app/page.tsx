"use client"

import { useEffect, useRef, useState } from "react"
import axios from "axios"

import SearchResultCard from "@/components/SearchResultCard"
import SearchBox from "@/components/SearchBox"

export default function Seek() {
    const firstUpdate = useRef(true)
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
    const [searchString, setSearchString] = useState<string>("")
    const [searchResult, setSearchResult] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    useEffect(() => {
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(setTimeout(async () => {
            const { data } = await axios.get(`api/search?query=${searchString}&page=1`)
            setSearchResult(data.data)
            setTotalPages(data.totalPages)
            setCurrentPage(data.page)
        }, 500))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString])

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        }
        const searchByPage = async () => {
            const { data } = await axios.get(`api/search?query=${searchString}&page=${currentPage}`)
            setSearchResult(data.data)
            setTotalPages(data.totalPages)
            setCurrentPage(data.page)
        }
        searchByPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    const handleSearchStringChange = (searchString: string) => {
        setSearchString(searchString)
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    if (searchResult.length === 0) {
        return (
            <main className="mx-auto w-3/5 flex justify-center items-center">
                <span className="my-64 loading loading-infinity loading-lg scale-[2]"></span>
            </main>
        )
    }

    return (
        <main className="mx-auto w-3/5">
            <div className="flex flex-col justify-center items-center">
                <SearchBox handleSearchStringChange={handleSearchStringChange}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6">
                    {searchResult.map((data) => (
                        <SearchResultCard 
                            key={data.id}
                            id={data.id}
                            name={data.name}
                            bio={data.bio || ""}
                            roles={data.roles.map((item: any) => item.role.name)}
                        />
                    ))}
                </div>
                {totalPages === 1 ? (
                    <button className="my-8 btn btn-disabled">1</button>
                ) : (
                    <div className="my-8 join">
                        {Array.from(new Set([1, currentPage-1, currentPage, currentPage+1, totalPages])).filter(page => page >= 1 && page <= totalPages).sort((a, b) => a - b).map((page) => (
                            <button key={page} className={`join-item btn ${page === currentPage ? "btn-disabled" : ""}`} onClick={() => handlePageChange(page)}>{page}</button>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}