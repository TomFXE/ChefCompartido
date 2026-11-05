import { ref, computed } from 'vue';

const SESSION_KEY = 'chefcompartido_session';
const USERS_KEY = 'chefcompartido_users';

// -------------------------
// CARGAR SESION
// -------------------------

const loadSession = () => {
  const savedSession = localStorage.getItem(SESSION_KEY);

  if (!savedSession) {
    return {
      user: null,
      token: null
    };
  }

  try {
    return JSON.parse(savedSession);
  } catch {
    localStorage.removeItem(SESSION_KEY);

    return {
      user: null,
      token: null
    };
  }
};

const session = loadSession();

const currentUser = ref(session.user || null);
const token = ref(session.token || null);

// -------------------------
// USUARIOS
// -------------------------

const loadUsers = () => {
  const savedUsers = localStorage.getItem(USERS_KEY);

  if (!savedUsers) {
    return [];
  }

  try {
    const users = JSON.parse(savedUsers);

    return Array.isArray(users) ? users : [];
  } catch {
    localStorage.removeItem(USERS_KEY);
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
};

// -------------------------
// SESION
// -------------------------

const saveSession = () => {
  if (!currentUser.value || !token.value) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      user: currentUser.value,
      token: token.value
    })
  );
};

// -------------------------
// SERVICIO
// -------------------------

export const authService = {
  currentUser,
  token,

  isAuthenticated: computed(() =>
    Boolean(currentUser.value && token.value)
  ),

  register(userData) {
    const name = userData.name?.trim();
    const email = userData.email?.trim().toLowerCase();
    const password = userData.password;

    if (!name || !email || !password) {
      return Promise.reject(
        new Error('Todos los datos son obligatorios.')
      );
    }

    if (password.length < 6) {
      return Promise.reject(
        new Error(
          'La contraseña debe contener al menos 6 caracteres.'
        )
      );
    }

    const users = loadUsers();

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      return Promise.reject(
        new Error('Ya existe una cuenta con este correo.')
      );
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password
    };

    users.push(newUser);

    saveUsers(users);

    return Promise.resolve({
      success: true,
      message: 'Usuario registrado con éxito.'
    });
  },

  login(email, password) {
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return Promise.reject(
        new Error(
          'El correo y la contraseña son obligatorios.'
        )
      );
    }

    const users = loadUsers();

    const user = users.find(
      (item) => item.email === normalizedEmail
    );

    if (!user) {
      return Promise.reject(
        new Error('No existe una cuenta registrada con este correo.')
      );
    }

    if (user.password !== password) {
      return Promise.reject(
        new Error('La contraseña es incorrecta.')
      );
    }

    // La contraseña NO se incluye dentro de la sesión.
    currentUser.value = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    token.value = `demo-token-${Date.now()}`;

    saveSession();

    return Promise.resolve({
      user: currentUser.value,
      token: token.value
    });
  },

  logout() {
    currentUser.value = null;
    token.value = null;

    localStorage.removeItem(SESSION_KEY);
  },

  requireAuth() {
    if (!this.isAuthenticated.value) {
      throw new Error(
        'Debes iniciar sesión para realizar esta acción.'
      );
    }

    return currentUser.value;
  }
};