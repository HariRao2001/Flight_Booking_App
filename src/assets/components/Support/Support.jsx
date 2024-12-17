import { Link } from "react-router-dom";
import { useState } from "react";
import PageNotFound from "../PageNotFound/PageNotFound";

export default function Support(){
    const [error, setError] = useState("");
    const [statusMessage, setStatusMessage] = useState("Submit");

    function supportButtonFunctionHandler(e){
        e.preventDefault();
        setError("");
        setStatusMessage("Submitting...");

        const formData = new FormData(e.target);
        const ticketData = Object.fromEntries(formData.entries());
        ticketData.userId = localStorage.getItem("userid");
        ticketData.submittedDate = new Date().toLocaleDateString();

        fetch("http://localhost:3000/support",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketData)
        })
        .then(response=>{
            if(!response.ok){
                setError("Failed to submit your ticket id");
                setStatusMessage("Submit");
                return;
            }
            setTimeout(()=>setStatusMessage("Submitted"), 2000);
            return response.json();
        })
    }

     if(!localStorage.getItem("userid")){
            return <PageNotFound />
    }

    return <form className="support_block" onSubmit={supportButtonFunctionHandler}>
        <h2>any ticket issues?</h2>
        <input type="text" placeholder="Enter your ticket id..." name="ticketId" required></input>
        <input type="text" name="message" placeholder="Enter your message here..." required></input>
        <p><b>Note:</b> For any ticket issues, enter your ticket id by scan the barcode on your ticket and then click on submit button</p>
        <button className="support_search_btn" disabled={statusMessage === "Submitted"}>{statusMessage}</button>
        <br />
        {error && <p>{error}</p>}
        <Link to="/home">Back to homepage</Link>
    </form>
}