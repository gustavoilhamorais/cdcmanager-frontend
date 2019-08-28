import React from "react";

// Components //
import Logout from "../../Components/Logout/Main";
import Rental from "../../Components/Rental/Read";

// App //
function ListRental() {
  return (
    <div className="listRental">
      <div class="container-fluid">
        <Rental />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default ListRental;
