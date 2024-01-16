import axios from "axios"

import { useStore } from "@/lib/zustand"

// eslint-disable-next-line no-unused-vars
const RoleFilter = (props: { handleClick: (roleId: string) => void }) => {
    const { roleOptions, setRoleOptions } = useStore()

    const fetchRoles = async () => {
        const res = await axios.get('/api/roles')
        setRoleOptions(res.data.roles)
    }

    if (roleOptions.length === 0) {
        fetchRoles()
        return (
            <div className="px-4 py-2 bg-base-200 w-full rounded-box">
                <h1 className="mx-auto text-lg font-semibold">Roles</h1>
                <progress className="progress w-full"></progress>
            </div>
        )
    }

    return (
        <div className="px-4 py-2 bg-base-200 w-full min-w-max rounded-box">
            <h1 className="mx-auto text-lg font-semibold">Roles</h1>
            <ul className="menu">
                <li onClick={() => props.handleClick("")}><a>All roles</a></li>
                {roleOptions.map((role) => (
                    <li key={role.id} onClick={() => props.handleClick(role.name)}><a>{role.name}</a></li>
                ))}
            </ul>
        </div>
    )
}

export default RoleFilter