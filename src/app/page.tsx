import SearchResultCard from "@/components/SearchResultCard"
import SearchBox from "@/components/SearchBox"

const mockData = Array.from({ length: 20 }, (_, i) => ({
    name: `User ${i + 1}`,
    bio: `This is a bio for User ${i + 1}.`,
    roles: ["Role 1", "Role 2"]
}))

export default function Seek() {
    return (
        <main className="mx-auto w-4/5">
            <div className="flex flex-col justify-center items-center">
                <SearchBox />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6">
                    {mockData.map((data, index) => (
                        <SearchResultCard 
                            key={index}
                            name={data.name}
                            bio={data.bio}
                            roles={data.roles}
                        />
                    ))}
                </div>
                <div className="my-8 join">
                    <button className="join-item btn">1</button>
                    <button className="join-item btn">2</button>
                    <button className="join-item btn btn-disabled">...</button>
                    <button className="join-item btn">99</button>
                    <button className="join-item btn">100</button>
                </div>
            </div>
        </main>
    )
}
