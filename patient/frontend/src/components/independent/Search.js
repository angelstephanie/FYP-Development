import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import contracts from "../../smartcontract/contracts";

function Search() {
  const [hospitals, setHospitals] = useState([
    {
      id: "",
      name: "",
      type: "",
      district: "",
      address: "",
    },
  ]);

  const location = useLocation();
  const user = location.state.user;

  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleBookAppointment = (hospital) => {
    navigate("/selectAppointment", { state: { hospital, user } });
  };

  const navigateUserToDashboard = () => {
    navigate("/dashboard", { state: { user } });
  };

  const getHospitalDetails = async (e) => {
    const details = [];

    for (const contract of contracts) {
      try {
        const _hospitalName = await contract.methods.getHospitalName().call();
        const _hospitalType = await contract.methods.getHospitalType().call();
        const _hospitalDistrict = await contract.methods
          .getHospitalDistrict()
          .call();
        const _hospitalAddress = await contract.methods
          .getHospitalAddress()
          .call();

        details.push({
          id: details.length + 1, // Incremental ID
          name: _hospitalName,
          type: _hospitalType,
          district: _hospitalDistrict,
          address: _hospitalAddress,
        });
      } catch (error) {
        console.error(`Error fetching details from contract: ${error}`);
      }
    }
    setHospitals(details);
  };

  useEffect(() => {
    getHospitalDetails();
  }, []);

  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
  const [districtFilter, setDistrictFilter] = useState("");
  const [hospitalTypeFilter, setHospitalTypeFilter] = useState("");
  const [hospitalNameFilter, setHospitalNameFilter] = useState("");
  const [isDistrictMenuOpen, setDistrictMenuOpen] = useState(false);
  const [isTypeMenuOpen, setTypeMenuOpen] = useState(false);

  const handleFilter = () => {
    const filtered = hospitals.filter((hospital) => {
      return (
        (districtFilter ? hospital.district === districtFilter : true) &&
        (hospitalTypeFilter ? hospital.type === hospitalTypeFilter : true) &&
        (hospitalNameFilter
          ? hospital.name
              .toLowerCase()
              .includes(hospitalNameFilter.toLowerCase())
          : true)
      );
    });
    setFilteredHospitals(filtered);
  };

  return (
    <div className="">
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
          onClick={() => navigateUserToDashboard()}
        >
          {" "}
          User History
        </div>
      </nav>
      <div className="mb-[200px] mx-auto w-4/5 flex-col flex gap-8  ">
        <div className="flex justify-center">
          <h2 className="text-2xl font-medium my-12" id="heading">
            Booking System
          </h2>
        </div>
        {/* <div>
          <form className="flex flex-col">
            <div className="flex flex-col">
              <div className="flex gap-5 justify-center">
                <div className="filter relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                      id="product-insert-menu"
                      aria-expanded={isClicked}
                      aria-haspopup={isClicked}
                      onClick={() => setIsClicked(!isClicked)}
                    >
                      Area
                      <svg
                        className="-mr-1 size-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                          cliprule-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {isClicked && (
                    <div
                      className="absolute right-[45%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div className="py-1" role="none">
                        <a
                          href="/search"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="product-insert-item-0"
                        >
                          Area 1
                        </a>
                        <a
                          href="/search"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="product-insert-item-1"
                        >
                          Area 2
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  id="name-input"
                  aria-describedby="helper-text-explanation"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] p-2.5"
                  required
                />
                <button className="text-cyan-500 hover:text-white border border-cyan-500 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center  w-fit">
                  search
                </button>
              </div>
            </div>
          </form>
        </div> */}

        {/* <div className="flex justify-center gap-7 flex-wrap mb-5">
          <input
            type="text"
            placeholder="Search by Hospital Name"
            value={hospitalNameFilter}
            onChange={(e) => setHospitalNameFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option
              value=""
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
            >
              Select District
            </option>
            <option value="District 1">District 1</option>
            <option value="District 2">District 2</option>
          </select>
          <select
            value={hospitalTypeFilter}
            onChange={(e) => setHospitalTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Hospital Type</option>
            <option value="General">General</option>
            <option value="Specialized">Specialized</option>
          </select>
          <button
            onClick={handleFilter}
            className="bg-sky-700 text-white rounded-md px-4 py-2"
          >
            Apply Filters
          </button>
        </div>
        <ul>
          {filteredHospitals.map((hospital, index) => (
            <li key={index}>
              {hospital.name} - {hospital.type} - {hospital.district}
            </li>
          ))}
        </ul> */}

        <div className="p-5">
          <div className="flex justify-center gap-7 mb-5">
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                  onClick={() => setDistrictMenuOpen(!isDistrictMenuOpen)}
                >
                  {districtFilter || "Select District"}
                  <svg
                    className="-mr-1 size-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {isDistrictMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
                  <div className="py-1" role="none">
                    <button
                      onClick={() => {
                        setDistrictFilter("Sha Tin");
                        setDistrictMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                    >
                      Sha Tin
                    </button>
                    <button
                      onClick={() => {
                        setDistrictFilter("Mid-Levels");
                        setDistrictMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                    >
                      Mid-Levels
                    </button>
                    <button
                      onClick={() => {
                        setDistrictFilter("Yau Tsim Mong");
                        setDistrictMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                    >
                      Yau Tsim Mong
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                  onClick={() => setTypeMenuOpen(!isTypeMenuOpen)}
                >
                  {hospitalTypeFilter || "Select Hospital Type"}
                  <svg
                    className="-mr-1 size-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {isTypeMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
                  <div className="py-1" role="none">
                    <button
                      onClick={() => {
                        setHospitalTypeFilter("Public");
                        setTypeMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                    >
                      Public
                    </button>
                    <button
                      onClick={() => {
                        setHospitalTypeFilter("Private");
                        setTypeMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                    >
                      Private
                    </button>
                  </div>
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Search by Hospital Name"
              value={hospitalNameFilter}
              onChange={(e) => setHospitalNameFilter(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-72"
            />
            <button
              onClick={handleFilter}
              className="text-cyan-500 hover:text-white border border-cyan-500 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center  w-fit"
            >
              Apply Filters
            </button>
          </div>

          {/* <div className="flex justify-center gap-7 flex-wrap">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="w-80 p-5 bg-white border border-gray-100 rounded-[5px] shadow-sm hover:bg-gray-50"
              >
                <div className="flex gap-4">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/hospital.png`}
                    className="size-15"
                    alt=""
                  />
                  <div>
                    <p className="text-sm text-gray-700">{hospital.type}</p>
                    <p className="font-semibold">{hospital.name}</p>
                    <p className="text-xs text-gray-700">{hospital.district}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <hr className="mt-4 mb-2 h-px bg-gray-300 border-0" />
                  <p className="text-gray-700 text-sm">
                    <span className="text-black">{hospital.address} </span>
                  </p>
                  <button
                    onClick={() => handleBookAppointment(hospital)} // Define this function as needed
                    className="inline-flex w-full mt-3 justify-center rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-stone-300 ring-inset hover:bg-white hover:text-black"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div> */}
        </div>

        <div className="flex justify-center gap-7 flex-wrap">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="w-80  p-5 bg-white border border-gray-100 rounded-[5px] shadow-sm hover:bg-gray-50"
            >
              <div className="flex gap-4">
                <img
                  src={`${process.env.PUBLIC_URL}/images/hospital.png`}
                  className="size-15"
                  alt=""
                />
                <div className="">
                  <p className="text-sm text-gray-700">{hospital.type}</p>
                  <p className="font-semibold">{hospital.name}</p>
                  <p className="text-xs text-gray-700">{hospital.district}</p>
                </div>
              </div>
              <div className="mt-2">
                <hr className="mt-4 mb-2 h-px bg-gray-300 border-0 "></hr>
                <p className="text-gray-700 text-sm">
                  <span className="text-black">{hospital.address} </span>
                </p>
                <button
                  onClick={() => handleBookAppointment(hospital)}
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
