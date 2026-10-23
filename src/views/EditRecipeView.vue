<template>
  <div class="edit-container">
    <h2>Editar o Eliminar Receta</h2>
    <form @submit.prevent="handleUpdate">
      <input v-model="form.title" type="text" placeholder="Título" required />
      <textarea v-model="form.description" placeholder="Descripción" rows="3" required></textarea>
      
      <div class="actions">
        <button type="submit" class="btn-save">Guardar Cambios</button>
        <button type="button" @click="handleDelete" class="btn-delete">Eliminar Receta</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRecipeStore } from '../stores/recipeStore';

const props = defineProps({ recipe: Object });
const emit = defineEmits(['close']);
const store = useRecipeStore();

const form = reactive({ ...props.recipe });

const handleUpdate = () => {
  store.updateRecipe(form);
  alert('¡Receta actualizada con éxito!');
  emit('close');
};

const handleDelete = () => {
  if (confirm('¿Estás seguro de eliminar esta receta?')) {
    store.deleteRecipe(form.id);
    alert('Receta eliminada.');
    emit('close');
  }
};
</script>

<style scoped>
.edit-container { max-width: 500px; margin: 0 auto; background: #fff; padding: 1.5rem; border-radius: 8px; border: 1px solid #cbd5e1; }
input, textarea { width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box; }
.actions { display: flex; gap: 1rem; }
.btn-save { background: #2563eb; color: white; border: none; padding: 0.6rem 1rem; border-radius: 4px; cursor: pointer; flex: 1; }
.btn-delete { background: #dc2626; color: white; border: none; padding: 0.6rem 1rem; border-radius: 4px; cursor: pointer; flex: 1; }
</style>