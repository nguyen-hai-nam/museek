"use client"

import Link from 'next/link'
import Image from 'next/image'

const SearchResultCard = (props: { id: string; name: string; bio: string; roles: string[];}) => {
    return (
        <Link href={`profile/${props.id}`}>
            <div className="inline-block card w-full h-full border-2 hover:shadow-md">
                <figure className="avatar">
                    <div className="w-full">
                        <Image src="/vercel.svg" width={200} height={200} alt='Profile Picture' />
                    </div>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        <span className='line-clamp-1'>{ props.name }</span>
                    </h2>
                    <p className="h-[72px] line-clamp-3">{ props.bio }</p>
                    <div className="max-h-[22px] h-fit overflow-hidden card-actions justify-end">
                        {props.roles?.map((role, index) => (
                            <div key={index} className="badge badge-outline">{ role }</div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SearchResultCard