import React from "react";

// Components //
import Logout from "../../Components/Logout/Main";
import CreateCategories from "../../Components/Category/Create";

// App //
function CreateCategory() {
  return (
    <div className="createCategory">
      <div className="container-fluid">
        <CreateCategories />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default CreateCategory;
