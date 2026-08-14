package com.miapp.backend.service.impl;

import com.miapp.backend.dto.ProductoRequestDTO;
import com.miapp.backend.dto.ProductoResponseDTO;
import com.miapp.backend.model.Producto;
import com.miapp.backend.repository.ProductoRepository;
import com.miapp.backend.service.ProductoNoEncontradoException;
import com.miapp.backend.service.ProductoService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación de la lógica de negocio del inventario.
 * Se encarga de convertir entre entidades y DTOs, y de aplicar las reglas de negocio.
 */
@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    // Inyección de dependencias por constructor (buena práctica sobre @Autowired en el campo)
    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public ProductoResponseDTO crear(ProductoRequestDTO request) {
        Producto producto = new Producto();
        mapearRequestAEntidad(request, producto);
        Producto guardado = productoRepository.save(producto);
        return mapearEntidadAResponse(guardado);
    }

    @Override
    public ProductoResponseDTO obtenerPorId(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNoEncontradoException(id));
        return mapearEntidadAResponse(producto);
    }

    @Override
    public List<ProductoResponseDTO> listarTodos() {
        return productoRepository.findAll().stream()
                .map(this::mapearEntidadAResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductoResponseDTO actualizar(Long id, ProductoRequestDTO request) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNoEncontradoException(id));
        mapearRequestAEntidad(request, producto);
        Producto actualizado = productoRepository.save(producto);
        return mapearEntidadAResponse(actualizado);
    }

    @Override
    public void eliminar(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new ProductoNoEncontradoException(id);
        }
        productoRepository.deleteById(id);
    }

    @Override
    public List<ProductoResponseDTO> buscarPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre).stream()
                .map(this::mapearEntidadAResponse)
                .collect(Collectors.toList());
    }

    // --- Métodos privados de mapeo (evitan repetir código en cada operación) ---

    private void mapearRequestAEntidad(ProductoRequestDTO request, Producto producto) {
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setCantidad(request.getCantidad());
        producto.setUnidadMedida(request.getUnidadMedida());
        producto.setPrecioUnitario(request.getPrecioUnitario());
        producto.setStockMinimo(request.getStockMinimo());
    }

    private ProductoResponseDTO mapearEntidadAResponse(Producto producto) {
        return new ProductoResponseDTO(
                producto.getId(),
                producto.getNombre(),
                producto.getDescripcion(),
                producto.getCantidad(),
                producto.getUnidadMedida(),
                producto.getPrecioUnitario(),
                producto.getStockMinimo(),
                producto.getFechaActualizacion()
        );
    }
}