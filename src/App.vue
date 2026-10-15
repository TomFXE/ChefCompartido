<template>
  <div class="app-main">
    <header class="header">
      <h1>ChefCompartido</h1>
      <nav class="nav">
        <button :class="{ active: currentTab === 'catalog' }" @click="currentTab = 'catalog'">Catálogo</button>
        <button :class="{ active: currentTab === 'create' }" @click="currentTab = 'create'">+ Publicar Receta</button>
        <button :class="{ active: currentTab === 'auth' }" @click="currentTab = 'auth'">Cuenta / Perfil</button>
      </nav>
    </header>

    <main class="content">
      <!-- Tab 1: Catálogo y Detalle -->
      <section v-if="currentTab === 'catalog'">
        <RecipeDetailView
          v-if="selectedRecipe"
          :recipe="selectedRecipe"
          @back="selectedRecipe = null"
        />
        <RecipeCatalog
          v-else
          @select-recipe="openDetail"
        />
      </section>

      <!-- Tab 2: Crear Receta -->
      <section v-if="currentTab === 'create'">
        <CreateRecipeView @recipe-created="onRecipeCreated" />
      </section>

      <!-- Tab 3: Autenticación y Perfil (Del Sprint 2) -->
      <section v-if="currentTab === 'auth'" class="auth-grid">
        <ProfileView />
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <LoginView />
          <RegisterView />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { recipeService } from './services/recipeService';
import RecipeCatalog from './components/RecipeCatalog.vue';
import RecipeDetailView from './views/RecipeDetailView.vue';
import CreateRecipeView from './views/CreateRecipeView.vue';
import LoginView from './views/LoginView.vue';
import RegisterView from './views/RegisterView.vue';
import ProfileView from './views/ProfileView.vue';

const currentTab = ref('catalog');
const selectedRecipe = ref(null);

const openDetail = (id) => {
  selectedRecipe.value = recipeService.getById(id);
};

const onRecipeCreated = () => {
  currentTab.value = 'catalog';
};
</script>

<style scoped>
.app-main { max-width: 900px; margin: 0 auto; font-family: system-ui, sans-serif; padding: 1rem; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.8rem; }
.header h1 { color: #0f172a; margin: 0; }
.nav button { background: none; border: none; font-size: 1rem; font-weight: bold; color: #64748b; cursor: pointer; padding: 0.5rem 1rem; }
.nav button.active { color: #42b983; border-bottom: 2px solid #42b983; }
.content { margin-top: 1rem; }
.auth-grid { display: flex; flex-direction: column; gap: 1rem; }
</style>