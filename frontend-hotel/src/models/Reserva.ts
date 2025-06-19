import type { Cliente } from "./Cliente";
import type { Habitacion } from "./Habitacion";
import type { Usuario } from "./Usuario";

export interface Reserva {
    id_reserva?: number;
    cliente: Cliente;
    habitacion: Habitacion;
    usuario: Usuario;
    fecha_inicio: string;
    fecha_fin: string;
    dias: number;
    total: number;
    estado: string; // CONFIRMADA, CANCELADA, COMPLETADA
    observaciones?: string;
    fecha_reserva: string;
    created_at?: string;
    updated_at?: string;
}
