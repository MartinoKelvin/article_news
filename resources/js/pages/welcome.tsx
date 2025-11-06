import { useState, useEffect } from "react"
import { Link, Head } from "@inertiajs/react"
import { Search, Zap, Cpu, Shield, Rocket } from "lucide-react"
import Navbar from "@/components/new/Navbar"
import Footer from "@/components/new/Footer"
import LoadingScreen from "@/components/new/LoadingScreen"


export default function HomePage({ featuredArticles = [], trendingTopics = [] }) {
  const [isLoading, setIsLoading] = useState(true)

  // simulasi loading (misal 1 detik)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const categories = [
    { id: "ai", label: "AI & Machine Learning", icon: Cpu },
    { id: "gadget", label: "Gadgets", icon: Zap },
    { id: "startup", label: "Startup", icon: Rocket },
    { id: "security", label: "Cybersecurity", icon: Shield },
  ]

  // ⏳ Kalau masih loading, tampilkan logo berputar
  if (isLoading) {
    return (
      <>
      <LoadingScreen />
      </>
    )
  }

  // ✅ Kalau sudah selesai loading, tampilkan halaman utama
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

        {/* Categories */}
        <section className="py-12 px-6 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-8">Kategori</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <Link
                    key={cat.id}
                    href={`/artikel?category=${cat.id}`}
                    className="group p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <Icon className="w-5 h-5 text-primary mb-3 group-hover:text-primary/80 transition-colors" />
                    <p className="text-sm font-medium text-foreground">{cat.label}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured, Newsletter, Trending Sections tetap seperti sebelumnya */}
        {/* ... */}
      </main>

      <Footer />
    </div>
  )
}
