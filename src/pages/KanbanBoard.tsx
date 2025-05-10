
import { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const MAX_TASKS = 8;

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(() => 
    getLocalStorage<Column[]>("kanbanColumns", [
      { id: "todo", title: "To Do", tasks: [] },
      { id: "inProgress", title: "In Progress", tasks: [] },
      { id: "done", title: "Done", tasks: [] }
    ])
  );
  
  const [draggedTask, setDraggedTask] = useState<{task: Task, columnId: string} | null>(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    document.title = "Kanban Board | App Suite";
  }, []);

  useEffect(() => {
    setLocalStorage("kanbanColumns", columns);
  }, [columns]);

  const getTotalTasksCount = () => {
    return columns.reduce((count, column) => count + column.tasks.length, 0);
  };

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask({ task, columnId });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (columnId: string) => {
    if (!draggedTask) return;
    
    // If dropping in the same column, do nothing
    if (draggedTask.columnId === columnId) {
      setDraggedTask(null);
      return;
    }
    
    // Remove task from source column
    const sourceColumn = columns.find(col => col.id === draggedTask.columnId);
    if (!sourceColumn) return;
    
    const updatedColumns = columns.map(column => {
      if (column.id === draggedTask.columnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== draggedTask.task.id)
        };
      }
      
      if (column.id === columnId) {
        return {
          ...column,
          tasks: [...column.tasks, draggedTask.task]
        };
      }
      
      return column;
    });
    
    setColumns(updatedColumns);
    setDraggedTask(null);
  };

  const addNewTask = () => {
    if (!activeColumn || !newTaskText.trim()) return;
    
    const totalTasks = getTotalTasksCount();
    
    if (totalTasks >= MAX_TASKS) {
      toast({
        title: "Task limit reached",
        description: `You can only create up to ${MAX_TASKS} tasks.`,
        variant: "destructive"
      });
      setIsAddingTask(false);
      return;
    }
    
    const updatedColumns = columns.map(column => {
      if (column.id === activeColumn) {
        return {
          ...column,
          tasks: [
            ...column.tasks,
            { id: crypto.randomUUID(), content: newTaskText.trim() }
          ]
        };
      }
      return column;
    });
    
    setColumns(updatedColumns);
    setNewTaskText("");
    setIsAddingTask(false);
  };

  const deleteTask = (columnId: string, taskId: string) => {
    const updatedColumns = columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      return column;
    });
    
    setColumns(updatedColumns);
  };

  const totalTasksCount = getTotalTasksCount();

  return (
    <AppLayout title="Kanban Board">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-semibold flex-1">Tasks ({totalTasksCount}/{MAX_TASKS})</h1>
      </div>
      
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-6 min-w-max px-2 py-6">
          {columns.map(column => (
            <div 
              key={column.id}
              className="kanban-column"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
              aria-label={`${column.title} column`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">
                  {column.title} ({column.tasks.length})
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    if (totalTasksCount >= MAX_TASKS) {
                      toast({
                        title: "Task limit reached",
                        description: `You can only create up to ${MAX_TASKS} tasks.`,
                        variant: "destructive"
                      });
                      return;
                    }
                    setActiveColumn(column.id);
                    setIsAddingTask(true);
                  }}
                  aria-label={`Add task to ${column.title}`}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {column.tasks.map(task => (
                  <div
                    key={task.id}
                    className="kanban-task"
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                    aria-label={task.content}
                  >
                    <div className="flex justify-between items-start">
                      <p className="flex-1">{task.content}</p>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-6 w-6 -mr-1"
                        onClick={() => deleteTask(column.id, task.id)}
                        aria-label={`Delete ${task.content}`}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {column.tasks.length === 0 && (
                  <div className="text-center p-4 text-sm text-muted-foreground">
                    Drop tasks here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          
          <Input
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Enter task details"
            className="mt-4"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') addNewTask();
            }}
          />
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsAddingTask(false)}>
              Cancel
            </Button>
            <Button onClick={addNewTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default KanbanBoard;
