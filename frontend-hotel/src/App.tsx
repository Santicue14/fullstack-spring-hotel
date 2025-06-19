import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrivateRoute } from "./hooks/PrivateRoute"
import { LoginPage } from "./features/auth/LoginPage"
import { ClientesList } from "./features/clientes/clientes-list/clientes.list"
import { ReservationsList } from "./features/reservations/reservations-list/reservations-list"
import { HabitacionesList } from "./features/habitaciones/habitaciones-list"
import { UsersList } from "./features/users/users-list"

function App() {


  return (
    <>
    <BrowserRouter> 
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><h1 className="text-3xl font-bold underline">Gestor de Reservas para Hotel</h1></PrivateRoute>} />
        <Route path="/clientes" element={<PrivateRoute><ClientesList /></PrivateRoute>} />
        <Route path="/reservas" element={<PrivateRoute><ReservationsList /></PrivateRoute>} />
        <Route path="/habitaciones" element={<PrivateRoute><HabitacionesList /></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute><UsersList /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
