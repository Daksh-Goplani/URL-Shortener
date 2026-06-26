import { Link, useNavigate } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { logoutUser } from '../api/user.api';

const Navbar = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            // ignore backend logout failure, still clear local state
        } finally {
            dispatch(logout());
            navigate({ to: '/' });
        }
    };

    return (
        <header className="bg-white border-b border-slate-200 shadow-sm">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between h-20">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-xl font-semibold text-slate-900">
                            URL Shortener
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 justify-end">
                        <Link to="/" className="text-sm text-slate-600 hover:text-slate-900 transition">
                            Home
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-sm text-slate-600 hover:text-slate-900 transition"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/auth"
                                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar
