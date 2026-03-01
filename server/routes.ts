import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.workspaces.list.path, async (req, res) => {
    try {
      const query = api.workspaces.list.input?.parse(req.query);
      
      // Parse amenities from comma-separated string if provided
      let parsedQuery: any = { ...query };
      if (query?.amenities) {
        parsedQuery.amenities = query.amenities.split(',').map(s => s.trim());
      }

      const results = await storage.getWorkspaces(parsedQuery);
      res.json(results);
    } catch (err) {
       if (err instanceof z.ZodError) {
          return res.status(400).json({
            message: err.errors[0].message,
            field: err.errors[0].path.join('.'),
          });
        }
        res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.workspaces.get.path, async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format format" });
      }

      const workspace = await storage.getWorkspace(id);
      if (!workspace) {
        return res.status(404).json({ message: 'Workspace not found' });
      }
      res.json(workspace);
    } catch (error) {
       res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.workspaces.create.path, async (req, res) => {
    try {
      const input = api.workspaces.create.input.parse(req.body);
      const workspace = await storage.createWorkspace(input);
      res.status(201).json(workspace);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed database if empty
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getWorkspaces();
  if (existing.length === 0) {
    const seedData = [
      {
        title: "Premium Virtual Office - Manhattan",
        type: "virtual_office",
        description: "Prestigious business address in the heart of Manhattan. Includes mail handling, a local phone number, and access to meeting rooms on demand.",
        location: "123 Business Ave, Suite 100",
        city: "New York",
        price: 99,
        capacity: 1,
        amenities: ["GST Registration", "Business Address", "Mail Handling", "Phone Answering"],
        rating: "4.8",
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
        available: true,
      },
      {
        title: "Creative Hub Coworking",
        type: "coworking",
        description: "Vibrant and energetic coworking space designed for creatives and startups. Open layout with dedicated desks, phone booths, and unlimited artisan coffee.",
        location: "456 Innovation Blvd",
        city: "San Francisco",
        price: 299,
        capacity: 1,
        amenities: ["High-Speed WiFi", "Coffee Bar", "Phone Booths", "Meeting Rooms", "Community Events"],
        rating: "4.9",
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80",
        available: true,
      },
      {
        title: "Enterprise Managed Suite",
        type: "managed_office",
        description: "Fully customizable private office suite for mid-size teams. Includes dedicated IT infrastructure, private branding, and enterprise-grade security.",
        location: "789 Corporate Way, Floor 15",
        city: "Chicago",
        price: 4500,
        capacity: 20,
        amenities: ["Private Office", "Custom Branding", "Dedicated IT", "24/7 Access", "Boardroom"],
        rating: "5.0",
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80",
        available: true,
      },
       {
        title: "Downtown Tech Flex Space",
        type: "coworking",
        description: "Flexible hot-desking in the city center. Great for freelancers and remote workers needing a professional environment a few days a week.",
        location: "101 Startup Street",
        city: "Austin",
        price: 199,
        capacity: 1,
        amenities: ["Hot Desk", "WiFi", "Printing", "Lounge Area"],
        rating: "4.6",
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80",
        available: true,
      },
      {
        title: "Executive Boardroom & Virtual",
        type: "virtual_office",
        description: "Premium virtual office package with a focus on high-end meeting room access to impress clients.",
        location: "200 Executive Park",
        city: "London",
        price: 149,
        capacity: 1,
        amenities: ["Business Address", "Mail Handling", "Premium Meeting Rooms"],
        rating: "4.7",
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
        available: true,
      },
       {
        title: "Private Managed Floor",
        type: "managed_office",
        description: "An entire floor dedicated to your organization. Complete privacy and control over the workspace layout.",
        location: "500 Highrise Tower",
        city: "Seattle",
        price: 8500,
        capacity: 50,
        amenities: ["Full Floor", "Private Restrooms", "Custom Layout", "Security"],
        rating: "4.9",
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80",
        available: true,
      }
    ];

    for (const data of seedData) {
      await storage.createWorkspace(data);
    }
    console.log("Database seeded with workspace data");
  }
}
