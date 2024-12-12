import Barcode from "react-barcode"; 

import PropTypes from "prop-types";

export default function BarcodeImage({ticketId}){
    return <Barcode 
        value={ticketId}
        format="CODE128"  
        height={50}
    />
}

BarcodeImage.propTypes = {
    ticketId : PropTypes.string.isRequired
};