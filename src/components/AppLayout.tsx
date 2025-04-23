
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AppLayout = ({ children, title }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-4 border-b border-gray-800 flex items-center fixed top-0 w-full bg-background/95 backdrop-blur-sm z-10">
        <Link to="/">
          <Button variant="ghost" size="icon" aria-label="Go back to home">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="ml-2 font-semibold text-white">{title}</h1>
      </header>
      
      <main className="flex-1 p-4 mt-16">
        <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-8rem)]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
