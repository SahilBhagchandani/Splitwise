import React from "react";

const profilePage = () => {
  return (
    <div>
      <div class="container">
        <form>
          <h1>Your account</h1>
          <p>Your name</p>
          <p></p>
          <div>
            <p>Your email address</p>
          </div>

          <div>
            <p>Your Phone number</p>
          </div>
          <div>
            <p>Currency</p>
            <div class="dropdown">
              <button onclick="myFunction()" class="dropbtn">
                Dropdown
              </button>
              <div id="myDropdown" class="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default profilePage;
