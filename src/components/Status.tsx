"use client"

import axios from "axios"
import { FaUserAlt } from "react-icons/fa"
import { MdArrowUpward } from "react-icons/md"
import { IoMdGitNetwork } from "react-icons/io"

import { useEffect, useState } from "react"

const Status = () => {
    const [artistCount, setArtistCount] = useState<number>(0)
    const [newArtistCount, setNewArtistCount] = useState<number>(0)
    const [collaborationCount, setCollaborationCount] = useState<number>(0)

    useEffect(() => {
        const countArtists = async () => {
            const { data } = await axios.get("/api/users/count")
            if (data.count) setArtistCount(data.count)
        }
        const countCollaboration = async () => {
            const { data } = await axios.get("/api/collaborations/count")
            if (data.count) setCollaborationCount(data.count)
        }
        const countNewArtists = async () => {
            const { data } = await axios.get("/api/users/count?new=true")
            if (data.count) setNewArtistCount(data.count)
        }
        countArtists()
        countCollaboration()
        countNewArtists()
    }, [])

    return (
        <div className="stats w-full">
            
            <div className="stat">
                <div className="stat-figure text-secondary text-4xl">
                    <MdArrowUpward />    
                </div>
                <div className="stat-title">New Users</div>
                <div className="stat-value">{newArtistCount}</div>
                <div className="stat-desc">of this month</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary text-2xl">
                    <FaUserAlt />
                </div>
                <div className="stat-title">Users</div>
                <div className="stat-value">{artistCount}</div>
                <div className="stat-desc">of all time</div>
            </div>
            
            <div className="stat">
                <div className="stat-figure text-secondary text-3xl">
                    <IoMdGitNetwork />
                </div>
                <div className="stat-title">Collaborations</div>
                <div className="stat-value">{collaborationCount}</div>
                <div className="stat-desc">of all time</div>
            </div>       

        </div>
    )
}

export default Status