package com.santicue.reservas.controller;

import com.santicue.reservas.model.Reserva;
import com.santicue.reservas.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {
    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public List<Reserva> getAllReservas() {
        return reservaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> getReservaById(@PathVariable Integer id) {
        Optional<Reserva> reserva = reservaService.findById(id);
        return reserva.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Reserva createReserva(@RequestBody Reserva reserva) {
        return reservaService.save(reserva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reserva> updateReserva(@PathVariable Integer id, @RequestBody Reserva reservaDetails) {
        Optional<Reserva> optionalReserva = reservaService.findById(id);
        if (optionalReserva.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Reserva reserva = optionalReserva.get();
        reserva.setCliente(reservaDetails.getCliente());
        reserva.setHabitacion(reservaDetails.getHabitacion());
        reserva.setDias(reservaDetails.getDias());
        reserva.setTotal(reservaDetails.getTotal());
        reserva.setFecha_reserva(reservaDetails.getFecha_reserva());
        reserva.setUsuario(reservaDetails.getUsuario());
        return ResponseEntity.ok(reservaService.save(reserva));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReserva(@PathVariable Integer id) {
        if (reservaService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        reservaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 