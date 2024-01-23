import { currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"
// import { utapi } from "@/lib/utapi"

const firstLogin = async () => {
    const userClerk = await currentUser()
    const user = await prisma.user.findUnique({
        where: {
            id: userClerk?.id
        }
    })

    if (user !== null) {
        redirect(`/profile/${user?.id}`)
    }

    const createUser = async (formData: FormData) => {
        "use server"
        // const avatar = formData.get('avatar') as File
        // const res = await utapi.uploadFiles(avatar)
        const data = {
            id: formData.get('id') as string,
            email: formData.get('email') as string,
            avatarUrl: formData.get('avatarUrl') as string,
            name: formData.get('name') as string,
            gender: formData.get('genre') as string,
            location: formData.get('location') as string,
            birthDate: formData.get('bio') as string,
            bio: formData.get('bio') as string,
        }
        await prisma.user.create({
            data
        })
        revalidatePath('/firstLogin')
        redirect(`/profile/${userClerk?.id}`)
    }
    return (
        <div className="mt-12 mx-auto w-1/3">
            <h1 className="text-center text-3xl font-bold">Complete your profile</h1>
            <form action={createUser} className="my-4 grid grid-cols-[max-content_1fr] items-center gap-4 text-sm text-secondary-content">
                <input type="text" name="id" value={userClerk?.id as string} readOnly hidden />
                <input type="text" name="email" value={userClerk?.emailAddresses[0].emailAddress as string} readOnly hidden />
                <input type="text" name="avatarUrl" value={userClerk?.imageUrl as string} readOnly hidden />
                {/* <label htmlFor="avatar">Avatar</label> */}
                {/* <input id="avatar" type="file" name="avatar" className="file-input file-input-bordered file-input-secondary file-input-sm" /> */}
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" className="input input-secondary input-sm" />
                <label htmlFor="bio">Bio</label>
                <textarea id="bio" name="name" className="textarea textarea-bordered textarea-secondary" />
                <label htmlFor="birthday">Birthday</label>
                <input id="birthday" type="date" name="birthDate" className="input input-secondary input-sm" />
                <label htmlFor="location">Location</label>
                <input id="location" type="text" name="location" className="input input-secondary input-sm" />
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" className="input input-secondary input-sm">
                    <option value="" hidden></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <button type="submit" className={`mx-auto col-span-2 btn btn-primary btn-sm btn-wide`}>Submit</button>
            </form>
        </div>
    )
}

export default firstLogin