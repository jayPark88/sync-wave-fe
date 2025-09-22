import { apiClient } from './api.config';
import { Todo, CreateTodoDTO, UpdateTodoDTO, TodoFilters } from '../types/todo';

export class TodoService {
  static async getTodos(filters?: TodoFilters): Promise<Todo[]> {
    const response = await apiClient.get<Todo[]>('/todos', { params: filters });
    return response.data;
  }

  static async getTodoById(id: string): Promise<Todo> {
    const response = await apiClient.get<Todo>(`/todos/${id}`);
    return response.data;
  }

  static async createTodo(todo: CreateTodoDTO): Promise<Todo> {
    const response = await apiClient.post<Todo>('/todos', todo);
    return response.data;
  }

  static async updateTodo(id: string, todo: UpdateTodoDTO): Promise<Todo> {
    const response = await apiClient.put<Todo>(`/todos/${id}`, todo);
    return response.data;
  }

  static async deleteTodo(id: string): Promise<void> {
    await apiClient.delete(`/todos/${id}`);
  }

  static async toggleTodoComplete(id: string): Promise<Todo> {
    const response = await apiClient.patch<Todo>(`/todos/${id}/toggle`);
    return response.data;
  }
} 