import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { SlidersHorizontal, Map as MapIcon, Grid3X3 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WorkspaceCard } from "@/components/WorkspaceCard";
import { useWorkspaces } from "@/hooks/use-workspaces";

export default function Search() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    type: searchParams.get("type") || "",
    minCapacity: searchParams.get("minCapacity") || "",
    maxPrice: searchParams.get("maxPrice") || "10000",
  });

  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Re-sync filters if URL changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({
      city: params.get("city") || "",
      type: params.get("type") || "",
      minCapacity: params.get("minCapacity") || "",
      maxPrice: params.get("maxPrice") || "10000",
    });
  }, [location]);

  const { data: workspaces, isLoading } = useWorkspaces({
    city: filters.city || undefined,
    type: filters.type || undefined,
    minCapacity: filters.minCapacity ? Number(filters.minCapacity) : undefined,
    maxPrice: Number(filters.maxPrice),
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] flex flex-col">
      <Navbar />

      <div className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 border-b border-border bg-white sticky top-0 z-30 shadow-sm mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="font-serif text-3xl font-semibold">Explore Spaces</h1>
          
          <div className="flex items-center gap-3 bg-muted p-1.5 rounded-xl">
            <button 
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-charcoal' : 'text-muted-foreground hover:text-charcoal'}`}
            >
              <Grid3X3 className="w-4 h-4" /> Grid
            </button>
            <button 
              onClick={() => setViewMode("map")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-white shadow-sm text-charcoal' : 'text-muted-foreground hover:text-charcoal'}`}
            >
              <MapIcon className="w-4 h-4" /> Map
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-3xl p-6 border border-border sticky top-48">
            <div className="flex items-center gap-2 font-serif text-xl font-medium mb-6">
              <SlidersHorizontal className="w-5 h-5 text-[#D4AF37]" />
              Filters
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Location</label>
                <input 
                  type="text" 
                  value={filters.city}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                  placeholder="e.g. New York" 
                  className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Workspace Type</label>
                <select 
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Types</option>
                  <option value="virtual_office">Virtual Office</option>
                  <option value="coworking">Coworking Space</option>
                  <option value="managed_office">Managed Office</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Max Price</label>
                  <span className="text-sm font-medium">${filters.maxPrice}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="10000" 
                  step="100"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Min Capacity</label>
                <input 
                  type="number" 
                  value={filters.minCapacity}
                  onChange={(e) => handleFilterChange("minCapacity", e.target.value)}
                  placeholder="e.g. 10" 
                  className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Results Grid/Map */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 rounded-3xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : workspaces?.length === 0 ? (
            <div className="bg-white rounded-3xl border border-border p-16 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-2xl font-medium mb-2">No spaces found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => setFilters({ city: "", type: "", minCapacity: "", maxPrice: "10000" })}
                className="mt-6 text-[#D4AF37] font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === "map" ? (
            <div className="bg-muted rounded-3xl border border-border h-[600px] flex items-center justify-center relative overflow-hidden">
              {/* Placeholder for map */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
              <div className="text-center relative z-10">
                <MapIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">Interactive Map View Placeholder</p>
                <p className="text-sm text-muted-foreground/70">(Requires Map API Integration)</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workspaces?.map((space, i) => (
                <WorkspaceCard key={space.id} workspace={space} index={i} />
              ))}
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
