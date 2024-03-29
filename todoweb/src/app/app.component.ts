import { Component } from "@angular/core";
import axios from "axios";

import { TodoDataService } from "./todo-data.service";
import { Todo } from "./todo";

axios.defaults.baseURL = "http://127.0.0.1:8000";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
  providers: [TodoDataService]
})
export class AppComponent {
  newTodo: Todo = new Todo();
  todos: Todo[] = [];

  constructor(private todoDataService: TodoDataService) {
    this.init();
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleTodoComplete = this.toggleTodoComplete.bind(this);
  }

  async init() {
    this.todos = await this.todoDataService.getAllTodos();
  }

  async addTodo() {
    var saved: Todo = await this.todoDataService.addTodo(this.newTodo);
    this.todos.push(saved);
    this.newTodo = new Todo();
  }

  async toggleTodoComplete(todo: Todo) {
    todo.completed = !todo.completed;
    await this.todoDataService.updateTodoById(todo);
  }

  async removeTodo(todo) {
    await this.todoDataService.deleteTodoById(todo.id);
    this.todos = this.todos.filter((item: Todo) => item.id !== todo.id);
  }

  get sortedTodos(): Todo[] {
    return this.todos.sort((item: Todo) => -item.id);
  }
}
