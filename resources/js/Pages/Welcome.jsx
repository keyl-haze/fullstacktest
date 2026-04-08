import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                {/* Navigation */}
                <nav className="relative z-50 flex items-center justify-between px-6 py-6 lg:px-12 lg:py-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold">SecureAuth</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-lg bg-emerald-500 px-6 py-2 font-medium text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-lg px-6 py-2 font-medium text-slate-300 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-lg bg-emerald-500 px-6 py-2 font-medium text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative flex flex-col items-center justify-center px-6 py-20 lg:py-32">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"></div>
                        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-3xl text-center">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-400">
                            Secure & Simple
                        </p>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                            User Authentication
                            <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                                Made Easy
                            </span>
                        </h1>
                        <p className="mb-12 text-lg text-slate-300 md:text-xl">
                            A modern, secure login and registration system with full user management capabilities. Built for simplicity and security.
                        </p>
                        
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href={route('register')}
                                className="rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                href={route('login')}
                                className="rounded-lg border border-slate-600 px-8 py-3 font-semibold text-white transition hover:border-slate-500 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:py-32">
                    <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
                        Everything You Need
                    </h2>
                    
                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm transition hover:border-slate-600 hover:bg-slate-800/80">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/20">
                                <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Secure Authentication</h3>
                            <p className="text-slate-400">
                                Industry-standard password hashing and secure session management to protect your data.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm transition hover:border-slate-600 hover:bg-slate-800/80">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/20">
                                <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Full CRUD Operations</h3>
                            <p className="text-slate-400">
                                Create, read, update, and delete user profiles with an intuitive dashboard interface.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm transition hover:border-slate-600 hover:bg-slate-800/80">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/20">
                                <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">Easy to Use</h3>
                            <p className="text-slate-400">
                                Simple and intuitive interface designed for both users and administrators.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-8 text-center">
                            <p className="text-4xl font-bold text-emerald-400">100%</p>
                            <p className="mt-2 text-slate-400">Secure & Encrypted</p>
                        </div>
                        <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-8 text-center">
                            <p className="text-4xl font-bold text-emerald-400">&lt;1s</p>
                            <p className="mt-2 text-slate-400">Authentication Time</p>
                        </div>
                        <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-8 text-center">
                            <p className="text-4xl font-bold text-emerald-400">24/7</p>
                            <p className="mt-2 text-slate-400">System Availability</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="relative z-10 border-t border-slate-700 px-6 py-12 lg:px-12">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                            <p className="text-slate-400">© 2026 SecureAuth. All rights reserved.</p>
                            <div className="flex gap-6">
                                <a href="#" className="text-slate-400 transition hover:text-white">Privacy</a>
                                <a href="#" className="text-slate-400 transition hover:text-white">Terms</a>
                                <a href="#" className="text-slate-400 transition hover:text-white">Contact</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
