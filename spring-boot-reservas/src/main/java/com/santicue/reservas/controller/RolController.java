package com.santicue.reservas.controller;

import com.santicue.reservas.model.Rol;
import com.santicue.reservas.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:5173")
public class RolController {
    @Autowired
    private RolService rolService;

    @GetMapping
    public ResponseEntity<List<Rol>> getAllRoles() {
        try {
            List<Rol> roles = rolService.findAll();
            return ResponseEntity.ok(roles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> getRolById(@PathVariable Integer id) {
        try {
            Optional<Rol> rol = rolService.findById(id);
            return rol.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createRol(@RequestBody Rol rol) {
        try {
            // Validaciones básicas
            if (rol.getDescripcion() == null || rol.getDescripcion().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("La descripción del rol es obligatoria");
            }

            Rol savedRol = rolService.save(rol);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRol);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear el rol: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRol(@PathVariable Integer id, @RequestBody Rol rolDetails) {
        try {
            Optional<Rol> optionalRol = rolService.findById(id);
            if (optionalRol.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            if (rolDetails.getDescripcion() == null || rolDetails.getDescripcion().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("La descripción del rol es obligatoria");
            }

            Rol rol = optionalRol.get();
            rol.setDescripcion(rolDetails.getDescripcion());
            return ResponseEntity.ok(rolService.save(rol));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar el rol: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRol(@PathVariable Integer id) {
        try {
            if (rolService.findById(id).isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            rolService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar el rol: " + e.getMessage());
        }
    }
} 