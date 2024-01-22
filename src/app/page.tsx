import Link from "next/link"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import 'animate.css'

const Home = async () => {
    return (
        <main className="h-full text-center scroll-smooth">
            <section className="animate__animated animate__backInLeft animate__delay-1s mt-80 mb-96">
                <h1 className="text-9xl font-bold">Museek</h1>
                <p className="my-4 text-xl">Seek the right partner for your music project</p>
                <Link href="/seek" className="mt-4 btn btn-primary text-lg">Seek for free</Link>
            </section>
            <section className="animate__animated animate__backInLeft animate__delay-2s my-[50vh]">
                <h1 className="text-6xl font-bold">Vision</h1>
                <p className="my-4 mx-auto w-1/2 text-lg">Our vision is to be the catalyst for a musical revolution. We want to democratize collaboration, making it accessible and seamless for anyone with a song in their heart. With Museek, finding the ideal musical partner is as easy as finding a song you love.</p>
            </section>
            <section className="animate__animated animate__backInLeft animate__delay-3s my-[50vh]">
                <h1 className="text-6xl font-bold">Contact</h1>
                <div className="my-4 flex justify-center items-center gap-4">
                    <button><FaFacebook className="text-3xl" /></button>
                    <button><FaInstagram className="text-3xl" /></button>
                    <button><FaLinkedin className="text-3xl" /></button>
                    <button><FaXTwitter className="text-3xl" /></button>
                </div>
            </section>
            <section className="">
                <p className="font-bold">____________________</p>
            </section>
        </main>
    )
}

export default Home