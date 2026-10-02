<template>
  <div class="profile-container">
    <h2>Mi Perfil</h2>
    <div class="profile-card">
      <p><strong>Nombre:</strong> {{ user.name }}</p>
      <p><strong>Correo:</strong> {{ user.email }}</p>
      <p><strong>Biografía:</strong> Aficionado a la cocina italiana y mexicana.</p>
      <button @click="editProfile">Editar Datos</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  name: 'Tomás Jiménez',
  email: 'tomas@example.com'
});

const editProfile = () => {
  alert('Modo edición activado');
};
</script>

<style scoped>
.profile-container { max-width: 500px; margin: 2rem auto; }
.profile-card { padding: 1.5rem; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; }
</style>