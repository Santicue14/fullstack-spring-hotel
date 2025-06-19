package com.santicue.reservas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//Quitar cors origin para que funcione en local
public class ReservasApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReservasApplication.class, args);
	}

}
