import React from "react";

// Components //
import Logout from "../../Components/Logout/Main";
import CreateMerchans from "../../Components/Merchan/Create";

// App //
function CreateMerchan() {
  return (
    <div className="createMerchan">
      <div className="container-fluid">
        <CreateMerchans />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default CreateMerchan;
