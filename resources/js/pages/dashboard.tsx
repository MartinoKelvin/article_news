import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
// Import komponen dari Recharts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [articles, setArticles] = useState<any[]>([]);
  const [stats, setStats] = useState({ total_articles: 0, total_views: 0, today_articles: 0 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);

  // State untuk data grafik
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [articlesChartData, setArticlesChartData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [statusChartData, setStatusChartData] = useState<any[]>([]);

  // Fetch data artikel & statistik
  useEffect(() => {
    setIsLoading(true);
    fetch("/articles", { headers: { Accept: "application/json" }, credentials: "same-origin" })
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.data ?? [];
        setArticles(items);
        setIsLoading(false);
      })
      .catch(() => {
        setArticles([]);
        setIsLoading(false);
      });

    fetch("/dashboard/articles/stats", {
      headers: { Accept: "application/json" },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => setStats({ total_articles: 0, total_views: 0, today_articles: 0 }));
  }, []);

  // Proses data untuk grafik setiap kali data artikel berubah
  useEffect(() => {
    // --- Data untuk Grafik Garis (Jumlah Artikel per Hari) ---
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const articlesByDate = articles.reduce((acc: any, article) => {
      if (!article.created_at) return acc;
      // Format tanggal menjadi YYYY-MM-DD
      const date = new Date(article.created_at).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      // Hitung jumlah artikel, bukan views
      acc[date] += 1;
      return acc;
    }, {});

    // Urutkan data berdasarkan tanggal dan format untuk ditampilkan
    const sortedArticlesData = Object.keys(articlesByDate)
      .sort()
      .map(date => ({
        date: new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
        articles: articlesByDate[date], // Ganti key menjadi 'articles'
      }));
    setArticlesChartData(sortedArticlesData);

    // --- Data untuk Grafik Donat (Distribusi Status) ---
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statusCount = articles.reduce((acc: any, article) => {
      const status = article.status || 'Publish'; // Default ke 'Publish' jika status tidak ada
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Warna untuk setiap status
    const COLORS = {
      published: '#10b981', // hijau
      draft: '#eab308',     // kuning
      archived: '#6b7280',  // abu-abu
    };

    const statusData = Object.keys(statusCount).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: statusCount[key],
      color: COLORS[key as keyof typeof COLORS] || '#94a3b8', // warna default
    }));
    setStatusChartData(statusData);

  }, [articles]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">

        {/* Statistik Ringkas */}
        <div className="flex flex-wrap gap-6 justify-between mb-8">
          <div className="flex-1 min-w-[200px] bg-secondary rounded-xl border border-border p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary mb-2">{stats.total_articles}</div>
            <p className="text-muted-foreground">Total Artikel</p>
          </div>

          <div className="flex-1 min-w-[200px] bg-secondary rounded-xl border border-border p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary mb-2">{stats.today_articles}</div>
            <p className="text-muted-foreground">Artikel Hari Ini</p>
          </div>
        </div>

        {/* Bagian Grafik */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Grafik Jumlah Artikel per Hari */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Tren Penambahan Artikel</h2>
            {articlesChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={articlesChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="articles" stroke="#3b82f6" strokeWidth={2} name="Jumlah Artikel" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                <p>Belum cukup data untuk menampilkan grafik.</p>
              </div>
            )}
          </div>

          {/* Grafik Distribusi Status */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Distribusi Status</h2>
            {statusChartData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {statusChartData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                <p>Belum ada data artikel.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
