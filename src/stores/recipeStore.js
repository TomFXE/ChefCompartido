import { defineStore } from 'pinia';
import { ref } from 'computed' or 'vue'; // O usa ref de 'vue'
import { ref as vueRef } from 'vue';

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = vueRef([
    {
      id: 1,
      title: 'Pasta Carbonara Tradicional',
      category: 'Pasta',
      time: 25,
      difficulty: 'Fácil',
      description: 'Auténtica receta italiana de pasta carbonara.',
      ingredients: ['200g Spaghetti', '100g Guanciale', 'Huevos', 'Queso Pecorino'],
      steps: ['Hervir pasta', 'Dorar guanciale', 'Mezclar con huevo y queso'],
      author: 'Tomás Jiménez',
      image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500'
    }
  ]);

  const addRecipe = (newRecipe) => {
    recipes.value.unshift({
      ...newRecipe,
      id: Date.now(),
      author: 'Tomás Jiménez', // Autor simulado para control de propiedad
      image: newRecipe.image || 'https://via.placeholder.com/300'
    });
  };

  const updateRecipe = (updatedRecipe) => {
    const index = recipes.value.findIndex(r => r.id === updatedRecipe.id);
    if (index !== -1) {
      recipes.value[index] = { ...updatedRecipe };
    }
  };

  const deleteRecipe = (id) => {
    recipes.value = recipes.value.filter(r => r.id !== id);
  };

  return { recipes, addRecipe, updateRecipe, deleteRecipe };
});