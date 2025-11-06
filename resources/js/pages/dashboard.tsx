import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },

];

export default function Dashboard() {
    const [articles, setArticles] = useState<any[]>([])
    const [filteredArticles, setFilteredArticles] = useState<any[]>([])
    const [stats, setStats] = useState({ total_articles: 0, total_views: 0, today_articles: 0 });

    // Fetch articles dari backend dan statistik
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

        fetch("/dashboard/articles/stats", { headers: { Accept: "application/json" }, credentials: "same-origin" })
          .then((res) => res.json())
          .then((data) => setStats(data))
          .catch(() => setStats({ total_articles: 0, total_views: 0, today_articles: 0 }));
      }, []);

    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap gap-4 justify-between mb-8">
            <div className="flex-1 min-w-[150px] bg-[#1E293B]/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#38BDF8] mb-1">{stats.total_articles}</div>
              <p>Total Artikel</p>
            </div>
            <div className="flex-1 min-w-[150px] bg-[#1E293B]/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#38BDF8] mb-1">{stats.total_views}</div>
              <p>Total Views</p>
            </div>
            <div className="flex-1 min-w-[150px] bg-[#1E293B]/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#38BDF8] mb-1">{stats.today_articles}</div>
              <p>Artikel Hari Ini</p>
            </div>
          </div>
            </div>
        </AppLayout>
    );
}
