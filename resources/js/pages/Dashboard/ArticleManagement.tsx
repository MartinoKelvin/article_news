// src/components/ArticleManagement.tsx
import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';


// Replace external icon import (react-icons) with small local SVG components
const FaEdit: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4h7v7"></path>
    <path d="M21 3l-9 9"></path>
    <path d="M2 20h7l9-9-7-7-9 9v7z"></path>
  </svg>
);

const FaTrash: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
    <path d="M10 11v6"></path>
    <path d="M14 11v6"></path>
    <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const FaEye: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const FaCalendar: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <path d="M16 2v4"></path>
    <path d="M8 2v4"></path>
    <path d="M3 10h18"></path>
  </svg>
);

const FaUser: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M4 21v-2a4 4 0 0 1 3-3.87"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const FaFilter: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12 10 19 14 21 14 12 22 3"></polygon>
  </svg>
);

const FaFileAlt: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <path d="M14 2v6h6"></path>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

interface Article {
  id: number;
  user_id: number;
  title: string;
  slug: string;
  description?: string;
  content: string;
  thumbnail: string;
  views: number;
  created_at: string;
}

const ArticleManagement: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    thumbnail: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'today' | 'popular'>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  // keep the File object (do NOT send base64 in JSON)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [stats, setStats] = useState({ total_articles: 0, total_views: 0, today_articles: 0 });

  // read CSRF token from meta (blade layout already includes it)
  const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

  // Fetch articles from backend
    useEffect(() => {
    fetch("/articles", { headers: { Accept: "application/json" }, credentials: "same-origin" })
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.data ?? [];
        setArticles(items);
        setFilteredArticles(items);
      })
      .catch(() => {
        setArticles([]);
        setFilteredArticles([]);
      });

    // 🔹 Fetch statistik dari endpoint Laravel
    fetch("/dashboard/articles/stats", { headers: { Accept: "application/json" }, credentials: "same-origin" })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats({ total_articles: 0, total_views: 0, today_articles: 0 }));
  }, []);


  // Filter artikel berdasarkan pencarian dan filter
  useEffect(() => {
    let result = articles;

    // Filter berdasarkan pencarian
    if (searchTerm) {
      result = result.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.description ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter berdasarkan kategori
    if (filter === 'today') {
      const today = new Date().toDateString();
      result = result.filter(article =>
        new Date(article.created_at).toDateString() === today
      );
    } else if (filter === 'popular') {
      result = result.filter(article => article.views > 50);
    }

    setFilteredArticles(result);
  }, [articles, searchTerm, filter]);

  // Handle perubahan input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Generate slug otomatis saat judul berubah
    if (name === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  // Handle upload thumbnail
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview(null);
    }
    setThumbnailFile(file);
    // do not set base64 into formData.thumbnail; backend will store uploaded file
    setFormData(prev => ({ ...prev, thumbnail: '' }));
  };

  // Handle submit artikel baru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', formData.title);
    fd.append('slug', formData.slug);
    fd.append('description', formData.description);
    fd.append('content', formData.content);
    if (thumbnailFile) fd.append('thumbnail', thumbnailFile);

    const res = await fetch('/articles', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'X-CSRF-TOKEN': csrf,
      },
      credentials: 'same-origin',
      body: fd, // browser sets Content-Type with boundary
    });

    if (res.ok) {
      const newArticle = await res.json();
      setArticles([newArticle, ...articles]);
      resetForm();
    } else {
      const err = await res.text();
      alert('Gagal menyimpan artikel:\n' + err);
    }
  };

  // Handle edit artikel
  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      description: article.description ?? '',
      content: article.content,
      thumbnail: '',
    });
    // show current thumbnail as preview but do not treat it as upload file
    setThumbnailPreview(article.thumbnail || null);
    setThumbnailFile(null);
    setIsEditing(true);
  };

  // Handle update artikel
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    // Use FormData and method spoofing so file uploads work for updates
    const fd = new FormData();
    fd.append('title', formData.title);
    fd.append('slug', formData.slug);
    fd.append('description', formData.description);
    fd.append('content', formData.content);
    // append file only if user picked a new file
    if (thumbnailFile) fd.append('thumbnail', thumbnailFile);
    // method spoof for Laravel
    fd.append('_method', 'PUT');

    const res = await fetch(`/articles/${editingArticle.id}`, {
      method: 'POST', // using POST with _method=PUT
      headers: {
        'Accept': 'application/json',
        'X-CSRF-TOKEN': csrf,
      },
      credentials: 'same-origin',
      body: fd,
    });

    if (res.ok) {
      const updated = await res.json();
      setArticles(articles.map(a => (a.id === updated.id ? updated : a)));
      setIsEditing(false);
      setEditingArticle(null);
      resetForm();
    } else {
      const err = await res.text();
      alert('Gagal update artikel:\n' + err);
    }
  };

  // Handle hapus artikel
  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    const res = await fetch(`/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'X-CSRF-TOKEN': csrf,
      },
      credentials: 'same-origin',
    });
    if (res.ok) {
      setArticles(articles.filter(a => a.id !== id));
    } else {
      const err = await res.text();
      alert('Gagal menghapus artikel:\n' + err);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      content: '',
      thumbnail: '',
    });
    setThumbnailPreview(null);
  };

  // Toggle filter
  const toggleFilter = () => {
    const filters: ('all' | 'today' | 'popular')[] = ['all', 'today', 'popular'];
    const currentIndex = filters.indexOf(filter);
    setFilter(filters[(currentIndex + 1) % filters.length]);
  };

  // Format tanggal
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };




  const breadcrumbs: BreadcrumbItem[] = [
      {
          title: 'Dashboard',
          href: '/dashboard',
      },
      {
            title: 'Manajemen Artikel',
            href: '/dashboard/articles',
      }


  ];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className="bg-[#0F172A] text-[#F8FAFC] min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Manajemen Artikel</h1>



        {/* Form Artikel */}
        <div className="bg-[#1E293B] rounded-xl mb-6 shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-5">{isEditing ? 'Edit Artikel' : 'Tambah Artikel Baru'}</h2>
            <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-medium">Judul Artikel</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#1e293b] border border-[#38BDF8]/30 text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8]"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Slug</label>
                <div className="flex items-center">
                  <span className="mr-2 text-[#94A3B8]">/artikel/</span>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-[#1e293b] border border-[#38BDF8]/30 text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium">Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#1e293b] border border-[#38BDF8]/30 text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8] min-h-[80px]"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Konten Artikel</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-[#1e293b] border border-[#38BDF8]/30 text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8] min-h-[120px]"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#38BDF8]/10 file:text-[#38BDF8] hover:file:bg-[#38BDF8]/20"
                />
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="mt-3 rounded-lg max-w-xs max-h-[150px] border border-[#38BDF8]/30"
                  />
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsEditing(false);
                    setEditingArticle(null);
                  }}
                  className="px-5 py-2 rounded-lg border border-[#38BDF8] text-[#38BDF8] bg-transparent hover:bg-[#38BDF8] hover:text-white transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-lg font-semibold transition ${isEditing ? 'bg-[#10B981] text-white hover:bg-[#059669]' : 'bg-[#38BDF8] text-white hover:bg-[#60A5FA]'}`}
                >
                  {isEditing ? 'Update Artikel' : 'Simpan Artikel'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Daftar Artikel */}
        <div className="bg-[#1E293B] rounded-xl shadow">
          <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-[#38BDF8]/10">
            <h2 className="text-lg font-semibold mb-3 md:mb-0">Daftar Artikel</h2>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-[#1e293b] border border-[#38BDF8]/30 text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8]"
              />
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8] hover:text-white transition"
                onClick={toggleFilter}
                type="button"
              >
                <FaFilter />
                {filter === 'all' ? 'Semua' : filter === 'today' ? 'Hari Ini' : 'Populer'}
              </button>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-4 border-b border-[#38BDF8]/10 pb-4 last:border-b-0`}
                >
                  <img
                    src={`/storage/${article.thumbnail}`}
                    alt={article.title}
                    className="w-full md:w-[150px] h-[100px] object-cover rounded-lg"
                    />

                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{article.title}</h3>
                    <p className="text-[#94A3B8] mb-2">{article.description}</p>
                    <span className="inline-block bg-[#38BDF8]/20 text-[#38BDF8] px-3 py-1 rounded-full text-xs font-medium mb-2">/artikel/{article.slug}</span>
                    <div className="flex flex-wrap gap-4 text-sm text-[#94A3B8] mt-2">
                      <span className="flex items-center gap-1"><FaEye className="text-[#38BDF8]" />{article.views}</span>
                      <span className="flex items-center gap-1"><FaCalendar className="text-[#38BDF8]" />{formatDate(article.created_at)}</span>
                      <span className="flex items-center gap-1"><FaUser className="text-[#38BDF8]" />Admin</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                      onClick={() => handleEdit(article)}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[#38BDF8] text-[#38BDF8] hover:bg-[#38BDF8] hover:text-white text-sm transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white text-sm transition"
                    >
                      <FaTrash /> Hapus
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center py-16 text-[#94A3B8]">
                <FaFileAlt className="text-5xl mb-3 text-[#38BDF8]" />
                <p>Belum ada artikel yang sesuai dengan pencarian atau filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </AppLayout>
  );
};

export default ArticleManagement;
