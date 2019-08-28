import React from "react";

// Components //
import Logout from "../../components/Logout/Main";
import UpdateCategories from "../../components/Category/Update";

// App //
function UpdateCategory() {
  return (
    <div className="updateCategory">
      <div className="container-fluid">
        <UpdateCategories />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default UpdateCategory;
