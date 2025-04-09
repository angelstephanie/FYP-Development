import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import contracts from "../../smartcontract/contracts";

function SelectAppointment() {
  const location = useLocation();
  const hospital = location.state.hospital;
  const user = location.state.user;

  const navigate = useNavigate();
  const bookProfessional = (hospital, doctor) => {
    navigate("/bookAppointment", { state: { hospital, doctor, user } });
  };

  const [doctorList, setDoctorList] = useState([
    {
      id: "",
      name: "",
      specialty: "",
      qualification: "",
      schedule: "",
    },
  ]);

  const getDoctors = async (e) => {
    const allDoctors = await contracts[hospital.id - 1].methods
      .getAllMedicalProfessionals()
      .call();

    setDoctorList(
      allDoctors.map((doctor) => ({
        id: doctor.staffId,
        name: doctor.staffName,
        specialty: doctor.specialty,
        qualification: doctor.qualifications,
        schedule: doctor.schedule,
      }))
    );
  };

  useEffect(() => {
    getDoctors();
  }, [doctorList]);

  return (
    <div className=" ">
      <nav className="w-full my-3 flex">
        <img
          className="ml-15 w-20"
          src="../images/ehealth-logo.svg"
          alt="/"
        ></img>
        <h1 className="ml-[20px] mt-2 text-sky-700 font-medium text-2xl">
          Electronic Health Record Sharing System
        </h1>
        <div className="mr-8 ml-auto font-medium">History</div>
      </nav>
      <div className="w-6/10 ml-15 mt-10">
        <div className="flex ">
          <img
            className="size-25"
            src={`${process.env.PUBLIC_URL}/images/hospital.png`}
            alt=""
          />
          <div className="ml-10">
            <p className="text-base font-semibold text-gray-600">
              {hospital.type}
            </p>
            <p className="text-3xl font-bold mt-2">{hospital.name}</p>
            <p className="text-xs text-gray-600 font-semibold mt-1">
              {hospital.address}, {hospital.district}
            </p>
          </div>
        </div>
        <hr className="mt-5 mb-4 h-px bg-gray-300 border-0 "></hr>
        <div className="text-lg font-semibold mb-5">Available Doctors</div>
        <div className="gap-4 ml-5 flex flex-col">
          {doctorList.map((doctor) => (
            <button
              type="button"
              className="flex gap-3 items-center text-black-900 hover:text-white border border-sky-700 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-600 font-medium rounded-sm text-sm px-4 py-2 text-center mt-2 mb-2"
              onClick={() => bookProfessional(hospital, doctor)}
            >
              <img
                className=" size-[80px]"
                alt="record-icon"
                src="../images/record-icon1.png"
              ></img>
              <div className="text-left">
                <p className="font-bold text-lg">{doctor.name}</p>
                <p className="text-sm">{doctor.specialty}</p>
                <p className="text-sm">
                  {(() => {
                    try {
                      return Array.isArray(doctor.schedule)
                        ? doctor.schedule.join(", ")
                        : "No schedule available";
                    } catch (error) {
                      console.error("Error joining schedule:", error);
                      return "Error loading schedule";
                    }
                  })()}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectAppointment;
