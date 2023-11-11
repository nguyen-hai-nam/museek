import SearchResultCard from "@/components/SearchResultCard"
import SearchBox from "@/components/SearchBox"

const mockData = Array.from({ length: 20 }, (_, i) => ({
    name: `User ${i + 1}`,
    bio: `This is a bio for User ${i + 1}.`,
    roles: ["Role 1", "Role 2"]
}))

export default function Home() {
    return (
        <main className="pt-8">
            <div className="mx-auto w-3/5 flex flex-col justify-center items-center gap-12">
                <SearchBox />
                <div className="grid grid-cols-3 gap-4">
                    {mockData.map((data, index) => (
                        <SearchResultCard 
                            key={index}
                            name={data.name}
                            bio={data.bio}
                            roles={data.roles}
                        />
                    ))}
                </div>
            </div>
        </main>
    )
}
