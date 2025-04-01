import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import myContract from "../../smartcontract/myContract";
import web3 from "../../smartcontract/web3";

function Dashboard() {
  const location = useLocation();
  const user = location.state.user;
  const selectedSchedule = location.state.selectedSchedule;

  const [userAppointments, setUserAppointments] = useState([
    {
      ehr: "",
      staffName: "",
      bookingId: "",
      date: "",
      time: "",
    },
  ]);

  const [bookingID, setBookingID] = useState("");

  const fetchUserAppointment = async () => {
    console.log("User: ", user);
    console.log("Selected schedule: ", selectedSchedule);

    try {
      const appointments = await myContract.methods
        .getUserAppointments(user.ehr)
        .call();
      console.log("User's appointments: ", appointments);

      setUserAppointments(
        appointments.map((appointment) => ({
          ehr: appointment.ehrNumber,
          staffName: appointment.staffName,
          bookingId: appointment.bookingId,
          date: appointment.date,
          time: appointment.time,
        }))
      );
    } catch (error) {
      console.log("User has no appointments:");
      setUserAppointments([]);
    }
  };

  useEffect(() => {
    fetchUserAppointment();

    console.log("User appointments: ", userAppointments);
  }, [user, selectedSchedule, myContract]);

  const removeBooking = async () => {
    console.log("Cancelling appointment...");

    const accounts = await web3.eth.getAccounts();
    await myContract.methods.cancelAppointment(bookingID).send({
      from: accounts[0],
    });

    console.log("Appointment cancelled");

    fetchUserAppointment();
  };

  return (
    <div>
      <nav className='w-full my-3 flex'>
        <img className='ml-15 w-20' src="../images/ehealth-logo.svg" alt='/'></img>
        <h1 className='ml-[20px] mt-2 text-sky-700 font-medium text-2xl'>Electronic Health Record Sharing System</h1>
        <div className='mr-8 ml-auto font-medium'>History</div>
      </nav>
      <div className="">
        <div className="flex gap-8 justify-center">
          <div className="flex flex-col gap-3 p-6 bg-white border border-gray-100 rounded-[10px] shadow-sm hover:bg-gray-50 w-6/10 my-9">
            <h2 className="mb-2 w-full text-lg font-semibold tracking-tight text-gray-900 ">
              Upcoming Appointments
            </h2>
            {userAppointments.map((appointment) => (
              <div key={appointment.ehr} className="flex w-full items-center">
                <div className="flex flex-col px-1.5  bg-gray-900 rounded-[6px] items-center">
                  <div className="text-amber-400 font-bold ">
                    {appointment.date}
                  </div>
                </div>
                <div className="flex flex-col ml-5">
                  <p className="font-medium text-[14px]">
                    {appointment.staffName}
                  </p>
                  <p className="text-[14px] text-gray-500 ">
                    {appointment.time}
                  </p>
                  <p className="text-[12px] text-gray-400">
                    Booking ID: {appointment.bookingId}
                  </p>
                </div>
                <img
                  className=" w-1/10 h-5 ml-auto"
                  alt="dots"
                  src="../images/dots.svg"
                ></img>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="m-auto w-full flex-col flex gap-3 mt-8 ">
                    <label htmlFor="specific-professional-input" className="blocktext-gray-900 text-2xl font-medium mt-10  mb-5">Find Specific Medical Professional</label>
                    <label htmlFor="specific-professional-input" className="blocktext-gray-900 font-medium">Staff ID</label>
                    <input type="text" id="remove-input" aria-describedby="helper-text-explanation" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter the staff ID" required />
                    <button type="button" className="font-semibold text-white bg-lime-900 rounded-[10px] pt-[7px] pb-[7px] mt-4 mb-10">Search</button>

                </div> */}

        {/* <div className="m-auto w-full flex-col flex gap-3 mt-5 ">
          <label
            htmlFor="appointment-input"
            className="blocktext-gray-900 text-2xl font-medium   mb-5"
          >
            Find Your Appointment
          </label>
          <label
            htmlFor="appointment-input"
            className="blocktext-gray-900 font-medium"
          >
            Your eHR Number
          </label>
          <input
            type="text"
            id="remove-input"
            aria-describedby="helper-text-explanation"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter the eHR number"
            required
          />
          <button
            type="button"
            className="font-semibold text-white bg-lime-900 rounded-[10px] pt-[7px] pb-[7px] mt-4 mb-10"
          >
            Search
          </button>
        </div> */}

        <div className="m-auto w-6/10 flex-col flex gap-3 mt-5 ">
          <label
            htmlFor="appointment-input"
            className="blocktext-gray-900 text-2xl font-medium   mb-5"
          >
            Cancel Your Appointment
          </label>
          <label
            htmlFor="appointment-input"
            className="blocktext-gray-900 font-medium"
          >
            Select Booking ID
          </label>
          <select
            id="remove-input"
            value={bookingID}
            onChange={(e) => setBookingID(e.target.value)}
            aria-describedby="helper-text-explanation"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="" disabled>
              Select a booking ID
            </option>
            {userAppointments.map((appointment) => (
              <option key={appointment.bookingId} value={appointment.bookingId}>
                {appointment.bookingId}
              </option>
            ))}
          </select>
          {/* <input
            type="text"
            id="remove-input"
            value={bookingID}
            onChange={(e) => setBookingID(e.target.value)}
            aria-describedby="helper-text-explanation"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter the booking ID"
            required
          /> */}
          <button
            type="button"
            className="font-semibold text-white bg-red-900 rounded-[10px] pt-[7px] pb-[7px] mt-4 mb-10"
            onClick={() => removeBooking()}
          >
            Cancel
          </button>
        </div>

      </div>
      <div className="mb-[200px] mt-[100px] mx-auto w-3/5 flex-col flex gap-8  ">
        <div className="flex">
          <h2 className="text-2xl font-medium mb-5" id="heading">
            Records
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
