import React from "react";

// Components //
import Logout from "../../Components/Logout/Main";
import Customers from "../../Components/Customer/Read";

// App //
function ListCustomers() {
  return (
    <div className="listCustomers">
      <div class="container-fluid">
        <Customers />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default ListCustomers;
