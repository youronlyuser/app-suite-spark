
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AppLayout = ({ children, title }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b border-border flex items-center">
        <Link to="/">
          <Button variant="ghost" size="icon" aria-label="Go back to home">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="ml-2 font-semibold">{title}</h1>
      </header>
      
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default AppLayout;
