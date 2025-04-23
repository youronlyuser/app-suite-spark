
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AppLayout from "@/components/AppLayout";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

interface FlipClockSettings {
  use24Hour: boolean;
}

const FlipClock = () => {
  const [time, setTime] = useState(new Date());
  const [settings, setSettings] = useState<FlipClockSettings>(() => 
    getLocalStorage<FlipClockSettings>("flipClockSettings", {
      use24Hour: false
    })
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Save settings to localStorage when they change
  useEffect(() => {
    setLocalStorage("flipClockSettings", settings);
  }, [settings]);

  useEffect(() => {
    document.title = "Flip Clock | App Suite";
    
    // Update the time every second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen()
          .then(() => {
            setIsFullscreen(true);
          })
          .catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
          });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => {
            setIsFullscreen(false);
          })
          .catch(err => {
            console.error(`Error attempting to exit fullscreen: ${err.message}`);
          });
      }
    }
  };

  const getTimeValues = () => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    let period = "";
    
    if (!settings.use24Hour) {
      period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert to 12-hour format
    }
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      period
    };
  };

  const { hours, minutes, period } = getTimeValues();
  
  return (
    <AppLayout title="Flip Clock">
      <div className={`flex flex-col items-center justify-center ${
        isFullscreen ? "h-screen bg-background" : "mt-8"
      }`}>
        <div className="flex flex-col items-center">
          <div className="flex mb-8">
            {/* Hours */}
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
            
            {/* Separator */}
            <div className="flex flex-col justify-center mx-2 text-4xl font-bold">:</div>
            
            {/* Minutes */}
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
            
            {/* AM/PM */}
            {!settings.use24Hour && (
              <div className="ml-3 flex flex-col justify-center">
                <div className="text-2xl font-medium">{period}</div>
              </div>
            )}
          </div>
          
          {/* Settings */}
          <div className={`flex items-center justify-center gap-6 ${isFullscreen ? "mt-8" : ""}`}>
            <div className="flex items-center space-x-2">
              <Switch
                id="hour-format"
                checked={settings.use24Hour}
                onCheckedChange={(checked) => setSettings({ ...settings, use24Hour: checked })}
              />
              <Label htmlFor="hour-format">24-Hour Format</Label>
            </div>
            
            <Button variant="outline" onClick={toggleFullscreen}>
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default FlipClock;
