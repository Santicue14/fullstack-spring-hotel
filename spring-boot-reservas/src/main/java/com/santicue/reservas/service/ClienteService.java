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
        // Establecer timestamps
        Timestamp now = new Timestamp(System.currentTimeMillis());
        
        if (cliente.getId_cliente() == null) {
            // Nuevo cliente
            cliente.setCreated_at(now);
        }
        cliente.setUpdated_at(now);
        
        return clienteRepository.save(cliente);
    }

    public Cliente update(Integer id, Cliente clienteDetails) {
        Optional<Cliente> optionalCliente = clienteRepository.findById(id);
        if (optionalCliente.isPresent()) {
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
        return null;
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
