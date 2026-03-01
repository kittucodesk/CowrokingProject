import { Link } from "wouter";
import { Building2, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#121212] text-white pt-24 pb-12 rounded-t-[3rem] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-charcoal">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-semibold tracking-wide">
                Aura<span className="text-[#D4AF37]">.</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Curating the world's most premium workspaces. Redefining where and how you do your best work.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#121212] transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#121212] transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#121212] transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Spaces</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/search?type=virtual_office" className="hover:text-white transition-colors">Virtual Office</Link></li>
              <li><Link href="/search?type=coworking" className="hover:text-white transition-colors">Coworking Spaces</Link></li>
              <li><Link href="/search?type=managed_office" className="hover:text-white transition-colors">Managed Offices</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Meeting Rooms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Newsletter</h4>
            <p className="text-sm text-white/60 mb-4">Stay updated with our newest premium locations.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-l-xl px-4 py-3 w-full text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button className="bg-[#D4AF37] text-[#121212] px-4 py-3 rounded-r-xl hover:bg-[#F3E5AB] transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
          <p>© 2025 Aura Workspaces. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
