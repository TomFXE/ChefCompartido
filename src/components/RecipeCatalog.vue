<template>
  <div class="catalog">
    <h2>Catálogo de Recetas</h2>
    <div class="grid">
      <div v-for="recipe in recipes" :key="recipe.id" class="card">
        <h3>{{ recipe.title }}</h3>
        <p><strong>Tiempo:</strong> {{ recipe.time }} mins</p>
        <p><strong>Dificultad:</strong> {{ recipe.difficulty }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const recipes = ref([
  { id: 1, title: 'Pasta Carbonara Tradicional', time: 25, difficulty: 'Fácil' },
  { id: 2, title: 'Tacos al Pastor Caseros', time: 45, difficulty: 'Media' },
  { id: 3, title: 'Ensalada César con Pollo', time: 15, difficulty: 'Fácil' }
]);
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem; }
.card { padding: 1rem; border: 1px solid #e0e0e0; border-radius: 6px; background-color: #ffffff; }
</style>