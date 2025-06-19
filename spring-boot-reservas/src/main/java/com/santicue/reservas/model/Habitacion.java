package com.santicue.reservas.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.sql.Timestamp;

@Entity
@Table(name = "habitaciones")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Habitacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_habitacion")
    private Integer id_habitacion;
    
    @Column(name = "numero", nullable = false, unique = true)
    private String numero;
    
    @Column(name = "tipo", nullable = false, length = 50)
    private String tipo;
    
    @Column(name = "capacidad", nullable = false)
    private Integer capacidad;
    
    @Column(name = "precio_noche", nullable = false)
    private Double precio_noche;
    
    @Column(name = "estado", nullable = false, length = 20)
    private String estado; // DISPONIBLE, OCUPADA, MANTENIMIENTO
    
    @Column(name = "descripcion", length = 500)
    private String descripcion;
    
    @Column(name = "created_at")
    private Timestamp created_at;
    
    @Column(name = "updated_at")
    private Timestamp updated_at;

    // Constructores
    public Habitacion() {}

    public Habitacion(String numero, String tipo, Integer capacidad, Double precio_noche, String estado) {
        this.numero = numero;
        this.tipo = tipo;
        this.capacidad = capacidad;
        this.precio_noche = precio_noche;
        this.estado = estado;
    }

    // Getters y Setters
    public Integer getId_habitacion() { return id_habitacion; }
    public void setId_habitacion(Integer id_habitacion) { this.id_habitacion = id_habitacion; }
    
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }
    
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    
    public Integer getCapacidad() { return capacidad; }
    public void setCapacidad(Integer capacidad) { this.capacidad = capacidad; }
    
    public Double getPrecio_noche() { return precio_noche; }
    public void setPrecio_noche(Double precio_noche) { this.precio_noche = precio_noche; }
    
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    
    public Timestamp getCreated_at() { return created_at; }
    public void setCreated_at(Timestamp created_at) { this.created_at = created_at; }
    
    public Timestamp getUpdated_at() { return updated_at; }
    public void setUpdated_at(Timestamp updated_at) { this.updated_at = updated_at; }

    @Override
    public String toString() {
        return "Habitacion{" +
                "id_habitacion=" + id_habitacion +
                ", numero='" + numero + '\'' +
                ", tipo='" + tipo + '\'' +
                ", capacidad=" + capacidad +
                ", precio_noche=" + precio_noche +
                ", estado='" + estado + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", created_at=" + created_at +
                ", updated_at=" + updated_at +
                '}';
    }
} 