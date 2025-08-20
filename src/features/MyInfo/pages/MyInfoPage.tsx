import { useState, type FormEvent } from "react";
import "../styles/MyInfoPage.css";



export default function AccountDataPage() {
    const user = JSON.parse(String(localStorage.getItem("auth:user")));

    const [form, setForm] = useState({
        nombre: user.nombre || "",
        email: user.email || "",
        direccion: user.direccion || "",
        telefono: user.telefono || "",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("auth:token");

        try {
            const res = await fetch(`http://localhost:4000/api/request/updateUser`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({
                    nombre: form.nombre,
                    email: form.email,
                    telefono: form.telefono,
                    direccion: form.direccion,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                console.log("Usuario actualizado:", data);
                alert("✅ Usuario actualizado con éxito");

                // Actualizar el localStorage con el usuario que devuelve el backend
                localStorage.setItem("auth:user", JSON.stringify(data.user));
            } else {
                console.error("Error en la actualización:", data);
                alert("❌ Error al actualizar el usuario");
            }
        } catch (err) {
            console.error("Error en fetch:", err);
            alert("Error al conectar con el servidor");
        }
    };


    return (
        <div className="account-data-page">
            <div className="account-data-card">
                {/* Marca arriba */}


                <h2 className="title">Mis Datos</h2>

                {/* Avatar */}
                <div className="avatar-big avatar">
                    <span>
                        {user.nombre
                            .split(" ")
                            .map((p: any) => p[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                    </span>
                </div>

                <form className="form" onSubmit={onSubmit} noValidate>
                    <label className="group">
                        <span className="label">Nombre</span>
                        <input
                            name="nombre"
                            type="text"
                            value={form.nombre}
                            onChange={onChange}
                            required
                        />
                    </label>

                    <label className="group">
                        <span className="label">Correo electrónico</span>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={onChange}
                            required
                        />
                    </label>

                    <label className="group">
                        <span className="label">Dirección</span>
                        <input
                            name="direccion"
                            type="text"
                            value={form.direccion}
                            onChange={onChange}
                            required
                        />
                    </label>

                    <label className="group">
                        <span className="label">Teléfono</span>
                        <input
                            name="telefono"
                            type="tel"
                            value={form.telefono}
                            onChange={onChange}
                            required
                        />
                    </label>

                    <button className="btn-primary" type="submit">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
}
