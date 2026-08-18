import { AfterViewInit, Component, OnInit, signal, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/models/producto.model';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [
    CommonModule, DecimalPipe,
    MatTableModule, MatSortModule, MatPaginatorModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule
  ],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.scss'
})
export class ProductoListComponent implements OnInit, AfterViewInit {
  // Columnas que se muestran, en orden. "acciones" no es un campo real, es el de los botones.
  displayedColumns: string[] = [
    'id', 'nombre', 'cantidad', 'unidadMedida',
    'precioUnitario', 'stockMinimo', 'stockBajo', 'acciones'
  ];

  // MatTableDataSource reemplaza tu array plano: se encarga de filtrar, ordenar y paginar solo
  dataSource = new MatTableDataSource<Producto>([]);

  cargando = signal(true);
  error = signal<string | null>(null);

  @Output() nuevo = new EventEmitter<void>();
  @Output() editar = new EventEmitter<Producto>();

  // Referencias a los componentes de Material que van en el HTML (mat-sort y mat-paginator)
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  // Se ejecuta después de que el HTML ya está renderizado, ahí sí existen sort/paginator
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cargarProductos(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.productoService.listarTodos().subscribe({
      next: (data) => {
        this.dataSource.data = data; // <- alimenta la tabla
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.error.set('No se pudo conectar con el backend.');
        this.cargando.set(false);
      }
    });
  }

  // Conecta el input de filtro con el dataSource
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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