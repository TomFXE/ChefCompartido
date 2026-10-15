<template>
  <div class="search-filter-box">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar receta por nombre o ingrediente..."
      class="search-input"
    />
    <div class="filters">
      <select v-model="selectedCategory">
        <option value="">Todas las Categorías</option>
        <option value="Pasta">Pasta</option>
        <option value="Mexicana">Mexicana</option>
        <option value="Ensaladas">Ensaladas</option>
      </select>

      <select v-model="selectedDifficulty">
        <option value="">Todas las Dificultades</option>
        <option value="Fácil">Fácil</option>
        <option value="Media">Media</option>
        <option value="Difícil">Difícil</option>
      </select>

      <div class="time-filter">
        <label>Máx {{ maxTime }} mins</label>
        <input type="range" min="10" max="90" step="5" v-model="maxTime" />
      </div>

      <button @click="resetFilters" class="btn-reset">Limpiar Filtros</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['filter-change']);

const searchQuery = ref('');
const selectedCategory = ref('');
const selectedDifficulty = ref('');
const maxTime = ref(90);

const applyFilters = () => {
  emit('filter-change', {
    query: searchQuery.value,
    category: selectedCategory.value,
    difficulty: selectedDifficulty.value,
    maxTime: Number(maxTime.value)
  });
};

watch([searchQuery, selectedCategory, selectedDifficulty, maxTime], applyFilters);

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  selectedDifficulty.value = '';
  maxTime.value = 90;
};
</script>

<style scoped>
.search-filter-box {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
}
.search-input {
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  margin-bottom: 0.8rem;
  box-sizing: border-box;
}
.filters {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  align-items: center;
}
select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
}
.time-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}
.btn-reset {
  background: #e2e8f0;
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
}
</style>