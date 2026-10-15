<template>
  <div class="recipe-card" @click="$emit('select', recipe.id)">
    <div class="card-header">
      <span class="badge category">{{ recipe.category }}</span>
      <span class="badge difficulty" :class="recipe.difficulty.toLowerCase()">{{ recipe.difficulty }}</span>
    </div>
    <h3>{{ recipe.title }}</h3>
    <p class="description">{{ recipe.description }}</p>
    <div class="card-footer">
      <span>⏱ {{ recipe.time }} mins</span>
      <button class="btn-detail">Ver Detalle</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recipe: {
    type: Object,
    required: true
  }
});

defineEmits(['select']);
</script>

<style scoped>
.recipe-card {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1.2rem;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.recipe-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}
.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}
.category { background: #e0f2fe; color: #0369a1; }
.difficulty.fácil { background: #dcfce7; color: #15803d; }
.difficulty.media { background: #fef9c3; color: #a16207; }
.difficulty.difícil { background: #fee2e2; color: #b91c1c; }
h3 { margin: 0.5rem 0; font-size: 1.1rem; color: #1e293b; }
.description { font-size: 0.85rem; color: #64748b; margin-bottom: 1rem; line-height: 1.3; }
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  font-weight: bold;
  color: #475569;
}
.btn-detail {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
}
</style>