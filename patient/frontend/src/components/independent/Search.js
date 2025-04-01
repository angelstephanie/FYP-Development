import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import myContract from "../../smartcontract/myContract";

function Search() {
  const [owner, setOwner] = useState(""); // State variable for the owner
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchOwner = async () => {
      const owner = await myContract.methods.owner().call();
      setOwner(owner); // Update state with the owner address
    };

    fetchOwner(); // Call the async function

    //Listening for Transfer events
    const transferEvent = myContract.events.AppointmentBooked();

    transferEvent.on("data", (event) => {
      console.log("Transfer Event:", event);
      // Process the event data
      const {
        returnValues: { from, to, value },
      } = event;

      // Update the events state with the new event
      setEvents((prevEvents) => [
        ...prevEvents,
        { from, to, value, timestamp: new Date().toLocaleString() }, // Add a timestamp
      ]);
    });

    // Cleanup function to remove the event listener on component unmount
    return () => {
      transferEvent.off(); // Clean up the event listener
    };
  }, []); // Empty dependency array to run once on mount

  const appointments = [
    {
      id: 1,
      name: "Hospital A",
      type: "public",
      date: "2025-03-03",
      time: "10:00-15:00",
      service: "Emergency",
    },
    {
      id: 2,
      name: "Clinic B",
      type: "private",
      date: "2025-03-10",
      time: "10:00-15:00",
      service: "Radiology",
    },
    {
      id: 3,
      name: "ABC Clinic ",
      type: "private",
      date: "2025-09-26",
      time: "10:00-15:00",
      service: "Cardiothoracic Surgery",
    },
    {
      id: 4,
      name: "ABC Hospital",
      type: "public",
      date: "2025-10-10",
      time: "10:00-15:00",
      service: "Dental",
    },
    {
      id: 5,
      name: "XX Medical Center",
      type: "private",
      date: "2025-03-10",
      time: "10:00-15:00",
      service: "Cardiothoracic Surgery",
    },
    {
      id: 6,
      name: "Hospital C",
      type: "public",
      date: "2025-03-03",
      time: "10:00-15:00",
      service: "Medicine",
    },
  ];

  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleBookAppointment = (appointment) => {
    navigate("/selectAppointment", { state: { appointment } });
  };



  return (
    <div className="">
      <nav className='w-full my-3 flex'>
        <img className='ml-15 w-20' src="../images/ehealth-logo.svg" alt='/'></img>
        <h1 className='ml-[20px] mt-2 text-sky-700 font-medium text-2xl'>Electronic Health Record Sharing System</h1>
        <div className='mr-8 ml-auto font-medium'>History</div>
      </nav>
      <div className="mb-[200px] mx-auto w-4/5 flex-col flex gap-8  ">
        

        <div className="flex justify-center">
          <h2 className="text-2xl font-medium my-12" id="heading">
            Booking System
          </h2>
        </div>
        <div>

          <form className='flex flex-col'>
            <div className='flex flex-col'>
            <div>
          <p>Owner address is: {owner}</p>
          <h2>Transfer Events:</h2>
        </div>
              <div className="flex gap-5 justify-center">
                <div className="filter relative inline-block text-left">
                  <div>
                    <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                      id="product-insert-menu"
                      aria-expanded={isClicked}
                      aria-haspopup={isClicked}
                      onClick={() => setIsClicked(!isClicked)}>
                      Area
                      <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  {(isClicked) && (
                    <div className="absolute right-[45%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                      <div className="py-1" role="none">
                        <a href="/search" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                          id="product-insert-item-0">Area 1</a>
                        <a href="/search" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                          id="product-insert-item-1">Area 2</a>
                      </div>
                    </div>
                  )

                  }
                </div>

                <input type="text" id="name-input" aria-describedby="helper-text-explanation"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5"
                  required />
                <button
                  className="text-cyan-500 hover:text-white border border-cyan-500 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center  w-fit"
                >
                  search
                </button>
              </div>


            </div>
          </form>
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                From: {event.from}, To: {event.to}, Value: {event.value}, Time:{" "}
                {event.timestamp}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center gap-7 flex-wrap">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="w-80  p-5 bg-white border border-gray-100 rounded-[5px] shadow-sm hover:bg-gray-50"
            >
              <div className="flex gap-4">
                <img
                  src={`${process.env.PUBLIC_URL}/images/hospital.png`}
                  className="size-15"
                  alt=""
                />
                <div className="">
                  <p className="text-sm text-gray-700">{appointment.type}</p>
                  <p className="font-semibold">{appointment.name}</p>
                  <p className="text-xs text-gray-700">{appointment.service}</p>
                </div>
              </div>
              <div className="mt-2">
                <hr className="mt-4 mb-2 h-px bg-gray-300 border-0 "></hr>
                <p className="text-gray-700 text-sm">
                  Date Available: &nbsp;{" "}
                  <span className="text-black">{appointment.date} </span>
                </p>
                <p className="text-gray-700 text-sm">
                  Time: &nbsp;{" "}
                  <span className="text-black">{appointment.time} </span>
                </p>

                <button
                  onClick={() => handleBookAppointment(appointment)}
                  className="inline-flex w-full mt-3 justify-center secondary gap-x-1.5 rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-stone-300 ring-inset hover:bg-white hover:text-black"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
