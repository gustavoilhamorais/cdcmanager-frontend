import React from "react";

// Components //
import Logout from "../../Components/Logout/Main";
import UpdateSales from "../../Components/Sale/Update";

// App //
function UpdateSale() {
  return (
    <div className="updateSale">
      <div className="container-fluid">
        <UpdateSales />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default UpdateSale;
