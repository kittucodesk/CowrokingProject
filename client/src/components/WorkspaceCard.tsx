import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Users, Star, ArrowUpRight } from "lucide-react";
import type { WorkspaceResponse } from "@shared/routes";

interface WorkspaceCardProps {
  workspace: WorkspaceResponse;
  index?: number;
}

export function WorkspaceCard({ workspace, index = 0 }: WorkspaceCardProps) {
  const typeLabels: Record<string, string> = {
    virtual_office: "Virtual Office",
    coworking: "Coworking",
    managed_office: "Managed Office"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={workspace.imageUrl} 
          alt={workspace.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-charcoal">
          {typeLabels[workspace.type] || workspace.type}
        </div>
        <div className="absolute top-4 right-4 bg-[#121212]/80 backdrop-blur-md px-2.5 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1">
          <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
          {Number(workspace.rating).toFixed(1)}
        </div>
        {workspace.isFeatured && (
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] px-3 py-1 rounded-md text-xs font-bold text-charcoal shadow-lg">
            Featured
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-serif text-xl font-semibold text-foreground line-clamp-1">
            {workspace.title}
          </h3>
          <div className="text-right shrink-0">
            <span className="block font-semibold text-lg text-foreground">${workspace.price}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">/month</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{workspace.city}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>Up to {workspace.capacity}</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
          <div className="flex gap-2">
            {workspace.amenities.slice(0, 2).map((amenity, i) => (
              <span key={i} className="text-xs bg-muted px-2.5 py-1 rounded-md text-muted-foreground">
                {amenity}
              </span>
            ))}
            {workspace.amenities.length > 2 && (
              <span className="text-xs bg-muted px-2.5 py-1 rounded-md text-muted-foreground">
                +{workspace.amenities.length - 2}
              </span>
            )}
          </div>
          
          <Link 
            href={`/workspace/${workspace.id}`}
            className="w-10 h-10 rounded-full bg-foreground text-white flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-charcoal transition-colors duration-300"
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
