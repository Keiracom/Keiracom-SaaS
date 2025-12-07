import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-green-500 font-mono">
            <h2 className="text-4xl font-bold mb-4">404: SIGNAL LOST</h2>
            <p className="mb-4 text-gray-400">The requested asset or resource could not be found via satellite.</p>
            <Link href="/" className="px-4 py-2 bg-green-900 rounded hover:bg-green-800 text-white transition-colors">
                Return to Terminal
            </Link>
        </div>
    )
}
