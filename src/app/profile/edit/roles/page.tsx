"use client"
import { useEffect, useRef, useState } from "react"
import { Role } from "@prisma/client"
import { useRouter } from 'next/navigation'
import { TiDeleteOutline } from "react-icons/ti"
import axios from "axios"

import { useStore } from "@/lib/zustand"

const RoleSelect = () => {
    const router = useRouter()
    const { user } = useStore()
    const [roleOptions, setRoleOptions] = useState<Role[]>([])
    const [initialRoles, setInitialRoles] = useState<Role[]>([])
    const [error, setError] = useState<string>("")
    const selectRef = useRef<HTMLSelectElement>(null)


    useEffect(() => {
        const fetchRoleOptions = async () => {
            try {
                const res = await axios.get("/api/roles")
                setRoleOptions(res.data.roles)
            } catch (error) {
                setRoleOptions([])
            }
        }
        const fetchInitialRoles = async () => {
            try {
                const res = await axios.get(`/api/roles?query={"where":{"userRoles":{"some":{"userId":"${user?.id}"}}}}`)
                setInitialRoles(res.data.roles)
            } catch (error) {
                setInitialRoles([])
            }
        }
        fetchRoleOptions()
        fetchInitialRoles()
    }, [user])

    const addRole = (e: any) => {
        const existingRole = initialRoles.find((role: any) => role.id === e.target.value)
        if (!existingRole) {
            const roleToAdd = roleOptions.find((role: any) => role.id === e.target.value)
            setInitialRoles((prev: any) => [...prev, roleToAdd])
        }
        if (selectRef.current) {
            selectRef.current.value = ""
        }
    }

    const removeRole = (roleId: string) => {
        const newRoles = initialRoles.filter((item: any) => item.id !== roleId)
        setInitialRoles(newRoles)
    }

    const submit = async (e: any) => {
        e.preventDefault()
        if (!user) {
            return
        }
        try {
            await axios.put(`/api/users/${user.id}`, { roles: initialRoles })
            router.push(`/profile/${user.id}`)
        } catch (error) {
            setError("Fail to update roles")
        }
    }

    if (!roleOptions.length) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }


    return (
        <form className="mt-12 mx-auto w-1/2 lg:w-1/3 flex flex-col gap-2" onSubmit={submit}>
            <h1 className="text-center font-bold text-3xl">Manage your roles</h1>
            <p className="my-4 mx-auto w-4/5 text-center">You might be found by the right person by specifying your professional roles in music industry</p>
            <select ref={selectRef} className="mt-4 mb-4 select select-bordered select-sm select-secondary w-full" onChange={addRole}>
                <option value="">Select a role</option>
                {roleOptions.map((role: any) => {
                    return (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    )
                })}
            </select>
            <div className="flex flex-wrap gap-2">
                {initialRoles.length && initialRoles.map((role: any) => {
                    return (
                        <div key={role.id} className="badge badge-lg badge-outline badge-neutral flex justify-start items-center gap-1">
                            {role.name}
                            <button onClick={() => removeRole(role.id)}>
                                <TiDeleteOutline className="text-xl" />
                            </button>
                        </div>
                    )
                })}
            </div>
            {error && <div className="mt-4 text-red-500 text-sm text-center">{error}</div> }
            <button type="submit" className="my-4 mx-auto btn btn-primary w-1/3">Submit</button>
        </form>
    )
}

export default RoleSelect