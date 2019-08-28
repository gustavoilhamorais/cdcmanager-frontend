import React from "react";

// Components //
import Logout from "../../components/Logout/Main";
import CreateSales from "../../components/Sale/Create";

// App //
function CreateSale() {
  return (
    <div className="createSale">
      <div className="container-fluid">
        <CreateSales />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default CreateSale;
