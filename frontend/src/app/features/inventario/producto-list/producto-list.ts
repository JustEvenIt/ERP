import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/models/producto.model';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { delay } from 'rxjs';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, DecimalPipe,MatProgressBarModule],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.scss'
})
export class ProductoListComponent implements OnInit {
  // Signals: Angular repinta automáticamente cuando cambian, sin depender de Zone.js
  productos = signal<Producto[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.productoService.listarTodos().subscribe({
      next: async (data) => {
        this.productos.set(data);
        await delay(50000);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error.set('No se pudo conectar con el backend. Verifica que esté corriendo.');
        this.cargando.set(false);
      }
    });
  }
}