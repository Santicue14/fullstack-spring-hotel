package com.santicue.reservas.controller;

import com.santicue.reservas.model.Habitacion;
import com.santicue.reservas.service.HabitacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/habitaciones")
public class HabitacionController {
    @Autowired
    private HabitacionService habitacionService;

    @GetMapping
    public List<Habitacion> getAllHabitaciones() {
        return habitacionService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Habitacion> getHabitacionById(@PathVariable Integer id) {
        Optional<Habitacion> habitacion = habitacionService.findById(id);
        return habitacion.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Habitacion createHabitacion(@RequestBody Habitacion habitacion) {
        return habitacionService.save(habitacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Habitacion> updateHabitacion(@PathVariable Integer id, @RequestBody Habitacion habitacionDetails) {
        Optional<Habitacion> optionalHabitacion = habitacionService.findById(id);
        if (optionalHabitacion.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Habitacion habitacion = optionalHabitacion.get();
        
        // Update all fields from the request body
        habitacion.setNumero(habitacionDetails.getNumero());
        habitacion.setTipo(habitacionDetails.getTipo());
        habitacion.setCapacidad(habitacionDetails.getCapacidad());
        habitacion.setPrecio_noche(habitacionDetails.getPrecio_noche());
        habitacion.setEstado(habitacionDetails.getEstado());
        habitacion.setDescripcion(habitacionDetails.getDescripcion());
        
        return ResponseEntity.ok(habitacionService.save(habitacion));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHabitacion(@PathVariable Integer id) {
        if (habitacionService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        habitacionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 