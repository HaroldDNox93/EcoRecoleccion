import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/MyPassword.css";

export default function AccountPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const user = JSON.parse(String(localStorage.getItem("auth:user")));

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("auth:token");

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        // Petición al backend
        const response = await fetch("http://localhost:4000/api/request/updateUserPass", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer `+token // si usas JWT
            },
            body: JSON.stringify({ newPassword: password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Error al actualizar la contraseña");
            return;
        }
        if (response.ok) {
            localStorage.clear();
            return location.href='/';
        }

        alert(data.message); // "Contraseña actualizada correctamente."
        setPassword("");
        setConfirmPassword("");
    } catch (error) {
        console.error("Error al actualizar contraseña:", error);
        alert("Ocurrió un error al cambiar la contraseña");
    }
};

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Cambiar contraseña</h2>
                <div className="avatar-big avatar" style={{ marginBottom: '20px' }}>
                    <span>
                        {user.nombre
                            .split(" ")
                            .map((p: any) => p[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                    </span>
                </div>
                <div className="user-data" style={{ marginBottom: '20px' }}>
                    <div className="user-name">{user.nombre}</div>
                    <div className="user-email">{user.email}</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña nueva"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <div className="input-group">
                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowConfirm(!showConfirm)}
                        >
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button type="submit" className="btn-primary">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
}
