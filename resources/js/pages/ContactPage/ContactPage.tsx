import { Mail, MessageSquare, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/new/Navbar"
import Footer from "@/components/new/Footer"


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-6 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Hubungi Kami</h1>
            <p className="text-lg text-muted-foreground">
              Ada pertanyaan atau saran? Kami sangat senang mendengar dari Anda. Silakan hubungi kami melalui form di
              bawah atau informasi kontak yang tersedia.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 px-6 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
                  <a href="mailto:contact@technews.id" className="text-primary hover:text-primary/80 transition-colors">
                    contact@technews.id
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Telepon</h3>
                  <a href="tel:+62215551234" className="text-primary hover:text-primary/80 transition-colors">
                    +62 (021) 5551234
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">Lokasi</h3>
                  <p className="text-muted-foreground text-sm">Jakarta, Indonesia</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Kirim Pesan</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="email"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Subjek</label>
                <input
                  type="text"
                  placeholder="Pertanyaan tentang..."
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Pesan</label>
                <textarea
                  placeholder="Tulis pesan Anda di sini..."
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary/50"
                />
                <label htmlFor="privacy" className="text-sm text-muted-foreground">
                  Saya setuju dengan{" "}
                  <a href="#" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button size="lg" className="w-full gap-2">
                <MessageSquare className="w-4 h-4" />
                Kirim Pesan
              </Button>
            </form>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-16 px-6 border-t border-border bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ikuti Kami di Media Sosial</h2>
            <p className="text-muted-foreground mb-8">
              Dapatkan update berita terbaru dan join komunitas tech kami di media sosial.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="#"
                className="px-6 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
              >
                Twitter/X
              </a>
              <a
                href="#"
                className="px-6 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="px-6 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="px-6 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
