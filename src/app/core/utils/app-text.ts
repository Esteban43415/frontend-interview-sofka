export class AppText {
  static err_max_length_msg = (max: number) =>
    `El campo debe tener máximo ${max} caracteres`;
  static err_min_length = (min: number) =>
    `El campo debe tener mínimo ${min} caracteres`;
  static readonly field_required = 'El campo es requerido';
}
