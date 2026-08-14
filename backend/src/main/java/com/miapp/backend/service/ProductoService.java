package com.miapp.backend.service;

import com.miapp.backend.dto.ProductoRequestDTO;
import com.miapp.backend.dto.ProductoResponseDTO;
import java.util.List;

/**
 * Define las operaciones de negocio disponibles para el módulo de Inventario.
 */
public interface ProductoService {

    ProductoResponseDTO crear(ProductoRequestDTO request);

    ProductoResponseDTO obtenerPorId(Long id);

    List<ProductoResponseDTO> listarTodos();

    ProductoResponseDTO actualizar(Long id, ProductoRequestDTO request);

    void eliminar(Long id);

    List<ProductoResponseDTO> buscarPorNombre(String nombre);
}