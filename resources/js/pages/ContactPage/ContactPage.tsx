import { Mail, MessageSquare, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/new/Navbar"
import Footer from "@/components/new/Footer"
import LoadingScreen from "@/components/new/LoadingScreen"
import { useEffect, useState } from "react"

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    privacy: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <LoadingScreen />

  // 🔥 GANTI ke /contact (bukan /contact/submit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      const csrf =
        document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? ""

      const res = await fetch("http://127.0.0.1:8000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": csrf,
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const data = await res.json()
        setSuccess(data.message || "Pesan berhasil dikirim!")
        setFormData({ name: "", email: "", subject: "", message: "", privacy: false })
      } else {
        const err = await res.json()
        setError(err.message || "Terjadi kesalahan, silakan coba lagi.")
      }
    } catch {
      setError("Terjadi kesalahan jaringan. Silakan coba lagi.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 px-6 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Hubungi Kami</h1>
            <p className="text-lg text-muted-foreground">
              Ada pertanyaan atau saran? Silakan hubungi kami melalui form di bawah.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 px-6 border-b border-border">
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
    {/* Email */}
    <Card className="bg-primary/5 border-primary/20 hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
        <a
          href="mailto:martinokelvin99@gmail.com"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          martinokelvin99@gmail.com
        </a>
      </CardContent>
    </Card>

    {/* WhatsApp */}
    <Card className="bg-primary/5 border-primary/20 hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground mb-2">WhatsApp</h3>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          +62 812-3456-7890
        </a>
      </CardContent>
    </Card>

    {/* Lokasi */}
    <Card className="bg-primary/5 border-primary/20 hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground mb-2">Lokasi</h3>
        <a
          href="https://www.google.com/maps?q=Lampung,Indonesia"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 text-sm transition-colors"
        >
          Lampung, Indonesia
        </a>
      </CardContent>
    </Card>
  </div>
</section>


        {/* Form */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Kirim Pesan</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="p-4 bg-red-100 text-red-600 rounded-lg">{error}</div>}
              {success && <div className="p-4 bg-green-100 text-green-700 rounded-lg">{success}</div>}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Anda"
                    className="w-full px-4 py-2 rounded-lg border"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subjek</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Topik pesan"
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Pesan</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tulis pesan Anda..."
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border"
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  className="w-4 h-4 border rounded"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-muted-foreground">
                  Saya setuju dengan{" "}
                  <a href="#" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full gap-2">
                <MessageSquare className="w-4 h-4" />
                Kirim Pesan
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
