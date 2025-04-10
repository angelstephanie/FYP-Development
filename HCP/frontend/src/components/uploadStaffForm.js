import React, { useState } from "react";
import web3 from "../smartcontract/web3";

function UlpoadStaffForm({ contract }) {
  const [uploadFormData, setUploadFormData] = useState({
    id: "",
    name: "",
    specialty: "",
    qualification: "",
    schedule: "",
  });

  const insertNewStaff = async (e) => {
    e.preventDefault();

    console.log("Upload button clicked");

    const { id, name, specialty, qualification, schedule } = uploadFormData;

    console.log("id: ", id);
    console.log("name: ", name);
    console.log("specialty: ", specialty);
    console.log("qualification: ", qualification);
    console.log("schedule: ", schedule);

    const accounts = await web3.eth.getAccounts();

    console.log("Waiting on transaction success...");

    await contract.methods
      .addMedicalProfessional(
        id,
        name,
        ["specialty"],
        ["qualification"],
        schedule
      )
      .send({
        from: accounts[0],
      });

    console.log("Successful transaction!");

    // Optionally reset form after submission
    setUploadFormData({
      id: "",
      name: "",
      specialty: "",
      qualification: "",
      schedule: "",
    });
  };

  const handleUploadChange = (e) => {
    const { name, value } = e.target;
    setUploadFormData({ ...uploadFormData, [name]: value });
  };

  return (
    <form onSubmit={insertNewStaff} className="gap-3 flex flex-col">
      <label
        htmlFor="remove-input"
        className="blocktext-gray-900 text-2xl font-medium mt-10 pt-10"
      >
        Upload New Medical Professional
      </label>
      <br />
      <label
        htmlFor="staff-id-input"
        className="blocktext-gray-900 font-medium"
      >
        Staff ID
      </label>
      <input
        type="number"
        id="staff-id-input"
        name="id"
        value={uploadFormData.id}
        onChange={handleUploadChange}
        aria-describedby="helper-text-explanation"
        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Enter the staff ID"
        required
      />

      <label htmlFor="name-input" className="blocktext-gray-900 font-medium">
        Staff Name
      </label>
      <input
        type="text"
        id="name-input"
        name="name"
        value={uploadFormData.name}
        onChange={handleUploadChange}
        aria-describedby="helper-text-explanation"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Enter the name"
        required
      />

      <label
        htmlFor="specialty-input"
        className="blocktext-gray-900 font-medium"
      >
        Specialty
      </label>
      <input
        type="text"
        id="specialty-input"
        name="specialty"
        value={uploadFormData.specialty}
        onChange={handleUploadChange}
        aria-describedby="helper-text-explanation"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Enter the specialty"
        required
      />

      <label
        htmlFor="qualification-input"
        className="blocktext-gray-900 font-medium"
      >
        Qualifications
      </label>
      <input
        type="text"
        id="qualification-input"
        name="qualification"
        value={uploadFormData.qualification}
        onChange={handleUploadChange}
        aria-describedby="helper-text-explanation"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Enter the qualification"
        required
      />

      <label
        htmlFor="schedule-input"
        className="blocktext-gray-900 font-medium"
      >
        Schedule
      </label>
      <input
        type="text"
        id="schedule-input"
        name="schedule"
        value={uploadFormData.schedule}
        onChange={handleUploadChange}
        aria-describedby="helper-text-explanation"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Enter the schedule"
        required
      />

      <button
        type="submit"
        className="font-semibold text-white bg-lime-900 rounded-[10px] pt-[7px] pb-[7px] mt-4"
      >
        Upload
      </button>
    </form>
  );
}

export default UlpoadStaffForm;
