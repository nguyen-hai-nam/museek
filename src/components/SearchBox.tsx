"use client"

import { ChangeEvent, FC } from "react"

interface SearchBoxProps {
    // eslint-disable-next-line no-unused-vars
    handleSearchStringChange: (searchString: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ handleSearchStringChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleSearchStringChange(event.target.value)
    }

    return (
        <input type="text" placeholder="Aa" className="input input-bordered w-full" onChange={handleChange}/>
    )
}

export default SearchBox