    import { usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"

interface Message {
  id: number
  name: string
  email: string
  subject: string | null
  message: string
  created_at: string
}

interface PageProps {
  messages: {
    data: Message[]
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export default function MessagePage() {
  const { messages } = usePage<PageProps>().props

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return

    const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? ""

    try {
      const res = await fetch(`/dashboard/message/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "X-CSRF-TOKEN": csrf,
        },
        credentials: "same-origin",
      })

      if (res.ok) {
        // Refresh the page to show updated list
        window.location.reload()
      } else {
        alert("Gagal menghapus pesan")
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus pesan")
    }
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Pesan Masuk", href: "/dashboard/message" },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">📬 Daftar Pesan Masuk</h1>

        <div className="overflow-x-auto bg-background border rounded-xl shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-muted text-foreground">
              <tr>
                <th className="py-3 px-4 text-left border-b">Nama</th>
                <th className="py-3 px-4 text-left border-b">Email</th>
                <th className="py-3 px-4 text-left border-b">Subjek</th>
                <th className="py-3 px-4 text-left border-b">Pesan</th>
                <th className="py-3 px-4 text-center border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {messages.data.length > 0 ? (
                messages.data.map((msg) => (
                  <tr
                    key={msg.id}
                    className="hover:bg-accent border-b transition-colors duration-150"
                  >
                    <td className="py-3 px-4">{msg.name}</td>
                    <td className="py-3 px-4">{msg.email}</td>
                    <td className="py-3 px-4">{msg.subject || "-"}</td>
                    <td className="py-3 px-4 max-w-lg text-sm text-muted-foreground">
                      {msg.message}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(msg.id)}
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
                    Tidak ada pesan masuk.
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
