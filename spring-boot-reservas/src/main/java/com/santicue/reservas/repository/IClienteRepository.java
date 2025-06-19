package com.santicue.reservas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.santicue.reservas.model.Cliente;

public interface IClienteRepository extends JpaRepository<Cliente, Integer> {

    
}
