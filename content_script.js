console.log("Content script loaded.", window.location.href);

function injectScript(scriptFile, cssFile) {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL(scriptFile);
  script.type = "module";
  const target = document.head ?? document.documentElement ?? document;
  target.appendChild(script);

  if (cssFile) {
    const link = document.createElement("link");
    link.href = chrome.runtime.getURL(cssFile);
    link.rel = "stylesheet";
    target.appendChild(link);
  }
}

// Function to fetch and inject HTML from an HTML file
function injectHTML(filePath, scriptFile) {
  fetch(chrome.runtime.getURL(filePath))
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      const target =
        document.querySelector(".authentication-outlet") ?? document.body;
      const container = document.createElement("div");
      container.id = "rhetora-root";
      container.style.zIndex = "9999";
      container.style.overflow = "hidden";
      container.style.top = "60px";
      container.style.position = "fixed";
      container.style.left = "0";
      container.innerHTML = data;

      target.appendChild(container);

      const script = document.createElement("script");
      script.src = chrome.runtime.getURL(scriptFile);
      script.type = "module";
      container.appendChild(script);
    });
}

// inject the html and js for the automation buttons
injectHTML("automations.html", "automations.js");
