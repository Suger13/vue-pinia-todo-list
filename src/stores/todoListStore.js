import { defineStore } from 'pinia';
import axios from 'axios';
const BASE_URL = 'https://65e406a088c4088649f62f02.mockapi.io/api';

export const useTodoListStore = defineStore('todo-list', {
  state: () => ({
    todoList: [],
  }),
  actions: {
    async loadTodoLIst() {
      const response = await axios.get(`${BASE_URL}/todo-list`);
      this.todoList = response.data;
    },
    async loadTodoById(id) {
      const response = await axios.get(`${BASE_URL}/todo-list/${id}`);
      return response.data;
    },
    async addTodo(textTodo) {
      try {
        const todo = {
          id: Date.now(),
          name: textTodo,
          createdAt: new Date().toISOString(),
          status: false,
        };
        const response = await axios.post(`${BASE_URL}/todo-list`, todo);
        this.todoList.push(response.data);
      } catch (error) {
        console.log('error', error);
      }
    },
    async editTodo(todoData, id) {
      try {
        const response = await axios.put(
          `${BASE_URL}/todo-list/${id}`,
          todoData
        );
        const index = this.todoList.findIndex((todo) => todo.id === id);
        this.todoList.splice(index, 1, response.data);
        // if (this.todoList[index].status === true) {
        //   this.todoList.push(this.todoList.splice(index, 1)[0]);
        // } else {
        //   this.todoList.sort((a, b) => a.createdAt - b.createdAt);
        // }
      } catch (error) {
        console.log('error', error);
      }
    },
    async removeTodo(id) {
      try {
        await axios.delete(`${BASE_URL}/todo-list/${id}`);
        this.todoList = this.todoList.filter((todo) => todo.id !== id);
      } catch (error) {
        console.log('error', error);
      }
    },
  },
});
