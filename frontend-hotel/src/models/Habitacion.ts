export interface Habitacion {
    id_habitacion?: number;
    numero: string;
    tipo: string;
    capacidad: number;
    precio_noche: number;
    estado: string; // DISPONIBLE, OCUPADA, MANTENIMIENTO
    descripcion?: string;
    created_at?: string;
    updated_at?: string;
} 