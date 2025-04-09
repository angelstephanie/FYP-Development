import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Detail() {
  const location = useLocation();
  const hospital = location.state.hospital;
  const doctor = location.state.doctor;
  const user = location.state.user;

  const [isDatesOpen, setIsDatesOpen] = useState(true);
  const toggleAccordion = () => {
    setIsDatesOpen(!isDatesOpen);
  };

  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const toggleTime = () => {
    setIsTimeOpen(!isTimeOpen);
  };

  const [isSelected, setIsSelected] = useState(null);
  const handleDateClick = (_day, _date) => {
    setSelectedSchedule({ day: _day, date: _date });
  };

  const [selectedSchedule, setSelectedSchedule] = useState({
    day: "",
    date: "",
    time: "",
  });

  const handleChangeSelectedScheduleTime = (e, time) => {
    e.preventDefault();

    setSelectedSchedule((prevSchedule) => ({
      ...prevSchedule,
      time: time,
    }));
  };

  

  const schedule = [
    {
      day: "Sun",
      date: "16 Mar",
      time: [
        "09:00 - 09:15",
        "09:15 - 09:30",
        "09:30 - 09:45",
        "09:45 - 10:00",
        "10:00 - 10:15",
        "10:15 - 10:30",
      ],
    },
    {
      day: "Mon",
      date: "17 Mar",
      time: [
        "14:00 - 14:15",
        "14:15 - 14:30",
        "14:30 - 14:45",
        "14:45 - 15:00",
        "15:00 - 15:15",
        "15:15 - 15:30",
        "15:30 - 15:45",
        "15:45 - 16:00",
        "16:00 - 16:15",
        "16:15 - 16:30",
      ],
    },
    {
      day: "Tue",
      date: "18 Mar",
      time: [
        "10:30 - 10:45",
        "10:45 - 11:00",
        "11:00 - 11:15",
        "11:15 - 11:30",
        "11:30 - 11:45",
      ],
    },
    {
      day: "Wed",
      date: "20 Mar",
      time: [
        "15:30 - 15:45",
        "15:45 - 16:00",
        "16:00 - 16:15",
        "16:15 - 16:30",
        "16:30 - 16.45",
        "16:45 - 17:00",
      ],
    },
  ];

  const navigate = useNavigate();
  const bookProfessional = (selectedSchedule) => {
    navigate("/confirmAppointment", {
      state: { hospital, doctor, user, selectedSchedule },
    });
  };

  useEffect(() => {
    if (isSelected) {
      console.log("IsSelected: ", isSelected);
    }
  }, [isSelected]);

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
        <div className="mr-8 ml-auto font-medium">History</div>
      </nav>
      <div className="flex flex-row justify-around">
        <div className="w-6/10 ml-15 mt-10">
          <div className="flex ">
            <img
              className="size-25"
              src={`${process.env.PUBLIC_URL}/images/hospital.png`}
              alt=""
            />
            <div className="ml-10">
              <p className="text-base font-semibold text-gray-600">
                {hospital.name}
              </p>
              <p className="text-3xl font-bold mt-2">{doctor.name}</p>
            </div>
          </div>
          <hr className="mt-5 mb-4 h-px bg-gray-300 border-0 "></hr>
          <div>
            <h2 className="my-1.5 w-full text-lg font-semibold tracking-tight text-gray-900 ">
              Specialty
            </h2>
            <div>{doctor.specialty}</div>
            <hr className="mt-5 mb-4 h-px bg-gray-300 border-0 "></hr>
            <h2 className="my-1.5 w-full text-lg font-semibold tracking-tight text-gray-900 ">
              Qualifications & Certifications
            </h2>
            {doctor.qualification.map((qualification) => (
              <div>{qualification}</div>
            ))}
          </div>
        </div>
        <div className=" mt-[80px]  flex-col flex gap-8  ">
          <div className=" ">
            <div className="flex justify-center gap-7 flex-wrap">
              <div
                key={hospital.id}
                className="w-100  p-5 bg-white border border-gray-100 rounded-[5px] shadow-sm hover:bg-gray-50"
              >
                <h2 className="text-xl font-semibold mt-4 mb-5" id="heading">
                  Appointments
                </h2>
                <div className="flex gap-4 items-center w-85">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/mappin.png`}
                    className="w-5 h-6.5"
                    alt=""
                  />
                  <p className="text-sm text-gray-700">
                    {hospital.name}, {hospital.address}, {hospital.district}
                  </p>
                </div>
                <div className="mt-5">
                  <div id="accordion-collapse" data-accordion="collapse">
                    <h2 id="accordion-collapse-heading-1">
                      <button
                        type="button"
                        className="flex items-center justify-between w-full py-4 pr-3 font-medium rtl:text-right text-md rounded-md  gap-3"
                        data-accordion-target="#accordion-collapse-body-1"
                        aria-expanded={isDatesOpen}
                        aria-controls="accordion-collapse-body-1"
                        onClick={toggleAccordion}
                      >
                        <span>Available Dates</span>
                        <svg
                          data-accordion-icon
                          className={`w-3 h-3 rotate-${
                            isDatesOpen ? "0" : "180"
                          } shrink-0`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5 5 1 1 5"
                          />
                        </svg>
                      </button>
                    </h2>
                  </div>
                  <div
                    id="accordion-collapse-body-1"
                    className={isDatesOpen ? "" : "hidden"}
                    aria-labelledby="accordion-collapse-heading-1"
                  >
                    {schedule.map((scheduleItem, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`text-sky-700 border border-sky-700 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2 ${
                          selectedSchedule?.day === scheduleItem.day && selectedSchedule?.date === scheduleItem.date
                            ? "bg-sky-700 text-white"
                            : "hover:bg-sky-700 hover:text-white"
                        } focus:ring-2 focus:outline-none focus:ring-sky-700`}
                        onClick={() =>
                          handleDateClick(scheduleItem.day, scheduleItem.date)
                        }
                      >
                        {scheduleItem.day}, {scheduleItem.date}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="text-red-900 hover:text-white border border-red-900 hover:bg-red-900 focus:ring-2 focus:outline-none focus:ring-red-900 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2"
                    >
                      Others
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="relative inline-block text-left w-full mt-3 ">
                    <span className=" py-4 pr-3 font-medium rtl:text-right text-md ">
                      Available Time
                    </span>
                    <div className="mt-3">
                      <button
                        type="button"
                        className="inline-flex w-full justify-between text-md rounded-lg font-medium items-center border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5"
                        id="menu-button"
                        aria-expanded={isTimeOpen}
                        aria-haspopup={isTimeOpen}
                        onClick={toggleTime}
                      >
                        {selectedSchedule.time === ""
                          ? "Please Select"
                          : selectedSchedule.time}
                        <svg
                          data-accordion-icon
                          className={`w-3 h-3 rotate-${
                            isTimeOpen ? "0" : "180"
                          } shrink-0`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5 5 1 1 5"
                          />
                        </svg>
                      </button>
                    </div>

                    <div
                      className={isTimeOpen ? "" : "hidden"}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div
                        className="py-1 absolute right-0 z-10  w-full origin-top-right rounded-md bg-white ring-1 shadow-md ring-black/5 focus:outline-hidden"
                        role="none"
                      >
                        {schedule.map(
                          (scheduleItem) =>
                            scheduleItem.date === selectedSchedule.date &&
                            scheduleItem.time.map((time, index) => (
                              <a
                                key={index} // Add a unique key for each element
                                href="/"
                                className="block px-4 py-2 text-sm text-gray-700"
                                role="menuitem"
                                tabIndex="-1"
                                id={`menu-item-${index}`} // Optional: use index for unique IDs
                                onClick={(event) =>
                                  handleChangeSelectedScheduleTime(event, time)
                                }
                              >
                                {time}
                              </a>
                            ))
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => bookProfessional(selectedSchedule)}
                    className="inline-flex w-full mt-5 justify-center gap-x-1.5 rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-stone-300 ring-inset hover:bg-white hover:text-black"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
