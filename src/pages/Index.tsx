
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  CheckSquare, 
  Kanban, 
  Clock, 
  FlipHorizontal
} from "lucide-react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = "App Suite";
  }, []);

  const apps = [
    { 
      name: "To-Do List", 
      icon: <CheckSquare className="app-icon" />, 
      path: "/todo",
      description: "Track up to 6 important tasks"
    },
    { 
      name: "Kanban Board", 
      icon: <Kanban className="app-icon" />, 
      path: "/kanban",
      description: "Organize your workflow"
    },
    { 
      name: "Pomodoro", 
      icon: <Clock className="app-icon" />, 
      path: "/pomodoro",
      description: "Focus timer with breaks"
    },
    { 
      name: "Flip Clock", 
      icon: <FlipHorizontal className="app-icon" />, 
      path: "/clock",
      description: "Aesthetic time display"
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          App Suite
        </h1>
        <p className="text-muted-foreground">Productivity tools to streamline your workflow</p>
      </header>

      <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-lg mx-auto">
        {apps.map((app) => (
          <Link to={app.path} key={app.name}>
            <Card className="app-card">
              {app.icon}
              <h2 className="font-medium text-sm md:text-base">{app.name}</h2>
              <p className="text-xs text-muted-foreground mt-1">{app.description}</p>
            </Card>
          </Link>
        ))}
      </div>

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>Made with ❤️ using React and Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default Index;
