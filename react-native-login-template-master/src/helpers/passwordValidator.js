export function passwordValidator(password) {
  if (!password) return "La contraseña no puede estar vacía"
  if (password.length < 6) return 'Debe contener por lo menos 6 caracteres.'
  return ''
}
