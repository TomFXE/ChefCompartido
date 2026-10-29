<template>
  <div class="auth-container">
    <h2>Iniciar sesión</h2>

    <div v-if="authService.isAuthenticated.value" class="session-box">
      <p>
        Sesión iniciada como
        <strong>{{ authService.currentUser.value.name }}</strong>
      </p>

      <button type="button" class="btn-logout" @click="logout">
        Cerrar sesión
      </button>
    </div>

    <form v-else @submit.prevent="handleLogin">
      <input
        v-model.trim="email"
        type="email"
        placeholder="Correo electrónico"
        required
      />

      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        required
      />

      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>

      <button type="submit">Ingresar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authService } from '../services/authService';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';

  try {
    await authService.login(email.value, password.value);
    password.value = '';
    alert('Inicio de sesión exitoso.');
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const logout = () => {
  authService.logout();
  alert('La sesión se cerró correctamente.');
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: 0.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 0.6rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.session-box {
  padding: 1rem;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 6px;
}

.btn-logout {
  background: #dc2626;
}

.error {
  color: #b91c1c;
}
</style>