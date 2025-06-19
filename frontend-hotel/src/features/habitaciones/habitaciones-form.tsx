import { useState } from "react";
import { createPortal } from "react-dom";
import { useHotel } from "../../contexts/HotelContext";
import type { Habitacion } from "../../models/Habitacion";
export const HabitacionesForm = ({ handleClose, habitacion }: { handleClose: () => void, habitacion?: Habitacion }   ) => {

    const {createHabitacion, updateHabitacion} = useHotel();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(habitacion ? true : false); 

    const [formData, setFormData] = useState<Habitacion>({
        id_habitacion: habitacion?.id_habitacion || 0,
        numero: habitacion?.numero || '',
        descripcion: habitacion?.descripcion || '',
        precio_noche: habitacion?.precio_noche || 0,
        capacidad: habitacion?.capacidad || 0,
        tipo: habitacion?.tipo || '',
        estado: habitacion?.estado || '',
    }); 


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const numero = formData.get('numero') as string;
        const descripcion = formData.get('descripcion') as string;
        const precio_noche = formData.get('precio_noche') as string;
        const capacidad = formData.get('capacidad') as string;
        const tipo = formData.get('tipo') as string;
        const estado = formData.get('estado') as string;
        if (isEditing && habitacion?.id_habitacion) {
            updateHabitacion(Number(habitacion?.id_habitacion), {numero, descripcion, precio_noche: Number(precio_noche), capacidad: Number(capacidad), tipo, estado})
            location.reload();
            handleClose();
        } else {
            createHabitacion({numero, descripcion, precio_noche: Number(precio_noche), capacidad: Number(capacidad), tipo, estado})
            location.reload();
            handleClose();
        }
    }
    return createPortal(
        <>
        <div className="fixed inset-0 bg-gray-500 opacity-30 flex justify-center items-center" onClick={handleClose}></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-2xl font-bold">{isEditing ? 'Editar Habitación' : 'Crear Habitación'}</h1>
                <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit}>
                    <label htmlFor="numero">Número</label>
                    <input type="text" id="numero" name="numero" className="border border-gray-300 rounded-md p-2" required value={formData.numero} onChange={handleChange} />
                    <label htmlFor="descripcion">Descripción</label>
                    <input type="text" id="descripcion" name="descripcion" className="border border-gray-300 rounded-md p-2" required value={formData.descripcion} onChange={handleChange} />
                    <label htmlFor="precio_noche">Precio por noche</label>
                    <input type="number" id="precio_noche" name="precio_noche" className="border border-gray-300 rounded-md p-2" required value={formData.precio_noche} onChange={handleChange} />
                    <label htmlFor="capacidad">Capacidad</label>
                    <input type="number" id="capacidad" name="capacidad" className="border border-gray-300 rounded-md p-2"  required value={formData.capacidad} onChange={handleChange} />
                    <label htmlFor="tipo">Tipo</label>
                    <select id="tipo" name="tipo" className="border border-gray-300 rounded-md p-2" required value={formData.tipo} onChange={handleChange} >
                        <option value="">Selecciona un tipo</option>
                        <option value="individual">Individual</option>
                        <option value="doble">Doble</option>
                    </select>
                    <label htmlFor="estado">Estado</label>
                    <select id="estado" name="estado" className="border border-gray-300 rounded-md p-2" required value={formData.estado} onChange={handleChange} >
                        <option value="">Selecciona un estado</option>
                        <option value="DISPONIBLE">Disponible</option>
                        <option value="OCUPADA">Ocupada</option>
                        <option value="MANTENIMIENTO">Mantenimiento</option>
                    </select>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={handleClose} className="bg-gray-500 text-white rounded-md p-2 w-full hover:bg-gray-600 transition-colors">Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition-colors">{isEditing ? 'Actualizar' : 'Crear'}</button>
                    </div>
                </form>
            </div>
        </>,
        document.getElementById('root') as HTMLElement
    )
}       