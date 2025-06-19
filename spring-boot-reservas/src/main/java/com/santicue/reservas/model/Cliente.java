package com.santicue.reservas.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.sql.Timestamp;

@Entity
@Table(name = "clientes")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente")
    private Integer id_cliente;
    
    @Column(name = "dni", nullable = false, unique = true)
    private String dni;
    
    @Column(name = "nombre", nullable = false)
    private String nombre;
    
    @Column(name = "apellido", nullable = false)
    private String apellido;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "telefono")
    private String telefono;
    
    @Column(name = "created_at")
    private Timestamp created_at;
    
    @Column(name = "updated_at")
    private Timestamp updated_at;

    // Constructores
    public Cliente() {}

    public Cliente(String dni, String nombre, String apellido, String email, String telefono) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
    }

    // Getters y Setters
    public Integer getId_cliente() { return id_cliente; }
    public void setId_cliente(Integer id_cliente) { this.id_cliente = id_cliente; }
    
    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    
    public Timestamp getCreated_at() { return created_at; }
    public void setCreated_at(Timestamp created_at) { this.created_at = created_at; }
    
    public Timestamp getUpdated_at() { return updated_at; }
    public void setUpdated_at(Timestamp updated_at) { this.updated_at = updated_at; }

    @Override
    public String toString() {
        return "Cliente{" +
                "id_cliente=" + id_cliente +
                ", dni='" + dni + '\'' +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", email='" + email + '\'' +
                ", telefono='" + telefono + '\'' +
                ", created_at=" + created_at +
                ", updated_at=" + updated_at +
                '}';
    }
}
