<template>
  <div class="catalog-container">
    <RecipeSearchFilter @filter-change="handleFilterChange" />

    <div v-if="filteredRecipes.length > 0" class="grid">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
        @select="$emit('select-recipe', recipe.id)"
      />
    </div>
    <div v-else class="empty-state">
      <p>No se encontraron recetas que coincidan con los filtros seleccionados.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { recipeService } from '../services/recipeService';
import RecipeCard from './RecipeCard.vue';
import RecipeSearchFilter from './RecipeSearchFilter.vue';

defineEmits(['select-recipe']);

const recipes = ref(recipeService.getAll());
const filters = ref({
  query: '',
  category: '',
  difficulty: '',
  maxTime: 90
});

const handleFilterChange = (newFilters) => {
  filters.value = newFilters;
};

const filteredRecipes = computed(() => {
  return recipes.value.filter((r) => {
    const matchesQuery =
      !filters.value.query ||
      r.title.toLowerCase().includes(filters.value.query.toLowerCase()) ||
      r.ingredients.some((i) => i.toLowerCase().includes(filters.value.query.toLowerCase()));

    const matchesCategory = !filters.value.category || r.category === filters.value.category;
    const matchesDifficulty = !filters.value.difficulty || r.difficulty === filters.value.difficulty;
    const matchesTime = r.time <= filters.value.maxTime;

    return matchesQuery && matchesCategory && matchesDifficulty && matchesTime;
  });
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.2rem;
}
.empty-state { text-align: center; padding: 2rem; color: #64748b; }
</style>