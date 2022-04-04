export function direccionValidator(direccion) {
    if (!direccion) return "La dirección no puede estar vacía."
    if (direccion.length < 15) return 'Debe ingresar una dirección más específica.'
    return ''
}