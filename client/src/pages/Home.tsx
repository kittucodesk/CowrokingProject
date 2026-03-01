import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import useEmblaCarousel from "embla-carousel-react";
import { Search, MapPin, Building2, Users, ArrowRight, ChevronRight, ChevronLeft, Star, Quote, Plus, Minus } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WorkspaceCard } from "@/components/WorkspaceCard";
import { useWorkspaces } from "@/hooks/use-workspaces";

const clients = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" },
  { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_with_text.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO at TechFlow",
    content: "Aura has completely transformed how our team works. The managed office space is precisely what we needed for our scale-up phase.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Freelance Designer",
    content: "The coworking environment is inspiring and professional. I've met incredible collaborators here that have grown my business.",
    avatar: "https://i.pravatar.cc/150?u=michael",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Operations Manager",
    content: "Setting up our virtual office was seamless. Aura provides the prestige our brand needs with zero overhead.",
    avatar: "https://i.pravatar.cc/150?u=elena",
    rating: 5
  }
];

const faqs = [
  {
    question: "How do I book a tour of a workspace?",
    answer: "You can book a tour directly through our website by clicking the 'Talk to an Expert' button or selecting a specific location and choosing a tour date."
  },
  {
    question: "What is included in the Managed Office package?",
    answer: "Managed offices include customized layout, branding, dedicated IT support, utilities, cleaning, and access to all building amenities."
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Absolutely! Aura is built for flexibility. You can upgrade from a virtual office to coworking or managed suites as your team grows."
  },
  {
    question: "Are meeting rooms included in the membership?",
    answer: "Depending on your plan, you receive monthly credits for meeting room bookings. Additional hours can be booked at member-exclusive rates."
  }
];

const blogs = [
  {
    id: 1,
    title: "The Future of Hybrid Work in 2026",
    excerpt: "How companies are balancing remote flexibility with the need for high-end corporate hubs.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80",
    date: "March 15, 2026"
  },
  {
    id: 2,
    title: "Designing for Productivity",
    excerpt: "Why the architecture of your workspace matters more than you think.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80",
    date: "March 10, 2026"
  },
  {
    id: 3,
    title: "Virtual Offices: A Global Strategy",
    excerpt: "Expanding your business footprint internationally without the physical footprint.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    date: "March 05, 2026"
  }
];

const locations = ["New York", "London", "San Francisco", "Austin", "Seattle", "Singapore", "Berlin", "Dubai"];

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

      {/* MARQUEE CLIENTS */}
      <section className="py-20 bg-white overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Trusted by Global Industry Leaders</p>
        </div>
        <div className="relative flex overflow-x-hidden">
          <div className="py-12 animate-marquee flex whitespace-nowrap">
            {[...clients, ...clients].map((client, i) => (
              <div key={i} className="mx-12 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <img src={client.logo} alt={client.name} className="h-8 w-auto" />
              </div>
            ))}
          </div>
          <div className="absolute top-0 py-12 animate-marquee2 flex whitespace-nowrap">
            {[...clients, ...clients].map((client, i) => (
              <div key={i} className="mx-12 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <img src={client.logo} alt={client.name} className="h-8 w-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY LOCATIONS */}
      <section className="py-32 bg-beige-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-semibold mb-4">Nearby Locations</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Find an Aura space in the world's most dynamic business hubs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {locations.map((loc, i) => (
              <motion.div 
                key={loc}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/search?city=${loc}`} className="block p-8 rounded-2xl bg-white border border-border hover-elevate group transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">{loc}</span>
                    <ArrowRight className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/3">
              <span className="text-gold font-medium uppercase tracking-widest text-sm mb-4 block">Testimonials</span>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">What our members say.</h2>
              <p className="text-muted-foreground text-lg mb-8">Join a community of 120,000+ professionals who have found their home at Aura.</p>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-gold text-gold" />)}
              </div>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.slice(0, 2).map((t, i) => (
                <div key={t.id} className="p-8 rounded-[2rem] bg-beige-dark/20 relative">
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-gold/10" />
                  <p className="text-lg mb-8 italic text-charcoal/80">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h4 className="font-bold text-charcoal">{t.name}</h4>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="py-32 bg-beige-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-serif text-4xl font-semibold mb-4">Latest Insights</h2>
              <p className="text-muted-foreground text-lg">Exploring the intersection of work, life, and design.</p>
            </div>
            <Link href="#" className="hidden md:flex items-center gap-2 font-medium group">
              Read all articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((post, i) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full glass text-xs font-semibold text-white uppercase tracking-wider">Insight</div>
                </div>
                <p className="text-sm text-gold font-medium mb-3">{post.date}</p>
                <h3 className="font-serif text-2xl font-semibold mb-3 group-hover:text-gold transition-colors">{post.title}</h3>
                <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-4xl font-semibold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border pb-6">
                <button className="w-full flex items-center justify-between text-left group">
                  <span className="text-xl font-medium group-hover:text-gold transition-colors">{faq.question}</span>
                  <Plus className="w-6 h-6 text-gold" />
                </button>
                <div className="mt-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            ))}
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
