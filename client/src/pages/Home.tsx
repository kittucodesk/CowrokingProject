import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import useEmblaCarousel from "embla-carousel-react";
import { Search, MapPin, Building2, Users, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WorkspaceCard } from "@/components/WorkspaceCard";
import { useWorkspaces } from "@/hooks/use-workspaces";

export default function Home() {
  const [_, setLocation] = useLocation();
  const [searchCity, setSearchCity] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchCapacity, setSearchCapacity] = useState("");

  const { data: workspaces, isLoading } = useWorkspaces();
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity) params.append("city", searchCity);
    if (searchType) params.append("type", searchType);
    if (searchCapacity) params.append("minCapacity", searchCapacity);
    setLocation(`/search?${params.toString()}`);
  };

  const featured = workspaces?.filter(w => w.isFeatured) || [];
  const virtualOffices = workspaces?.filter(w => w.type === 'virtual_office').slice(0, 3) || [];
  const coworking = workspaces?.filter(w => w.type === 'coworking').slice(0, 3) || [];
  const managed = workspaces?.filter(w => w.type === 'managed_office').slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center pt-20 overflow-hidden">
        {/* landing page hero luxury office */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            alt="Luxury Office" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/20 glass text-white/90 text-sm font-medium"
          >
            Elevate Your Work Experience
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-6 tracking-tight text-balance max-w-4xl"
          >
            Find Your Perfect <br/><span className="gold-gradient-text italic">Workspace.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mb-12"
          >
            Discover premium coworking spaces, bespoke managed offices, and prestigious virtual addresses across the globe.
          </motion.p>

          {/* Search Bar */}
          <motion.form 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onSubmit={handleSearch}
            className="w-full max-w-4xl glass-dark rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row items-center gap-2"
          >
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-white/10">
              <MapPin className="w-5 h-5 text-[#D4AF37]" />
              <input 
                type="text" 
                placeholder="Where do you want to work?" 
                value={searchCity}
                onChange={e => setSearchCity(e.target.value)}
                className="bg-transparent border-none text-white placeholder:text-white/50 focus:outline-none w-full"
              />
            </div>
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-white/10">
              <Building2 className="w-5 h-5 text-[#D4AF37]" />
              <select 
                value={searchType}
                onChange={e => setSearchType(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none w-full appearance-none cursor-pointer"
              >
                <option value="" className="text-charcoal">All Workspace Types</option>
                <option value="virtual_office" className="text-charcoal">Virtual Office</option>
                <option value="coworking" className="text-charcoal">Coworking Space</option>
                <option value="managed_office" className="text-charcoal">Managed Office</option>
              </select>
            </div>
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-3">
              <Users className="w-5 h-5 text-[#D4AF37]" />
              <input 
                type="number" 
                placeholder="Capacity (seats)" 
                value={searchCapacity}
                onChange={e => setSearchCapacity(e.target.value)}
                className="bg-transparent border-none text-white placeholder:text-white/50 focus:outline-none w-full"
              />
            </div>
            <button type="submit" className="w-full md:w-auto bg-[#D4AF37] hover:bg-[#F3E5AB] text-charcoal px-8 py-4 rounded-xl md:rounded-full font-semibold transition-colors flex items-center justify-center gap-2 shrink-0">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </motion.form>
        </div>
      </section>

      {/* FEATURED SPACES */}
      {featured.length > 0 && (
        <section className="py-24 bg-beige-dark/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-serif text-4xl font-semibold mb-4">Featured Spaces</h2>
                <p className="text-muted-foreground text-lg max-w-2xl">Handpicked premium locations designed to inspire productivity and impress your clients.</p>
              </div>
              <div className="hidden md:flex gap-4">
                <button onClick={() => emblaApi?.scrollPrev()} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => emblaApi?.scrollNext()} className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {featured.map(space => (
                  <div key={space.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                    <WorkspaceCard workspace={space} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CATEGORY: MANAGED OFFICES */}
      <section className="py-32 bg-[#121212] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#D4AF37] font-medium tracking-wider uppercase text-sm mb-4 block">Bespoke Solutions</span>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6 text-balance">Managed Offices</h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Fully customized, private headquarters designed around your brand's identity and operational needs. Zero capital expenditure, complete peace of mind.
              </p>
            </div>
            <Link href="/search?type=managed_office" className="group flex items-center gap-2 text-[#D4AF37] font-medium hover:text-[#F3E5AB] transition-colors shrink-0 border-b border-[#D4AF37]/30 pb-1">
              Explore Managed Offices
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1,2,3].map(i => <div key={i} className="h-96 rounded-3xl bg-white/5 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {managed.map((space, i) => (
                <div key={space.id} className="group">
                  <div className="relative h-80 rounded-[2rem] overflow-hidden mb-6">
                    <img src={space.imageUrl} alt={space.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium mb-2">{space.title}</h3>
                  <div className="flex justify-between items-center text-white/60 text-sm">
                    <span>{space.city}</span>
                    <span className="text-white font-medium">From ${space.price}/mo</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY: VIRTUAL & COWORKING */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Coworking */}
          <div className="mb-32">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="font-serif text-4xl font-semibold mb-4">Coworking Spaces</h2>
                <p className="text-muted-foreground text-lg max-w-2xl">Dynamic shared environments fostering collaboration and innovation.</p>
              </div>
              <Link href="/search?type=coworking" className="group flex items-center gap-2 text-charcoal font-medium hover:text-[#D4AF37] transition-colors shrink-0">
                View all Coworking <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coworking.map((space, i) => <WorkspaceCard key={space.id} workspace={space} index={i} />)}
            </div>
          </div>

          {/* Virtual Office */}
          <div>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="font-serif text-4xl font-semibold mb-4">Virtual Offices</h2>
                <p className="text-muted-foreground text-lg max-w-2xl">Establish a prestigious business address without the physical overhead.</p>
              </div>
              <Link href="/search?type=virtual_office" className="group flex items-center gap-2 text-charcoal font-medium hover:text-[#D4AF37] transition-colors shrink-0">
                View all Virtual Offices <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {virtualOffices.map((space, i) => <WorkspaceCard key={space.id} workspace={space} index={i} />)}
            </div>
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 bg-beige-dark/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-4xl md:text-5xl font-serif font-semibold text-charcoal mb-2">
                <CountUp end={50} suffix="+" duration={2.5} enableScrollSpy scrollSpyOnce />
              </div>
              <p className="text-muted-foreground font-medium">Cities Worldwide</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="text-4xl md:text-5xl font-serif font-semibold text-charcoal mb-2">
                <CountUp end={120} suffix="k" duration={2.5} enableScrollSpy scrollSpyOnce />
              </div>
              <p className="text-muted-foreground font-medium">Happy Members</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="text-4xl md:text-5xl font-serif font-semibold text-charcoal mb-2">
                <CountUp end={500} suffix="+" duration={2.5} enableScrollSpy scrollSpyOnce />
              </div>
              <p className="text-muted-foreground font-medium">Premium Spaces</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="text-4xl md:text-5xl font-serif font-semibold text-charcoal mb-2">
                <CountUp end={99} suffix="%" duration={2.5} enableScrollSpy scrollSpyOnce />
              </div>
              <p className="text-muted-foreground font-medium">Client Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
        {/* landing page cta modern building abstract */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" alt="Building Abstract" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/90" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-6xl font-semibold text-white mb-6">Ready to elevate your workspace?</h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">Join the world's most innovative companies. Discover a space that matches your ambition.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search" className="px-8 py-4 rounded-full bg-[#D4AF37] text-charcoal font-semibold text-lg hover:bg-[#F3E5AB] hover:scale-105 transition-all duration-300">
              Browse Locations
            </Link>
            <button className="px-8 py-4 rounded-full bg-white/10 text-white font-semibold text-lg border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300">
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
