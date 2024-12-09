import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import PageNotFound from "../PageNotFound/PageNotFound";

export default function Rating(){
    const [selectedStars, setSelectedStars] = useState([false, false, false, false, false]);
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    function starClickHandler(indexVal){
        switch(indexVal+1){
            case 1:
                setSelectedStars([true, false, false, false, false]);
                break;
            case 2:
                setSelectedStars([true, true, false, false,false]);
                break;
            case 3:
                setSelectedStars([true, true, true, false, false]);
                break;
            case 4:
                setSelectedStars([true, true, true, true, false]);
                break;
            case 5:
                setSelectedStars([true, true, true, true, true]);
                break;
            default:
                setSelectedStars(selectedStars);
                break;
        }
    }

    function ratingSubmitHandler(){
        const userid = localStorage.getItem("userid");
        const ratingValue  = selectedStars.filter(val=>val==true).length;

        fetch("http://localhost:3000/rating",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({userid, ratingValue})
        })
        .then(response=>{
            if(!response.ok){
                throw new Error("Failed to submit your rating");
            }
            setSuccessMessage("Your rating submitted sucessfully");
            setTimeout(()=>navigate("/home"),2000);
        })
        
    }

    if(!localStorage.getItem("userid")){
        return <PageNotFound />
    }

    return <div className="rating_block">
        <h2>Select Rating</h2>
        <p>Select your rating by clicking on the below stars</p>
        <div>
            {
            selectedStars.map((star, index)=>(
                    <span key={index} className="fa fa-star checked" style={{color : star && "orangered"}} onClick={()=>starClickHandler(index)}></span>
                )
            )
            }
        </div>
        <br />
        <button className="rating_submit_btn" onClick={ratingSubmitHandler}>Submit</button>
        <Link to="/home">Back to homepage</Link>
        { successMessage && <p>{successMessage}</p>}
    </div>
}