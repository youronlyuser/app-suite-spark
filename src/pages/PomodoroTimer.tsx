
import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import AppLayout from "@/components/AppLayout";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

interface TimerSettings {
  focusTime: number; // in minutes
  breakTime: number; // in minutes
}

enum TimerState {
  Focus = "focus",
  Break = "break"
}

const PomodoroTimer = () => {
  // Get settings from localStorage or use defaults
  const [settings, setSettings] = useState<TimerSettings>(() => 
    getLocalStorage<TimerSettings>("pomodoroSettings", {
      focusTime: 25,
      breakTime: 5
    })
  );

  const [timeLeft, setTimeLeft] = useState(settings.focusTime * 60); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [timerState, setTimerState] = useState(TimerState.Focus);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [focusTimeInput, setFocusTimeInput] = useState(settings.focusTime);
  const [breakTimeInput, setBreakTimeInput] = useState(settings.breakTime);
  
  const intervalRef = useRef<number | null>(null);

  // Save settings to localStorage when they change
  useEffect(() => {
    setLocalStorage("pomodoroSettings", settings);
  }, [settings]);

  // Set page title
  useEffect(() => {
    document.title = "Pomodoro Timer | App Suite";
  }, []);

  // Reset timer when settings change
  useEffect(() => {
    resetTimer();
  }, [settings]);

  // Timer logic
  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Timer complete
            const nextState = timerState === TimerState.Focus 
              ? TimerState.Break 
              : TimerState.Focus;
            
            setTimerState(nextState);
            
            // Play notification sound
            try {
              const audio = new Audio();
              audio.src = "data:audio/wav;base64,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";
              audio.play();
            } catch (error) {
              console.error("Failed to play notification sound", error);
            }
            
            // Return the new time value based on the next state
            return nextState === TimerState.Focus 
              ? settings.focusTime * 60 
              : settings.breakTime * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timerState, settings]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimerState(TimerState.Focus);
    setTimeLeft(settings.focusTime * 60);
    
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  };

  const saveSettings = () => {
    const newSettings = {
      focusTime: focusTimeInput,
      breakTime: breakTimeInput
    };
    setSettings(newSettings);
    setIsSettingsOpen(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = () => {
    const totalTime = timerState === TimerState.Focus 
      ? settings.focusTime * 60 
      : settings.breakTime * 60;
    
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <AppLayout title="Pomodoro Timer">
      <div className="flex flex-col items-center justify-center max-w-md mx-auto mt-8">
        <div className="relative w-64 h-64">
          {/* Progress Circle */}
          <svg className="w-full h-full circular-progress transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              strokeWidth="5%"
              className="text-muted"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              strokeWidth="5%"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progressPercentage()) / 100}
              className={`${timerState === TimerState.Focus ? "text-white" : "text-white/70"}`}
            />
          </svg>
          
          {/* Timer Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl font-bold">{formatTime(timeLeft)}</p>
            <p className="mt-2 text-muted-foreground capitalize">
              {timerState === TimerState.Focus ? "Focus Time" : "Break Time"}
            </p>
          </div>
        </div>
        
        <div className="flex gap-4 mt-8">
          <Button 
            variant="outline" 
            size="icon"
            onClick={resetTimer}
            aria-label="Reset timer"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          
          <Button 
            size="icon" 
            onClick={toggleTimer}
            variant={isActive ? "secondary" : "default"}
            className="h-12 w-12 rounded-full"
            aria-label={isActive ? "Pause timer" : "Start timer"}
          >
            {isActive ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Timer settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Timer Settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="focus-time">Focus Time: {focusTimeInput} minutes</Label>
              <Slider
                id="focus-time"
                min={5}
                max={60}
                step={5}
                value={[focusTimeInput]}
                onValueChange={(value) => setFocusTimeInput(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="break-time">Break Time: {breakTimeInput} minutes</Label>
              <Slider
                id="break-time"
                min={1}
                max={30}
                step={1}
                value={[breakTimeInput]}
                onValueChange={(value) => setBreakTimeInput(value[0])}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveSettings}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default PomodoroTimer;
