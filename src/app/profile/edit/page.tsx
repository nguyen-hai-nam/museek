import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs'

import { prisma } from '@/lib/prisma'
import { utapi } from '@/lib/utapi'

const ProfileEditor = async () => {
    const userClerk = await currentUser()
    if (!userClerk) {
        redirect('/firstLogin')
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userClerk.id
        }
    })
    if (!user) {
        redirect('/firstLogin')
    }

    const updateUser = async (formData: FormData) => {
        "use server"
        const avatar = formData.has('avatar') ? formData.get('avatar') : null
        let avatarUrl: string | undefined = undefined
        let key: string | undefined = undefined
        try {
            const res = await utapi.uploadFiles(avatar as File)
            if (res.error) {
                redirect(`/profile/${userClerk.id}`)
            }
            key = res.data.key
            avatarUrl = res.data.url
        } catch (error) {}

        try {
            const data = {
                avatarUrl,
                name: formData.get('name') as string,
                gender: formData.get('genre') as string,
                location: formData.get('location') as string,
                birthDate: formData.get('birthDate') as string + 'T00:00:00.000Z',
                bio: formData.get('bio') as string,
            }
            await prisma.user.update({
                where: {
                    id: userClerk.id
                },
                data
            })
        } catch (error) {
            if (key) {
                await utapi.deleteFiles(key)
            }
        } finally {
            redirect(`/profile/${userClerk.id}`)
        }
    }

    return (
        <main className="mx-auto mt-12 w-1/3">
            <h1 className="text-center text-3xl font-bold">Edit your profile</h1>
            <form action={updateUser} className="w-full">
                <section className="mt-8 my-4 w-full grid grid-cols-[max-content_1fr] text-sm items-center gap-6 text-secondary-content">
                    <label htmlFor='avatar'>Avatar</label>
                    <input id="avatar" type="file" name='avatar' className="file-input file-input-bordered file-input-secondary file-input-sm w-full" />
                    <label htmlFor='name'>Name</label>
                    <input id="name" type="text" name='name' defaultValue={user.name} className="input input-bordered input-secondary input-sm w-full"/>
                    <label htmlFor='gender'>Gender</label>
                    <select id="gender" name='gender' className="select select-secondary select-sm w-full">
                        <option value="" disabled>Select your gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                    </select>
                    <label htmlFor='birthDate'>Birthday</label>
                    <input id="birthDate" type="date" name='birthDate' defaultValue={user.birthDate ? user.birthDate.toISOString().slice(0, 10) : undefined} className="input input-bordered input-secondary input-sm w-full" />
                    <label htmlFor='location'>Location</label>
                    <select id="location" name="location" defaultValue={user.location || ""} className="select select-secondary select-sm w-full">
                        <option value="" disabled>Select your location</option>
                        <option value='Ha Noi'>Ha Noi</option>
                        <option value='Sai Gon'>Sai Gon</option>
                    </select>
                    <label htmlFor='bio'>Bio</label>
                    <textarea id='bio' name='bio' defaultValue={user.bio || undefined} rows={5} className="textarea textarea-secondary w-full" placeholder="Bio"></textarea>
                </section>
                <div className="my-8 mx-auto h-0 w-full divider"></div>
                <h1 className='my-6 text-lg font-semibold'>Warning Zone</h1>
                <section className='grid grid-cols-[max-content_1fr] gap-x-8 gap-y-6 items-center'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type="text" name="email" defaultValue={user.email} disabled className="input input-bordered input-warning input-sm w-full" />
                    <label htmlFor='phoneNumber'>Phone</label>
                    <input id='phoneNumber' type="text" name='phoneNumber' defaultValue={user.phoneNumber || undefined} disabled className="input input-bordered input-warning input-sm w-full" />
                    {userClerk?.passwordEnabled && <input type="text" placeholder="Password" className="input input-bordered input-warning input-sm w-full" />}
                    {userClerk?.passwordEnabled && <input type="text" placeholder="Confirm password" className="input input-bordered input-warning input-sm w-full" />}
                </section>
                <div className="my-16 mx-auto h-0 w-full divider"></div>
                <section className='my-16 flex justify-center'>
                    <button type="submit" className="px-8 btn btn-primary">Submit</button>
                </section>
            </form>
        </main>
    )
}

export default ProfileEditor