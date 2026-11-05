<template>
  <div class="app-main">
    <header class="header">
      <h1>ChefCompartido</h1>
      <nav class="nav">
        <button :class="{ active: currentTab === 'catalog' }" @click="currentTab = 'catalog'">Catálogo</button>
        <button
          :class="{ active: currentTab === 'create' }"
          @click="openCreate"> + Publicar Receta
        </button>
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
        <div class="auth-forms">
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
import { authService } from './services/authService';

const currentTab = ref('catalog');
const selectedRecipe = ref(null);

const openDetail = (id) => {
  selectedRecipe.value = recipeService.getById(id);
};

const onRecipeCreated = () => {
  currentTab.value = 'catalog';
};

const openCreate = () => {
  if (!authService.isAuthenticated.value) {
    alert('Debes iniciar sesión para publicar una receta.');
    currentTab.value = 'auth';
    return;
  }

  currentTab.value = 'create';
};

</script>

<style scoped>
.app-main {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  padding: 1rem;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.8rem;
}

.header h1 {
  color: #0f172a;
  margin: 0;
  overflow-wrap: anywhere;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.25rem;
}

.nav button {
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  color: #64748b;
  cursor: pointer;
  padding: 0.6rem 0.9rem;
  border-radius: 6px;
}

.nav button:hover {
  background: #f1f5f9;
}

.nav button.active {
  color: #15803d;
  border-bottom: 2px solid #42b983;
}

.content {
  margin-top: 1rem;
}

.auth-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-forms {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  align-items: start;
  margin-top: 1rem;
}

/* TABLET Y MOVIL */
@media (max-width: 768px) {
  .header {
    align-items: stretch;
    flex-direction: column;
  }

  .header h1 {
    text-align: center;
  }

  .nav {
    display: grid;
    grid-template-columns: 1fr;
  }

  .nav button {
    width: 100%;
    min-height: 44px;
    border: 1px solid #e2e8f0;
  }

  .nav button.active {
    border: 1px solid #42b983;
    background: #f0fdf4;
  }

  .auth-forms {
    grid-template-columns: 1fr;
  }
}

/* MOVIL PEQUENO */
@media (max-width: 480px) {
  .app-main {
    padding: 0.65rem;
  }

  .header h1 {
    font-size: 1.6rem;
  }
}
</style>