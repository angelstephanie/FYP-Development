import { useLocation, useNavigate } from "react-router-dom";
import web3 from "../../smartcontract/web3";
import myContract from "../../smartcontract/myContract";
import { useState } from "react";

function ConfirmAppointment() {
  const location = useLocation();
  const selectedSchedule = location.state.selectedSchedule;

  const [user, setUser] = useState({
    ehr: "",
    name: "",
    dob: "",
    sex: "",
    email: "",
    phoneNo: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const bookAppointment = async (e) => {
    const accounts = await web3.eth.getAccounts();

    console.log("User: ", user);
    console.log("Selected schedule: ", selectedSchedule);

    console.log("Waiting on transaction success...");
    // await myContract.methods;
    // .bookAppointment(
    //   user.name,
    //   22011989,
    //   user.sex,
    //   user.ehr,
    //   user.email,
    //   user.phoneNo,
    //   selectedSchedule.doctorId,
    //   selectedSchedule.date,
    //   selectedSchedule.time
    // )
    // .send({
    //   from: accounts[0],
    // });

    console.log("Transaction completed");

    bookingSent(user, selectedSchedule);
  };

  const navigate = useNavigate();
  const bookingSent = (user, selectedSchedule) => {
    navigate("/dashboard", { state: { user, selectedSchedule } });
  };

  return (
    <div className="flex flex-row ">
      <div className="w-6/10 ml-15 mt-10">
        <div className="flex ">
          <img
            className="size-25"
            src={`${process.env.PUBLIC_URL}/images/hospital.png`}
            alt=""
          />
          <div className="ml-10">
            <p className="text-3xl font-bold mt-2">
              {selectedSchedule.hospital}
            </p>
          </div>
        </div>
        <hr className="mt-5 mb-4 h-px bg-gray-300 border-0 "></hr>
        <form className="m-auto flex-col flex gap-3 my-10 ">
          <h2 className="my-1.5 w-full text-lg font-semibold tracking-tight text-gray-900 ">
            Information Required
          </h2>
          <label
            htmlFor="name-input"
            className="blocktext-gray-900 font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="name-input"
            name="name"
            value={user.name}
            onChange={handleUserChange}
            aria-describedby="helper-text-explanation"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your name"
            required
          />

          <label
            htmlFor="gender-input"
            className="blocktext-gray-900 font-medium"
          >
            Gender
          </label>
          <input
            type="text"
            id="gender-input"
            name="sex"
            value={user.sex}
            onChange={handleUserChange}
            aria-describedby="helper-text-explanation"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your gender"
            required
          />

          <label htmlFor="ehr-input" className="blocktext-gray-900 font-medium">
            eHR Number
          </label>
          <input
            type="number"
            id="ehr-input"
            name="ehr"
            value={user.ehr}
            onChange={handleUserChange}
            aria-describedby="helper-text-explanation"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your eHR Number"
            required
          />

          <label
            htmlFor="email-input"
            className="blocktext-gray-900 font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="email-input"
            name="email"
            value={user.email}
            onChange={handleUserChange}
            aria-describedby="helper-text-explanation"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your email"
            required
          />

          <label
            htmlFor="phone-input"
            className="blocktext-gray-900 font-medium"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone-input"
            name="phoneNo"
            value={user.phoneNo}
            onChange={handleUserChange}
            aria-describedby="helper-text-explanation"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your phone number"
            required
          />

          <label htmlFor="dob" className="blocktext-gray-900 font-medium">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={user.dob} // Controlled input
            onChange={handleUserChange} // Handle input changes
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required // Mark as required if necessary
          />
          <button
            type="button"
            className="inline-flex w-full mt-3 justify-center gap-x-1.5 rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-stone-300 ring-inset hover:bg-white hover:text-black"
            onClick={(event) => bookAppointment(event)}
          >
            Confirm Booking
          </button>
        </form>
      </div>
      <div className="mb-[200px] mt-[80px] w-4/10 flex-col flex gap-8  ">
        <div className="flex justify-center gap-7 flex-wrap">
          <div
            key={selectedSchedule.doctorId}
            className="w-100  p-5 bg-white border border-gray-100 rounded-[5px] shadow-sm hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold mt-4 mb-5" id="heading">
              Appointment Details
            </h2>
            <h2 className="text-2xl font-semibold mt-4 mb-5">
              Dr. {selectedSchedule.doctorName}
            </h2>
            <span className="mt-10 pr-3 font-medium rtl:text-right text-md w-full">
              Address
            </span>
            <div className="flex gap-4 items-center w-85">
              <img
                src={`${process.env.PUBLIC_URL}/images/mappin.png`}
                className="w-5 h-6.5"
                alt=""
              />
              <p className="text-sm text-gray-700">
                {selectedSchedule.hospital}, XX Road 33, Tai Po, New Territories
              </p>
            </div>
            <div className="mt-8">
              <span className="py-4 pr-3 font-medium rtl:text-right text-md w-full">
                Selected Date
              </span>
              <div className="w-full">
                <button
                  type="button"
                  className="text-sky-700 text-white border border-sky-700 bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-700 font-medium rounded-full text-sm px-4 py-2 text-center my-3"
                >
                  {selectedSchedule.day + ", " + selectedSchedule.date}
                </button>
              </div>
            </div>
            <div className="mt-8">
              <span className="py-4 pr-3 font-medium rtl:text-right text-md w-full">
                Selected Time
              </span>
              <div className="w-full">
                <button
                  type="button"
                  className="text-sky-700 text-white border border-sky-700 bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-700 font-medium rounded-full text-sm px-4 py-2 text-center my-3"
                >
                  {selectedSchedule.time}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmAppointment;
