/**
 * Representa un producto del inventario tal como lo devuelve el backend.
 * Debe reflejar exactamente los campos de ProductoResponseDTO en Spring Boot.
 */
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  unidadMedida: string;
  precioUnitario: number;
  stockMinimo: number;
  fechaActualizacion: string; // llega como string ISO desde el backend
  stockBajo: boolean;
}