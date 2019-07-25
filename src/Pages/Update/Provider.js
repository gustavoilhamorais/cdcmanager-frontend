import React from "react";

// Components //
import Logout from "../../Components/Logout/Main";
import UpdateProviders from "../../Components/Providr/Update"

// App //
function UpdateProvider() {
  return (
    <div className="updateProvider">
      <div className="container-fluid">
        <UpdateProviders />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default UpdateProvider;
