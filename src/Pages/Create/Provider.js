import React from "react";

// Components //
import Logout from "../../Components/Logout/Main";
import CreateProviders from "../../Components/Providr/Create";

// App //
function CreateProvider() {
  return (
    <div className="createCategory">
      <div className="container-fluid">
        <CreateProviders />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default CreateProvider;
