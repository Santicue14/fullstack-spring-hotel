export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: {
        id_rol: number;
        descripcion: string;
    }
}
