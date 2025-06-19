import type { Cliente } from "./Cliente";
import type { Habitacion } from "./Habitacion";

export interface Reserva {
    id_reserva?: number;
    cliente: Cliente;
    habitacion: Habitacion;
    fecha_entrada: string;
    fecha_salida: string;
    dias: number;
    total: number;
    estado: string; // CONFIRMADA, CANCELADA, COMPLETADA
    observaciones?: string;
    fecha_reserva: string;
    created_at?: string;
    updated_at?: string;
}
