import { Link } from "react-router-dom";

export default function Support(){
    return <div className="support_block">
        <h2>Hi, How can we help you?</h2>
        <input type="text" placeholder="Enter something you want to search..." name="supportUserInput"></input>
        <button className="support_search_btn">Search</button>
        <br />
        <Link to="/home">Back to homepage</Link>
    </div>
}