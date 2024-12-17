import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin(){

    const [responseStatus, setResponseStatus] = useState([]);

    const navigate = useNavigate();

    function submitHandler(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const adminData = Object.fromEntries(formData.entries());

        async function run(){
            const response = await fetch("http://localhost:3000/admin");
            const json = await response.json();
            const findIndex = json.findIndex(admin=>admin.adminEmail === adminData.email && adminData.password === admin.adminPassword);
            
            if(findIndex === -1){
                setResponseStatus("Please provide a valid data");
                return;
            }

            localStorage.setItem("adminIsLogin", true);

            setResponseStatus("Login Successfully");
            setTimeout(()=>{navigate("/admin")}, 2000);
        }
        run();

        
    }

    return <div className="admin_login_block">
        <h2>Admin Login</h2>
        <form onSubmit={submitHandler}>
            <input type="text" name="email" placeholder="Enter Your Email" />
            <input type="password" name="password" placeholder="Enter our Password"></input>
            <button className="admin_login_btn">Login</button>
            {responseStatus && <p>{responseStatus}</p>}
        </form>
        <p><Link to="/home">Back To MainPage</Link></p>
    </div>
}