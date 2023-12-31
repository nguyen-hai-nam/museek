"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'

import { User } from '@/schemas/users'

export default function Profile() {
    const router = useRouter()
    const { user } = useUser()
    const [toast, setToast] = useState<{
        show: boolean,
        message: string,
        type: 'error' | 'success'
    }>({
        show: false,
        message: '',
        type: 'success'
    })
    const [roleOptions, setRoleOptions] = useState<{id: string; name: string}[]>([])
    const [profile, setProfile] = useState<User | null>(null)

    useEffect(() => {
        const fetchRoles = async () => {
            const res = await axios.get('/api/roles')
            setRoleOptions(res.data.roles)
        }
        fetchRoles()
    }, [])

    useEffect(() => {
        if (!user) {
            return
        }
        const fetchUser = async (id: string) => {
            const res = await axios.get(`/api/users/${id}`)
            if (!res.data.user) {
                setToast({
                    show: true,
                    message: 'Something went wrong',
                    type: 'error'
                })
            }
            setProfile(res.data.user)
        }
        fetchUser(user.id)
    }, [user])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        if (profile) {
            setProfile({ ...profile, [name]: value })
        }
    }

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRole = roleOptions.find(role => role.id === event.target.value)
        if (!selectedRole || !profile) {
            return
        }
        const roleExists = profile.roles?.some(role => role.roleId === selectedRole.id)
        if (roleExists) {
            setToast({
                show: true,
                message: 'Role already exists',
                type: 'error'
            })
            setTimeout(() => {
                setToast(p => ({ ...p, show: false }))
            }, 3000)
            return
        }
        event.target.value = ''
        setProfile(p => {
            if (p && p.roles) {
                return { ...p, roles: [...p.roles, { roleId: selectedRole.id }] }
            }
            return p 
        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        if (!user) {
            return
        }
        const processedProfile = preprocessProfile(profile)
        try {
            await axios.put(`/api/users/${user.id}`, {...processedProfile})
            setToast({
                show: true,
                message: 'Profile edited',
                type: 'success'
            })
            router.push(`/profile/${user.id}`)
        } catch (err) {
            setToast({
                show: true,
                message: 'Something went wrong',
                type: 'error'
            })
            setTimeout(() => {
                setToast(p => ({ ...p, show: false }))
            }, 3000)
        }
    }

    const preprocessProfile = (profile: any) => {
        const nullFilter = (obj: { [key: string]: any }) => {
            return Object.fromEntries(
                Object.entries(obj).filter(([, value]) => value)
            )
        }

        const keyFilter = (obj: { [key: string]: any }, keys: string[]) => {
            return keys.reduce((result: { [key: string]: any }, key) => {
                if (obj.hasOwnProperty(key)) {
                    result[key] = obj[key]
                }
                return result
            }, {})
        }

        const keysToPick = ['name', 'gender', 'birthDate', 'location', 'bio']

        const processedProfile = keyFilter(nullFilter(profile), keysToPick)

        processedProfile.birthDate = new Date(processedProfile.birthDate as string).toISOString()

        processedProfile.roles = profile.roles.map((role: any) => ({id: role.roleId}))

        return processedProfile
    }

    if (!profile) {
        return <div>Loading...</div>
    }

    return (
        <main className="mx-auto pt-8 w-1/2">
            <form className='w-full' onSubmit={onSubmit}>
                <h1 className='my-6 text-lg font-semibold'>Personal Information</h1>
                <section className='grid grid-cols-2 gap-4'>
                    <input type="text" name='name' value={profile.name || ""} onChange={handleChange} placeholder="Name" className="text-sm input input-bordered input-primary w-full"/>
                    <select name='gender' value={profile.gender || ""} onChange={handleChange} className="select select-primary w-full">
                        <option value="" disabled>Select your gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                    </select>
                    <input type="date" name='birthDate' value={profile.birthDate?.split('T')[0] || ""} onChange={handleChange} placeholder="Birthday" className="text-sm input input-bordered input-primary w-full" />
                    <select name="location" value={profile.location || ""} onChange={handleChange} className="select select-primary w-full">
                        <option value="" disabled>Select your location</option>
                        <option value='hanoi'>Ha Noi</option>
                        <option value='saigon'>Sai Gon</option>
                    </select>
                    <textarea name='bio' value={profile.bio || ""} onChange={handleChange} className="col-span-2 textarea textarea-primary w-full" placeholder="Bio"></textarea>
                    <select onChange={handleRoleChange} className="select select-primary w-full">
                        <option value="" disabled >Add roles</option>
                        {roleOptions.map((role: any) => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                    <div className='flex justify-start items-center flex-wrap gap-1'>
                        {profile?.roles?.map((role: any) => {
                            const roleOption = roleOptions.find((option: any) => option.id === role.roleId)
                            if (!roleOption) {
                                return null
                            }
                            return (
                                <span key={role.roleId} className='badge badge-outline font-semibold border-2'>{roleOption.name}</span>
                            )
                        })}
                    </div>
                </section>
                <h1 className='my-6 text-lg font-semibold'>Warning Zone</h1>
                <section className='grid grid-cols-2 gap-4'>
                    <input type="text" name="email" value={profile.email || ""} onChange={handleChange} placeholder="Email" disabled className="text-sm input input-bordered input-warning w-full" />
                    <input type="text" name='phoneNumber' value={profile.phoneNumber || ""} onChange={handleChange} placeholder="Phone number" disabled className="text-sm input input-bordered input-warning w-full" />
                    {user?.passwordEnabled && <input type="text" placeholder="Password" className="text-sm input input-bordered input-warning w-full" />}
                    {user?.passwordEnabled && <input type="text" placeholder="Confirm password" className="text-sm input input-bordered input-warning w-full" />}
                </section>
                <div className="my-16 mx-auto h-0 w-full divider"></div>
                <section className='my-16 flex justify-center'>
                    <button type="submit" className="px-8 btn btn-primary">Submit</button>
                </section>
            </form>
            {toast.show && (
                <div className="toast toast-end">
                    <div className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </main>
    )
}