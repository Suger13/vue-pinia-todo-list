<script>
import Loading from '../components/Loading.vue';
import { useTodoListStore } from '../stores/todoListStore';
export default {
  components: {
    Loading,
  },
  data() {
    return {
      todoText: '',
      todoListStore: useTodoListStore(),
      isLoading: false,
      selectedStatus: 'Doing',
      statuses: ['All', 'Doing', 'Completed'],
    };
  },
  async mounted() {
    this.isLoading = true;
    await this.todoListStore.loadTodoLIst();
    this.isLoading = false;
  },
  methods: {
    async createTodo(e) {
      try {
        this.isLoading = true;
        const todo = e.target.name.value;
        if (todo?.trim()) {
          await this.todoListStore.addTodo(todo);
        }
        this.todoText = '';
      } catch (error) {
        console.log('error', error);
      }
      this.isLoading = false;
    },
    updateStatusTodo(todo) {
      try {
        this.isLoading = true;
        todo.status = !todo.status;
        this.todoListStore.editTodo(todo, todo.id);
      } catch (error) {
        console.log('error', error);
      }
      this.isLoading = false;
    },
    async deleteTodo(id) {
      try {
        this.isLoading = true;
        await this.todoListStore.removeTodo(id);
      } catch (error) {
        console.log('error', error);
      }
      this.isLoading = false;
    },
    changeStatus(status) {
      this.selectedStatus = status;
    },
  },
  computed: {
    filteredTodoList() {
      const status = this.selectedStatus === 'Doing' ? false : true;
      if (this.selectedStatus === 'All') {
        return this.todoListStore.todoList;
      } else {
        return this.todoListStore.todoList.filter(
          (todo) => todo.status === status
        );
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="flex flex-col w-full">
      <p class="font-bold text-2xl">Todo List</p>
      <Loading v-if="isLoading"></Loading>
      <div class="w-full">
        <div>
          <form @submit.prevent="createTodo" class="mt-7">
            <div class="flex gap-7">
              <input
                type="text"
                class="input input-bordered w-full"
                v-model="todoText"
                placeholder="Type here..."
                name="name"
              />
              <button
                type="submit"
                class="btn btn-circle flex justify-center items-center"
              >
                <div
                  class="h-10 w-10 bg-green-700 flex items-center justify-center rounded-full text-slate-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </form>
        </div>
        <div role="tablist" class="tabs tabs-boxed mt-7">
          <a
            role="tab"
            v-for="status in statuses"
            :key="status"
            :class="status === selectedStatus ? 'tab tab-active' : 'tab'"
            @click="changeStatus(status)"
            >{{ status }}</a
          >
        </div>
        <div v-for="todo in filteredTodoList" :key="todo.id">
          <div
            :class="{
              flex: todo,
            }"
          >
            <div class="flex flex-1 justify-between items-center gap-5">
              <input
                type="checkbox"
                :checked="todo.status"
                @click="updateStatusTodo(todo)"
                class="checkbox checkbox-primary"
              />
              <RouterLink :to="{ name: 'edit-todo', params: { id: todo.id } }">
                <p
                  :class="{
                    'line-through text-slate-500': todo.status,
                    'text-xl hover:text-purple-500 w-96': todo.name,
                  }"
                >
                  {{ todo.name }} <br />
                </p>
              </RouterLink>
              <div class="flex">
                <button
                  class="btn btn-square btn-outline"
                  @click="deleteTodo(todo.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    class="w-6 h-6"
                  >
                    <path
                      d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-7 flex gap-5 w-1/4 items-center"></div>
    </div>
  </div>
</template>
