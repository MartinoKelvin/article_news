import { Link, usePage } from "@inertiajs/react"
import { CalendarDays, ArrowLeft } from "lucide-react"
import Navbar from "@/components/new/Navbar"
import Footer from "@/components/new/Footer"

interface Article {
  id: number
  title: string
  slug: string
  category?: string
  content: string
  thumbnail?: string
  user?: {
    name: string
  }
  created_at: string
}

export default function ArtikelDetail() {
  const { article } = usePage().props as { article: Article }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/artikel"
            className="inline-flex items-center text-primary hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Artikel
          </Link>

          {/* Header */}
          <div className="mb-8">
            <span className="text-sm font-semibold text-primary uppercase">
              {article.category ?? "Umum"}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <CalendarDays className="w-4 h-4" />
              <span>
                {new Date(article.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {article.user && (
                <>
                  <span>•</span>
                  <span>Oleh {article.user.name}</span>
                </>
              )}
            </div>
          </div>

          {/* Thumbnail */}
          {article.thumbnail && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-md">
              <img
                src={`/storage/${article.thumbnail}`}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Content */}
          <article
            className="prose prose-lg max-w-none prose-invert prose-headings:text-foreground prose-p:text-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
