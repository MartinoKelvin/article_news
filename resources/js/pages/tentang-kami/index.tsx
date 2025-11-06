import { Link } from "@inertiajs/react"
import { Zap, Users, Target, Award } from "lucide-react"
import Navbar from "@/components/new/Navbar"
import Footer from "@/components/new/Footer"
import { useState, useEffect } from "react"
import LoadingScreen from "@/components/new/LoadingScreen"

const teamMembers = [
  {
    name: "Martino Kelvin",
    role: "Project Manager",
    bio: "Memimpin pengembangan dan koordinasi tim untuk memastikan visi proyek berjalan dengan lancar.",
    image: "/cowo.png",
  },
  {
    name: "Diva",
    role: "UI/UX Designer",
    bio: "Merancang antarmuka yang intuitif dan pengalaman pengguna yang menarik.",
    image: "/cewek.png",
  },
  {
    name: "Aji",
    role: "UI/UX Designer",
    bio: "Bertanggung jawab pada desain visual dan konsistensi estetika aplikasi.",
    image: "/cowo.png",
  },
  {
    name: "Ikhsan",
    role: "Backend Developer",
    bio: "Mengembangkan logika server, API, dan memastikan keamanan serta performa aplikasi.",
    image: "/cowo.png",
  },
  {
    name: "Prima",
    role: "Backend Developer",
    bio: "Menangani integrasi database dan pengelolaan data untuk menjaga kestabilan sistem.",
    image: "/cowo.png",
  },
  {
    name: "Faiz",
    role: "Frontend Developer",
    bio: "Membangun tampilan interaktif dan responsif menggunakan framework modern.",
    image: "/cowo.png",
  },
  {
    name: "Audy",
    role: "Frontend Developer",
    bio: "Berfokus pada performa UI dan pengalaman pengguna di sisi client.",
    image: "/cewek.png",
  },
  {
    name: "Al-qoriah",
    role: "Frontend Developer",
    bio: "Mengimplementasikan desain menjadi komponen dinamis yang mudah digunakan.",
    image: "/cewek.png",
  },
];


const values = [
  {
    icon: Target,
    title: "Akurat & Independen",
    description: "Kami menyajikan berita teknologi dengan standar jurnalisme tertinggi, bebas bias komersial.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description: "Kami mendengarkan feedback pembaca dan terus berkembang bersama komunitas.",
  },
  {
    icon: Zap,
    title: "Inovasi Berkelanjutan",
    description: "Selalu mencari cara baru untuk menyajikan berita teknologi yang lebih engaging dan informatif.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Komitmen kami adalah memberikan konten berkualitas tinggi yang bermanfaat bagi pembaca.",
  },
]

export default function AboutPage() {

    const [isLoading, setIsLoading] = useState(true)

          useEffect(() => {
              const timer = setTimeout(() => setIsLoading(false), 1000)
              return () => clearTimeout(timer)
            }, [])

          if (isLoading) {
              return (
                <>
                <LoadingScreen />
                </>
              )
            }
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-6 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Tentang TechNews
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Portal berita dan analisis teknologi yang menghadirkan informasi terdepan tentang perkembangan industri
              tech di Asia Tenggara dan dunia.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-6 border-b border-border">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Misi Kami</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                Membawa berita dan analisis teknologi terbaru yang akurat, mendalam, dan mudah dipahami kepada pembaca
                di seluruh Asia Tenggara.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground mb-6">
                Kami percaya bahwa teknologi membentuk masa depan, dan setiap orang berhak mendapatkan informasi
                berkualitas untuk membuat keputusan yang tepat di era digital ini.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Visi Kami</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                Menjadi sumber berita teknologi paling terpercaya dan berpengaruh di Asia Tenggara yang menginspirasi
                inovasi dan pemahaman mendalam tentang teknologi.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground mb-6">
                Melalui journalism yang berkualitas, kami ingin membangun jembatan antara komunitas tech dengan
                masyarakat luas untuk menciptakan ecosystem teknologi yang lebih sehat.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-6 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Nilai-Nilai Kami</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <div
                    key={value.title}
                    className="bg-primary/5 border border-primary/20 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 px-6 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Tim Kami</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name}>
                  <div className="mb-4 rounded-lg overflow-hidden bg-muted h-48">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  )
}
