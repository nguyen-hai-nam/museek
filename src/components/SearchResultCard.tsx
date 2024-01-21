import Link from 'next/link'
import Image from 'next/image'

const SearchResultCard = (props: { id: string; avatarUrl: string; name: string; bio: string; roles: string[];}) => {
    return (
        <Link href={`profile/${props.id}`}>
            <div className="w-full h-full text-primary-content shadow-md hover:shadow-lg rounded-lg overflow-hidden">
                <figure className="avatar">
                    <div className="w-full">
                        <Image src={props.avatarUrl} width={200} height={200} alt='Profile Picture' />
                    </div>
                </figure>
                <div className="px-4 py-2">
                    <h2 className="line-clamp-1 font-semibold text-lg">
                        { props.name }
                    </h2>
                    <div className="my-2 flex justify-start gap-1">
                        {props.roles.length > 0 ? props.roles?.map((role, index) => (
                            <div key={index} className="badge badge-outline badge-primary font-semibold">{ role }</div>
                        )) : (
                            <div className="badge badge-outline badge-accent font-semibold">No roles</div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SearchResultCard