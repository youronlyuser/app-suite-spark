
import { useState, useEffect } from "react";
import { Trash, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/components/AppLayout";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useToast } from "@/components/ui/use-toast";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const MAX_TODOS = 6;

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>(() => 
    getLocalStorage<Todo[]>("todos", [])
  );
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    document.title = "To-Do List | App Suite";
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    setLocalStorage("todos", todos);
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    if (todos.length >= MAX_TODOS) {
      toast({
        title: "Maximum tasks reached",
        description: `You can only have ${MAX_TODOS} tasks. Complete or remove existing tasks first.`,
        variant: "destructive"
      });
      return;
    }
    
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text: newTodo.trim(),
        completed: false
      }
    ]);
    setNewTodo("");
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    
    setTodos(
      todos.map(todo => 
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
  };

  return (
    <AppLayout title="To-Do List">
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-secondary p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
          <div className="flex gap-2">
            <Input 
              type="text" 
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              maxLength={100}
              onKeyDown={e => {
                if (e.key === 'Enter') addTodo();
              }}
              aria-label="New task input"
            />
            <Button 
              onClick={addTodo}
              disabled={!newTodo.trim() || todos.length >= MAX_TODOS}
              aria-label="Add task"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          <p className="text-xs mt-2 text-muted-foreground text-right">
            {todos.length}/{MAX_TODOS} tasks
          </p>
        </div>
        
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No tasks yet. Add one above!
            </p>
          ) : (
            todos.map(todo => (
              <div 
                key={todo.id}
                className={`bg-muted p-4 rounded-md flex items-center gap-3 transition-opacity ${
                  todo.completed ? "opacity-60" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="h-5 w-5 rounded"
                  aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
                />
                
                {editingId === todo.id ? (
                  <div className="flex-1 flex gap-2">
                    <Input 
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') saveEdit();
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      autoFocus
                      aria-label="Edit task text"
                    />
                    <Button size="sm" onClick={saveEdit}>Save</Button>
                  </div>
                ) : (
                  <>
                    <span 
                      className={`flex-1 ${todo.completed ? "line-through" : ""}`}
                    >
                      {todo.text}
                    </span>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => startEditing(todo)}
                      aria-label={`Edit "${todo.text}"`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      aria-label={`Delete "${todo.text}"`}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default TodoApp;
