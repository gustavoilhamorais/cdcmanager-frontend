import React from "react";

// Components //
import Logout from "../../components/Logout/Main";
import UpdateProviders from "../../components/Providr/Update"

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
