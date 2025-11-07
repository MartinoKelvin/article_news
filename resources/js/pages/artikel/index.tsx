import { Link } from "@inertiajs/react"
import { ChevronRight, Search, ChevronLeft } from "lucide-react"
import Navbar from "@/components/new/Navbar"
import Footer from "@/components/new/Footer"
import { useState, useEffect } from "react"
import LoadingScreen from "@/components/new/LoadingScreen"

// ✅ 1. Definisikan tipe data artikel
interface Article {
  id: number
  slug: string
  title: string
  content?: string
  excerpt?: string
  category?: string
  image?: string
  thumbnail?: string
  created_at: string
}

// ✅ 2. Tipe props untuk komponen
interface ArtikelIndexProps {
  articles: Article[]
}

// ✅ 3. Tambahkan tipe pada parameter props
export default function ArtikelIndex({ articles }: ArtikelIndexProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const articlesPerPage = 6

  // Reset halaman setiap kali pencarian berubah
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // ✅ Tambahkan tipe untuk parameter "article"
  const filteredArticles = articles.filter((article: Article) => {
    const term = searchTerm.toLowerCase()
    return (
      article.title.toLowerCase().includes(term) ||
      (article.content && article.content.toLowerCase().includes(term)) ||
      (article.category && article.category.toLowerCase().includes(term))
    )
  })

  // Hitung pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle)

  // Fungsi navigasi halaman
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // ✅ Tambahkan tipe untuk parameter "pageNum"
  const goToPage = (pageNum: number) => {
    setCurrentPage(pageNum)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Efek loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Total Artikel: {filteredArticles.length} | Total Halaman: {totalPages} | Halaman Saat Ini: {currentPage}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {filteredArticles.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 gap-8">
                  {currentArticles.map((article: Article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
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
                              {article.category ?? "Teknologi"}
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col items-center gap-6">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Sebelumnya</span>
                      </button>

                      <span className="flex items-center px-4 py-2 bg-card border border-border rounded-lg font-medium">
                        Halaman {currentPage} dari {totalPages}
                      </span>

                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
                      >
                        <span>Selanjutnya</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum: number) => (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`w-10 h-10 rounded-lg border transition-colors ${
                            currentPage === pageNum
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card border-border hover:bg-accent"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-muted-foreground">
                Tidak ditemukan artikel yang cocok dengan kata kunci "{searchTerm}".
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
