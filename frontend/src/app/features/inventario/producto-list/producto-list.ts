import { Component, OnInit } from '@angular/core';
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
  productos: Producto[] = [];
  cargando = true;
  error: string | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.error = null;

    this.productoService.listarTodos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error = 'No se pudo conectar con el backend. Verifica que esté corriendo.';
        this.cargando = false;
      }
    });
  }
}