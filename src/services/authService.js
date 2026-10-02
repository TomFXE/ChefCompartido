// Servicio de prueba para maqueta entregable 1
export const authService = {
  login(email, password) {
    console.log("Iniciando sesión con:", email);
    return Promise.resolve({
      user: { name: "Tomás Jiménez", email: email },
      token: "demo-jwt-token-12345"
    });
  },
  register(userData) {
    console.log("Registrando usuario:", userData);
    return Promise.resolve({ success: true, message: "Usuario registrado con éxito" });
  }
};