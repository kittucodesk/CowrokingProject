import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Building2 } from "lucide-react";
import { CreateWorkspaceModal } from "../CreateWorkspaceModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkPage = location === "/"; // Home page has a dark hero

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "glass py-4" 
            : `py-6 ${isDarkPage ? "bg-transparent text-white" : "bg-transparent text-foreground"}`
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-charcoal shadow-lg group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-serif text-2xl font-semibold tracking-wide">
              Aura<span className="text-[#D4AF37]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${isScrolled || !isDarkPage ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"}`}>Home</Link>
            <Link href="/search" className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${isScrolled || !isDarkPage ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"}`}>Explore Spaces</Link>
            <Link href="/search?type=virtual_office" className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${isScrolled || !isDarkPage ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"}`}>Virtual Office</Link>
            <Link href="/search?type=managed_office" className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${isScrolled || !isDarkPage ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"}`}>Managed</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <CreateWorkspaceModal trigger={
              <button className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                isScrolled || !isDarkPage
                  ? "border-border text-foreground hover:border-[#D4AF37] hover:text-[#D4AF37]" 
                  : "border-white/30 text-white hover:bg-white/10"
              }`}>
                List your space
              </button>
            } />
            <Link href="/search" className="px-6 py-2.5 rounded-full text-sm font-medium bg-[#121212] text-white shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5 transition-all duration-300">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-lg">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl border-b pb-4">Home</Link>
              <Link href="/search" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl border-b pb-4">Explore Spaces</Link>
              <Link href="/search?type=virtual_office" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl border-b pb-4">Virtual Office</Link>
              
              <CreateWorkspaceModal trigger={
                <button className="w-full mt-4 px-6 py-4 rounded-xl text-base font-medium border border-border text-foreground">
                  List your space
                </button>
              } />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
