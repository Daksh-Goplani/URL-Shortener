import { Link } from '@tanstack/react-router';

const Navbar = () => {
    return (
        <header className="bg-gray-100 border-b border-slate-200 shadow-sm">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-gray-800">
                        URL Shortener
                    </Link>
                    <Link
                        to="/auth"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Login
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
