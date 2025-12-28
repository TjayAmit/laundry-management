import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome to WashLy">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
                <style>{`
                    /* Custom Scrollbar for Webkit browsers (Chrome, Safari, Edge) */
                    ::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }

                    ::-webkit-scrollbar-track {
                        background: #0a0a0a;
                    }

                    ::-webkit-scrollbar-thumb {
                        background: #ff6b35;
                        border-radius: 4px;
                    }

                    ::-webkit-scrollbar-thumb:hover {
                        background: #ff5722;
                    }

                    /* Custom Scrollbar for Firefox */
                    * {
                        scrollbar-width: thin;
                        scrollbar-color: #ff6b35 #0a0a0a;
                    }
                `}</style>
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1410] to-[#0a0a0a] px-4 py-6 text-white sm:px-6 lg:justify-center lg:p-8">
                <header className="mb-8 w-full max-w-[335px] text-sm not-has-[nav]:hidden sm:mb-6 md:max-w-3xl lg:max-w-7xl">
                    <nav className="flex items-center justify-between gap-2 sm:gap-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#ff5722]">
                                <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-white">
                                WashLy
                            </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-block rounded-lg border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-4 py-2.5 text-sm leading-normal font-medium text-[#ff6b35] transition-all hover:border-[#ff6b35] hover:bg-[#ff6b35]/20 sm:px-5"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-block rounded-lg border border-transparent px-4 py-2.5 text-sm leading-normal font-medium text-gray-300 transition-all hover:text-[#ff6b35] sm:px-5"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-block rounded-lg border border-[#ff6b35] bg-[#ff6b35] px-4 py-2.5 text-sm leading-normal font-medium text-white transition-all hover:border-[#ff5722] hover:bg-[#ff5722] sm:px-5"
                                        >
                                            Get Started
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col md:max-w-3xl lg:max-w-7xl">
                        {/* Hero Section */}
                        <div className="mb-10 text-center sm:mb-12 md:mb-14 lg:mb-16">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-3 py-1.5 text-xs font-medium text-[#ff6b35] sm:px-4 sm:py-2 sm:text-sm">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                WashLy - Modern Laundry Management
                            </div>
                            <h1 className="mb-4 text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                                Streamline Your
                                <span className="block bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] bg-clip-text text-transparent">
                                    Laundry Business
                                </span>
                            </h1>
                            <p className="mx-auto mb-6 max-w-2xl text-base text-gray-400 sm:mb-8 sm:text-lg md:mb-8 md:px-4 md:text-lg lg:text-xl">
                                Complete management solution for laundry
                                services with real-time tracking, customer
                                notifications, and QR-based transactions. Scale
                                your business effortlessly.
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
                                {!auth.user && (
                                    <>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff6b35] px-6 py-3 text-base font-semibold text-white transition-all hover:bg-[#ff5722] hover:shadow-lg hover:shadow-[#ff6b35]/50 sm:px-8 sm:py-4"
                                            >
                                                Get Started Free
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                    />
                                                </svg>
                                            </Link>
                                        )}
                                        <Link
                                            href={login()}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-transparent px-6 py-3 text-base font-semibold text-gray-300 transition-all hover:border-[#ff6b35] hover:text-[#ff6b35] sm:px-8 sm:py-4"
                                        >
                                            Sign In
                                        </Link>
                                    </>
                                )}
                                {auth.user && (
                                    <Link
                                        href={dashboard()}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff6b35] px-6 py-3 text-base font-semibold text-white transition-all hover:bg-[#ff5722] hover:shadow-lg hover:shadow-[#ff6b35]/50 sm:px-8 sm:py-4"
                                    >
                                        Go to Dashboard
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:gap-6 lg:grid-cols-4">
                            {/* Feature 1: Customer Notifications */}
                            <div className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-5 backdrop-blur-sm transition-all hover:border-[#ff6b35]/50 hover:shadow-lg hover:shadow-[#ff6b35]/10 sm:p-6 md:p-7">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff6b35]/10 text-[#ff6b35] transition-all group-hover:bg-[#ff6b35] group-hover:text-white">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-white">
                                    Smart Notifications
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-400">
                                    Automated SMS and email alerts keep
                                    customers informed about order status, ready
                                    for pickup notifications, and promotional
                                    offers.
                                </p>
                            </div>

                            {/* Feature 2: Branch Management */}
                            <div className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-5 backdrop-blur-sm transition-all hover:border-[#ff6b35]/50 hover:shadow-lg hover:shadow-[#ff6b35]/10 sm:p-6 md:p-7">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff6b35]/10 text-[#ff6b35] transition-all group-hover:bg-[#ff6b35] group-hover:text-white">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-white">
                                    Multi-Branch Control
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-400">
                                    Centralized dashboard to manage multiple
                                    locations, staff assignments, inventory
                                    levels, and performance metrics across all
                                    branches.
                                </p>
                            </div>

                            {/* Feature 3: Orders Management */}
                            <div className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-5 backdrop-blur-sm transition-all hover:border-[#ff6b35]/50 hover:shadow-lg hover:shadow-[#ff6b35]/10 sm:p-6 md:p-7">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff6b35]/10 text-[#ff6b35] transition-all group-hover:bg-[#ff6b35] group-hover:text-white">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-white">
                                    Order Tracking
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-400">
                                    Real-time order processing from intake to
                                    delivery with status updates, service
                                    tracking, and detailed customer order
                                    history.
                                </p>
                            </div>

                            {/* Feature 4: QR Transactions */}
                            <div className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-5 backdrop-blur-sm transition-all hover:border-[#ff6b35]/50 hover:shadow-lg hover:shadow-[#ff6b35]/10 sm:p-6 md:p-7">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff6b35]/10 text-[#ff6b35] transition-all group-hover:bg-[#ff6b35] group-hover:text-white">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-white">
                                    QR-Based System
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-400">
                                    Contactless check-in and payment processing
                                    with QR codes for faster service, reduced
                                    errors, and enhanced customer experience.
                                </p>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="mt-12 grid gap-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-6 backdrop-blur-sm sm:mt-16 sm:gap-8 sm:p-8 md:mt-16 md:grid-cols-3 lg:mt-20">
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold text-[#ff6b35]">
                                    99.9%
                                </div>
                                <div className="text-sm font-medium text-gray-400">
                                    Uptime Guarantee
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-3xl font-bold text-[#ff6b35] sm:text-4xl">
                                    24/7
                                </div>
                                <div className="text-sm font-medium text-gray-400">
                                    Customer Support
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-3xl font-bold text-[#ff6b35] sm:text-4xl">
                                    500+
                                </div>
                                <div className="text-sm font-medium text-gray-400">
                                    Active Businesses
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <g className="translate-y-0 opacity-100 transition-all delay-300 duration-750 starting:translate-y-4 starting:opacity-0">
                    <path
                        d="M9.11884 226.339L-13.7396 226.338L-42.7286 176.132L43.0733 176.135L175.595 405.649L112.651 405.647L9.11884 226.339Z"
                        fill="black"
                    />
                    <path
                        d="M188.263 355.73L188.595 355.73C195.441 348.845 205.766 339.761 219.569 328.477C232.93 317.193 242.978 308.205 249.714 301.511C256.34 294.626 260.867 287.358 263.296 279.708C265.725 272.058 264.565 264.121 259.816 255.896C254.516 246.716 247.062 239.352 237.454 233.805C227.957 228.067 217.908 225.198 207.307 225.198C196.927 225.197 190.136 227.97 186.934 233.516C183.621 238.872 184.726 246.331 190.247 255.894L125.647 255.891C116.371 239.825 112.395 225.481 113.72 212.858C115.265 200.235 121.559 190.481 132.602 183.596C143.754 176.52 158.607 172.982 177.159 172.983C196.594 172.984 215.863 176.523 234.968 183.6C253.961 190.486 271.299 200.241 286.98 212.864C302.661 225.488 315.14 239.833 324.416 255.899C333.03 270.817 336.841 283.918 335.847 295.203C335.075 306.487 331.376 316.336 324.75 324.751C318.346 333.167 308.408 343.494 294.936 355.734L377.094 355.737L405.917 405.656L217.087 405.649L188.263 355.73Z"
                        stroke="#1B1B18"
                        strokeWidth={1}
                    />
                    <path
                        d="M9.11884 226.339L-13.7396 226.338L-42.7286 176.132L43.0733 176.135L175.595 405.649L112.651 405.647L9.11884 226.339Z"
                        stroke="#1B1B18"
                        strokeWidth={1}
                    />
                    <path
                        d="M204.592 327.449L204.923 327.449C211.769 320.564 222.094 311.479 235.897 300.196C249.258 288.912 259.306 279.923 266.042 273.23C272.668 266.345 277.195 259.077 279.624 251.427C282.053 243.777 280.893 235.839 276.145 227.615C270.844 218.435 263.39 211.071 253.782 205.524C244.285 199.786 234.236 196.917 223.635 196.916C213.255 196.916 206.464 199.689 203.262 205.235C199.949 210.59 201.054 218.049 206.575 227.612L141.975 227.61C132.699 211.544 128.723 197.2 130.048 184.577C131.593 171.954 137.887 162.2 148.93 155.315C160.083 148.239 174.935 144.701 193.487 144.702C212.922 144.703 232.192 148.242 251.296 155.319C270.289 162.205 287.627 171.96 303.308 184.583C318.989 197.207 331.468 211.552 340.745 227.618C349.358 242.536 353.169 255.637 352.175 266.921C351.403 278.205 347.704 288.055 341.078 296.47C334.674 304.885 324.736 315.213 311.264 327.453L393.422 327.456L422.246 377.375L233.415 377.368L204.592 327.449Z"
                        fill="#F8B803"
                    />
                    <path
                        d="M25.447 198.058L2.58852 198.057L-26.4005 147.851L59.4015 147.854L191.923 377.368L128.979 377.365L25.447 198.058Z"
                        fill="#F8B803"
                    />
                    <path
                        d="M204.592 327.449L204.923 327.449C211.769 320.564 222.094 311.479 235.897 300.196C249.258 288.912 259.306 279.923 266.042 273.23C272.668 266.345 277.195 259.077 279.624 251.427C282.053 243.777 280.893 235.839 276.145 227.615C270.844 218.435 263.39 211.071 253.782 205.524C244.285 199.786 234.236 196.917 223.635 196.916C213.255 196.916 206.464 199.689 203.262 205.235C199.949 210.59 201.054 218.049 206.575 227.612L141.975 227.61C132.699 211.544 128.723 197.2 130.048 184.577C131.593 171.954 137.887 162.2 148.93 155.315C160.083 148.239 174.935 144.701 193.487 144.702C212.922 144.703 232.192 148.242 251.296 155.319C270.289 162.205 287.627 171.96 303.308 184.583C318.989 197.207 331.468 211.552 340.745 227.618C349.358 242.536 353.169 255.637 352.175 266.921C351.403 278.205 347.704 288.055 341.078 296.47C334.674 304.885 324.736 315.213 311.264 327.453L393.422 327.456L422.246 377.375L233.415 377.368L204.592 327.449Z"
                        stroke="#1B1B18"
                        strokeWidth={1}
                    />
                    <path
                        d="M25.447 198.058L2.58852 198.057L-26.4005 147.851L59.4015 147.854L191.923 377.368L128.979 377.365L25.447 198.058Z"
                        stroke="#1B1B18"
                        strokeWidth={1}
                    />
                </g>
                <g
                    style={{ mixBlendMode: 'hard-light' }}
                    className="translate-y-0 opacity-100 transition-all delay-300 duration-750 starting:translate-y-4 starting:opacity-0"
                >
                    <path
                        d="M217.342 305.363L217.673 305.363C224.519 298.478 234.844 289.393 248.647 278.11C262.008 266.826 272.056 257.837 278.792 251.144C285.418 244.259 289.945 236.991 292.374 229.341C294.803 221.691 293.643 213.753 288.895 205.529C283.594 196.349 276.14 188.985 266.532 183.438C257.035 177.7 246.986 174.831 236.385 174.83C226.005 174.83 219.214 177.603 216.012 183.149C212.699 188.504 213.804 195.963 219.325 205.527L154.725 205.524C145.449 189.458 141.473 175.114 142.798 162.491C144.343 149.868 150.637 140.114 161.68 133.229C172.833 126.153 187.685 122.615 206.237 122.616C225.672 122.617 244.942 126.156 264.046 133.233C283.039 140.119 300.377 149.874 316.058 162.497C331.739 175.121 344.218 189.466 353.495 205.532C362.108 220.45 365.919 233.551 364.925 244.835C364.153 256.12 360.454 265.969 353.828 274.384C347.424 282.799 337.486 293.127 324.014 305.367L406.172 305.37L434.996 355.289L246.165 355.282L217.342 305.363Z"
                        fill="#F0ACB8"
                    />
                    <path
                        d="M38.197 175.972L15.3385 175.971L-13.6505 125.765L72.1515 125.768L204.673 355.282L141.729 355.279L38.197 175.972Z"
                        fill="#F0ACB8"
                    />
                    <path
                        d="M217.342 305.363L217.673 305.363C224.519 298.478 234.844 289.393 248.647 278.11C262.008 266.826 272.056 257.837 278.792 251.144C285.418 244.259 289.945 236.991 292.374 229.341C294.803 221.691 293.643 213.753 288.895 205.529C283.594 196.349 276.14 188.985 266.532 183.438C257.035 177.7 246.986 174.831 236.385 174.83C226.005 174.83 219.214 177.603 216.012 183.149C212.699 188.504 213.804 195.963 219.325 205.527L154.725 205.524C145.449 189.458 141.473 175.114 142.798 162.491C144.343 149.868 150.637 140.114 161.68 133.229C172.833 126.153 187.685 122.615 206.237 122.616C225.672 122.617 244.942 126.156 264.046 133.233C283.039 140.119 300.377 149.874 316.058 162.497C331.739 175.121 344.218 189.466 353.495 205.532C362.108 220.45 365.919 233.551 364.925 244.835C364.153 256.12 360.454 265.969 353.828 274.384C347.424 282.799 337.486 293.127 324.014 305.367L406.172 305.37L434.996 355.289L246.165 355.282L217.342 305.363Z"
                        stroke="#1B1B18"
                        strokeWidth={1}
                    />
                    <path
                        d="M38.197 175.972L15.3385 175.971L-13.6505 125.765L72.1515 125.768L204.673 355.282L141.729 355.279L38.197 175.972Z"
                        stroke="#1B1B18"
                        strokeWidth={1}
                    />
                </g>
                <g className="translate-y-0 opacity-100 mix-blend-plus-darker transition-all delay-300 duration-750 starting:translate-y-4 starting:opacity-0">
                    <path
                        d="M230.951 281.792L231.282 281.793C238.128 274.907 248.453 265.823 262.256 254.539C275.617 243.256 285.666 234.267 292.402 227.573C299.027 220.688 303.554 213.421 305.983 205.771C308.412 198.12 307.253 190.183 302.504 181.959C297.203 172.778 289.749 165.415 280.142 159.868C270.645 154.13 260.596 151.26 249.995 151.26C239.615 151.26 232.823 154.033 229.621 159.579C226.309 164.934 227.413 172.393 232.935 181.956L168.335 181.954C159.058 165.888 155.082 151.543 156.407 138.92C157.953 126.298 164.247 116.544 175.289 109.659C186.442 102.583 201.294 99.045 219.846 99.0457C239.281 99.0464 258.551 102.585 277.655 109.663C296.649 116.549 313.986 126.303 329.667 138.927C345.349 151.551 357.827 165.895 367.104 181.961C375.718 196.88 379.528 209.981 378.535 221.265C377.762 232.549 374.063 242.399 367.438 250.814C361.033 259.229 351.095 269.557 337.624 281.796L419.782 281.8L448.605 331.719L259.774 331.712L230.951 281.792Z"
                        fill="#F3BEC7"
                    />
                    <path
                        d="M51.8063 152.402L28.9479 152.401L-0.0411453 102.195L85.7608 102.198L218.282 331.711L155.339 331.709L51.8063 152.402Z"
                        fill="#F3BEC7"
                    />
                    <path
                        d="M230.951 281.792L231.282 281.793C238.128 274.907 248.453 265.823 262.256 254.539C275.617 243.256 285.666 234.267 292.402 227.573C299.027 220.688 303.554 213.421 305.983 205.771C308.412 198.12 307.253 190.183 302.504 181.959C297.203 172.778 289.749 165.415 280.142 159.868C270.645 154.13 260.596 151.26 249.995 151.26C239.615 151.26 232.823 154.033 229.621 159.579C226.309 164.934 227.413 172.393 232.935 181.956L168.335 181.954C159.058 165.888 155.082 151.543 156.407 138.92C157.953 126.298 164.247 116.544 175.289 109.659C186.442 102.583 201.294 99.045 219.846 99.0457C239.281 99.0464 258.551 102.585 277.655 109.663C296.649 116.549 313.986 126.303 329.667 138.927C345.349 151.551 357.827 165.895 367.104 181.961C375.718 196.88 379.528 209.981 378.535 221.265C377.762 232.549 374.063 242.399 367.438 250.814C361.033 259.229 351.095 269.557 337.624 281.796L419.782 281.8L448.605 331.719L259.774 331.712L230.951 281.792Z"
                        stroke="#1B1B18"
                        strokeWidth={1}
                    />
                    <path
                        d="M51.8063 152.402L28.9479 152.401L-0.0411453 102.195L85.7608 102.198L218.282 331.711L155.339 331.709L51.8063 152.402Z"
                        stroke="#1B1B18"
                        strokeWidth={1}
                    />
                </g>
                <footer className="mt-12 w-full text-center text-sm text-gray-500 sm:mt-16 lg:mt-20">
                    <p>
                        &copy; {new Date().getFullYear()} WashLy - Laundry
                        Management System. All rights reserved.
                    </p>
                </footer>

                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
