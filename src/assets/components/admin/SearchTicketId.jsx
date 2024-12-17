import { useState, useRef, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function SearchTicketId(){
    const loaderData = useLoaderData();
    const inputRef = useRef();
    const navigate =  useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("adminIsLogin") != "true"){
            navigate("/adminlogin");
        }
    },[navigate]);

    const [searchStatus, setSearchStatus] = useState("Search");

    const [ticketIdFilteredData, setTicketIdFilteredData] = useState([]);
    
    function searchButtonHandler(){
        setSearchStatus("Searching...");
        setTimeout(()=>{
            setTicketIdFilteredData(loaderData.filter(userData=>userData.ticketId === inputRef.current.value));
            setSearchStatus("Search");
        }, 2000);
    }

    function passengerSeatConfiguration(configurationData){
        let str = "";
        configurationData.map(person=>str+=`${person.personName} - ${person.personAge} - ${person.seatNo} `);
        return str;
    }

    
    
    return <div className="search_by_ticket_block">
        <h2>Search By Ticket Id</h2>
        <div className="input_search_block">
            <input type="text" name="ticketId" placeholder="Enter The Ticket Id" ref={inputRef}></input>
            <button onClick={searchButtonHandler}>{searchStatus}</button>
        </div>
    <div className="search_table_block">
    <table>
        <thead>
            <tr>
                <th>Ticket Id</th>
                <th>Airplane Name</th>
                <th>Airplane Starts From</th>
                <th>Airplane End To</th>
                <th>Airplane Class Name</th>
                <th>Travelling Duration</th>
                <th>Airplane Start Date</th>
                <th>Ticket Booked Date</th>
                <th>Passanger Seating Details</th>
                <th>Total Passengers</th>
                <th>Total Price</th>
            </tr>
        </thead>
        <tbody>
            {
                ticketIdFilteredData.length > 0 && (
                        ticketIdFilteredData.map((data, index)=><tr key={index}>
                            <td>{data.ticketId}</td>
                            <td>{data.airplaneId}</td>
                            <td>{data.airportNames.from}</td>
                            <td>{data.airportNames.to}</td>
                            <td>{data.airplaneClass}</td>
                            <td>{data.duration}</td>
                            <td>{data.flightDate}</td>
                            <td>{data.orderedDate}</td>
                            <td className="names_column">{passengerSeatConfiguration(data.passengerSeatConfigurationDetails)}</td>
                            <td>{data.passengersCount}</td>
                            <td>{data.price}</td>
                        </tr>)
                )
            }
        </tbody>
    </table>
    </div>
    { ticketIdFilteredData.length === 0 && <p style={{textAlign:"center", fontWeight:"bold"}}>No Data Found</p>}
</div>
}

export function loader(){
    const promise =  new Promise((resolve, reject)=>{
        fetch("http://localhost:3000/bookingsData")
        .then(response=>{
            if(!response.ok){
                reject("Failed to load the data");
                return;
            }
            return response.json();
        })
        .then(json=>resolve(json));
        
    });
    return promise;
}