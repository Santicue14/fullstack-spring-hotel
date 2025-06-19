export interface Cliente {
    id_cliente?: number;
    dni: string;
    nombre: string;
    apellido: string;
    email?: string;
    telefono?: string;
    created_at?: string;
    updated_at?: string;
}