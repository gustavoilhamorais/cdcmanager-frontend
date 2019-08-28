import React from "react";

// Components //
import Logout from "../../Components/Logout/Main";
import ReadCategories from "../../Components/Category/Read";

// App //
function ReadCategory() {
  return (
    <div className="listCategories">
      <div className="container-fluid">
        <ReadCategories />
      </div>

      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up" />
      </a>
      <Logout />
    </div>
  );
}

export default ReadCategory;
