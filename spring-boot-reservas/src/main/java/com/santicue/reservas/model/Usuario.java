package com.santicue.reservas.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.sql.Timestamp;

@Entity
@Table(name = "usuarios")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer id_usuario;
    
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;
    
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(name = "contrasena", nullable = false, length = 255)
    private String contrasena;
    
    @Column(name = "created_at")
    private Timestamp created_at;
    
    @Column(name = "updated_at")
    private Timestamp updated_at;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_rol")
    @JsonManagedReference
    private Rol rol;

    // Constructores
    public Usuario() {}

    public Usuario(String nombre, String email, String contrasena, Rol rol) {
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
        this.rol = rol;
    }

    // Getters y Setters
    public Integer getId_usuario() { return id_usuario; }
    public void setId_usuario(Integer id_usuario) { this.id_usuario = id_usuario; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }
    
    public Timestamp getCreated_at() { return created_at; }
    public void setCreated_at(Timestamp created_at) { this.created_at = created_at; }
    
    public Timestamp getUpdated_at() { return updated_at; }
    public void setUpdated_at(Timestamp updated_at) { this.updated_at = updated_at; }
    
    public Rol getRol() { return rol; }
    public void setRol(Rol rol) { this.rol = rol; }

    @Override
    public String toString() {
        return "Usuario{" +
                "id_usuario=" + id_usuario +
                ", nombre='" + nombre + '\'' +
                ", email='" + email + '\'' +
                ", created_at=" + created_at +
                ", updated_at=" + updated_at +
                ", rol=" + (rol != null ? rol.getId_rol() : null) +
                '}';
    }
} 