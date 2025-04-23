
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TodoApp from "./pages/TodoApp";
import KanbanBoard from "./pages/KanbanBoard";
import PomodoroTimer from "./pages/PomodoroTimer";
import FlipClock from "./pages/FlipClock";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/pomodoro" element={<PomodoroTimer />} />
          <Route path="/clock" element={<FlipClock />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
