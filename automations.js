console.log("SCRIPT LOADED");

window.onclick = function (event) {
  if (!event.target.matches(".dropdown button")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }

  if (event.target.matches("#toggle-dropdown")) {
    var div = document.getElementById("dropdownContent");
    console.log(div.style.display);
    div.style.display = div.style.display !== "flex" ? "flex" : "none";
  }

  // This is the example automation
  if (event.target.matches(".example")) {
    exampleAutomations();
  }

  // This is where you will execute your automation
  if (event.target.matches(".execute-test")) {
    yourAutomation();
  }
};

function exampleAutomations() {
  let users = [];
  const userDetailsDivs = document.querySelectorAll(
    ".update-components-actor__meta"
  );

  for (let i = 0; i < userDetailsDivs.length; i++) {
    const userDetailsDiv = userDetailsDivs[i];
    const user = {
      name: userDetailsDiv.querySelector(
        '.update-components-actor__name span[aria-hidden="true"]'
      ).innerText,
      jobTitle: userDetailsDiv.querySelector(
        '.update-components-actor__description span[aria-hidden="true"]'
      ).innerText,
    };
    users.push(user);
  }
  const usersString = users
    .map((user) => `Name: ${user.name} \nJob: ${user.jobTitle}`)
    .join("\n\n");

  alert(usersString);
}

// This is where you will write your automation
function yourAutomation() {

}