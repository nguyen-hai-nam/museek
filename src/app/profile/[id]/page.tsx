"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"

import { User } from "@/schemas/users"

export default function Profile({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [profile, setProfile] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async (id: string) => {
            if (!id) {
                setProfile(null)
            }
            const res = await axios.get(`/api/users/${id}`)
            if (!res.data.user) {
                router.push("/profile/create")
            }
            setProfile(res.data.user)
        }
        fetchUser(params.id)
    }, [params.id, router])

    if (!profile) {
        return <div>Loading...</div>
    }

    return (
        <main className="mx-auto pt-8 w-3/5">
            <div className="flex justify-between gap-12">
                <div className="min-w-max avatar cursor-pointer rounded-full overflow-hidden">
                    <div className="w-12 md:w-24 lg:w-36 xl:w-48 rounded-full">
                        <Image
                            src="/vercel.svg"
                            width={192}
                            height={192}
                            alt="Profile Picture"
                        />
                    </div>
                </div>
                <div className="w-3/4 max-w-full">
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold">{profile.name}</span>
                        <Link href="/profile/edit">
                            <button className="btn btn-sm">Edit profile</button>
                        </Link>
                    </div>
                    <div className="mt-4 xl:w-4/5 grid grid-cols-2">
                        <p className="font-semibold">Phone: {profile.phoneNumber}</p>
                        <p className="font-semibold">Email: {profile.email}</p>
                        <p className="font-semibold">Location: {profile.location}</p>
                        <p className="font-semibold">Gender: {profile.gender}</p>
                        <p className="font-semibold">Birthday: {(new Date(profile.birthDate as string)).toLocaleDateString("vi-VN")}</p>
                    </div>
                    <div className="mt-4 xl:w-4/5 flex flex-wrap gap-2">
                        {profile.roles?.map((role, index) => (
                            <div key={index} className='badge badge-outline font-semibold border-2'>{role.role.name}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-12 mx-auto h-0 w-3/5 divider"></div>
            <div className="mx-auto w-2/3">
                <p className="text-center">{profile.bio}</p>
            </div>
            <div className="mx-auto h-0 w-3/5 divider"></div>
        </main>
    )
}
