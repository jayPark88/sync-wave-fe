import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoDTO, UpdateTodoDTO, TodoFilters } from '../types/todo';
import { TodoService } from '../services/todo.service';

export const useTodos = (initialFilters?: TodoFilters) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TodoFilters | undefined>(initialFilters);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TodoService.getTodos(filters);
      setTodos(data);
    } catch (err) {
      setError('할 일 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const createTodo = async (todo: CreateTodoDTO) => {
    try {
      const newTodo = await TodoService.createTodo(todo);
      setTodos(prev => [...prev, newTodo]);
      return true;
    } catch (err) {
      setError('할 일을 생성하는데 실패했습니다.');
      return false;
    }
  };

  const updateTodo = async (id: string, todo: UpdateTodoDTO) => {
    try {
      const updatedTodo = await TodoService.updateTodo(id, todo);
      setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
      return true;
    } catch (err) {
      setError('할 일을 수정하는데 실패했습니다.');
      return false;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
      return true;
    } catch (err) {
      setError('할 일을 삭제하는데 실패했습니다.');
      return false;
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const updatedTodo = await TodoService.toggleTodoComplete(id);
      setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
      return true;
    } catch (err) {
      setError('할 일 상태를 변경하는데 실패했습니다.');
      return false;
    }
  };

  return {
    todos,
    loading,
    error,
    filters,
    setFilters,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refresh: fetchTodos,
  };
}; 