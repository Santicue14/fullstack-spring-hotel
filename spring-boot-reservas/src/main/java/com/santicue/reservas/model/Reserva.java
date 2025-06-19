package com.santicue.reservas.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.sql.Timestamp;

@Entity
@Table(name = "reservas")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reserva")
    private Integer id_reserva;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_cliente", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_habitacion", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Habitacion habitacion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Usuario usuario;

    @Column(name = "fecha_inicio", nullable = false)
    private Timestamp fecha_inicio;

    @Column(name = "fecha_fin", nullable = false)
    private Timestamp fecha_fin;

    @Column(name = "dias", nullable = false)
    private Integer dias;

    @Column(name = "total", nullable = false)
    private Double total;

    @Column(name = "estado", nullable = false, length = 20)
    private String estado; // CONFIRMADA, CANCELADA, COMPLETADA

    @Column(name = "observaciones", length = 500)
    private String observaciones;

    @Column(name = "fecha_reserva", nullable = false)
    private Timestamp fecha_reserva;

    @Column(name = "created_at")
    private Timestamp created_at;

    @Column(name = "updated_at")
    private Timestamp updated_at;

    // Constructores
    public Reserva() {}

    public Reserva(Cliente cliente, Habitacion habitacion, Usuario usuario, 
                   Timestamp fecha_inicio, Timestamp fecha_fin, Integer dias, 
                   Double total, String estado) {
        this.cliente = cliente;
        this.habitacion = habitacion;
        this.usuario = usuario;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.dias = dias;
        this.total = total;
        this.estado = estado;
    }

    // Getters y Setters
    public Integer getId_reserva() { return id_reserva; }
    public void setId_reserva(Integer id_reserva) { this.id_reserva = id_reserva; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public Habitacion getHabitacion() { return habitacion; }
    public void setHabitacion(Habitacion habitacion) { this.habitacion = habitacion; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Timestamp getFecha_inicio() { return fecha_inicio; }
    public void setFecha_inicio(Timestamp fecha_inicio) { this.fecha_inicio = fecha_inicio; }

    public Timestamp getFecha_fin() { return fecha_fin; }
    public void setFecha_fin(Timestamp fecha_fin) { this.fecha_fin = fecha_fin; }

    public Integer getDias() { return dias; }
    public void setDias(Integer dias) { this.dias = dias; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }

    public Timestamp getFecha_reserva() { return fecha_reserva; }
    public void setFecha_reserva(Timestamp fecha_reserva) { this.fecha_reserva = fecha_reserva; }

    public Timestamp getCreated_at() { return created_at; }
    public void setCreated_at(Timestamp created_at) { this.created_at = created_at; }

    public Timestamp getUpdated_at() { return updated_at; }
    public void setUpdated_at(Timestamp updated_at) { this.updated_at = updated_at; }

    // Método de compatibilidad
    public Integer getId_reservas() { return id_reserva; }
    public void setId_reservas(Integer id_reservas) { this.id_reserva = id_reservas; }

    @Override
    public String toString() {
        return "Reserva{" +
                "id_reserva=" + id_reserva +
                ", cliente=" + (cliente != null ? cliente.getId_cliente() : null) +
                ", habitacion=" + (habitacion != null ? habitacion.getId_habitacion() : null) +
                ", usuario=" + (usuario != null ? usuario.getId_usuario() : null) +
                ", fecha_inicio=" + fecha_inicio +
                ", fecha_fin=" + fecha_fin +
                ", dias=" + dias +
                ", total=" + total +
                ", estado='" + estado + '\'' +
                ", observaciones='" + observaciones + '\'' +
                ", fecha_reserva=" + fecha_reserva +
                ", created_at=" + created_at +
                ", updated_at=" + updated_at +
                '}';
    }
} 