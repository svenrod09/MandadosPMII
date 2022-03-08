export function telefonoValidator(telefono) {
    if (!telefono) return "El teléfono no puede estar vacío"
    if (telefono.length < 8) return 'Debe contener por lo menos 8 caracteres .'

    return ''
  }
  