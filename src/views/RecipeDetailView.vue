<template>
  <div v-if="recipe" class="detail-container">
    <button @click="$emit('back')" class="btn-back">← Volver al Catálogo</button>
    <h2>{{ recipe.title }}</h2>
    <p class="meta">
      <span><strong>Categoría:</strong> {{ recipe.category }}</span> |
      <span><strong>Tiempo:</strong> {{ recipe.time }} mins</span> |
      <span><strong>Dificultad:</strong> {{ recipe.difficulty }}</span>
    </p>
    <p class="description">{{ recipe.description }}</p>

    <div v-if="recipe.image" class="image-container">
      <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
    </div>

    <div class="content-grid">
      <div class="ingredients-box">
        <h3>Ingredientes</h3>
        <ul>
          <li v-for="(ing, idx) in recipe.ingredients" :key="idx">{{ ing }}</li>
        </ul>
      </div>

      <div class="steps-box">
        <h3>Pasos de Preparación</h3>
        <ol>
          <li v-for="(step, idx) in recipe.steps" :key="idx">{{ step }}</li>
        </ol>
      </div>
    </div>
  </div>
  <div v-else class="detail-container">
    <p>Selecciona una receta para ver sus detalles.</p>
  </div>
</template>

<script setup>
defineProps({
  recipe: Object
});

defineEmits(['back']);
</script>

<style scoped>
.detail-container {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.btn-back {
  background: none;
  border: none;
  color: #0284c7;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1rem;
}
.meta { font-size: 0.9rem; color: #475569; margin-bottom: 1rem; }
.description { font-style: italic; color: #334155; margin-bottom: 1.5rem; }
.content-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
}
@media (max-width: 600px) {
  .content-grid { grid-template-columns: 1fr; }
}
.ingredients-box, .steps-box {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
}
ul, ol { padding-left: 1.2rem; }
li { margin-bottom: 0.5rem; line-height: 1.4; }
.image-container {
  margin-bottom: 1.5rem;
  text-align: center;
}

.recipe-image {
  max-width: 100%;
  max-height: 350px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
</style>