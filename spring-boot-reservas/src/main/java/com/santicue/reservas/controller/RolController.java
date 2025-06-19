package com.santicue.reservas.controller;

import com.santicue.reservas.model.Rol;
import com.santicue.reservas.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
public class RolController {
    @Autowired
    private RolService rolService;

    @GetMapping
    public List<Rol> getAllRoles() {
        return rolService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> getRolById(@PathVariable Integer id) {
        Optional<Rol> rol = rolService.findById(id);
        return rol.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Rol createRol(@RequestBody Rol rol) {
        return rolService.save(rol);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rol> updateRol(@PathVariable Integer id, @RequestBody Rol rolDetails) {
        Optional<Rol> optionalRol = rolService.findById(id);
        if (optionalRol.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Rol rol = optionalRol.get();
        rol.setDescripcion(rolDetails.getDescripcion());
        return ResponseEntity.ok(rolService.save(rol));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRol(@PathVariable Integer id) {
        if (rolService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        rolService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 