import { useState, useEffect } from "react"
import { Link, Head } from "@inertiajs/react"
import { Search, Newspaper, Globe2, Users } from "lucide-react"
import Navbar from "@/components/new/Navbar"
import Footer from "@/components/new/Footer"
import LoadingScreen from "@/components/new/LoadingScreen"


interface Article {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  created_at: string;
  category: string;
  user?: { name: string };
}

export default function HomePage({ featuredArticles = [] as Article[], trendingTopics = [] }) {
  const [isLoading, setIsLoading] = useState(true)

  // simulasi loading (1 detik)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <LoadingScreen />

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Head title="TechNews+ - Berita & Analisis Teknologi" />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Berita & Analisis Teknologi Terkini
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Pantau perkembangan teknologi terbaru, dari AI dan startup hingga cybersecurity dan gadget inovatif di
                Asia Tenggara.
              </p>
              <Link
                href="/artikel"
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
              >
                <Search className="w-4 h-4" />
                Jelajahi Berita
              </Link>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 px-6 border-b border-border">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
              <Globe2 className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Berita Global</h3>
              <p className="text-muted-foreground text-sm">
                Kami menyajikan berita teknologi terkini dari seluruh dunia, dengan fokus pada inovasi dan dampaknya di Asia Tenggara.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
              <Newspaper className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Analisis Mendalam</h3>
              <p className="text-muted-foreground text-sm">
                Dapatkan ulasan mendalam dan opini dari pakar di bidang teknologi, startup, dan keamanan siber.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-shadow">
              <Users className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Komunitas Inovator</h3>
              <p className="text-muted-foreground text-sm">
                Bergabunglah dengan komunitas pembelajar dan profesional teknologi yang antusias berbagi wawasan.
              </p>
            </div>
          </div>
        </section>

        {/* Artikel Terbaru */}
        <section className="py-16 px-6 bg-secondary/40">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">📰 Artikel Terbaru</h2>

            {featuredArticles.length > 0 ? (
              <>
                <div className="grid md:grid-cols-3 gap-8">
                  {featuredArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-video w-full relative overflow-hidden bg-muted">
                        {article.thumbnail ? (
                          <img
                            src={`/storage/${article.thumbnail}`}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">

                          {article.user && (
                            <span className="text-xs text-muted-foreground">
                              Dibuat oleh {article.user.name}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {article.description}
                        </p>
                        <div className="mt-3 text-xs text-muted-foreground">
                          {new Date(article.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Tombol Lihat Semua */}
                <div className="text-center mt-10">
                  <Link
                    href="/artikel"
                    className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                  >
                    Lihat Semua Artikel
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground">Belum ada artikel yang tersedia.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
