console.log("SCRIPT LOADED");

// lisening for click events
window.onclick = function (event) {
  if (event.target.matches("#toggle-dropdown")) {
    // show dropdown options
    var div = document.getElementById("dropdownContent");
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

  // Get all divs in the feed containing the user details of each post
  const userDetailsDivs = document.querySelectorAll(
    ".update-components-actor__meta"
  );

  for (let i = 0; i < userDetailsDivs.length; i++) {
    const userDetailsDiv = userDetailsDivs[i];

    // extracting the name and job title
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

function waitForElm(selector, base = document.body) {
  return new Promise(resolve => {
      if (base != null && base.querySelector(selector)) {
          return resolve(base.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (base != null && base.querySelector(selector)) {
              observer.disconnect();
              resolve(base.querySelector(selector));
          }
      });

      observer.observe(base, {
          childList: true,
          subtree: true
      });
  });
}

// This is where you will write your automation
function yourAutomation() {
  // there are two kinds of post reaction divs
  const post_likes_a = document.querySelectorAll(".social-details-social-counts__social-proof-text");
  const post_likes_b = document.querySelectorAll(".social-details-social-counts__reactions-count");

  const post_likes = [...post_likes_a, ...post_likes_b]

  if (post_likes.length === 0) {
    alert("No likes found");
    return;
  }

  // just open the first post reactors
  post_likes[0].click();

  // async function to get all reactors
  async function getReactors() {
    // first wait for the reactors body to load
    const reactors_body = await waitForElm('.social-details-reactors-tab-body div', document.body);
    
    // get the total reactors number from inside the modal
    let total_reactors = await waitForElm('.social-details-reactors-tab__icon-container', document.body);
    total_reactors = total_reactors.querySelectorAll('span')
    let total_reactors_int = parseInt(total_reactors[total_reactors.length-1].innerText.replaceAll(",", ""))
    
    // get reactors list
    const reactors_list = await waitForElm('ul', reactors_body);
    // console.log(total_reactors_int)
    let reactors_len = 0

    let all_reactors = "";

    // loop until all reactors are loaded
    while (reactors_len <= total_reactors_int) {
      let reactors = reactors_list.querySelectorAll("li")
      reactors_len = reactors.length

      // console.log(reactors_len)

      reactors.forEach((li) => {
        let title = li.querySelector(".artdeco-entity-lockup__title")
        let span = title.querySelector("span")
        
        let profile = "";
        if (span == null) {
          profile = title.innerText
        } else {
          profile = span.innerText
        }
        // console.log(profile)
        all_reactors += profile + "\n"
      });
      
      if (reactors_len >= total_reactors_int) break;
      
      // get last element from reactors and scroll to it
      // sometimes just scrolling is enough to load elements, other times you have to click on "Show More" button
      reactors[reactors.length-1].scrollIntoView()
      
      // try clicking on "Show More" button if available
      try {
        reactors_body.querySelector("button").click()
      } catch {
        console.log("no more reactors")
        break
      }

      // wait for 1000ms as buffer time between loops
      await new Promise(r => setTimeout(r, 1000));
    }

    alert(all_reactors)
  }

  getReactors()

}
