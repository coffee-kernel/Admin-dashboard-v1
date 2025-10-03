import React, {useState} from "react";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        try {
            const response = await axios.post("/api/login", { username, password });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <h2>Login Account</h2>
            {error && <p style={{ color: 'red' }} className="error">{error}</p>}
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            <button type="submit" className="btn">Login</button>
        </Form>
    );
};

export default Login;