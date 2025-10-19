import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome( {articles}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="TechNews+">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
                <style>
                    {`
                        /* Custom animations */
                        @keyframes slideIn {
                            from { transform: translateY(20px); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }

                        .slide-in {
                            animation: slideIn 0.6s ease-out;
                        }

                        /* Custom scrollbar */
                        ::-webkit-scrollbar {
                            width: 8px;
                        }

                        ::-webkit-scrollbar-track {
                            background: #0F172A;
                        }

                        ::-webkit-scrollbar-thumb {
                            background: #38BDF8;
                            border-radius: 4px;
                        }

                        /* Glow effect */
                        .glow {
                            box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
                        }

                        /* Hover effects */
                        .hover-lift {
                            transition: all 0.3s ease;
                        }

                        .hover-lift:hover {
                            transform: translateY(-5px);
                            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                        }
                    `}
                </style>
            </Head>
            <div className="flex min-h-screen flex-col bg-[#0F172A] text-[#F8FAFC] font-sans">
                {/* Navigation */}
                <nav className="fixed top-0 w-full bg-[#1E293B] backdrop-blur-lg z-50 border-b border-[#38BDF8]/20">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-8">
                                <a href="#" className="flex items-center space-x-2 text-[#38BDF8] hover:text-[#60A5FA] transition">
                                    <span className="text-xl font-bold">TechNews+</span>
                                </a>
                                <div className="hidden md:flex space-x-6">
                                    <Link href="#" className="hover:text-[#38BDF8] transition">Beranda</Link>
                                    <Link href="#" className="hover:text-[#38BDF8] transition">Tutorial</Link>
                                    <Link href="#" className="hover:text-[#38BDF8] transition">Review</Link>
                                    <Link href="#" className="hover:text-[#38BDF8] transition">Event</Link>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative hidden md:block">
                                    <input
                                        type="text"
                                        placeholder="Cari artikel..."
                                        className="bg-[#0F172A] border border-[#38BDF8]/30 rounded-full px-4 py-2 pr-10 focus:outline-none focus:border-[#38BDF8] transition"
                                    />
                                    <i className="fas fa-search absolute right-3 top-3 text-[#38BDF8]"></i>
                                </div>
                                <button className="md:hidden text-[#38BDF8] hover:text-[#60A5FA] transition">
                                    <i className="fas fa-bars text-xl"></i>
                                </button>
                                <nav className="flex items-center justify-end gap-4">
                                    {auth.user ? (
                                        <Link
                                        href={dashboard()}
                                        className="inline-block bg-[#38BDF8] hover:bg-[#60A5FA] text-white font-medium rounded-full px-5 py-2 transition"
                                        >
                                        <i className="fas fa-tachometer-alt mr-2"></i>Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                        <Link
                                            href={login()}
                                            className="inline-flex items-center bg-[#38BDF8] hover:bg-[#60A5FA] text-white font-medium rounded-full px-5 py-2 transition"
                                        >
                                            <i className="fas fa-user mr-2"></i>Log in
                                        </Link>

                                        <Link
                                            href={register()}
                                            className="inline-flex items-center border border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8] hover:text-white font-medium rounded-full px-5 py-2 transition"
                                        >
                                            <i className="fas fa-user-plus mr-2"></i>Register
                                        </Link>
                                        </>
                                    )}
                                </nav>


                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-24 pb-12 px-4">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="slide-in">
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                    <span className="text-[#38BDF8]">TechNews+</span>: Portal Berita Teknologi Terpercaya
                                </h1>
                                <p className="text-lg text-gray-300 mb-8">
                                    Dapatkan berita terkini, tutorial mendalam, dan analisis teknologi terbaru dari para ahli industri.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-[#38BDF8] hover:bg-[#60A5FA] px-6 py-3 rounded-full font-semibold transition glow">
                                        Mulai Belajar
                                    </button>
                                    <button className="border border-[#38BDF8] hover:bg-[#38BDF8]/20 px-6 py-3 rounded-full font-semibold transition">
                                        Lihat Tutorial
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src="https://picsum.photos/seed/tech-hero/600/400"
                                    alt="Tech Hero"
                                    className="rounded-lg shadow-2xl hover-lift"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-[#38BDF8] text-white px-4 py-2 rounded-lg">
                                    <i className="fas fa-fire mr-2"></i>Hot Topic
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="py-8 px-4">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="category-btn bg-[#38BDF8] hover:bg-[#60A5FA] px-6 py-3 rounded-full transition">
                                <i className="fas fa-code mr-2"></i>Programming
                            </button>
                            <button className="category-btn bg-[#1E293B] hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 px-6 py-3 rounded-full transition">
                                <i className="fas fa-mobile-alt mr-2"></i>Mobile
                            </button>
                            <button className="category-btn bg-[#1E293B] hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 px-6 py-3 rounded-full transition">
                                <i className="fas fa-desktop mr-2"></i>AI & Machine Learning
                            </button>
                            <button className="category-btn bg-[#1E293B] hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 px-6 py-3 rounded-full transition">
                                <i className="fas fa-shield-alt mr-2"></i>Security
                            </button>
                            <button className="category-btn bg-[#1E293B] hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 px-6 py-3 rounded-full transition">
                                <i className="fas fa-cloud mr-2"></i>Cloud
                            </button>
                        </div>
                    </div>
                </section>

                {/* Featured Articles */}
                <section className="py-12 px-4">
    <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-[#38BDF8]">Artikel Terpopuler</span>
        </h2>

        {/* Pastikan props `articles` dikirim dari controller Laravel */}
        <div className="grid md:grid-cols-3 gap-6">
            {articles.length > 0 ? (
                articles.map((article) => (
                    <article
                        key={article.id}
                        className="bg-[#1E293B] rounded-lg overflow-hidden hover-lift cursor-pointer"
                    >
                        <img
                            src={
                                article.thumbnail
                                    ? `/storage/${article.thumbnail}`
                                    : "https://picsum.photos/seed/default/400/250"
                            }
                            alt={article.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex items-center text-sm text-gray-400 mb-3">
                                <i className="fas fa-clock mr-2"></i>
                                {new Date(article.created_at).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                                <span className="mx-2">•</span>
                                <i className="fas fa-eye mr-2"></i>
                                {article.views}
                            </div>
                            <h3 className="text-xl font-bold mb-3 hover:text-[#38BDF8] transition">
                                {article.title}
                            </h3>
                            <p className="text-gray-300 mb-4 line-clamp-3">
                                {article.content}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#38BDF8]">
                                    {article.user?.name ?? "Admin"}
                                </span>
                                <Link
                                    href={`/articles/${article.slug}`}
                                    className="text-[#38BDF8] hover:text-[#60A5FA] transition"
                                >
                                    Baca Selengkapnya <i className="fas fa-arrow-right ml-1"></i>
                                </Link>
                            </div>
                        </div>
                    </article>
                ))
            ) : (
                <p className="text-center text-gray-400 col-span-3">
                    Belum ada artikel tersedia.
                </p>
            )}
        </div>
    </div>
</section>


                {/* Tutorial Section */}
                <section className="py-12 px-4 bg-[#0F172A]/50">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            <span className="text-[#38BDF8]">Tutorial & Panduan</span>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Tutorial Card 1 */}
                            <div className="bg-[#1E293B] rounded-lg p-6 hover-lift">
                                <div className="flex items-center mb-4">
                                    <span className="bg-[#38BDF8] text-white text-xs px-3 py-1 rounded-full">Beginner</span>
                                    <span className="text-gray-400 ml-auto">45 min</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 hover:text-[#38BDF8] transition cursor-pointer">
                                    Belajar JavaScript dari Nol: Dasar-Dasar ES6
                                </h3>
                                <p className="text-gray-300 mb-4">
                                    Mulai perjalanan Anda dengan JavaScript modern, mulai dari variabel hingga arrow functions dan promises.
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <img src="https://picsum.photos/seed/author1/30/30" alt="Author" className="w-8 h-8 rounded-full border-2 border-[#1E293B]" />
                                        <img src="https://picsum.photos/seed/author2/30/30" alt="Author" className="w-8 h-8 rounded-full border-2 border-[#1E293B]" />
                                        <div className="w-8 h-8 rounded-full bg-[#38BDF8] border-2 border-[#1E293B] flex items-center justify-center text-xs">
                                            +5
                                        </div>
                                    </div>
                                    <button className="bg-[#38BDF8] hover:bg-[#60A5FA] px-4 py-2 rounded-full text-sm transition">
                                        Mulai Tutorial
                                    </button>
                                </div>
                            </div>

                            {/* Tutorial Card 2 */}
                            <div className="bg-[#1E293B] rounded-lg p-6 hover-lift">
                                <div className="flex items-center mb-4">
                                    <span className="bg-[#38BDF8] text-white text-xs px-3 py-1 rounded-full">Advanced</span>
                                    <span className="text-gray-400 ml-auto">2 jam</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 hover:text-[#38BDF8] transition cursor-pointer">
                                    Build REST API dengan Node.js & Express
                                </h3>
                                <p className="text-gray-300 mb-4">
                                    Tutorial lengkap untuk membangun API yang robust, secure, dan scalable menggunakan Node.js dan Express.
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <img src="https://picsum.photos/seed/author3/30/30" alt="Author" className="w-8 h-8 rounded-full border-2 border-[#1E293B]" />
                                        <img src="https://picsum.photos/seed/author4/30/30" alt="Author" className="w-8 h-8 rounded-full border-2 border-[#1E293B]" />
                                    </div>
                                    <button className="bg-[#38BDF8] hover:bg-[#60A5FA] px-4 py-2 rounded-full text-sm transition">
                                        Mulai Tutorial
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="py-12 px-4">
                    <div className="container mx-auto max-w-2xl">
                        <div className="bg-[#1E293B] rounded-lg p-8 text-center glow">
                            <h2 className="text-3xl font-bold mb-4">
                                <span className="text-[#38BDF8]">Dapatkan Update Terkini</span>
                            </h2>
                            <p className="text-gray-300 mb-6">
                                Subscribe newsletter kami untuk mendapatkan berita dan tutorial terbaru langsung di inbox Anda.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Email Anda"
                                    className="flex-1 bg-[#0F172A] border border-[#38BDF8]/30 rounded-full px-6 py-3 focus:outline-none focus:border-[#38BDF8] transition"
                                />
                                <button type="submit" className="bg-[#38BDF8] hover:bg-[#60A5FA] px-6 py-3 rounded-full font-semibold transition">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#1E293B] border-t border-[#38BDF8]/20 py-12 px-4">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 text-[#38BDF8] mb-4">
                                    <i className="fas fa-microchip text-2xl"></i>
                                    <span className="text-xl font-bold">TechNews+</span>
                                </div>
                                <p className="text-gray-400">
                                    Portal berita dan tutorial teknologi terpercaya untuk developer dan enthusiast di seluruh Indonesia.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold mb-4">Kategori</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li><Link href="#" className="hover:text-[#38BDF8] transition">Programming</Link></li>
                                    <li><Link href="#" className="hover:text-[#38BDF8] transition">Mobile</Link></li>
                                    <li><Link href="#" className="hover:text-[#38BDF8] transition">AI & ML</Link></li>
                                    <li><Link href="#" className="hover:text-[#38BDF8] transition">DevOps</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-4">Tautan Cepat</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li><Link href="#" className="hover:text-[#38BDF8] transition">Tentang Kami</Link></li>
                                    <li><Link href="#" className="hover:text-[#38BDF8] transition">Kontak</Link></li>
                                    <li><Link href="#" className="hover:text-[#38BDF8] transition">Privacy Policy</Link></li>
                                    <li><Link href="#" className="hover:text-[#38BDF8] transition">Terms of Service</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-4">Ikuti Kami</h3>
                                <div className="flex space-x-4">
                                    <Link href="#" className="text-gray-400 hover:text-[#38BDF8] transition text-xl">
                                        <i className="fab fa-twitter"></i>
                                    </Link>
                                    <Link href="#" className="text-gray-400 hover:text-[#38BDF8] transition text-xl">
                                        <i className="fab fa-github"></i>
                                    </Link>
                                    <Link href="#" className="text-gray-400 hover:text-[#38BDF8] transition text-xl">
                                        <i className="fab fa-linkedin"></i>
                                    </Link>
                                    <Link href="#" className="text-gray-400 hover:text-[#38BDF8] transition text-xl">
                                        <i className="fab fa-youtube"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-[#38BDF8]/20 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 TechNews+. All rights reserved.</p>
                        </div>
                    </div>
                </footer>

                {/* Mobile Menu */}
                <div id="mobileMenu" className="fixed inset-0 bg-[#0F172A] z-50 transform translate-x-full transition-transform">
                    <div className="p-4">
                        <button className="text-[#38BDF8] text-2xl mb-8">
                            <i className="fas fa-times"></i>
                        </button>
                        <nav className="space-y-4">
                            <Link href="#" className="block text-lg hover:text-[#38BDF8] transition">Beranda</Link>
                            <Link href="#" className="block text-lg hover:text-[#38BDF8] transition">Tutorial</Link>
                            <Link href="#" className="block text-lg hover:text-[#38BDF8] transition">Review</Link>
                            <Link href="#" className="block text-lg hover:text-[#38BDF8] transition">Event</Link>
                            <Link href="#" className="block text-lg hover:text-[#38BDF8] transition">Tentang Kami</Link>
                            <Link href="#" className="block text-lg hover:text-[#38BDF8] transition">Kontak</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
