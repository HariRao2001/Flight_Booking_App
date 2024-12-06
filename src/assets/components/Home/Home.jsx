import flightImage from "../../images/Logo.png";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    
    function startButtonHandler(){
      navigate("/personalinfo")
    }

    return(
    <div className="home_page">
      <img src={flightImage}/>
      <button onClick={startButtonHandler}>Start Your Journey</button>
    </div>
    )
} 