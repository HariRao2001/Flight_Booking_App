import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminView(){
    const navigate = useNavigate();
    
    const [flightNames, setFlightNames] = useState([]);
    const [selectedFlightName, setSelectedFlightName] = useState();

    const [listOfDates, setListOfDates] = useState([]);
    const [selectedDate, setSelctedDate] = useState("");

    const overallData = useRef();

    useEffect(()=>{

        if(localStorage.getItem("adminIsLogin") != "true"){
            navigate("/adminlogin");
        }

        fetch("https://flights-data.onrender.com/totalFlightNames")
        .then(response=>response.json())
        .then(json=>{
            setFlightNames(json);
            if(json.length > 0){
                setSelectedFlightName(json[0].flightName);
                flightNameChangeHandler(json[0].flightName);
            }
            }        
        );
        
    },[navigate]);


    function flightNameChangeHandler(flightName){
        fetch(`https://flights-data.onrender.com/${flightName}`)
        .then(response=>response.json())
        .then(json=>{
            overallData.current = json;
            const jsonKeys = Object.keys(json)
            setListOfDates(jsonKeys);

            if(jsonKeys.length > 0){
                dateChangeHandler(jsonKeys[0]);
                return;
            }
            dateChangeHandler("");
        });
        setSelectedFlightName(flightName);
    }

    function dateChangeHandler(date){
        setSelctedDate(date);
    }

    function sortingOverallData(rawData){
        const arr = [];
        rawData.sort((a,b)=>{
            if(a.seatNo < b.seatNo) return -1;
            return 1;
        }).map((rowData, index)=>{
            arr.push(<tr key={index}>
                <td>{rowData.seatNo}</td>
                <td>{rowData.personName}</td>
                <td>{rowData.personAge}</td>
            </tr>)
        });
        return arr;
    }
    

    return <div className="admin_block">
        <h2>Overview of Flight Details</h2>
        <div className="admin_selection_area">
            {
            flightNames.length === 0 ? <p>No flights are found</p>: <div>
                <b>Select Flight : </b>
                <select name="flightNamesList" onChange={(e)=>flightNameChangeHandler(e.target.value)} defaultValue={flightNames.length !== 0 && flightNames[0].flightName}>
                    {
                        flightNames.map((flight, index)=>(
                            <option 
                                key={index} 
                                value={flight.flightName}
                            >
                                {flight.flightName}
                            </option>
                         )
                        )
                    }
                </select>
            </div>
            }
            <div>
            {
                (selectedFlightName && listOfDates.length !== 0) &&  (
                    <>
                        <b>Select Date : </b>
                        <select name="flightDatesList" onChange={(e)=>dateChangeHandler(e.target.value)} value={selectedDate} >
                            {
                                listOfDates.map(date=><option key={date} value={date}>{date}</option>)
                            }
                        </select>
                    </>

                )
            }
            </div> 
        </div>
        { selectedDate && <div className="result_table">
            <p>Filtered Data</p>
            <table>
                <thead>
                    <tr>
                        <th>Seat No</th>
                        <th>Person Name</th>
                        <th>Person Age</th>
                    </tr>

                </thead>
                <tbody>
                {
                    // overallData.current[selectedDate].sort((a,b)=>{
                    //     if(a.seatNo < b.seatNo) return -1; //Here -1 indicates a comes before b;
                    //     return 1;
                    // }).map((rowdata, index)=>(
                    //     <tr key={index}>
                    //         <td>{rowdata.seatNo}</td>
                    //         <td>{rowdata.personName}</td>
                    //         <td>{rowdata.personAge}</td>
                    //     </tr>
                    // ))
                    sortingOverallData(overallData.current[selectedDate])
                }
                </tbody>
            </table> 
            </div> }
        { ((selectedDate && overallData.current[selectedDate].length === 0) || (selectedFlightName && listOfDates.length === 0))  && <p style={{textAlign: "center"}}>No Data found</p> }
    </div>

}
