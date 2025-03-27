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
    <div className="public-page flex flex-row">
      <ErrorBoundary>
        <div className="m-auto w-1/3 flex-col flex gap-3 mt-10 pt-10">
          <UlpoadStaffForm contract={contract} />
          <RemoveStaffForm contract={contract} />
        </div>
        <div className="medical-professionals">
          <StaffList contract={contract} />
          <EventListener contract={contract} />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default Home;
