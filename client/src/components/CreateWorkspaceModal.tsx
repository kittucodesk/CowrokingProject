import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Loader2, UploadCloud } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCreateWorkspace } from "@/hooks/use-workspaces";
import { insertWorkspaceSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface Props {
  trigger: React.ReactNode;
}

// Form schema with coercion for numeric fields
const formSchema = insertWorkspaceSchema.extend({
  price: z.coerce.number().min(1, "Price is required"),
  capacity: z.coerce.number().min(1, "Capacity is required"),
  rating: z.coerce.number().min(0).max(5),
  amenitiesStr: z.string().min(1, "Enter at least one amenity")
}).omit({ amenities: true });

type FormValues = z.infer<typeof formSchema>;

export function CreateWorkspaceModal({ trigger }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const createMutation = useCreateWorkspace();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "coworking",
      rating: 5.0,
      isFeatured: false,
      available: true,
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const amenities = data.amenitiesStr.split(",").map(s => s.trim()).filter(Boolean);
      await createMutation.mutateAsync({
        ...data,
        rating: data.rating.toString(),
        amenities,
      } as any);
      toast({ title: "Success", description: "Workspace listed successfully!" });
      setIsOpen(false);
      reset();
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to create workspace",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-muted/30">
                <h2 className="font-serif text-2xl font-semibold">List a New Space</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar">
                <form id="create-space-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Title</label>
                      <input
                        {...register("title")}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                        placeholder="e.g., Aura Premium Managed"
                      />
                      {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Type</label>
                      <select
                        {...register("type")}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                      >
                        <option value="virtual_office">Virtual Office</option>
                        <option value="coworking">Coworking Space</option>
                        <option value="managed_office">Managed Office</option>
                      </select>
                      {errors.type && <p className="text-xs text-red-500">{errors.type.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Description</label>
                    <textarea
                      {...register("description")}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all resize-none"
                      placeholder="Describe the workspace..."
                    />
                    {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">City</label>
                      <input
                        {...register("city")}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                        placeholder="e.g., New York"
                      />
                      {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Specific Location</label>
                      <input
                        {...register("location")}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                        placeholder="e.g., Financial District"
                      />
                      {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Monthly Price ($)</label>
                      <input
                        type="number"
                        {...register("price")}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                        placeholder="499"
                      />
                      {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Capacity (People)</label>
                      <input
                        type="number"
                        {...register("capacity")}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                        placeholder="50"
                      />
                      {errors.capacity && <p className="text-xs text-red-500">{errors.capacity.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Amenities (comma separated)</label>
                    <input
                      {...register("amenitiesStr")}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                      placeholder="High-Speed WiFi, Coffee, Meeting Rooms"
                    />
                    {errors.amenitiesStr && <p className="text-xs text-red-500">{errors.amenitiesStr.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Image URL</label>
                    <input
                      {...register("imageUrl")}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-transparent focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                      placeholder="https://images.unsplash.com/..."
                    />
                    {errors.imageUrl && <p className="text-xs text-red-500">{errors.imageUrl.message}</p>}
                  </div>

                  <div className="flex items-center gap-4 py-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" {...register("isFeatured")} className="w-5 h-5 rounded border-border text-[#D4AF37] focus:ring-[#D4AF37]" />
                      <span className="text-sm font-medium">Feature this space</span>
                    </label>
                  </div>
                </form>
              </div>

              <div className="px-8 py-6 border-t border-border bg-muted/30 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-medium text-foreground hover:bg-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="create-space-form"
                  disabled={createMutation.isPending}
                  className="px-8 py-2.5 rounded-xl font-medium bg-[#121212] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {createMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Publish Listing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
