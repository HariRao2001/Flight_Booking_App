import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from 'react';
import { Provider } from "react-redux";
import store from './assets/store/createSore';

const Home = lazy(()=>import("./assets/components/Home/Home"));
const PersonalInfo = lazy(()=>import('./assets/components/Personal-Info/PersonalInfo'));
const FlightBooking  = lazy(()=>import("./assets/components/FlightBooking/FlightBooking"));
const FlightDetails = lazy(()=>import( './assets/components/FlightDetails/FlightDetails'));
const PaymentPage =  lazy(()=>import('./assets/components/Payments/Payments'));
const BoardingPass = lazy(()=>import('./assets/components/BoardingPass/BoardingPass'));
const SidePanel = lazy(()=>import('./assets/components/SidePanel/SidePanel'));
const SearchResult = lazy(()=>import('./assets/components/SearchResult/SearchResult'));
const MyBookings =  lazy(()=>import('./assets/components/MyBookings/MyBookings'));
const IndividualBoardingPass = lazy(()=>import('./assets/components/IndividualBoardingPass/IndividualBoardingPass'));
const SeatBooking = lazy(()=>import('./assets/components/SeatBookings/SeatBookings'));
const Rating = lazy(()=>import("./assets/components/Rating/Rating"));
const PassengerDetails = lazy(()=>import("./assets/components/PassengerDetails/PassengerDetails"));
const Support = lazy(()=>import("./assets/components/Support/Support"));
const AdminView = lazy(()=>import("./assets/components/admin/AdminView"));
const SearchTicketId = lazy(()=>import("./assets/components/admin/SearchTicketId"));
const AdminNavbar = lazy(()=>import("./assets/components/admin/AdminNavbar"));
const AdminSupport = lazy(()=>import("./assets/components/admin/Support"));
const AdminLogin = lazy(()=>import("./assets/components/admin/AdminLogin"));



import Loading from './assets/components/Loading/Loading';
import ErrorPage from './assets/components/ErrorPage/ErrorPage';
import PageNotFound from './assets/components/PageNotFound/PageNotFound';


import { loader as bookingLoader } from './assets/components/admin/SearchTicketId';
import { loader as supportLoader } from "./assets/components/admin/Support";

function App() {
  const router = createBrowserRouter([
    { path:"/", element:<Suspense fallback={<Loading />}><Home /></Suspense> },
    { path:"/personalinfo", element:<Suspense fallback={<Loading />}><PersonalInfo /></Suspense> },
    { path:"/home", element:<Suspense fallback={<Loading />}><SidePanel /></Suspense> },
    { path:"/flightbooking", element:<Suspense fallback={<Loading />}><FlightBooking /></Suspense> },
    { path:"/searchresult", element:<Suspense fallback={<Loading />}><SearchResult /></Suspense> },
    { path:"/flightdetails", element:<Suspense fallback={<Loading />}><FlightDetails /></Suspense> },
    { path:"/passengerdetails", element:<PassengerDetails />},
    { path:"/seatbooking", element : <Suspense fallback={<Loading />}><SeatBooking /></Suspense>},
    { path:"/paymentpage", element: <Suspense fallback={<Loading />}><PaymentPage /></Suspense> },
    { path:"/ibp", element : <Suspense fallback={<Loading />}><IndividualBoardingPass /></Suspense> },
    { path:"/mybookings", element: <Suspense fallback={<Loading />}><MyBookings /></Suspense> },
    { path:"/boardingpass", element: <Suspense fallback={<Loading />}><BoardingPass /></Suspense> },
    { path:"/rating", element:<Suspense fallback={<Loading />}><Rating /></Suspense>},
    { path:"/support", element:<Suspense fallback={<Loading />}><Support /></Suspense>},
    { path: "/adminlogin", element:<Suspense fallback={<Loading />}><AdminLogin /></Suspense> },
    { path:"/admin", element: <Suspense fallback={<Loading />}><AdminNavbar /></Suspense>, children:  [
      { path:"/admin/flightsoverview", element: <Suspense fallback={<Loading />}><AdminView /></Suspense> },
      { path:"/admin/searchbyticketid", element:<Suspense fallback={<Loading />}><SearchTicketId/></Suspense>, loader: bookingLoader },
      { path:"/admin/support", element:<Suspense fallback={<Loading />}><AdminSupport /></Suspense>, loader: supportLoader }
      ] },
    { path:"/error", element:<ErrorPage />},
    { path:"/:notfound",element:<PageNotFound />}
  ])

  return <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
}

export default App;
