<template>
  <div class="create-container">
    <h2>Publicar Nueva Receta</h2>
    <form @submit.prevent="submitRecipe">
      <input v-model="form.title" type="text" placeholder="Título de la receta" required />
      
      <div class="row">
        <select v-model="form.category" required>
          <option value="" disabled>Selecciona Categoría</option>
          <option value="Pasta">Pasta</option>
          <option value="Mexicana">Mexicana</option>
          <option value="Ensaladas">Ensaladas</option>
          <option value="Postres">Postres</option>
        </select>

        <input v-model="form.time" type="number" placeholder="Tiempo (mins)" min="5" required />

        <select v-model="form.difficulty" required>
          <option value="" disabled>Dificultad</option>
          <option value="Fácil">Fácil</option>
          <option value="Media">Media</option>
          <option value="Difícil">Difícil</option>
        </select>
      </div>

      <textarea v-model="form.description" placeholder="Breve descripción" rows="2" required></textarea>

      <div class="dynamic-section">
        <h3>Fotografía de la Receta</h3>
        <input type="file" @change="handleFileUpload" accept="image/png, image/jpeg" />
        <p v-if="imageError" class="error">{{ imageError }}</p>
      </div>

      <!-- Lista dinámica de Ingredientes -->
      <div class="dynamic-section">
        <h3>Ingredientes</h3>
        <div v-for="(ing, idx) in form.ingredients" :key="idx" class="dynamic-row">
          <input v-model="form.ingredients[idx]" placeholder="Ej. 200g de harina" required />
          <button type="button" @click="removeIngredient(idx)" class="btn-remove">X</button>
        </div>
        <button type="button" @click="addIngredient" class="btn-add">+ Agregar Ingrediente</button>
      </div>

      <!-- Lista dinámica de Pasos -->
      <div class="dynamic-section">
        <h3>Pasos de Preparación</h3>
        <div v-for="(step, idx) in form.steps" :key="idx" class="dynamic-row">
          <input v-model="form.steps[idx]" placeholder="Ej. Mezclar los ingredientes secos" required />
          <button type="button" @click="removeStep(idx)" class="btn-remove">X</button>
        </div>
        <button type="button" @click="addStep" class="btn-add">+ Agregar Paso</button>
      </div>

      <button type="submit" class="btn-submit">Guardar y Publicar Receta</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { recipeService } from '../services/recipeService';
import { ref } from 'vue';

const imageError = ref('');

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) { // Límite de 2MB
      imageError.value = 'La imagen es muy pesada. Máximo 2MB.';
      return;
    }
    imageError.value = '';
    // Simulamos la conversión a URL local para previsualizar y guardar
    form.image = URL.createObjectURL(file);
  }
};

const emit = defineEmits(['recipe-created']);

const form = reactive({
  title: '',
  category: '',
  time: '',
  difficulty: '',
  description: '',
  ingredients: [''],
  steps: [''],
  image: ''
});

const addIngredient = () => form.ingredients.push('');
const removeIngredient = (idx) => form.ingredients.splice(idx, 1);

const addStep = () => form.steps.push('');
const removeStep = (idx) => form.steps.splice(idx, 1);

const submitRecipe = async () => {
  try {
    await recipeService.create({
      ...form,
      ingredients: [...form.ingredients],
      steps: [...form.steps]
    });

    alert('Receta publicada exitosamente.');
    emit('recipe-created');
  } catch (error) {
    alert(error.message);
  }
};
</script>

<style scoped>
.create-container {
  max-width: 650px;
  margin: 0 auto;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
input, select, textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.8rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
}
.row { display: flex; gap: 0.5rem; }
.dynamic-section { margin-bottom: 1.2rem; }
.dynamic-row { display: flex; gap: 0.5rem; margin-bottom: 0.4rem; }
.btn-remove { background: #ef4444; color: white; border: none; padding: 0.4rem 0.6rem; border-radius: 4px; cursor: pointer; }
.btn-add { background: #0284c7; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
.btn-submit { width: 100%; background: #16a34a; color: white; border: none; padding: 0.8rem; border-radius: 6px; font-weight: bold; cursor: pointer; }
</style>