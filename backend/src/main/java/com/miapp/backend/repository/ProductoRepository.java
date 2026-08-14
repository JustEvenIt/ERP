package com.miapp.backend.repository;

import com.miapp.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

/**
 * Repositorio de acceso a datos para la entidad Producto.
 * Spring Data JPA genera automáticamente la implementación en tiempo de ejecución.
 */
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    /**
     * Busca productos cuyo nombre contenga el texto dado, ignorando mayúsculas/minúsculas.
     * Útil para el buscador del frontend.
     */
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    /**
     * Devuelve los productos cuya cantidad actual es menor o igual a su stock mínimo,
     * para alertas de reabastecimiento.
     */
    @Query("SELECT p FROM Producto p WHERE p.cantidad <= p.stockMinimo")
    List<Producto> findProductosConStockBajo();
}