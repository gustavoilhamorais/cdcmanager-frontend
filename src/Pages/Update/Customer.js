import React from "react";

// Components //
import Logout from "../../Components/Logout/Main";
import UpdateCustomers from "../../Components/Customer/Update";

// App //
function UpdateCustomer() {
  return (
    <div className="updateCustomer">
      <div className="container-fluid">
        <UpdateCustomers />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default UpdateCustomer;
