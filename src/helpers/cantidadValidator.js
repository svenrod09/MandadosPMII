export function cantidadValidator(cantidad) {
    if (!cantidad) return "La cantidad no puede estar vacía"
    if (cantidad < 1) return 'Cantidad no puede ser menor a 1.'

    return ''
  }