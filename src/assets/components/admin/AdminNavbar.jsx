import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminNavbar(){
    const navigate = useNavigate();
    function signoutHandler(){
        if(localStorage.getItem("adminIsLogin") === "true"){
            localStorage.removeItem("adminIsLogin");
        }
        navigate("/adminlogin");
    }

    return <div className="admin_main_page">
        <h2>Admin Page</h2>
        <nav>
            <p><Link to="/admin/flightsoverview">Overview Of Flight Details</Link></p>
            <p><Link to="/admin/searchbyticketid">Search By Ticket Id</Link></p>
            <p><Link to="/admin/support">Support</Link></p>
            <button onClick={signoutHandler}>{ localStorage.getItem("adminIsLogin") !== "true" ? "Signin" : "Signout" }</button>
        </nav>
        <Outlet />
    </div>
}