import React, { useState } from "react";
import web3 from "../smartcontract/web3";

function RemoveStaffForm({ contract }) {
  const [removeFormData, setRemoveFormData] = useState({
    id: "",
  });

  const removeStaff = async (e) => {
    e.preventDefault();
    const { id } = removeFormData;
    console.log("id to be removed: ", id);

    const accounts = await web3.eth.getAccounts();

    console.log("Waiting on transaction success...");

    await contract.methods.removeMedicalProfessional(id).send({
      from: accounts[0],
    });

    console.log("Successful transaction!");

    // Optionally reset form after submission
    setRemoveFormData({ id: "" });
  };

  const handleRemoveChange = (e) => {
    const { value } = e.target;
    setRemoveFormData({ id: value });
  };

  return (
    <form onSubmit={removeStaff}>
      <label
        htmlFor="remove-input"
        className="blocktext-gray-900 text-2xl font-medium mt-10 pt-10"
      >
        Remove Medical Professional
      </label>
      <br />
      <label htmlFor="remove-input" className="blocktext-gray-900 font-medium">
        Staff ID
      </label>
      <input
        type="text"
        id="remove-input"
        name="id"
        value={removeFormData.id}
        onChange={handleRemoveChange}
        aria-describedby="helper-text-explanation"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Enter the staff ID"
        required
      />
      <button
        type="submit"
        className="font-semibold text-white bg-red-900 rounded-[10px] pt-[7px] pb-[7px] mt-4 mb-10"
      >
        Remove
      </button>
    </form>
  );
}

export default RemoveStaffForm;
