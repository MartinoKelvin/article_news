import { usePage, router } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"

interface Comment {
  id: number
  article: { id: number; title: string; slug: string }
  user: { id: number; name: string } | null
  guest_name: string | null
  content: string
  created_at: string
}

interface PageProps {
  comments: {
    data: Comment[]
  }
}

export default function CommentPage() {
  const { comments } = usePage<PageProps>().props

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus komentar ini?")) {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? ''

      try {
        const res = await fetch(`/dashboard/comment/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': csrf
          },
          credentials: 'same-origin'
        })

        if (res.ok) {
          // Refresh the page to show updated list
          window.location.reload()
        } else {
          alert('Gagal menghapus komentar')
        }
      } catch (error) {
        alert('Terjadi kesalahan saat menghapus komentar')
      }
    }
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Komentar", href: "/dashboard/comment" },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">💬 Daftar Komentar</h1>

        <div className="overflow-x-auto bg-background border rounded-xl shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-muted text-foreground">
              <tr>
                <th className="py-3 px-4 text-left border-b">Artikel</th>
                <th className="py-3 px-4 text-left border-b">User / Guest</th>
                <th className="py-3 px-4 text-left border-b">Komentar</th>
                <th className="py-3 px-4 text-center border-b">Tanggal</th>
                <th className="py-3 px-4 text-center border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {comments.data.length > 0 ? (
                comments.data.map((comment) => (
                  <tr
                    key={comment.id}
                    className="hover:bg-accent border-b transition-colors duration-150"
                  >
                    <td className="py-3 px-4 font-medium text-primary">
                      {comment.article?.title || "-"}
                    </td>
                    <td className="py-3 px-4">
                      {comment.user
                        ? comment.user.name
                        : comment.guest_name || "Anonim"}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground max-w-lg">
                      {comment.content}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {new Date(comment.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs transition"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-muted-foreground">
                    Belum ada komentar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
