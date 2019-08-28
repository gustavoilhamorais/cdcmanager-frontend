import React from "react";

// Components //
import Logout from "../../components/Logout/Main";
import CreateCustomers from "../../components/Customer/Create";

// App //
function CreateCustomer() {
  return (
    <div className="createCustomer">
      <div className="container-fluid">
        <CreateCustomers />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default CreateCustomer;
