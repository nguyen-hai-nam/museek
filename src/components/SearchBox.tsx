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
        <input type="text" placeholder="Aa" className="my-8 input input-bordered w-full lg:w-3/5" onChange={handleChange}/>
    )
}

export default SearchBox