<template>
  <div class="auth-container">
    <h2>Iniciar Sesión - ChefCompartido</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Correo electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authService } from '../services/authService';

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  await authService.login(email.value, password.value);
  alert('¡Inicio de sesión exitoso!');
};
</script>

<style scoped>
.auth-container { max-width: 400px; margin: 2rem auto; padding: 1.5rem; border: 1px solid #ccc; border-radius: 8px; }
input { display: block; width: 100%; margin-bottom: 1rem; padding: 0.5rem; }
button { width: 100%; padding: 0.5rem; background-color: #42b983; color: white; border: none; cursor: pointer; }
</style>