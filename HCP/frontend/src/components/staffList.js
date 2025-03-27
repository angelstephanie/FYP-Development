import React, { useState } from "react";

function StaffList({ contract }) {
  const [searchData, setSearchData] = useState({
    id: "",
  });

  const [staffList, setStaffList] = useState([
    {
      id: "",
      name: "",
      specialty: "",
      qualification: "",
      schedule: "",
    },
  ]);

  const getStaff = async (e) => {
    e.preventDefault();

    console.log("SearchData: ", searchData);

    if (!searchData.id || searchData.id.length === 0) {
      console.log("Fetching all medical professionals...");

      const allStaff = await contract.methods
        .getAllMedicalProfessionals()
        .call();

      setStaffList(
        allStaff.map((staff) => ({
          id: staff.staffId,
          name: staff.staffName,
          specialty: staff.specialty,
          qualification: staff.qualifications,
          schedule: staff.schedule,
        }))
      );

      console.log("All staff: ", setStaffList);
    } else {
      const { id } = searchData;

      console.log("Waiting on transaction success...");

      const staff = await contract.methods
        .getMedicalProfessionalById(id)
        .call();

      console.log("Successful transaction!");

      setStaffList([
        {
          id: staff.staffId,
          name: staff.staffName,
          specialty: staff.specialty,
          qualification: staff.qualifications,
          schedule: staff.schedule,
        },
      ]);

      console.log("Matched Staff: ", staffList);
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchData({ id: value });
  };

  return (
    <div>
      <form onSubmit={getStaff}>
        <label
          htmlFor="search-input"
          className="blocktext-gray-900 text-2xl font-medium mt-10 pt-10"
        >
          List of Registered Medical Professionals
        </label>
        <br />
        <label
          htmlFor="search-input"
          className="blocktext-gray-900 font-medium"
        >
          Search by Staff ID
        </label>
        <input
          type="text"
          id="search-input"
          name="id"
          value={searchData.id}
          onChange={handleSearchChange}
          aria-describedby="helper-text-explanation"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter the staff ID"
        />
        <button
          type="submit"
          className="font-semibold text-white bg-red-900 rounded-[10px] pt-[7px] pb-[7px] mt-4 mb-10"
        >
          Get List
        </button>
      </form>
      <div className="container mt-4">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  padding: "10px",
                }}
                className="border border-gray-300"
              >
                ID
              </th>
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
                Specialty
              </th>
              <th
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  padding: "10px",
                }}
                className="border border-gray-300"
              >
                Qualifications
              </th>
              <th
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  padding: "10px",
                }}
                className="border border-gray-300"
              >
                Schedule
              </th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id}>
                <td
                  className="border border-gray-300"
                  style={{ fontSize: "0.875rem", padding: "10px" }}
                >
                  {staff.id}
                </td>
                <td
                  className="border border-gray-300"
                  style={{ fontSize: "0.875rem", padding: "10px" }}
                >
                  {staff.name}
                </td>
                <td
                  className="border border-gray-300"
                  style={{ fontSize: "0.875rem", padding: "10px" }}
                >
                  {staff.specialty}
                </td>
                <td
                  className="border border-gray-300"
                  style={{ fontSize: "0.875rem", padding: "10px" }}
                >
                  {staff.qualification}
                </td>
                <td
                  className="border border-gray-300"
                  style={{ fontSize: "0.875rem", padding: "10px" }}
                >
                  {staff.schedule}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffList;
