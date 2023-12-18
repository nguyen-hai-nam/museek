"use client"

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

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
    const [profile, setProfile] = useState({
        id: '',
        name: '',
        gender: '',
        birthDate: '',
        phoneNumber: '',
        email: '',
        location: '',
        bio: '',
    })

    useEffect(() => {
        const fetchUser = async () => {
            if (user) {
                setProfile(p => {
                    return {...p, id: user.id, email: user.emailAddresses[0]?.emailAddress, phoneNumber: user.phoneNumbers[0]?.phoneNumber}
                })
            }
        }
        fetchUser()
    }, [user])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setProfile({
            ...profile,
            [name]: value
        })
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()
        const processedProfile = preprocessProfile(profile)
        try {
            await axios.post('/api/users', {...processedProfile})
            setToast({
                show: true,
                message: 'Profile created',
                type: 'success'
            })
            router.push(`/profile/${profile.id}`)
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
        const processedProfile = Object.fromEntries(
            Object.entries(profile).filter(([, value]) => value)
        )
        processedProfile.birthDate = new Date(processedProfile.birthDate as string).toISOString()
        return processedProfile
    }

    return (
        <main className="mx-auto pt-8 w-1/2">
            <h1 className='my-6 text-2xl font-bold text-center'>Let&apos;s complete your profile ^^</h1>
            <form className='w-full' onSubmit={onSubmit}>
                <section className='grid grid-cols-2 gap-4'>
                    <input type="text" name='name' value={profile.name} onChange={handleChange} placeholder="Name" className="text-sm input input-bordered input-primary w-full" required/>
                    <select name='gender' value={profile.gender} onChange={handleChange} className="select select-primary w-full">
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                    </select>
                    <input type="date" name='birthDate' value={profile.birthDate} onChange={handleChange} placeholder="Birthday" className="text-sm input input-bordered input-primary w-full" />
                    <select defaultValue='default' className="select select-primary w-full">
                        <option value='default' disabled>Location</option>
                        <option value='hanoi'>Ha Noi</option>
                        <option value='saigon'>Sai Gon</option>
                    </select>
                    <textarea name='bio' value={profile.bio} onChange={handleChange} className="col-span-2 textarea textarea-primary w-full" placeholder="Bio"></textarea>
                    <select className="select select-primary w-full">
                        <option disabled>Roles</option>
                        <option>Singer</option>
                        <option>Producer</option>
                        <option>Composer</option>
                        <option>Pianist</option>
                        <option>Guitarist</option>
                        <option>Bassist</option>
                        <option>Drummer</option>
                    </select>
                    <div className='flex justify-start items-center flex-wrap gap-1'>
                        <span className='badge badge-outline font-semibold border-2'>Guitarrist</span>
                        <span className='badge badge-outline font-semibold border-2'>Bassist</span>
                        <span className='badge badge-outline font-semibold border-2'>Composer</span>
                    </div>
                </section>
                
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