package com.santicue.reservas.controller;

import com.santicue.reservas.model.Cliente;
import com.santicue.reservas.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<Cliente>> getAllClientes() {
        try {
            List<Cliente> clientes = clienteService.findAll();
            return ResponseEntity.ok(clientes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Integer id) {
        try {
            Optional<Cliente> cliente = clienteService.findById(id);
            return cliente.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createCliente(@RequestBody Cliente cliente) {
        try {
            // Validaciones básicas
            if (cliente.getDni() == null || cliente.getDni().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El DNI es obligatorio");
            }
            if (cliente.getNombre() == null || cliente.getNombre().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El nombre es obligatorio");
            }
            if (cliente.getApellido() == null || cliente.getApellido().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El apellido es obligatorio");
            }

            // Verificar si ya existe un cliente con el mismo DNI
            Optional<Cliente> existingCliente = clienteService.findByDni(cliente.getDni());
            if (existingCliente.isPresent()) {
                return ResponseEntity.badRequest().body("Ya existe un cliente con el DNI: " + cliente.getDni());
            }

            Cliente savedCliente = clienteService.save(cliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCliente);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear el cliente: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCliente(@PathVariable Integer id, @RequestBody Cliente clienteDetails) {
        try {
            // Validaciones básicas
            if (clienteDetails.getDni() == null || clienteDetails.getDni().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El DNI es obligatorio");
            }
            if (clienteDetails.getNombre() == null || clienteDetails.getNombre().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El nombre es obligatorio");
            }
            if (clienteDetails.getApellido() == null || clienteDetails.getApellido().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El apellido es obligatorio");
            }

            // Verificar si existe el cliente a actualizar
            Optional<Cliente> existingCliente = clienteService.findById(id);
            if (existingCliente.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            // Verificar si el DNI ya existe en otro cliente
            Optional<Cliente> clienteWithSameDni = clienteService.findByDni(clienteDetails.getDni());
            if (clienteWithSameDni.isPresent() && !clienteWithSameDni.get().getId_cliente().equals(id)) {
                return ResponseEntity.badRequest().body("Ya existe otro cliente con el DNI: " + clienteDetails.getDni());
            }

            Cliente updatedCliente = clienteService.update(id, clienteDetails);
            if (updatedCliente != null) {
                return ResponseEntity.ok(updatedCliente);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar el cliente: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCliente(@PathVariable Integer id) {
        try {
            boolean deleted = clienteService.deleteById(id);
            if (deleted) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar el cliente: " + e.getMessage());
        }
    }
} 