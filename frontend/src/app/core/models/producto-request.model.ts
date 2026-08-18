/**
 * Forma de los datos que se envían al backend al crear o actualizar un producto.
 * Debe reflejar ProductoRequestDTO en Spring Boot.
 */
export interface ProductoRequest {
  nombre: string;
  descripcion: string;
  cantidad: number;
  unidadMedida: string;
  precioUnitario: number;
  stockMinimo: number;
}