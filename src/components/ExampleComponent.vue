<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
    <q-btn>Hola</q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {Todo, Meta, Dataset, DatasetRequirements} from './models';

export default defineComponent({
  name: 'ExampleComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    todos: {
      type: Array as PropType<Todo[]>,
      default: () => [] as Todo[]
    },
    meta: {
      type: Object as PropType<Meta>,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  data(): { clickCount: number } {
    const d: DatasetRequirements = {
      title: '',
      spatialCoverage: [[0, 1, 2], [-1, -2, 3]],
      temporalCoverage: [new Date()]
    };
    console.log(d);
    return {
      clickCount: 0
    };
  },
  methods: {
    increment (): void {
      this.clickCount += 1;
    }
  },
  computed: {
    todoCount (): number {
      return this.todos.length;
    }
  }
});
</script>
