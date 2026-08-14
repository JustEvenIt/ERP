import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

/**
 * Encapsula todas las llamadas HTTP al módulo de Inventario del backend.
 * Todas las rutas pasan por /api/productos gracias al proxy configurado en Angular.
 */
@Injectable({ providedIn: 'root' })
export class ProductoService {
  private apiUrl = '/api/productos';

  constructor(private http: HttpClient) {}

  /** Obtiene la lista completa de productos del inventario. */
  listarTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  /** Obtiene un producto específico por su id. */
  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  /** Busca productos cuyo nombre contenga el texto dado. */
  buscarPorNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/buscar`, {
      params: { nombre }
    });
  }
}