import { useSelector, useDispatch } from "react-redux";
import { bookingActions } from "../../store/createSore";

import { useNavigate } from "react-router-dom";

import PageNotFound from "../../components/PageNotFound/PageNotFound";

export default function PassengerDetails(){

    const navigate = useNavigate();
    let arr = [];

    const selector = useSelector(state=>state.passengerFlightBookingDetails);
    const dispatch = useDispatch();
    arr = Array.from({ length: +selector.passengersCount });
    
    function submitHandler(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const userDetails = Object.fromEntries(formData.entries());
        dispatch(bookingActions.passengersDetailsHandler(userDetails)); 
        navigate("/seatbooking");
    }

    if(!localStorage.getItem("userid")){
        return <PageNotFound />;
    };
    
    return <div className="passengers_info_block">
        <p>Fill the passenger details</p>
        <form onSubmit={submitHandler}>
        {
            arr.map((el,index)=>{
                return <div key={index} className="passengers_details_block">
                    <h4>Passenger{index+1} details</h4>
                    <input type="text" name={`passenger${index+1}name`} placeholder="Enter Passenger Name" required></input>
                    <input type="number" name={`passenger${index+1}age`} min="0" placeholder="Enter Passenger Age" required></input>
                </div>
            })
        }
        <button>Submit</button>
        </form>
    </div>
}
