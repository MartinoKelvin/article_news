"use client";

import { useState } from "react";
import { Link } from "@inertiajs/react"; // Changed from react-router-dom to inertia
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/new/ThemeToggle";

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="border-b border-border bg-background sticky top-0 z-50">
			<div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
				{/* Logo + Brand */}
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
						<span className="text-primary-foreground font-bold text-lg">T</span>
					</div>
					<Link
						href="/" // Changed 'to' to 'href'
						className="text-xl font-bold text-foreground hover:text-primary transition-colors"
					>
						TechNews
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-8">
					<Link
						href="/" // Changed 'to' to 'href'
						className="text-sm font-medium text-foreground hover:text-primary transition-colors"
					>
						Home
					</Link>
					<Link
						href="/artikel" // Changed 'to' to 'href'
						className="text-sm font-medium text-foreground hover:text-primary transition-colors"
					>
						Artikel
					</Link>
					<Link
						href="/tentangkami" // Changed 'to' to 'href'
						className="text-sm font-medium text-foreground hover:text-primary transition-colors"
					>
						Tentang Kami
					</Link>
					<Link
						href="/contact" // Changed 'to' to 'href'
						className="text-sm font-medium text-foreground hover:text-primary transition-colors"
					>
						Kontak
					</Link>
                    <ThemeToggle />
				</nav>

				{/* Mobile Menu Button */}
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
				</Button>
			</div>

			{/* Mobile Navigation Menu */}
			{mobileMenuOpen && (
				<nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm animate-in slide-in-from-top-2">
					<div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
						<Link
							href="/" // Changed 'to' to 'href'
							className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
							onClick={() => setMobileMenuOpen(false)}
						>
							Home
						</Link>
						<Link
							href="/artikel" // Changed 'to' to 'href'
							className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
							onClick={() => setMobileMenuOpen(false)}
						>
							Artikel
						</Link>
						<Link
							href="/about" // Changed 'to' to 'href'
							className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
							onClick={() => setMobileMenuOpen(false)}
						>
							Tentang Kami
						</Link>
						<Link
							href="/contact" // Changed 'to' to 'href'
							className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
							onClick={() => setMobileMenuOpen(false)}
						>
							Kontak
						</Link>
					</div>
				</nav>
			)}
		</header>
	);
}
