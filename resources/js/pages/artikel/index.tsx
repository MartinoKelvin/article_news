// src/components/ArticlePage.tsx
import { useState, useEffect } from 'react';
import { Link  } from "@inertiajs/react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  fullText: string;
}

const ArticlePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState(6);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Color palette
  const colors = {
    primary: '#38BDF8',
    background: '#0F172A',
    card: '#1E293B',
    text: '#F8FAFC',
  };

  // Sample article data
  const sampleArticles: Article[] = [
    {
      id: 1,
      title: "Revolusi AI dalam Industri Teknologi Modern",
      excerpt: "Kecanggihan kecerdasan buatan mengubah cara kita berinteraksi dengan teknologi. Dari chatbot hingga analisis data, AI menjadi fondasi inovasi global.",
      category: "teknologi",
      date: "12 Des 2023",
      readTime: "5 menit",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&h=300",
      fullText: "Revolusi AI dalam Industri Teknologi Modern..."
    },
    {
      id: 2,
      title: "Penemuan Terbaru dalam Penelitian Kanker",
      excerpt: "Para peneliti mengumumkan kemajuan signifikan dalam pengobatan kanker melalui terapi gen dan imunoterapi baru yang menjanjikan tingkat kesembuhan lebih tinggi.",
      category: "sains",
      date: "11 Des 2023",
      readTime: "7 menit",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&h=300",
      fullText: "Penemuan Terbaru dalam Penelitian Kanker..."
    },
    {
      id: 3,
      title: "Strategi Bisnis Digital untuk Startup Sukses",
      excerpt: "Pelajari strategi digital yang efektif untuk membangun startup yang sukses di era digital. Dari branding hingga monetisasi, semua yang perlu Anda ketahui.",
      category: "bisnis",
      date: "10 Des 2023",
      readTime: "6 menit",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&h=300",
      fullText: "Strategi Bisnis Digital untuk Startup Sukses..."
    },
    {
      id: 4,
      title: "Manfaat Olahraga untuk Kesehatan Mental",
      excerpt: "Studi terbaru menunjukkan bahwa olahraga rutin tidak hanya baik untuk tubuh, tetapi juga memiliki dampak positif yang signifikan terhadap kesehatan mental.",
      category: "kesehatan",
      date: "9 Des 2023",
      readTime: "4 menit",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&h=300",
      fullText: "Manfaat Olahraga untuk Kesehatan Mental..."
    },
    {
      id: 5,
      title: "Edukasi Digital Era Baru",
      excerpt: "Transformasi pendidikan melalui teknologi digital membuka peluang baru untuk pembelajaran yang lebih personal dan interaktif.",
      category: "pendidikan",
      date: "8 Des 2023",
      readTime: "5 menit",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=300",
      fullText: "Edukasi Digital Era Baru..."
    },
    {
      id: 6,
      title: "Teknologi Wearable Olahraga Terbaru",
      excerpt: "Peralatan wearable terbaru memberikan atlet data real-time tentang kinerja mereka, membantu mencapai target latihan yang lebih efektif.",
      category: "olahraga",
      date: "7 Des 2023",
      readTime: "4 menit",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=400&h=300",
      fullText: "Teknologi Wearable Olahraga Terbaru..."
    },
    {
      id: 7,
      title: "Blockchain dan Masa Depan Keuangan Digital",
      excerpt: "Teknologi blockchain sedang mengubah lanskap keuangan global dengan sistem transaksi yang aman dan transparan.",
      category: "teknologi",
      date: "6 Des 2023",
      readTime: "6 menit",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&h=300",
      fullText: "Blockchain dan Masa Depan Keuangan Digital..."
    },
    {
      id: 8,
      title: "Inovasi Energi Terbarukan untuk Masa Depan",
      excerpt: "Penelitian terbaru menunjukkan kemajuan signifikan dalam teknologi energi surya dan angin yang lebih efisien dan terjangkau.",
      category: "sains",
      date: "5 Des 2023",
      readTime: "7 menit",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&h=300",
      fullText: "Inovasi Energi Terbarukan untuk Masa Depan..."
    }
  ];

  useEffect(() => {
    setArticles(sampleArticles);
    setFilteredArticles(sampleArticles);
  }, []);

  useEffect(() => {
    let result = articles;

    // Filter by category
    if (currentCategory !== 'all') {
      result = result.filter(article => article.category === currentCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(article =>
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term)
      );
    }

    setFilteredArticles(result);
    setDisplayedArticles(6);
  }, [currentCategory, searchTerm, articles]);

  const loadMoreArticles = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedArticles(prev => prev + 3);
      setIsLoading(false);
    }, 1000);
  };

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'teknologi', name: 'Teknologi' },
    { id: 'sains', name: 'Sains' },
    { id: 'bisnis', name: 'Bisnis' },
    { id: 'kesehatan', name: 'Kesehatan' },
    { id: 'pendidikan', name: 'Pendidikan' },
    { id: 'olahraga', name: 'Olahraga' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-slate-700/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8 text-white">
                                <a href="#" className="flex items-center space-x-2 text-[#38BDF8] hover:text-[#60A5FA] transition">
                                    <span className="text-xl font-bold">TechNews+</span>
                                </a>
                                <div className="hidden md:flex space-x-6">
                                    <Link href="/" className="hover:text-[#38BDF8] transition">Beranda</Link>
                                    <Link href="/artikel" className="hover:text-[#38BDF8] transition">Artikel</Link>
                                    <Link href="#" className="hover:text-[#38BDF8] transition">Review</Link>
                                    <Link href="#" className="hover:text-[#38BDF8] transition">Event</Link>
                                </div>
            </div>

          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Cari artikel..."
              className="w-full px-4 py-2 rounded-full bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              style={{ color: colors.text }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-slate-700 transition-colors"
              style={{ color: colors.primary }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-4 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                currentCategory === category.id
                  ? 'bg-cyan-500 text-slate-900'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
              style={currentCategory === category.id ? { backgroundColor: colors.primary, color: colors.background } : { color: colors.text }}
              onClick={() => setCurrentCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(0, displayedArticles).map((article) => (
            <div
              key={article.id}
              className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              onClick={() => openArticle(article)}
            >
              <div className="rounded-xl overflow-hidden border border-slate-700/30 group-hover:border-cyan-400 transition-all">
                {/* Article Image */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Article Content */}
                <div className="p-5">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 bg-cyan-500/10 text-cyan-400">
                    {article.category}
                  </span>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors" style={{ color: colors.text }}>
                    {article.title}
                  </h3>

                  <p className="text-slate-400 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex justify-between text-sm text-slate-500">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayedArticles < filteredArticles.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreArticles}
              disabled={isLoading}
              className="px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center mx-auto"
              style={{
                backgroundColor: colors.primary,
                color: colors.background
              }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memuat...
                </>
              ) : (
                <>
                  Load More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </main>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-slate-800 rounded-2xl overflow-hidden transform transition-all duration-300 scale-95 animate-scaleIn">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-700 transition-colors"
              style={{ color: colors.text }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Article Image */}
              <div className="rounded-xl overflow-hidden mb-6">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Article Details */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 bg-cyan-500/10 text-cyan-400">
                  {selectedArticle.category}
                </span>

                <h1 className="text-3xl font-bold mb-4" style={{ color: colors.text }}>
                  {selectedArticle.title}
                </h1>

                <div className="flex space-x-4 text-sm text-slate-500 mb-6">
                  <span>{selectedArticle.date}</span>
                  <span>{selectedArticle.readTime}</span>
                </div>

                <div className="prose prose-invert max-w-none" style={{ color: colors.text }}>
                  <p>{selectedArticle.fullText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
