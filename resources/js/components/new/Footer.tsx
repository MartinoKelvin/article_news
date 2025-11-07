// resources/js/Components/Footer.jsx
import { Link } from "@inertiajs/react"
import { Linkedin, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>

            <img
    src="/logo-light.png"
    alt="TechNews Logo"
    className="w-16 h-16 block dark:hidden transition-all"
  />

  {/* Logo untuk Dark Mode */}
  <img
    src="/logo-dark.png"
    alt="TechNews Logo"
    className="w-16 h-16 hidden dark:block transition-all"
  />
            <h4 className="font-semibold text-foreground mb-4">TechNews</h4>
            <p className="text-sm text-muted-foreground">
              Portal berita dan analisis teknologi terkini di Asia Tenggara.
              Tetap terupdate dengan inovasi terbaru.
            </p>
          </div>
          <div>

          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/artikel" className="hover:text-foreground transition-colors">
                  Artikel
                </Link>
              </li>
              <li>
                <Link href="/tentangkami" className="hover:text-foreground transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>



          {/* Sosial Media */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a
                href="https://x.com/ITERAOfficial/"
                className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/himpunan-mahasiswa-informatika-itera/"
                className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/hmif.itera/"
                className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 TechNews. Semua hak dilindungi.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
