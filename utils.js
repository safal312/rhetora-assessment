export const injectScript = (scriptFile, cssFile) => {
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
};
