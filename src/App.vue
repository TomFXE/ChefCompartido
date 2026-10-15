<template>
  <main style="padding: 20px; font-family: sans-serif;">
    <h1>ChefCompartido - Pruebas de Desarrollo (Sprint 2)</h1>
    
    <!-- Puedes alternar o mostrar los componentes para probarlos -->
    <section>
      <RecipeCatalog />
    </section>
    
    <hr />
    
    <section style="display: flex; gap: 20px; flex-wrap: wrap;">
      <LoginView />
      <RegisterView />
    </section>

    <hr />

    <section>
      <ProfileView />
    </section>
  </main>
</template>

<script setup>
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import ProfileView from './views/ProfileView.vue'
import RecipeCatalog from './components/RecipeCatalog.vue'
</script>