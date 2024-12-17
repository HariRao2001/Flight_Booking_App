import { useLoaderData, useNavigate } from "react-router-dom";
import {  useState, useEffect } from "react";

export default function AdminSupport(){
    
    const loaderData = useLoaderData();
    const [filteredData, setFilteredData] = useState(loaderData);

    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("adminIsLogin") != "true"){
            navigate("/adminlogin");
        }
    },[navigate]);

    const [selectedDate, setSelectedDate] = useState("");
    const [resetStatus, setResetStatus] = useState("Reset");

    function dateChangeHandler(date){
        setSelectedDate(date);
        setFilteredData(()=>{
            return loaderData.filter(data=>data.submittedDate === date);
        })
    }

    function uniqueDatesHandler(rawData){
        const uniqueDates = [...new Set(rawData.map(data=>data.submittedDate))];
        return uniqueDates.map(date=><option key={date} value={date}>{date}</option>);
    }

    function resetHandler(){
        setResetStatus("Resetting...");
        setTimeout(()=>{
            setFilteredData(loaderData);
            setResetStatus("Reset");
        },2000);
    }

    return <div className="admin_support_block">
        <h2>Support</h2>
        <div>
            <select value={selectedDate} name="selectedDate" onChange={(e)=>dateChangeHandler(e.target.value)}>
                { uniqueDatesHandler(loaderData) }
            </select>
            <button onClick={resetHandler} name="reset" className="reset_btn">{resetStatus}</button>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>User Id</th>
                        <th>Ticket Id</th>
                        <th>Submitted Date</th>
                        <th>Submitted Message</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map((data, index)=><tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.userId}</td>
                            <td>{data.ticketId}</td>
                            <td>{data.submittedDate}</td>
                            <td>{data.message}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
}

export function loader(){
    return fetch("http://localhost:3000/support")
    .then(response=>response.json())
    
}