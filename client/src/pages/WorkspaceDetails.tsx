import { useParams, Link } from "wouter";
import { ArrowLeft, MapPin, Users, Star, CheckCircle2, Building2, Calendar, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useWorkspace } from "@/hooks/use-workspaces";

export default function WorkspaceDetails() {
  const params = useParams();
  const id = Number(params.id);
  
  const { data: workspace, isLoading } = useWorkspace(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="font-serif text-4xl mb-4">Space Not Found</h1>
        <Link href="/search" className="text-[#D4AF37] hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </Link>
      </div>
    );
  }

  const typeLabels: Record<string, string> = {
    virtual_office: "Virtual Office",
    coworking: "Coworking Space",
    managed_office: "Managed Office"
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Detail Hero Image */}
        <div className="w-full h-[60vh] mt-20 relative">
          <img src={workspace.imageUrl} alt={workspace.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60"></div>
          <div className="absolute top-8 left-4 sm:left-8 z-10">
            <Link href="/search" className="glass bg-white/80 text-charcoal px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium hover:bg-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-border"
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-[#121212] text-white rounded-full text-xs font-medium uppercase tracking-wider">
                    {typeLabels[workspace.type] || workspace.type}
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37]" /> {Number(workspace.rating).toFixed(1)}
                  </span>
                  {workspace.isFeatured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-charcoal rounded-full text-xs font-bold">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-6 leading-tight">
                  {workspace.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-lg">{workspace.location}, {workspace.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-lg">Up to {workspace.capacity} people</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-serif text-2xl font-medium">About this space</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                    {workspace.description}
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-border"
              >
                <h3 className="font-serif text-2xl font-medium mb-8">Premium Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {workspace.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[#D4AF37]">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_40px_rgb(0,0,0,0.12)] border border-border sticky top-32"
              >
                <div className="mb-6">
                  <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Starting from</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-5xl font-semibold text-charcoal">${workspace.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">Availability</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${workspace.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {workspace.available ? 'Available Now' : 'Waitlist'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">Minimum Term</span>
                    </div>
                    <span className="font-medium">1 Month</span>
                  </div>
                </div>

                <button 
                  disabled={!workspace.available}
                  className="w-full py-4 rounded-xl bg-[#121212] text-white font-semibold text-lg hover:bg-black hover:shadow-xl transition-all duration-300 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {workspace.available ? 'Book this space' : 'Join Waitlist'}
                </button>
                <button className="w-full py-4 rounded-xl bg-white border border-border text-charcoal font-semibold text-lg hover:bg-muted transition-all duration-300">
                  Schedule a Tour
                </button>

                <p className="text-center text-xs text-muted-foreground mt-6">
                  No hidden fees. Transparent pricing guaranteed.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
