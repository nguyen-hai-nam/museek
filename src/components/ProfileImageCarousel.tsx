"use client"

import Image from "next/image"
const ProfileImageCarousel= (props: { profileImages: any }) => {
    if (!props.profileImages) {
        return (
            <div className="w-full text-center gap-4">
                No profile images
            </div>
        )
    }

    return (
        <div className="w-full grid grid-cols-3 overflow-x-auto gap-4">
            {props.profileImages.map((profileImage: any, index: number) => (
                <div key={index} className="w-full aspect-square flex justify-center items-center overflow-hidden bg-black">
                    <Image src={profileImage.url} alt="Profile Image" width={400} height={400} className="transition-opacity hover:opacity-75"/>
                </div>
            ))}      
        </div>
    )
}

export default ProfileImageCarousel