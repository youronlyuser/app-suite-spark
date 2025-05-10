
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  CheckSquare, 
  Kanban, 
  Clock, 
  FlipHorizontal,
  FileText,
  CalendarDays
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = "Productivity Hub";
  }, []);

  const apps = [
    { 
      name: "To-Do List", 
      icon: <CheckSquare className="app-icon text-gray-500" />, 
      path: "/todo",
      description: "Track up to 6 important tasks"
    },
    { 
      name: "Kanban Board", 
      icon: <Kanban className="app-icon text-gray-500" />, 
      path: "/kanban",
      description: "Organize your workflow"
    },
    { 
      name: "Pomodoro", 
      icon: <Clock className="app-icon text-gray-500" />, 
      path: "/pomodoro",
      description: "Focus timer with breaks"
    },
    { 
      name: "Flip Clock", 
      icon: <FlipHorizontal className="app-icon text-gray-500" />, 
      path: "/clock",
      description: "Aesthetic time display"
    }
  ];

  const templates = [
    {
      name: "Resume Template",
      icon: <FileText className="h-5 w-5" />,
      path: "/resume",
      description: "Free professional resume builder"
    },
    {
      name: "Personal Planner",
      icon: <CalendarDays className="h-5 w-5" />,
      path: "/planner",
      description: "Free personal planning template"
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <div className="max-w-lg w-full px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 text-white">
            Productivity Hub
          </h1>
          <p className="text-gray-400">Productivity tools to streamline your workflow</p>
        </header>

        <div className="grid grid-cols-2 gap-5 mx-auto">
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

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-white mb-6">Free Templates</h2>
          <div className="flex flex-col gap-4">
            {templates.map((template) => (
              <Link to={template.path} key={template.name} className="w-full">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-700 hover:bg-gray-800 text-white flex gap-3 px-6 py-5"
                >
                  {template.icon}
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{template.name}</span>
                    <span className="text-xs text-gray-400">{template.description}</span>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
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
