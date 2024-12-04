import documentIcon from "../../images/Document.png";
import boardPassIcon from "../../images/Train Ticket.png";
import supportIcon from "../../images/Headset.png";
import RateusIcon from "../../images/Star.png";
import airplaneTakeOff from "../../images/Airplane Take Off (1).png";
import signoutIcon from "../../images/logout.webp";

import { Link, useNavigate } from "react-router-dom";


import { useSelector } from "react-redux";
import { useEffect } from "react";


export default function SidePanel(){
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("userid")){
            navigate("/error");
        }
    },[navigate]);

    const userDetails = useSelector(state=>state.userDetails);

    function signoutHandler(){
        localStorage.removeItem("userid");
        alert("Signout successfully");
        navigate("/");
    }

    return <div className="side_panel_bar">
        <div className="user_name_block">
            <p>Hello</p>
            <h3>{userDetails.name || "Traveller" }</h3>
        </div>
        <hr className="side_panel_hr_element"/>
        <div className="side_panel_links">
            <div>
                <img src={documentIcon} alt="image_not_found"/>
                <Link to="/mybookings">My Bookings</Link>
            </div>
            <div>
                <img src={boardPassIcon} alt="image_not_found"/>
                <Link to="/boardingpass">Boarding Pass</Link>
            </div>
            <div>
                <img src={supportIcon} alt="image_not_found"/>
                <Link to="">Support</Link>
            </div>
            <div>
                <img src={RateusIcon} alt="image_not_found"/>
                <Link to="">Rate Us</Link>
            </div>
            <hr />
            <div>
                <img src={airplaneTakeOff} alt="image_not_found"/>
                <Link to="/flightbooking">Book Flight</Link>
            </div>
            <div>
                <img src={signoutIcon} alt="image_not_found" className="signout_icon"/>
                <button className="signout_btn" onClick={signoutHandler}>Signout</button>
            </div>
        </div>
    </div>
}