import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const navigate = useNavigate();


const handleLogin = () => {
const users = JSON.parse(localStorage.getItem("users")) || [];
const user = users.find(
(u) => u.username === username && u.password === password
);


if (!user) {
setMessage("Invalid credentials");
return;
}


localStorage.setItem("currentUser", username);
navigate("/home");
};


return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
<div className="bg-white p-8 rounded shadow w-96">
<h2 className="text-2xl font-bold text-center mb-6">Login</h2>


<input
placeholder="Username"
className="w-full p-2 mb-3 border rounded"
value={username}
onChange={(e) => setUsername(e.target.value)}
/>


<input
type="password"
placeholder="Password"
className="w-full p-2 mb-4 border rounded"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>


<button
onClick={handleLogin}
className="w-full bg-blue-600 text-white py-2 rounded"
> 
Login
</button>


{message && <p className="text-red-500 text-center mt-3">{message}</p>}


<p className="text-center mt-4 text-sm">
No account?
<Link to="/register" className="text-blue-600 ml-1">Register</Link>
</p>
</div>
</div>
);
}