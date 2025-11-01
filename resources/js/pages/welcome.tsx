import { Link, Head } from "@inertiajs/react"
import { Search, Zap, Cpu, Shield, Rocket } from "lucide-react"
import Navbar from "@/components/new/Navbar"
import Footer from "@/components/new/Footer"

export default function HomePage({ featuredArticles = [], trendingTopics = [] }) {
  const categories = [
    { id: "ai", label: "AI & Machine Learning", icon: Cpu },
    { id: "gadget", label: "Gadgets", icon: Zap },
    { id: "startup", label: "Startup", icon: Rocket },
    { id: "security", label: "Cybersecurity", icon: Shield },
  ]

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

        {/* Featured Articles */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-12">
              Sorotan Utama
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={
                        article.thumbnail
                          ? `/storage/${article.thumbnail}`
                          : article.image || "/placeholder.svg"
                      }
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold text-primary uppercase">
                        {article.category ?? "Umum"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(article.created_at ?? article.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt ??
                        article.content?.replace(/<[^>]*>?/gm, "").slice(0, 100) + "..."}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Newsletter */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 mb-12">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Dapatkan Update Berita Mingguan
                </h3>
                <p className="text-muted-foreground mb-6">
                  Terima ringkasan berita teknologi terkurasi langsung ke inbox Anda setiap minggu.
                </p>
                <form className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 transition"
                  >
                    Berlangganan
                  </button>
                </form>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6">
                  Trending Sekarang
                </h2>
                <div className="space-y-4">
                  {trendingTopics.map((topic, idx) => (
                    <Link key={topic.id} href="#" className="block">
                      <div className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="text-2xl font-bold text-primary/30 group-hover:text-primary/50">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground hover:text-primary transition-colors">
                            {topic.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{topic.views} views</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Artikel Terbaru */}
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6">
                  Artikel Terbaru
                </h2>
                <div className="space-y-4">
                  {featuredArticles.slice(0, 4).map((article, i) => (
                    <Link key={i} href={`/articles/${article.slug}`} className="block">
                      <div className="p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <p className="text-sm text-muted-foreground mb-1">
                          {new Date(article.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <h4 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
