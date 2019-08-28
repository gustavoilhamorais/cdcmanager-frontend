import React from "react";

// Components //
import Logout from "../../components/Logout/Main";
import CreateRentals from "../../components/Rental/Create";

// App //
function CreateRental() {
  return (
    <div className="createRental">
      <div className="container-fluid">
        <CreateRentals />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default CreateRental;
