<template>
  <div class="auth-container">
    <h2>Crear Cuenta - ChefCompartido</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="name" type="text" placeholder="Nombre completo" required />
      <input v-model="email" type="email" placeholder="Correo electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authService } from '../services/authService';

const name = ref('');
const email = ref('');
const password = ref('');

const handleRegister = async () => {
  await authService.register({ name: name.value, email: email.value, password: password.value });
  alert('¡Cuenta creada exitosamente!');
};
</script>

<style scoped>
.auth-container { max-width: 400px; margin: 2rem auto; padding: 1.5rem; border: 1px solid #ccc; border-radius: 8px; }
input { display: block; width: 100%; margin-bottom: 1rem; padding: 0.5rem; }
button { width: 100%; padding: 0.5rem; background-color: #35495e; color: white; border: none; cursor: pointer; }
</style>