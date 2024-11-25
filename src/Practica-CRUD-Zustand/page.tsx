"use client";

import { useUserStore } from "./UserStore";
import type { User } from "./User";
import { useEffect, useState } from "react";

export default function UserComponent() {
  // Declaración de los métodos con Zustand
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const addUser = useUserStore((state) => state.addUser);
  const deleteUser = useUserStore((state) => state.deleteUser);
  const editUser = useUserStore((state) => state.editUser);

  // States de React
  const [editInput, setEditInput] = useState<User | null>(null); // Usuario en edición
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    selectTitle: "",
    yesno: "",
  }); // Nuevo usuario
  const [showAddForm, setShowAddForm] = useState(false); // Mostrar/ocultar formulario de agregar

  // Actualiza la lista de usuarios cuando se monta el componente
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEditChange = (key: keyof User, value: string) => {
    if (editInput) {
      setEditInput({ ...editInput, [key]: value });
    }
  };

  const handleUpdateUser = () => {
    if (editInput) {
      editUser(editInput); // Solo se envían los cambios, Zustand lo maneja
      setEditInput(null);
    }
  };

  const handleAddUser = () => {
    addUser(newUser); // Llama al método de Zustand con el usuario sin `id`
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      selectTitle: "",
      yesno: "",
    }); // Resetea el formulario
    setShowAddForm(false); // Oculta el formulario
  };

  return (
    <div>
      <h2>Lista de Usuarios:</h2>
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? "Cancelar" : "Agregar Usuario"}
      </button>

      {showAddForm && (
        <div>
          <h3>Agregar Nuevo Usuario</h3>
          <form>
            <input
              type="text"
              placeholder="Nombre"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Apellido"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <button type="button" onClick={handleAddUser}>
              Guardar
            </button>
          </form>
        </div>
      )}

      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            {editInput?.id === user.id ? (
              <div>
                <input
                  type="text"
                  value={editInput?.firstName || ""}
                  onChange={(e) => handleEditChange("firstName", e.target.value)}
                  placeholder="Editar nombre"
                />
                <input
                  type="text"
                  value={editInput?.lastName || ""}
                  onChange={(e) => handleEditChange("lastName", e.target.value)}
                  placeholder="Editar apellido"
                />
                {/* MAS CAMPOS PARA EDITAR
                <input
                  type="text"
                  value={editInput?.email || ""}
                  onChange={(e) => handleEditChange("email", e.target.value)}
                  placeholder="Editar correo"
                />
                <input
                  type="text"
                  value={editInput?.phoneNumber || ""}
                  onChange={(e) => handleEditChange("phoneNumber", e.target.value)}
                  placeholder="Editar correo"
                />
                <input
                  type="text"
                  value={editInput?.selectTitle || ""}
                  onChange={(e) => handleEditChange("selectTitle", e.target.value)}
                  placeholder="Editar correo"
                />
                <input
                  type="text"
                  value={editInput?.yesno || ""}
                  onChange={(e) => handleEditChange("yesno", e.target.value)}
                  placeholder="Editar correo"
                />
                */}
                <button onClick={handleUpdateUser}>Guardar</button>
                <button onClick={() => setEditInput(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                <span>
                  {user.firstName} {user.lastName} - {user.email}
                </span>
                <button onClick={() => setEditInput(user)}>Editar</button>
                <button onClick={() => deleteUser(user)}>Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
