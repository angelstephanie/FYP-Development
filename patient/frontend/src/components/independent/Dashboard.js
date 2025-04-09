import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import contracts from "../../smartcontract/contracts";
import web3 from "../../smartcontract/web3";

function Dashboard() {
  const location = useLocation();
  const user = location.state.user;

  const [userAppointments, setUserAppointments] = useState([
    {
      contractId: "",
      ehr: "",
      staffName: "",
      bookingId: "",
      date: "",
      time: "",
      status: "",
      hospitalName: "",
    },
  ]);

  const [hospital, setHospital] = useState({
    id: "",
    name: "",
    type: "",
    district: "",
    address: "",
  });

  const [doctor, setDoctor] = useState({
    id: "",
    name: "",
    specialty: "",
    qualification: "",
    schedule: "",
  });

  const fetchUserAppointment = async () => {
    const details = [];
    var count = 0;

    for (const contract of contracts) {
      try {
        const _hospitalName = await contract.methods.getHospitalName().call();
        console.log("Hospital Name: ", _hospitalName);

        const appointments = await contract.methods
          .getUserAppointments(user.ehr)
          .call();
        const formattedAppointments = appointments.map((appointment) => ({
          contractId: count,
          ehr: user.ehr,
          staffName: appointment.staffName,
          staffId: appointment.staffId,
          bookingId: appointment.bookingId,
          date: appointment.date,
          time: appointment.time,
          status: appointment.status,
          hospitalName: _hospitalName,
        }));
        details.push(...formattedAppointments);
        console.log("hospital name: ", _hospitalName);
      } catch (error) {
        console.log("No booking for contract id: ", contract);
      }
      count++;
    }
    setUserAppointments(details);
  };

  useEffect(() => {
    fetchUserAppointment();
  }, []);

  const removeBooking = async (contractId, bookingId) => {
    console.log("Cancelling appointment...");

    const accounts = await web3.eth.getAccounts();
    await contracts[contractId].methods.cancelAppointment(bookingId).send({
      from: accounts[0],
    });

    console.log("Appointment cancelled");

    fetchUserAppointment();
  };

  const rebookAppointment = async (contractId, staffId) => {
    console.log("ContractID: ", contractId);
    console.log("staffID: ", staffId);

    const _hospitalName = await contracts[contractId].methods
      .getHospitalName()
      .call();
    console.log("Hospital Name: ", _hospitalName);
    const _hospitalType = await contracts[contractId].methods
      .getHospitalType()
      .call();
    const _hospitalDistrict = await contracts[contractId].methods
      .getHospitalDistrict()
      .call();
    const _hospitalAddress = await contracts[contractId].methods
      .getHospitalAddress()
      .call();

    console.log(
      "Hospital: ",
      _hospitalName,
      _hospitalAddress,
      _hospitalDistrict,
      _hospitalType
    );

    setHospital({
      id: contractId + 1,
      name: _hospitalName,
      type: _hospitalType,
      district: _hospitalDistrict,
      address: _hospitalAddress,
    });

    const staff = await contracts[contractId].methods
      .getMedicalProfessionalById(staffId)
      .call();

    console.log("Staff: ", staff.qualifications);

    setDoctor({
      id: staff.staffId,
      name: staff.staffName,
      specialty: staff.specialty,
      qualification: staff.qualifications,
      schedule: staff.schedule,
    });
  };

  const navigate = useNavigate();
  const bookAppointment = () => {
    navigate("/search", {
      state: { user },
    });
  };

  const bookDoctor = () => {
    navigate("/bookAppointment", { state: { hospital, doctor, user } });
  };

  useEffect(() => {
    if (hospital.id && doctor.id) {
      console.log("Hospital: ", hospital);
      console.log("Doctor: ", doctor);
      bookDoctor();
    }
  }, [hospital, doctor]);

  return (
    <div>
      <nav className="w-full my-3 flex">
        <img
          className="ml-15 w-20"
          src="../images/ehealth-logo.svg"
          alt="/"
        ></img>
        <h1 className="ml-[20px] mt-2 text-sky-700 font-medium text-2xl">
          Electronic Health Record Sharing System
        </h1>
        <div
          className="mr-8 ml-auto font-medium"
          onClick={() => bookAppointment()}
        >
          Book Appointment
        </div>
      </nav>
      <div className="">
        <div className="flex gap-8 justify-center">
          <div className="flex flex-col gap-3 p-6 bg-white border border-gray-100 rounded-[10px] shadow-sm hover:bg-gray-50 w-6/10 my-9 overflow-auto">
            <h2 className="mb-2 w-full text-lg font-semibold tracking-tight text-gray-900 ">
              Upcoming Appointments
            </h2>
            {userAppointments.map(
              (appointment) =>
                appointment.status === "upcoming" && (
                  <div
                    key={`${appointment.contractId}-${appointment.bookingId}`}
                    className="flex w-full items-center"
                  >
                    <div className="flex flex-col px-1.5 rounded-[6px] items-center">
                      <div className="text-amber-500 font-bold ">
                        {appointment.date}
                      </div>
                      <p className="text-[14px] text-gray-600 ">
                        {appointment.time}
                      </p>
                    </div>
                    <div className="flex flex-col ml-5">
                      <p className="font-medium text-[14px]">
                        {appointment.staffName}
                      </p>
                      <p className="text-[14px] text-gray-500 ">
                        {appointment.hospitalName}
                      </p>
                      <p className="text-[12px] text-gray-400">
                        Booking ID: {appointment.bookingId}
                      </p>
                    </div>
                    <div className="flex ml-auto space-x-2">
                      <button
                        className="px-3 py-1 font-semibold text-sm text-white bg-red-800 rounded-md hover:bg-red-600 transition duration-200"
                        onClick={() =>
                          removeBooking(
                            appointment.contractId,
                            appointment.bookingId
                          )
                        }
                      >
                        Cancel
                      </button>
                      <button
                        className="px-3 py-1 font-semibold text-sm text-white bg-blue-600 rounded-md hover:bg-blue-600 transition duration-200"
                        onClick={() =>
                          rebookAppointment(
                            appointment.contractId,
                            appointment.staffId
                          )
                        }
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex gap-8 justify-center">
          <div className="flex flex-col gap-3 p-6 bg-white border border-gray-100 rounded-[10px] shadow-sm hover:bg-gray-50 w-6/10 my-9">
            <h2 className="mb-2 w-full text-lg font-semibold tracking-tight text-gray-900 ">
              Past Records
            </h2>
            {userAppointments.map(
              (appointment) =>
                appointment.status !== "upcoming" && (
                  <div
                    key={`${appointment.contractId}-${appointment.bookingId}`}
                    className="flex w-full items-center"
                  >
                    <div className="flex flex-col px-1.5 rounded-[6px] items-center">
                      <div className="text-amber-500 font-bold ">
                        {appointment.date}
                      </div>
                      <p className="text-[14px] text-gray-600 ">
                        {appointment.time}
                      </p>
                    </div>
                    <div className="flex flex-col ml-5">
                      <p className="font-medium text-[14px]">
                        {appointment.staffName}
                      </p>
                      <p className="text-[14px] text-gray-600 ">
                        {appointment.hospitalName}
                      </p>
                      <p className="text-[12px] text-gray-400">
                        Booking ID: {appointment.bookingId}
                      </p>
                    </div>
                    <div className="flex ml-auto space-x-2">
                      {appointment.status === "Cancelled" && (
                        <div className="px-3 py-1 font-semibold text-sm text-red-800">
                          Cancelled
                        </div>
                      )}
                      {appointment.status === "Completed" && (
                        <div className="px-3 py-1 font-semibold text-sm text-green-800">
                          Completed
                        </div>
                      )}
                      <button
                        className="px-3 py-1 font-semibold text-sm text-white bg-blue-600 rounded-md hover:bg-blue-600 transition duration-200"
                        onClick={() =>
                          rebookAppointment(
                            appointment.contractId,
                            appointment.staffId
                          )
                        }
                      >
                        Rebook
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
