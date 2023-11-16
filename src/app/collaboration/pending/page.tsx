import Image from 'next/image'

const data = [
    {
        id: 1,
        name: "Harley Benton",
        location: "Ha Noi, Vietnam",
        avatar: "/vercel.svg",
        roles: ["Guitarist", "Singer", "Songwriter", "Composer", "Arranger"],
        invitationMessage: "Hi there, I would like to add you as a collaborator to my project.",
        status: "accepted"
    },
    {
        id: 2,
        name: "Olivia Rodrigo",
        location: "TPHCM, Vietnam",
        avatar: "/vercel.svg",
        roles: ["Sound Engineer", "Producer"],
        invitationMessage: "Good day, I would like to invite you as a collaborator to my project. We can discuss more details later.",
        status: "pending"
    },
    {
        id: 2,
        name: "Olivia Rodrigo",
        location: "TPHCM, Vietnam",
        avatar: "/vercel.svg",
        roles: ["Sound Engineer", "Producer"],
        invitationMessage: "Good day, I would like to invite you as a collaborator to my project. We can discuss more details later.",
        status: "rejected"
    }
]

export default function PendingCollaboration() {
    return (
        <main className="mx-auto w-full overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Roles</th>
                        <th className='text-center'>Invitation Message</th>
                        <th className='text-center'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <div className="flex items-center gap-4">
                                    <div className="hidden lg:block avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <Image
                                                width={48}
                                                height={48}
                                                src={user.avatar}
                                                alt="Profile Picture"
                                            /> </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.name}</div>
                                        <div className="text-sm opacity-50">{user.location}</div>
                                    </div>
                                </div>  
                            </td>
                            <td>
                                <div className='flex flex-wrap gap-1'>
                                    {user.roles.map((role, index) => (
                                        <div key={index} className="badge badge-outline w-max font-semibold border-2">{role}</div>
                                    ))}
                                </div>
                            </td>
                            <td>{user.invitationMessage}</td>
                            <td>
                                <div className='mx-auto w-min'>
                                    {user.status === 'accepted' && <div className="badge badge-outline badge-success font-semibold border-2">Accepted</div>}
                                    {user.status === 'pending' && <div className="badge badge-outline badge-info font-semibold border-2">Pending</div>}
                                    {user.status === 'rejected' && <div className="badge badge-outline badge-error font-semibold border-2">Rejected</div>}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}