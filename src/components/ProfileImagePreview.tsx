import Image from "next/image"

const ProfileImagePreview = (props: { url: string, zoom: number }) => {
    if (!props.url) {
        return (
            <div className="w-full text-center">
                No profile image
            </div>
        )
    }

    return (
        <Image src={props.url} alt="Profile Image Preview" fill={true} style={{ objectFit: "contain", transform: `scale(${props.zoom})` }} />
    )
}

export default ProfileImagePreview