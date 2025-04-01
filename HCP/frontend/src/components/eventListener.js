import React, { useEffect, useState } from "react";

function EventListener({ contract }) {
  const [booking, setBooking] = useState([
    {
      name: "",
      dob: "",
      sex: "",
      ehr: "",
      email: "",
      phoneNo: "",
      bookingId: "",
      staffId: "",
      date: "",
      time: "",
    },
  ]);

  useEffect(() => {
    console.log(booking);

    // Listening for Transfer events
    const bookEvent = contract.events.AppointmentBooked();
    const cancelEvent = contract.events.AppointmentCanceled();

    const handleBookEvent = (event) => {
      console.log("Appointment Booked Event:", event);
      // Process the event data
      const {
        returnValues: {
          name,
          dob,
          sex,
          ehrNumber,
          email,
          phoneNo,
          bookingId,
          staffId,
          date,
          time,
        },
      } = event;

      console.log("New booking id: ", bookingId);

      const existingBooking = booking.find((b) => b.bookingId === bookingId);

      console.log("Existing Booking: ", existingBooking);

      if (!existingBooking) {
        setBooking((prevBooking) => [
          {
            name: name,
            dob: dob,
            sex: sex,
            ehr: ehrNumber,
            email: email,
            phoneNo: phoneNo,
            bookingId: bookingId,
            staffId: staffId,
            date: date,
            time: time,
          },
          ...prevBooking,
        ]);

        console.log("New booking list: ", booking);

        console.log("Sending user booking confirmation...");
      } else {
        console.log("Booking already ecists, not adding: ", bookingId);
      }
    };

    const handleCancelEvent = (event) => {
      console.log("Appointment Booked Event:", event);

      // Process the event data
      const {
        returnValues: { bookingId },
      } = event;

      console.log("Cancel booking id: ", bookingId);

      //traverse each item in Booking and remove the item with bookingId === to bookingId from the event
      setBooking((prevBookings) =>
        prevBookings.filter((item) => item.bookingId !== bookingId)
      );

      console.log("Sending user booking cancelled confirmation...");
    };

    // Attach the event listener
    bookEvent.on("data", handleBookEvent);
    cancelEvent.on("data", handleCancelEvent);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      bookEvent.off("data", handleBookEvent);
      cancelEvent.off("data", handleCancelEvent);
    };
  }, [contract]);
  return (
    <div className="booking-list">
      <h2 className="blocktext-gray-900 text-2xl font-medium mt-10 pt-10">
        Booking Appointments
      </h2>
      <table
        style={{
          minWidth: "100%",
          borderCollapse: "collapse",
          padding: "10px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                padding: "10px",
              }}
              className="border border-gray-300"
            >
              Name
            </th>
            <th
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                padding: "10px",
              }}
              className="border border-gray-300"
            >
              Date of Birth
            </th>
            <th
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                padding: "10px",
              }}
              className="border border-gray-300"
            >
              Gender
            </th>
            <th
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                padding: "10px",
              }}
              className="border border-gray-300"
            >
              EHR Number
            </th>
            <th
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                padding: "10px",
              }}
              className="border border-gray-300"
            >
              Email
            </th>
            <th
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                padding: "10px",
              }}
              className="border border-gray-300"
            >
              Phone Number
            </th>
            <th
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                padding: "10px",
              }}
              className="border border-gray-300"
            >
              Booking ID
            </th>
            <th
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                padding: "10px",
              }}
              className="border border-gray-300"
            >
              Staff ID
            </th>
            <th
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                padding: "10px",
              }}
              className="border border-gray-300"
            >
              Date
            </th>
            <th
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                padding: "10px",
              }}
              className="border border-gray-300"
            >
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {booking.map((b, index) => (
            <tr key={index}>
              <td
                className="border border-gray-300"
                style={{ fontSize: "0.875rem", padding: "10px" }}
              >
                {b.name}
              </td>
              <td
                className="border border-gray-300"
                style={{ fontSize: "0.875rem", padding: "10px" }}
              >
                {b.dob}
              </td>
              <td
                className="border border-gray-300"
                style={{ fontSize: "0.875rem", padding: "10px" }}
              >
                {b.sex}
              </td>
              <td
                className="border border-gray-300"
                style={{ fontSize: "0.875rem", padding: "10px" }}
              >
                {b.ehr}
              </td>
              <td
                className="border border-gray-300"
                style={{ fontSize: "0.875rem", padding: "10px" }}
              >
                {b.email}
              </td>
              <td
                className="border border-gray-300"
                style={{ fontSize: "0.875rem", padding: "10px" }}
              >
                {b.phoneNo}
              </td>
              <td
                className="border border-gray-300"
                style={{ fontSize: "0.875rem", padding: "10px" }}
              >
                {b.bookingId}
              </td>
              <td
                className="border border-gray-300"
                style={{ fontSize: "0.875rem", padding: "10px" }}
              >
                {b.staffId}
              </td>
              <td
                className="border border-gray-300"
                style={{ fontSize: "0.875rem", padding: "10px" }}
              >
                {b.date}
              </td>
              <td
                className="border border-gray-300"
                style={{ fontSize: "0.875rem", padding: "10px" }}
              >
                {b.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventListener;
