-- Script de inicialización de datos para Reservas Hotel
-- Este archivo se ejecuta automáticamente al iniciar la aplicación

-- Insertar roles
INSERT INTO roles (descripcion, created_at, updated_at) VALUES 
('Administrador', NULL, NULL),
('Recepcionista', NULL, NULL);

-- Insertar usuarios
INSERT INTO usuarios (nombre, email, contrasena, id_rol, created_at, updated_at) VALUES 
('Santiago Baldini', 'santiagobcuevas14@gmail.com', '123456', 1, NULL, NULL),
('Maximo Paz', 'recepcionista@gmail.com', '123456', 2, NULL, NULL),
('María González', 'maria.gonzalez@hotel.com', '123456', 2, NULL, NULL),
('Carlos Rodríguez', 'carlos.rodriguez@hotel.com', '123456', 2, NULL, NULL);

-- Insertar clientes
INSERT INTO clientes (dni, nombre, apellido, email, telefono, created_at, updated_at) VALUES 
('46566689', 'Santiago Ariel', 'Baldini Cuevas', 'santiagobcuevas14@gmail.com', '01161970490', '2025-06-19 01:00:46.760000', '2025-06-19 01:00:46.760000'),
('46566688', 'Fabian Alejandro', 'Cuevas', 'santiagobcuevas14@gmail.com', '01169698708', '2025-06-19 01:00:53.200000', '2025-06-19 01:00:53.200000'),
('12345678', 'Ana María', 'López', 'ana.lopez@email.com', '01112345678', '2025-06-19 02:00:00.000000', '2025-06-19 02:00:00.000000'),
('23456789', 'Juan Carlos', 'Martínez', 'juan.martinez@email.com', '01123456789', '2025-06-19 02:01:00.000000', '2025-06-19 02:01:00.000000'),
('34567890', 'María Elena', 'García', 'maria.garcia@email.com', '01134567890', '2025-06-19 02:02:00.000000', '2025-06-19 02:02:00.000000'),
('45678901', 'Roberto Daniel', 'Fernández', 'roberto.fernandez@email.com', '01145678901', '2025-06-19 02:03:00.000000', '2025-06-19 02:03:00.000000'),
('56789012', 'Laura Beatriz', 'Pérez', 'laura.perez@email.com', '01156789012', '2025-06-19 02:04:00.000000', '2025-06-19 02:04:00.000000'),
('67890123', 'Diego Alejandro', 'González', 'diego.gonzalez@email.com', '01167890123', '2025-06-19 02:05:00.000000', '2025-06-19 02:05:00.000000'),
('78901234', 'Carolina Sofía', 'Rodríguez', 'carolina.rodriguez@email.com', '01178901234', '2025-06-19 02:06:00.000000', '2025-06-19 02:06:00.000000'),
('89012345', 'Fernando José', 'Sánchez', 'fernando.sanchez@email.com', '01189012345', '2025-06-19 02:07:00.000000', '2025-06-19 02:07:00.000000'),
('90123456', 'Valentina Isabel', 'Torres', 'valentina.torres@email.com', '01190123456', '2025-06-19 02:08:00.000000', '2025-06-19 02:08:00.000000'),
('01234567', 'Lucas Martín', 'Ramírez', 'lucas.ramirez@email.com', '01101234567', '2025-06-19 02:09:00.000000', '2025-06-19 02:09:00.000000');

-- Insertar habitaciones
INSERT INTO habitaciones (numero, tipo, capacidad, precio_noche, estado, descripcion, created_at, updated_at) VALUES 
('12', 'individual', 2, 12.0, 'DISPONIBLE', 'Habitación individual con vista al jardín', NULL, NULL),
('40', 'doble', 5, 20.0, 'MANTENIMIENTO', 'Habitación doble en mantenimiento', NULL, NULL),
('15', 'individual', 2, 15.0, 'DISPONIBLE', 'Habitación individual con balcón', NULL, NULL),
('22', 'doble', 4, 25.0, 'DISPONIBLE', 'Habitación doble con vista a la ciudad', NULL, NULL),
('33', 'suite', 6, 45.0, 'DISPONIBLE', 'Suite de lujo con jacuzzi', NULL, NULL),
('44', 'individual', 2, 18.0, 'OCUPADA', 'Habitación individual ejecutiva', NULL, NULL),
('55', 'doble', 4, 30.0, 'DISPONIBLE', 'Habitación doble familiar', NULL, NULL),
('66', 'suite', 8, 60.0, 'DISPONIBLE', 'Suite presidencial', NULL, NULL),
('77', 'individual', 2, 14.0, 'DISPONIBLE', 'Habitación individual económica', NULL, NULL),
('88', 'doble', 4, 28.0, 'DISPONIBLE', 'Habitación doble con terraza', NULL, NULL),
('99', 'suite', 6, 50.0, 'OCUPADA', 'Suite ejecutiva', NULL, NULL),
('101', 'individual', 2, 16.0, 'DISPONIBLE', 'Habitación individual premium', NULL, NULL),
('202', 'doble', 4, 32.0, 'DISPONIBLE', 'Habitación doble premium', NULL, NULL),
('303', 'suite', 6, 55.0, 'DISPONIBLE', 'Suite de lujo con vista panorámica', NULL, NULL),
('404', 'individual', 2, 13.0, 'MANTENIMIENTO', 'Habitación individual en renovación', NULL, NULL);

-- Insertar reservas
INSERT INTO reservas (id_cliente, id_habitacion, id_usuario, fecha_inicio, fecha_fin, dias, total, estado, observaciones, fecha_reserva, created_at, updated_at) VALUES 
(1, 1, 1, '2025-06-18 03:00:00.000000', '2025-06-29 03:00:00.000000', 11, 132.0, 'PENDIENTE', 'Cliente VIP', '2025-06-19 01:43:58.319000', NULL, NULL),
(3, 6, 2, '2025-06-20 03:00:00.000000', '2025-06-25 03:00:00.000000', 5, 90.0, 'CONFIRMADA', 'Check-in temprano solicitado', '2025-06-19 03:00:00.000000', NULL, NULL),
(4, 11, 3, '2025-06-22 03:00:00.000000', '2025-06-28 03:00:00.000000', 6, 300.0, 'CONFIRMADA', 'Suite ejecutiva', '2025-06-19 04:00:00.000000', NULL, NULL),
(5, 3, 2, '2025-06-25 03:00:00.000000', '2025-06-27 03:00:00.000000', 2, 30.0, 'PENDIENTE', NULL, '2025-06-19 05:00:00.000000', NULL, NULL),
(6, 4, 3, '2025-06-26 03:00:00.000000', '2025-07-02 03:00:00.000000', 6, 150.0, 'CONFIRMADA', 'Vista a la ciudad', '2025-06-19 06:00:00.000000', NULL, NULL),
(7, 5, 2, '2025-06-28 03:00:00.000000', '2025-07-05 03:00:00.000000', 7, 315.0, 'PENDIENTE', 'Suite de lujo', '2025-06-19 07:00:00.000000', NULL, NULL),
(8, 7, 3, '2025-06-30 03:00:00.000000', '2025-07-03 03:00:00.000000', 3, 90.0, 'CONFIRMADA', 'Habitación familiar', '2025-06-19 08:00:00.000000', NULL, NULL),
(9, 8, 2, '2025-07-01 03:00:00.000000', '2025-07-08 03:00:00.000000', 7, 420.0, 'PENDIENTE', 'Suite presidencial', '2025-06-19 09:00:00.000000', NULL, NULL),
(10, 9, 3, '2025-07-02 03:00:00.000000', '2025-07-04 03:00:00.000000', 2, 28.0, 'CONFIRMADA', 'Habitación económica', '2025-06-19 10:00:00.000000', NULL, NULL),
(11, 10, 2, '2025-07-03 03:00:00.000000', '2025-07-07 03:00:00.000000', 4, 112.0, 'CANCELADA', 'Cancelada por cliente', '2025-06-19 11:00:00.000000', NULL, NULL),
(12, 12, 3, '2025-07-05 03:00:00.000000', '2025-07-10 03:00:00.000000', 5, 80.0, 'PENDIENTE', 'Habitación premium', '2025-06-19 12:00:00.000000', NULL, NULL),
(2, 13, 2, '2025-07-06 03:00:00.000000', '2025-07-12 03:00:00.000000', 6, 192.0, 'CONFIRMADA', 'Habitación doble premium', '2025-06-19 13:00:00.000000', NULL, NULL),
(3, 14, 3, '2025-07-08 03:00:00.000000', '2025-07-15 03:00:00.000000', 7, 385.0, 'PENDIENTE', 'Suite con vista panorámica', '2025-06-19 14:00:00.000000', NULL, NULL),
(4, 15, 2, '2025-07-10 03:00:00.000000', '2025-07-12 03:00:00.000000', 2, 26.0, 'CONFIRMADA', 'Habitación en renovación', '2025-06-19 15:00:00.000000', NULL, NULL);
