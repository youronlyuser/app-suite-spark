
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
    document.title = "Productivity Hub";
  }, []);

  const apps = [
    { 
      name: "To-Do List", 
      icon: <CheckSquare className="app-icon text-gray-400" />, 
      path: "/todo",
      description: "Track up to 6 important tasks"
    },
    { 
      name: "Kanban Board", 
      icon: <Kanban className="app-icon text-gray-400" />, 
      path: "/kanban",
      description: "Organize your workflow"
    },
    { 
      name: "Pomodoro", 
      icon: <Clock className="app-icon text-gray-400" />, 
      path: "/pomodoro",
      description: "Focus timer with breaks"
    },
    { 
      name: "Flip Clock", 
      icon: <FlipHorizontal className="app-icon text-gray-400" />, 
      path: "/clock",
      description: "Aesthetic time display"
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="py-12 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Productivity Hub
          </h1>
          <p className="text-gray-400">Productivity tools to streamline your workflow</p>
        </header>

        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
          {apps.map((app) => (
            <Link to={app.path} key={app.name}>
              <Card className="app-card hover:bg-gray-800 border-gray-700">
                {app.icon}
                <h2 className="font-medium text-base md:text-lg text-white">{app.name}</h2>
                <p className="text-xs text-gray-400 mt-1">{app.description}</p>
              </Card>
            </Link>
          ))}
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>
            Made with ❤️ using React and Tailwind CSS • <Link to="/legal" className="hover:text-gray-300 underline">Privacy & Terms</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
