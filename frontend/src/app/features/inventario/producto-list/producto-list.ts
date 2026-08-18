import { Component, OnInit, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/models/producto.model';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.scss'
})
export class ProductoListComponent implements OnInit {
  productos = signal<Producto[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);

  @Output() nuevo = new EventEmitter<void>();
  @Output() editar = new EventEmitter<Producto>();

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.productoService.listarTodos().subscribe({
      next: (data) => { this.productos.set(data); this.cargando.set(false); },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error.set('No se pudo conectar con el backend.');
        this.cargando.set(false);
      }
    });
  }

  onEliminar(producto: Producto): void {
    const confirmado = confirm(`¿Eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`);
    if (!confirmado) return;

    this.productoService.eliminar(producto.id).subscribe({
      next: () => this.cargarProductos(),
      error: (err) => {
        console.error('Error al eliminar producto:', err);
        alert('No se pudo eliminar el producto.');
      }
    });
  }
}