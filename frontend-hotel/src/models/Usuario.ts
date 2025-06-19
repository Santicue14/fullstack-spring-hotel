export interface Usuario {
    id_usuario?: number;
    nombre: string;
    email: string;
    contrasena?: string;
    rol?: {
        id_rol: number;
        descripcion: string;
    };
    created_at?: string;
    updated_at?: string;
}
