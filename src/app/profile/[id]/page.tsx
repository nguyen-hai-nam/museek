"use client"

import Image from 'next/image'

const profile = {
    name: 'Nguyen Hai Nam',
    gender: 'male',
    birthday: new Date(),
    phoneNumber: '0123456789',
    email: 'museek@gmail.com',
    location: 'Ha Noi, Viet Nam',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    roles: ['Vocalist', 'Guitarist', 'Bassist', 'Drummer', 'Producer', 'DJ']
}

export default function Profile({ params }: { params: { id: string } }) {
    return (
        <main className="mx-auto pt-8 w-3/5">
            <div className='flex justify-between'>
                <div className="w-1/6 avatar cursor-pointer">
                    <div className="w-full rounded-full">
                        <Image src="/vercel.svg" width={256} height={256} alt='Profile Picture' />
                    </div>
                </div>
                <div className='w-3/4 max-w-full'>
                    <div className='flex items-center justify-between'>
                        <span className='text-xl font-semibold'>{profile.name}</span>
                        <button className='btn btn-sm'>Edit profile</button>
                    </div>
                    <div className='mt-4 xl:w-4/5 grid grid-cols-2'>
                        <p className='font-semibold'>Phone: {profile.phoneNumber}</p>
                        <p className='font-semibold'>Email: {profile.email}</p>
                        <p className='font-semibold'>Location: Hanoi</p>
                        <p className='font-semibold'>Gender: {profile.gender === 'male' ? 'Male' : 'Female'}</p>
                        <p className='font-semibold'>Birthday: {profile.birthday.toDateString()}</p>
                    </div>
                    <div className='mt-4 xl:w-4/5 flex flex-wrap gap-2'>
                        {profile.roles.map((role, index) => (
                            <div key={index} className='badge badge-outline font-semibold border-2'>{role}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-12 mx-auto h-0 w-3/5 divider"></div>
            <div className='mx-auto w-2/3'>
                <p className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="mx-auto h-0 w-3/5 divider"></div>
        </main>
    )
}