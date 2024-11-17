<template>
  <div class="container">
    <div class="toast toast-top toast-center w-full" v-if="isUpdated">
      <div class="alert alert-success flex justify-center">
        <span>Updated Successful</span>
      </div>
    </div>

    <Loading v-if="isLoading" />
    <div class="flex flex-col gap-5">
      <form @submit.prevent="updateTodo" class="flex flex-col gap-7">
        <div for="name" class="text-2xl font-bold">Edit Todo</div>
        <div class="flex justify-evenly">
          <p>id: {{ todo.id }}</p>
          <p>Created At: {{ todo.createdAt?.split('T')[0] }}</p>
        </div>
        <input
          class="input input-bordered font-sans"
          type="text"
          name="name"
          v-model="todo.name"
          required
        />
        <div class="flex gap-7">
          <button type="submit" class="btn btn-circle btn-accent w-1/4">
            Submit
          </button>
          <button
            type="button"
            class="btn btn-circle btn-warning w-1/4"
            @click="toHome"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useTodoListStore } from '../stores/todoListStore';
import Loading from '../components/Loading.vue';
export default {
  components: {
    Loading,
  },
  data() {
    return {
      todoStore: useTodoListStore(),
      todo: {},
      isLoading: false,
      isUpdated: false,
    };
  },
  async mounted() {
    this.isLoading = true;
    this.todo = await this.todoStore.loadTodoById(this.$route.params.id);
    this.isLoading = false;
  },
  methods: {
    async updateTodo(e) {
      try {
        this.isLoading = true;
        const todo = {
          ...this.todo,
          name: e.target.name.value,
        };
        await this.todoStore.editTodo(todo, todo.id);
        this.isUpdated = true;
        setTimeout(() => {
          this.isUpdated = false;
        }, 1000);
        this.isLoading = false;
      } catch (error) {
        console.log('error', error);
        this.isLoading = false;
      }
    },
    toHome() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
