import React from "react";

// Components //
import Logout from "../../components/Logout/Main";
import UpdateMerchans from "../../components/Merchan/Update";

// App //
function UpdateMerchan() {
  return (
    <div className="updateCustomer">
      <div className="container-fluid">
        <UpdateMerchans />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default UpdateMerchan;
