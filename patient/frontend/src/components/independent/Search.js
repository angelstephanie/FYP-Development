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

  const handleBookAppointment = (appointment) => {
    navigate("/selectAppointment", { state: { appointment } });
  };

  return (
    <div className="flex flex-row ">
      <img
        className="h-[800px] w-1/7 object-cover sticky top-0"
        src="../images/background.png"
        alt="background"
      />
      <div className="mb-[200px] mt-[100px] mx-auto w-4/5 flex-col flex gap-8  ">
        <div className="flex justify-center">
          <h2 className="text-2xl font-medium mb-12" id="heading">
            Appointments/ Booking
          </h2>
        </div>
        <div>
          <p>Owner address is: {owner}</p>
          <h2>Transfer Events:</h2>
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
                  className="inline-flex w-full mt-3 justify-center gap-x-1.5 rounded-md bg-emerald-900 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-stone-300 ring-inset hover:bg-white hover:text-black"
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
