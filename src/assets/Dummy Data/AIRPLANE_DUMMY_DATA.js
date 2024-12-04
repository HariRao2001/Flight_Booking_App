export const airplaneDetails = [
    { 
        airplaneId : "IND123", 
        airplaneTravellingDetails : { from : "HYD(Hyderabad)", to : "VZD(Vijayawada)" }, 
        airplaneClass : "Economy", 
        price:"8000", 
        duration:"01hr 20min", 
        airportNames :{ from:"Rajiv Gandhi International Airport, Hyderabad", to:"Vijayawada Airport, Vijayawada" },
        airplaneTimings : { start: "08:30" , end:"09.50"}
    },
    { 
        airplaneId : "IND122",
        airplaneTravellingDetails : { from : "HYD(Hyderabad)", to : "(VZD)Vijayawada" }, 
        airplaneClass : "Business", price:"10000", 
        duration:"01hr 00min", 
        airportNames:{ from:"Rajiv Gandhi International Airport, Hyderabad", to:"Vijayawada Airport, Vijayawada" },
        airplaneTimings : { start: "09:00" , end:"10:00" }
    },
    {   airplaneId : "IND113", 
        airplaneTravellingDetails : { from : "HYD(Hyderabad)" , to : "(MBI)Mumbai" }, 
        airplaneClass : "Business",  price:"10000", duration:"02hr 20min", 
        airportNames:{ from:"Rajiv Gandhi International Airport, Hyderabad", to:"Chattrapathi Shivaji Interantional Airport, Mumbai" },
        airplaneTimings : { start: "09:20" , end:"11:40" }
    },
    {   airplaneId : "IND112", 
        airplaneTravellingDetails : { from : "HYD(Hyderabad)" , to : "(MBI)Mumbai" }, 
        airplaneClass : "Economy",  
        price:"9000", 
        duration:"02hr 40min", 
        airportNames:{ from:"Rajiv Gandhi International Airport, Hyderabad", to:"Chattrapathi Shivaji Interantional Airport, Mumbai" },
        airplaneTimings : { start: "09:20" , end:"12:00" }
    },
    {   airplaneId : "IND103", 
        airplaneTravellingDetails : { from : "HYD(Hyderabad)", to : "(CHN)Chennai" }, 
        airplaneClass : "Economy",  price:"8200", 
        duration:"02hr 10min", 
        airportNames:{ from:"Rajiv Gandhi International Airport, Hyderabad", to:"Chennai International Airport, Chennai" },
        airplaneTimings : { start: "11:00" , end:"13:10" }
    },
    {   airplaneId : "IND102", 
        airplaneTravellingDetails : { from : "HYD(Hyderabad)", to : "(CHN)Chennai" }, 
        airplaneClass : "Business",  
        price:"9200", 
        duration:"01hr 50min", 
        airportNames : { from:"Rajiv Gandhi International Airport, Hyderabad", to:"Chennai International Airport, Chennai" },
        airplaneTimings : { start: "11:00" , end:"12:50" }   
    },
    {   airplaneId : "IND143", 
        airplaneTravellingDetails : { from : "(VZD)Vijayawada", to : "(MBI)Mumbai" }, 
        airplaneClass : "Economy", 
        price:"12000", 
        duration:"03hr 40min", 
        airportNames :{ from:"Vijayawada Airport, Vijayawada", to:"Chattrapathi Shivaji Interantional Airport, Mumbai" },
        airplaneTimings : { start: "13:00" , end:"16:40" }
    },
    {   airplaneId : "IND142", 
        airplaneTravellingDetails : { from : "(VZD)Vijayawada", to : "(MBI)Mumbai" }, 
        airplaneClass : "Business",  
        price:"14000", 
        duration:"03hr 20min", 
        airportNames:{ from:"Vijayawada Airport, Vijayawada", to:"Chattrapathi Shivaji Interantional Airport, Mumbai" },
        airplaneTimings : { start: "12:40" , end:"16:00"}
      },
    {   airplaneId : "IND153", 
        airplaneTravellingDetails : { from : "(VZD)Vijayawada", to : "(CHN)Chennai" }, 
        airplaneClass : "Economy",  
        price:"6000", 
        duration:"02hr 10min", 
        airportNames:{ from:"Vijayawada Airport, Vijayawada", to:"Chennai International Airport, Chennai" },
        airplaneTimings : { start: "11:10" , end:"13:20" }
    },
    {   airplaneId : "IND152", 
        airplaneTravellingDetails : { from : "(VZD)Vijayawada", to : "(CHN)Chennai" }, 
        airplaneClass : "Business",  
        price:"7000", 
        duration:"01hr 40min", 
        airportNames:{ from:"Vijayawada Airport, Vijayawada", to:"Chennai International Airport, Chennai" },
        airplaneTimings : { start: "11:30" , end:"14:10"}
    },
    {   airplaneId : "IND163", 
        airplaneTravellingDetails : { from : "(CHN)Chennai", to : "(VZD)Vijayawada" }, 
        airplaneClass :"Economy",  price:"6000", 
        duration:"02hr 10min",
        airportNames:{ from:"Chennai International Airport, Chennai", to:"Vijayawada Airport, Vijayawada" },
        airplaneTimings : { start: "14:00" , end:"16:10"}
    },
    {   airplaneId : "IND162", 
        airplaneTravellingDetails : { from : "(CHN)Chennai", to : "(VZD)Vijayawada" }, 
        airplaneClass :"Business",  
        price:"7000", 
        duration:"01hr 40min", 
        airportNames:{ from:"Chennai International Airport, Chennai", to:"Vijayawada Airport, Vijayawada" },
        airplaneTimings : { start: "13:30" , end:"15:10"}
    },
    {   airplaneId : "IND173", 
        airplaneTravellingDetails : { from : "(CHN)Chennai", to : "(MBI)Mumbai" }, 
        airplaneClass : "Economy" , 
        price:"8700", 
        duration:"03hr 40min", 
        airportNames:{ from:"Chennai International Airport, Chennai", to:"Chattrapathi Shivaji Interantional Airport, Mumbai" },
        airplaneTimings : { start: "13:20" , end:"17:00" }
    },
    {   airplaneId : "IND172", 
        airplaneTravellingDetails : { from : "(CHN)Chennai", to : "(MBI)Mumbai" }, 
        airplaneClass : "Business",  
        price:"10000", 
        duration:"03hr 10min", 
        airportNames:{ from:"Chennai International Airport, Chennai", to:"Chattrapathi Shivaji Interantional Airport, Mumbai" },
        airplaneTimings : { start: "13:50" , end:"17:00" }
    },
    {   airplaneId : "IND183", 
        airplaneTravellingDetails : {from:"(MBI)Mumbai",to:"(VZD)Vijayawada"}, 
        airplaneClass:"Economy" , 
        price:"7000", 
        duration:"02hr 40min", 
        airportNames:{ from:"Chattrapathi Shivaji Interantional Airport, Mumbai", to:"Vijayawada Airport, Vijayawada" },
        airplaneTimings : { start: "15:00" , end:"17:40" }
    },
    {   airplaneId : "IND182", 
        airplaneTravellingDetails : {from:"(MBI)Mumbai",to:"(VZD)Vijayawada"}, 
        airplaneClass:"Business",  
        price:"8000", 
        duration:"02hr 20min", 
        airportNames:{ from:"Chattrapathi Shivaji Interantional Airport, Mumbai", to:"Vijayawada Airport, Vijayawada" },
        airplaneTimings : { start: "15:40" , end:"18:00" }
    },
    {   airplaneId : "IND223", 
        airplaneTravellingDetails : { from : "(MBI)Mumbai",to : "(CHN)Chennai" }, 
        airplaneClass : "Economy", 
        price:"10000", 
        duration:"03hr 40min", 
        airportNames:{ from:"Chattrapathi Shivaji Interantional Airport, Mumbai", to:"Chennai International Airport, Chennai" },
        airplaneTimings : { start: "09:00" , end:"12:40" }
    },
    {   airplaneId : "IND222", 
        airplaneTravellingDetails : { from : "(MBI)Mumbai",to : "(CHN)Chennai" }, 
        airplaneClass : "Business",  
        price:"11000", 
        duration:"03hr 10min", 
        airportNames:{ from:"Chattrapathi Shivaji Interantional Airport, Mumbai", to:"Chennai International Airport, Chennai" },
        airplaneTimings : { start: "09:30" , end:"12:40" }
    },
    {   airplaneId : "IND243", 
        airplaneTravellingDetails : { from : "(MBI)Mumbai", to : "(HYD)Hyderabad"}, 
        airplaneClass : "Economy", 
        price:"8000", 
        duration:"02hr 20min", 
        airportNames:{ from:"Chattrapathi Shivaji Interantional Airport, Mumbai", to:"Rajiv Gandhi International Airport, Hyderabad" },
        airplaneTimings : { start: "18:00" , end:"20:20"}
    },
    {   airplaneId : "IND242", 
        airplaneTravellingDetails : { from : "(MBI)Mumbai", to : "(HYD)Hyderabad"}, 
        airplaneClass : "Business",  
        price:"9000", 
        duration:"02hr 00min", 
        airportNames:{ from:"Chattrapathi Shivaji Interantional Airport, Mumbai", to:"Rajiv Gandhi International Airport, Hyderabad" },
        airplaneTimings : { start: "18:20" , end:"20:20" }
    },
    {   airplaneId : "IND253", 
        airplaneTravellingDetails : { from : "(HYD)Hyderabad", to : "(GOA)Goa" }, 
        airplaneClass : "Economy", 
        price:"8000", 
        duration:"03hr 00min",
        airportNames:{ from:"Rajiv Gandhi International Airport, Hyderabad", to:"Manohar International Airport, Goa" },
        airplaneTimings : { start: "17:00" , end:"20:00"}
    },
    { 
        airplaneId : "IND252", 
        airplaneTravellingDetails : { from : "(HYD)Hyderabad", to : "(GOA)Goa" }, 
        airplaneClass : "Business", 
        price:"9000", duration:"03hr 20min", 
        airportNames:{ from:"Rajiv Gandhi International Airport, Hyderabad", to:"Manohar International Airport, Goa" },
        airplaneTimings : { start: "16:50" , end:"20:10"}
    },
    {   airplaneId : "IND263", 
        airplaneTravellingDetails : { from : "GOA(Goa)", to : "(VZD)Vijayawada" }, 
        airplaneClass : "Economy", 
        price:"8000", 
        duration:"03hr 40min", 
        airportNames:{ from:"Manohar International Airport, Goa", to:"Vijayawada Airport, Vijayawada" },
        airplaneTimings : { start: "16:30" , end:"20:10" }
    },
    { 
        airplaneId : "IND262", 
        airplaneTravellingDetails : { from : "GOA(Goa)", to : "(VZD)Vijayawada" }, 
        airplaneClass : "Business", 
        price:"9000", 
        duration:"03hr 20min", 
        airportNames:{ from:"Manohar International Airport, Goa", to:"Vijayawada Airport, Vijayawada" },
        airplaneTimings : { start: "15:00" , end:"18:20"}
    },
    { 
        airplaneId : "IND273", 
        airplaneTravellingDetails : { from : "GOA(Goa)",to : "HYD(Hyderabad)" }, 
        airplaneClass : "Economy", price:"6000", 
        duration:"02hr 40min", 
        airportNames:{ from:"Manohar International Airport, Goa", to:"Rajiv Gandhi International Airport, Hyderabad" },
        airplaneTimings : { start: "19:00" , end:"21:40" }
    },
    {   
        airplaneId : "IND272", 
        airplaneTravellingDetails : { from : "GOA(Goa)",to : "HYD(Hyderabad)" }, 
        airplaneClass : "Business", 
        price:"7000",
        duration:"03hr 40min", 
        airportNames:{ from:"Manohar International Airport, Goa", to:"Rajiv Gandhi International Airport, Hyderabad" },
        airplaneTimings : { start: "19:00" , end:"22:40" }
    },
]



export const airplanesStartingPoints = ["Chennai", "Goa","Hyderabad", "Mumbai","Vijayawada"];

export const airplanesEndingPoints = ["Chennai", "Goa","Hyderabad", "Mumbai","Vijayawada"];

export const airplaneClasses = ["Economy", "Business"];

export const  seatNumbers = ()=>{
    return [
    [ 
        { seatNo:"1A", reserved: false, selected: false },
        { seatNo:"2A", reserved: false, selected: false },
        { seatNo:"3A", reserved: false, selected: false },
        { seatNo:"4A", reserved: false, selected: false },
        { seatNo:"5A", reserved: false, selected: false },
        { seatNo:"6A", reserved: false, selected: false },
        { seatNo:"7A", reserved: false, selected: false },
        { seatNo:"8A", reserved: false, selected: false },
        { seatNo:"9A", reserved: false, selected: false },
        { seatNo:"10A", reserved: false, selected: false }
        
    ],
    [ 
        { seatNo:"1B", reserved: false, selected: false },
        { seatNo:"2B", reserved: false, selected: false },
        { seatNo:"3B", reserved: false, selected: false },
        { seatNo:"4B", reserved: false, selected: false },
        { seatNo:"5B", reserved: false, selected: false },
        { seatNo:"6B", reserved: false, selected: false },
        { seatNo:"7B", reserved: false, selected: false },
        { seatNo:"8B", reserved: false, selected: false },
        { seatNo:"9B", reserved: false, selected: false },
        { seatNo:"10B", reserved: false, selected: false }

    ],
    [ 
        { seatNo:"1C", reserved: false, selected: false },
        { seatNo:"2C", reserved: false, selected: false },
        { seatNo:"3C", reserved: false, selected: false },
        { seatNo:"4C", reserved: false, selected: false },
        { seatNo:"5C", reserved: false, selected: false },
        { seatNo:"6C", reserved: false, selected: false },
        { seatNo:"7C", reserved: false, selected: false },
        { seatNo:"8C", reserved: false, selected: false },
        { seatNo:"9C", reserved: false, selected: false },
        { seatNo:"10C", reserved: false, selected: false }
        
    ],
    [ 
        { seatNo:"1D", reserved: false, selected: false },
        { seatNo:"2D", reserved: false, selected: false },
        { seatNo:"3D", reserved: false, selected: false },
        { seatNo:"4D", reserved: false, selected: false },
        { seatNo:"5D", reserved: false, selected: false },
        { seatNo:"6D", reserved: false, selected: false },
        { seatNo:"7D", reserved: false, selected: false },
        { seatNo:"8D", reserved: false, selected: false },
        { seatNo:"9D", reserved: false, selected: false },
        { seatNo:"10D", reserved: false, selected: false }
        
    ]

    ]
}