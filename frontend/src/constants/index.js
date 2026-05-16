
import homeIcon from '../assets/icons/home.svg'
import addTripIcon from '../assets/icons/addtrip.svg'
import tripsDataIcon from '../assets/icons/tripsdata.svg'

export const userLinks  = [
    {
      imgURL: homeIcon,
      route: "/dashboard",
      label: "Dashboard",
    },
    {
      imgURL: addTripIcon,
      route: "/add-trip",
      label: "AddTrip",
    },
  ];
  
  export const adminLinks = [
    {
      imgURL: homeIcon,
      route: "/dashboard",
      label: "Dashboard",
    },
    {
      imgURL: addTripIcon,
      route: "/add-trip",
      label: "AddTrip",
    },
    {
        imgURL: tripsDataIcon,
        route: "/all-trips",
        label: "TripsData",
    },
    
  ];