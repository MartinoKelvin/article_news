import { Link, usePage } from "@inertiajs/react"
import { CalendarDays, ArrowLeft, Send } from "lucide-react"
import Navbar from "@/components/new/Navbar"
import Footer from "@/components/new/Footer"
import React, { useEffect, useState } from "react"

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

interface Comment {
  id: number
  guest_name?: string
  user?: { name: string }
  content: string
  created_at: string
}

export default function ArtikelDetail() {
  const { article, captchaQuestion } = usePage().props as { article: Article; captchaQuestion?: string }
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [guestName, setGuestName] = useState("")
  const [captchaAnswer, setCaptchaAnswer] = useState("")

  // Ambil komentar
  useEffect(() => {
    const csrf = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content') || ''

    fetch(`/articles/${article.slug}/comments`, {
      headers: {
        Accept: "application/json",
        "X-CSRF-TOKEN": csrf,
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(() => setComments([]))
  }, [article.slug])

  // Kirim komentar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return alert("Komentar tidak boleh kosong!")
    if (!captchaAnswer.trim()) return alert("Harap isi captcha")

    const csrf = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content') || ''

    const res = await fetch(`/articles/${article.slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-TOKEN": csrf,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        content: newComment,
        guest_name: guestName || "Anonymous",
        captcha: captchaAnswer,
      }),
    })

    if (res.ok) {
      const saved = await res.json()
      setComments([saved, ...comments])
      setNewComment("")
      setGuestName("")
      setCaptchaAnswer("")
      // catatan: captcha di backend dihapus setelah sukses; untuk soal baru reload halaman atau panggil ulang endpoint show
    } else {
      const err = await res.text()
      alert("Gagal mengirim komentar:\n" + err)
    }
  }

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
            className="prose prose-lg max-w-none prose-invert prose-headings:text-foreground prose-p:text-foreground mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Komentar Section */}
          <section className="mt-12 bg-card rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Kolom Komentar
            </h2>

            {/* Form komentar */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
              <input
                type="text"
                placeholder="Nama Anda (opsional)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Tulis komentar Anda..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {/* Captcha */}
              {captchaQuestion && (
                <div className="flex items-center gap-2">
                  <label className="text-sm text-muted-foreground w-40">{captchaQuestion}</label>
                  <input
                    type="text"
                    placeholder="Jawaban"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    className="p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}
              <button
                type="submit"
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/80 transition-all"
              >
                <Send className="w-4 h-4" />
                Kirim
              </button>
            </form>

            {/* Daftar komentar */}
            <div className="space-y-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b border-border pb-4"
                  >
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span className="font-semibold text-foreground">
                        {comment.user?.name || comment.guest_name || "Anonymous"}
                      </span>
                      <span>
                        {new Date(comment.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <p className="text-foreground">{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center">
                  Belum ada komentar. Jadilah yang pertama!
                </p>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
