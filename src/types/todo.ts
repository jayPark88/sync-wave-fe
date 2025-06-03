export interface Todo {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateTodoDTO {
  title: string;
  content: string;
}

export interface UpdateTodoDTO {
  title?: string;
  content?: string;
  completed?: boolean;
}

export interface TodoFilters {
  completed?: boolean;
  searchTerm?: string;
} 