import { Link } from "react-router-dom";

export default function ErrorPage(){
    return <div className="error_block">
        <h5>Oops!</h5>
        <h2>There is an error</h2>
        <p><span>Error:</span> This error occurs due to user not login</p>
        <Link to="/personalinfo">Please Login</Link>
    </div>
}