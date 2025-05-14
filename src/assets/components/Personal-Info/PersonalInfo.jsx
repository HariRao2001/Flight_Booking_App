import backButton from "../../images/Back.png";
import addressIcon from "../../images/Address Icon.png";
import countryIcon from "../../images/Country icon.png";
import dobIcon from "../../images/DOB Icon.png";
import nameIcon from "../../images/Name Icon.png";
import passportIcon from "../../images/Passport Icon.png";
import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import { bookingActions } from "../../store/createSore";

import { useDispatch } from "react-redux";

import { useSearchParams } from "react-router-dom";

export default function PersonalInfo(){
    const [searchParams] = useSearchParams();
    const [error, setError] =useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(()=>{
        setError("");
    },[searchParams]);

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    function formSubmithandler(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const userDetails = Object.fromEntries(formData.entries());

        if(!userDetails.name.trim()){
            setError("Please provide a valid name");
            return;
        }
        else if(userDetails.password.trim() === "" || userDetails.password.length < 10){
            setError("Please provid a valid password.Password must contain greater than 9 characters");
            return;
        }
        else if(!userDetails.address.trim()){
            setError("Please provide a valid address");
            return;
        }
        else if(!userDetails.passportNumber.trim() || userDetails.passportNumber.trim().length < 10){
            setError("Please provide a valid passport number");
            return;
        }
        else if(!userDetails.dob || new Date().getFullYear()-userDetails.dob.split("-")[0] < 18){
            setError("Please provide a valid date of birth. Age must be greater than or equal to 18");
            return;
        }
        else if(!userDetails.country){
            setError("Please select a country");
            return;
        }
        else{
            async function run(){
                const response = await fetch("https://flights-data.onrender.com/usersDetails");
                    if(!response.ok){
                        setError("Something went wrong.please try again");
                        return;
                    }

                const usersData = await response.json();
                if(searchParams.get("mode") === "signup"){
                    
                    const userIndex = usersData.findIndex(user=>(user.passportNumber === userDetails.passportNumber) && (userDetails.country === user.country) && (user.password === userDetails.password));

                    if(userIndex === -1){
                        fetch("https://flights-data.onrender.com/usersDetails",{
                            method: "POST",
                            body: JSON.stringify(userDetails),
                            headers : {
                                "Content-Type" : "application/json"
                            }
                        })
                        .then(response=>{
                            if(!response.ok){
                                setError("Something went wrong.please try again");
                                return;
                            }                    
                            setError("Account created successfully...");
                        });
                    }
                    else{
                        return setError("Try with different password");
                    }
                }
                else{
                    const userIndex = usersData.findIndex(user=>user.passportNumber === userDetails.passportNumber && userDetails.country === user.country && user.password === userDetails.password && userDetails.dob === user.dob);
                
                    if(userIndex === -1){
                        setError("Provide a valid data.User details not found");
                        return;
                    }
                    
                    dispatch(bookingActions.addUserDetails(usersData[userIndex]));
                    localStorage.setItem("userid",usersData[userIndex].id);
                    setSuccessMessage("Login Successfully...");
                    setTimeout(()=>{
                        setSuccessMessage("");
                        navigate("/home");
                    }, 2000);
                }
                setError("");
            }
            run();
            
        }
    }

    
    function backButtonHandler(){
        navigate("/");
    }


    return <div style={{backgroundColor:"white"}}>
        <div className="personal_profile_block">
            <img src={backButton} onClick={backButtonHandler} style={{cursor:"pointer"}}></img>
            <p>Personal Info</p>
        </div>
       
        <form className="person_info_block" onSubmit={formSubmithandler}>
            <div className="person_info_wish_block">
                <p>Hello Traveler</p>
            </div>
            <fieldset>
                <legend>Name</legend>
                <div className="user_input_block">
                    <img src={nameIcon}/>
                    <input type="text" placeholder="Enter your name here" name="name"/>
                </div>
            </fieldset>
            <fieldset>
                <legend>Password</legend>
                <div className="user_input_block">
                    <img src={nameIcon}/>
                    <input type="text" placeholder="Enter your password" name="password"/>
                </div>
            </fieldset>
            <fieldset>
                <legend>Address</legend>
                <div className="user_input_block">
                    <img src={addressIcon}/>
                    <input type="text" placeholder="Enter your address" name="address"/>
                </div>
            </fieldset>
            <fieldset>
                <legend>Passport</legend>
                <div className="user_input_block">
                    <img src={passportIcon}/>
                    <input type="text" placeholder="ED 0000 0000" maxLength="10" name="passportNumber"/>
                </div>
            </fieldset>
            <fieldset>
                <legend>DOB</legend>
                <div className="user_input_block">
                    <img src={dobIcon}/>
                    <input type="date" placeholder="12/05/1897" name="dob"/>
                </div>
            </fieldset>
            <fieldset>
                <legend>Country</legend>
                <div className="user_input_block">
                    <img src={countryIcon}/>
                    <select name="country">
                        <option value="Afganistan">Afganistan</option>
                        <option value="Germany">Germany</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                    </select>
                    {/* <input list="countries_list" id="country-choice" name="userchoice" />
                     <datalist id="countries_list">
                        <option value="Afganistan"></option>
                        <option value="Germany"></option>
                        <option value="India"></option>
                        <option value="USA"></option>
                        <option value="UK"></option>
                    </datalist> */}

                </div>
            </fieldset>
            {error &&<p>{error}</p>}
            {successMessage && <div className="success_message_block"><p>{successMessage}</p></div>}
            <button className="confirm_btn">{searchParams.get("mode") === "signup" ? "Signup" : "Login"}</button>
            <Link to={`?mode=${searchParams.get("mode") === "signup" ? "login" : "signup"}`}>{searchParams.get("mode") === "signup" ? "Already have an account?" : "Create a new account" }</Link>
        </form>
      
    </div>
}
