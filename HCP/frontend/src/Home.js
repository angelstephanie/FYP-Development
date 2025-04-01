import React from "react";
import UlpoadStaffForm from "./components/uploadStaffForm";
import RemoveStaffForm from "./components/removeStaffForm";
import StaffList from "./components/staffList";
import myContract from "./smartcontract/myContract";
import ErrorBoundary from "./components/errorBoundary";
import EventListener from "./components/eventListener";

function Home() {
  const contract = myContract;
  return (
    <div className=" flex flex-col my-10">
      <nav className='w-full my-3 flex'>
        <img className='ml-15 w-20' src="../images/ehealth-logo.svg" alt='/'></img>
        <h1 className='ml-[20px] mt-2 text-sky-700 font-medium text-2xl'>Electronic Health Record Sharing System</h1>
        <div className='mr-8 ml-auto font-medium'>History</div>
      </nav>
      <ErrorBoundary>
        <div className="m-auto w-2/3 flex-col flex gap-3 mt-10 pt-10">
          <UlpoadStaffForm contract={contract} />
          <RemoveStaffForm contract={contract} />
        </div>
        <div className="medical-professionals  w-2/3 m-auto">
          <StaffList contract={contract} />
          <EventListener contract={contract} />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default Home;
