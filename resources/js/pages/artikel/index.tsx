import { Link } from "@inertiajs/react"
import { ChevronRight, Search } from "lucide-react"
import Navbar from "@/components/new/Navbar"
import Footer from "@/components/new/Footer"

export default function ArtikelIndex({ articles }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header Section */}
        <section className="py-12 px-6 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Semua Artikel
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Jelajahi berita dan analisis teknologi terbaru yang dikurasi oleh tim expert kami.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari artikel..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {articles.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img
                        src={
                          article.thumbnail
                            ? `/storage/${article.thumbnail}`
                            : article.image || "/placeholder.svg"
                        }
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-semibold text-primary uppercase">
                            {article.category ?? "Umum"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(article.created_at).toLocaleDateString("id-ID", {
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
                            (article.content
                              ? article.content.replace(/<[^>]*>?/gm, "").slice(0, 100) + "..."
                              : "Baca artikel selengkapnya.")}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-primary mt-4">
                        <span className="text-sm font-medium">Baca Selengkapnya</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                Belum ada artikel tersedia.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
