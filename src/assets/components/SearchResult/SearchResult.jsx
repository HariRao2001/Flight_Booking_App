import backArrowIcon from "../../images/Back.png";
import airportFromIcon from "../../images/From Icon.png";
import sofaIcon from "../../images/Sofa.png";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { airplaneDetails } from "../../Dummy Data/AIRPLANE_DUMMY_DATA";

export default function SearchResult(){
    const flightDetails = useSelector(state=>state.passengerFlightBookingDetails);
    const [filteredFligthDetails,  setFilteredFlightDetails] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const filteredLists = airplaneDetails.filter(airplane=>airplane.airplaneTravellingDetails.from.includes(flightDetails.airplaneFrom) && airplane.airplaneTravellingDetails.to.includes(flightDetails.airplaneTo) && flightDetails.className === airplane.airplaneClass);
        setFilteredFlightDetails(filteredLists);
    },[]);


    function checkButtonHandler(rowData){
        const dummyObj = {...rowData};
        dummyObj.passengersCount = flightDetails.passengersCount;
        navigate("/flightdetails", { state : dummyObj })
    }

    return <div className="search_block">
        <div className="homepage_header_block">
            <Link to="/flightbooking"><img src={backArrowIcon} alt="image_not_found"></img></Link>
            <p>Search Result</p>
        </div>
        <>
            {filteredFligthDetails.length === 0 && <p style={{textAlign:"center"}} >No Flight details are found</p> }
            {filteredFligthDetails.length > 0 && filteredFligthDetails.map(airplane=>{
            return(<div className="results_block" key={airplane.airplaneId}>
            <div className="individual_result_block" >
                <div className="individual_flight_details">
                    <div className="individual_flight_spec">
                        <span>flight name</span>
                        <p>{airplane.airplaneId}</p>
                    </div>
                    <div className="individual_flight_spec">
                        <p>{airplane.duration}</p>
                    </div>
                </div>
                <div className="flight_details_timings_block individual_flight_timings">
                    <p>{airplane.airplaneTimings.start}</p>
                    <img src={airportFromIcon} alt="image_not_found"></img>
                    <p>{airplane.airplaneTimings.end}</p>
                </div>
                <div className="flight_details_places_block">
                    <p>{airplane.airplaneTravellingDetails.from}</p>
                    <p>{airplane.airplaneTravellingDetails.to}</p>
                </div>
            </div>
            <hr />
            <div className="flight_desc">
                <div className="individual_flight_spec">
                    <img src={sofaIcon} alt="image_not_found"/>
                    <p>{airplane.airplaneClass}</p>
                </div>
                <div className="individual_flight_spec">
                    <p>Cost</p>
                    <span>Rs {airplane.price}/-(each)</span>
                </div>
            </div>
            <button onClick={()=>checkButtonHandler(airplane)} className="check_btn">Check</button>
        </div>
        )
    })
    }
        </>
    </div>
}