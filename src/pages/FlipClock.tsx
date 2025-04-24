
import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Fullscreen } from "lucide-react";
import { Button } from "@/components/ui/button";

const FlipClock = () => {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    document.title = "Flip Clock | Productivity Hub";
    
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error(`Error attempting to enable fullscreen: ${err.message}`));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error(`Error attempting to exit fullscreen: ${err.message}`));
    }
  };

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  
  return (
    <AppLayout title="Flip Clock">
      <div className={`flex flex-col items-center justify-center ${
        isFullscreen ? "h-screen bg-background" : "mt-8"
      }`}>
        <div className="flex flex-col items-center">
          <div className="flex mb-8">
            <div className="flip-card" aria-label="Hours digit 1">
              <div className={`flip-card-inner ${time.getSeconds() % 2 === 0 ? "flipping" : ""}`}>
                <div className="flip-card-front">{hours[0]}</div>
                <div className="flip-card-back">{hours[0]}</div>
              </div>
            </div>
            
            <div className="flip-card" aria-label="Hours digit 2">
              <div className={`flip-card-inner ${time.getSeconds() % 2 === 0 ? "flipping" : ""}`}>
                <div className="flip-card-front">{hours[1]}</div>
                <div className="flip-card-back">{hours[1]}</div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center mx-2 text-4xl font-bold text-gray-400">:</div>
            
            <div className="flip-card" aria-label="Minutes digit 1">
              <div className={`flip-card-inner ${time.getSeconds() % 2 === 1 ? "flipping" : ""}`}>
                <div className="flip-card-front">{minutes[0]}</div>
                <div className="flip-card-back">{minutes[0]}</div>
              </div>
            </div>
            
            <div className="flip-card" aria-label="Minutes digit 2">
              <div className={`flip-card-inner ${time.getSeconds() % 2 === 1 ? "flipping" : ""}`}>
                <div className="flip-card-front">{minutes[1]}</div>
                <div className="flip-card-back">{minutes[1]}</div>
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
          >
            <Fullscreen className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default FlipClock;
