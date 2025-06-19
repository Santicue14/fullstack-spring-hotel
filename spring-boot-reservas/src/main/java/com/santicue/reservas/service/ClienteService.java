package com.santicue.reservas.service;

import com.santicue.reservas.model.Cliente;
import com.santicue.reservas.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findById(Integer id) {
        return clienteRepository.findById(id);
    }

    public Cliente save(Cliente cliente) {
        // Establecer timestamps para el cliente
        Timestamp now = new Timestamp(System.currentTimeMillis());
        
        // Validaciones básicas para crear un cliente
        if (cliente.getDni() == null || cliente.getDni().trim().isEmpty()) {
            throw new IllegalArgumentException("El DNI es requerido");
        }
        if (cliente.getNombre() == null || cliente.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre es requerido");
        }
        if (cliente.getApellido() == null || cliente.getApellido().trim().isEmpty()) {
            throw new IllegalArgumentException("El apellido es requerido");
        }

        // Verificar si ya existe un cliente con el mismo DNI
        Optional<Cliente> existingCliente = clienteRepository.findByDni(cliente.getDni());
        if (existingCliente.isPresent()) {
            throw new IllegalArgumentException("Ya existe un cliente con el DNI: " + cliente.getDni());
        }
        
        if (cliente.getId_cliente() == null) {
            // Si es un nuevo cliente, establecer el timestamp de creación
            cliente.setCreated_at(now);
        }
        cliente.setUpdated_at(now);
        
        return clienteRepository.save(cliente);
    }

    public Cliente update(Integer id, Cliente clienteDetails) {
        // Verificar si existe el cliente a actualizar
        Optional<Cliente> optionalCliente = clienteRepository.findById(id);
        if (optionalCliente.isEmpty()) {
            throw new IllegalArgumentException("Cliente no encontrado con ID: " + id);
        }

        // Validaciones básicas para actualizar un cliente
        if (clienteDetails.getDni() == null || clienteDetails.getDni().trim().isEmpty()) {
            throw new IllegalArgumentException("El DNI es requerido");
        }
        if (clienteDetails.getNombre() == null || clienteDetails.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre es requerido");
        }
        if (clienteDetails.getApellido() == null || clienteDetails.getApellido().trim().isEmpty()) {
            throw new IllegalArgumentException("El apellido es requerido");
        }

        // Verificar si el DNI ya existe en otro cliente
        Optional<Cliente> clienteWithSameDni = clienteRepository.findByDni(clienteDetails.getDni());
        if (clienteWithSameDni.isPresent() && !clienteWithSameDni.get().getId_cliente().equals(id)) {
            throw new IllegalArgumentException("Ya existe otro cliente con el DNI: " + clienteDetails.getDni());
        }

        Cliente cliente = optionalCliente.get();
        
        // Actualizar campos
        cliente.setDni(clienteDetails.getDni());
        cliente.setNombre(clienteDetails.getNombre());
        cliente.setApellido(clienteDetails.getApellido());
        cliente.setEmail(clienteDetails.getEmail());
        cliente.setTelefono(clienteDetails.getTelefono());
        cliente.setUpdated_at(new Timestamp(System.currentTimeMillis()));
        
        return clienteRepository.save(cliente);
    }

    public boolean deleteById(Integer id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Cliente> findByDni(String dni) {
        return clienteRepository.findByDni(dni);
    }
}
