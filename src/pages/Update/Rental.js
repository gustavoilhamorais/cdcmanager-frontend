import React from "react";

// Components //
import Logout from "../../components/Logout/Main";
import UpdateRentals from "../../components/Rental/Update";

// App //
function UpdateRental() {
  return (
    <div className="updateCustomer">
      <div className="container-fluid">
        <UpdateRentals />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default UpdateRental;
