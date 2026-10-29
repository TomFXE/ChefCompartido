import { ref, computed } from 'vue';

const STORAGE_KEY = 'chefcompartido_session';

const savedSession = localStorage.getItem(STORAGE_KEY);

const currentUser = ref(
  savedSession ? JSON.parse(savedSession).user : null
);

const token = ref(
  savedSession ? JSON.parse(savedSession).token : null
);

const saveSession = () => {
  if (!currentUser.value || !token.value) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      user: currentUser.value,
      token: token.value
    })
  );
};

export const authService = {
  currentUser,
  token,

  isAuthenticated: computed(() => Boolean(currentUser.value && token.value)),

  login(email, password) {
    if (!email || !password) {
      return Promise.reject(
        new Error('El correo y la contraseña son obligatorios.')
      );
    }

    currentUser.value = {
      id: email.toLowerCase(),
      name: email.split('@')[0],
      email
    };

    token.value = `demo-token-${Date.now()}`;
    saveSession();

    return Promise.resolve({
      user: currentUser.value,
      token: token.value
    });
  },

  register(userData) {
    if (!userData.name || !userData.email || !userData.password) {
      return Promise.reject(
        new Error('Todos los datos son obligatorios.')
      );
    }

    return Promise.resolve({
      success: true,
      message: 'Usuario registrado con éxito'
    });
  },

  logout() {
    currentUser.value = null;
    token.value = null;
    localStorage.removeItem(STORAGE_KEY);
  },

  requireAuth() {
    if (!this.isAuthenticated.value) {
      throw new Error('Debes iniciar sesión para realizar esta acción.');
    }

    return currentUser.value;
  }
};