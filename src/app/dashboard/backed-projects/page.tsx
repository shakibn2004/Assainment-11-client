import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const mockBackedProjects = [
  {
    id: 1,
    title: "EcoSphere: Self-Sustaining Indoor Garden",
    creator: "GreenTech Innovations",
    pledged: 150,
    reward: "Early Bird EcoSphere",
    goal: 50000,
    raised: 75000,
    daysLeft: 0,
    status: "Successful",
    image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Aura: Next-Gen Noise Canceling Headphones",
    creator: "AudioDynamix",
    pledged: 299,
    reward: "Pro Tier + Case",
    goal: 100000,
    raised: 85000,
    daysLeft: 12,
    status: "Live",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1976&auto=format&fit=crop"
  }
];

export default function BackedProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Backed Projects</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockBackedProjects.map((project) => {
          const progress = Math.min((project.raised / project.goal) * 100, 100);
          return (
            <div key={project.id} className="glass-card overflow-hidden group">
              <div className="relative h-48 w-full">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant={project.status === "Successful" ? "default" : "secondary"} className="shadow-lg backdrop-blur-md bg-black/50 text-white border-white/20">
                    {project.status}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-primary mb-1">{project.creator}</p>
                <h3 className="text-lg font-bold mb-4 line-clamp-1">{project.title}</h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pledged: <span className="text-foreground font-semibold">${project.pledged}</span></span>
                    <span className="text-muted-foreground">{project.daysLeft > 0 ? `${project.daysLeft} days left` : "Ended"}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${project.raised.toLocaleString()} raised</span>
                    <span>${project.goal.toLocaleString()} goal</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Selected Reward</p>
                    <p className="text-sm font-medium">{project.reward}</p>
                  </div>
                  <button className="text-sm font-medium text-primary hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
