import { Link, useLocation } from "react-router-dom";
import backIcon from "../../images/Back.png";
import airportFromIcon from "../../images/From Icon.png";
import ErrorPage from "../ErrorPage/ErrorPage";

import BarcodeImage from "../BarCodeImage/BarCodeImage";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function IndividualBoardingPass() {
  const location = useLocation();
  const airplane = location.state;

  // function createTableBody(obj){
  //   const rows = [];
  //     const passengerCount = Object.keys(obj).length / 2; 
  //     for (let i = 1; i <= passengerCount; i++) {
  //       const nameKey = `passenger${i}name`;
  //       const ageKey = `passenger${i}age`;
 
  //       if(obj[nameKey] && obj[ageKey]) {
  //         rows.push(
  //           <tr key={i}>
  //             <td>{obj[nameKey]}</td>
  //             <td>{obj[ageKey]}</td>
  //           </tr>
  //         );
  //       }
  //   }
  //   return rows;
  // }

  function ticketDownloadHandler(id){
    const data = document.getElementById(id);
    
    // Use html2canvas to capture the element as a canvas
    html2canvas(data).then((canvas) => {
        // Create a PDF using jsPDF
        const pdf = new jsPDF("portrait", "pt", "a4");

        // Convert the canvas to image and add it to the PDF
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 595, 842);  // Set width and height for A4 size

        // Save the PDF with the name of the ticketId
        pdf.save(`${id}.pdf`);
    })


    // The below code is useful when we do not show the barcode 

    // const pdf = new jsPDF("potrait", "pt", "a4");
    // const data = document.getElementById(id);

    // pdf.html(data)
    // .then(()=>pdf.save(`${id}.pdf`))
  }


  return (
    airplane ? (
    <div className="boarding_pass_block" id={`${airplane.ticketId}`}>
      <div className="boardingpass_header_block">
        <Link to="/home">
          <img src={backIcon} alt="image_not_found" />
        </Link>
        <p>Boarding Pass</p>
      </div>
      <div className="boarding_pass_subheader">
        <div>
          <h2>IA</h2>
          <p>Indian Airlines</p>
        </div>
        <hr />
        <div className="boarding_flight_details_timings_block">
          <p>{airplane.airplaneTimings.start}</p>
          <img src={airportFromIcon} alt="image_not_found"></img>
          <p>{airplane.airplaneTimings.end}</p>
        </div>
        <div className="flight_details_places_block boarding_pass_places_details">
          <p>{airplane.airplaneTravellingDetails.from}</p>
          <p>{airplane.airplaneTravellingDetails.to}</p>
        </div>
        <div className="flight_details_places_block payment_details_places_block">
          <p>{airplane.airportNames.from}</p>
          <p>{airplane.airportNames.to}</p>
        </div>
        <div className="user_input_flight_details_block flight_details_timing_block">
          <fieldset>
            <legend>Date</legend>
            <div className="user_input_block">
              <input type="date" value={airplane.flightDate} disabled />
            </div>
          </fieldset>
          <fieldset>
            <legend>Time</legend>
            <div className="user_input_block">
              <input
                type="time"
                value={airplane.airplaneTimings.start}
                name="time"
                disabled
              />
            </div>
          </fieldset>
        </div>
        <hr />
        <table className="passenger_details_block">
          <thead>
            <tr>
              <th>Flight</th>
              <th>Gate</th>
              <th>Seat</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {
              airplane.selectedSeats.map((seatNumber)=>(
                <tr key={seatNumber}>
                  <td>{airplane.airplaneId}</td>
                  <td>23</td>
                  <td>{seatNumber}</td>
                  <td>{airplane.airplaneClass}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <hr />
        <table className="passenger_details_block">
          <thead>
            <tr>
              <th>Passenger Name</th>
              <th>Passenger Age</th>
            </tr>
          </thead>
          
          {/* {createTableBody(airplane.passengerDetails)} */}
          <tbody>
            {airplane.passengerSeatConfigurationDetails.map(passenger=><tr key={passenger.seatNo}>
              <td>{passenger.personName}</td>
              <td>{passenger.personAge}</td>
            </tr>)}
          </tbody>
        </table>
        <hr />
        <div>
          <b>Total Cost: </b><span>{airplane.price}</span>
        </div>
        <BarcodeImage ticketId={airplane.ticketId} />
        <button className="download_button" onClick={()=>ticketDownloadHandler(airplane.ticketId)}>Download</button>
        <Link to="/home">Book another flight</Link>
      </div>
    </div>) : <ErrorPage />
  );
}
