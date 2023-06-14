const htmlTextarea = document.getElementById("html-input");
const cssTextarea = document.getElementById("css-input");
const jsTextarea = document.getElementById("js-input");
const outputFrame = document.getElementById("output");
const buttons = document.querySelectorAll("nav button");

let htmlCode = htmlTextarea.value;
let cssCode = cssTextarea.value;
let jsCode = jsTextarea.value;

function updateOutput() {
  localStorage.setItem("htmlCode", htmlTextarea.value);
  localStorage.setItem("cssCode", cssTextarea.value);
  localStorage.setItem("jsCode", jsTextarea.value);

  outputFrame.contentDocument.body.innerHTML = htmlCode;
  outputFrame.contentDocument.head.innerHTML = `<style>${cssCode}</style>`;

  const scriptElement = document.createElement("script");
  scriptElement.innerHTML = jsCode;
  outputFrame.contentDocument.head.appendChild(scriptElement);
}

function retrieveFromLocalStorage() {
  const htmlTextarea = document.getElementById("html-input");
  const cssTextarea = document.getElementById("css-input");
  const jsTextarea = document.getElementById("js-input");

  const savedHtmlCode = localStorage.getItem("htmlCode");
  const savedCssCode = localStorage.getItem("cssCode");
  const savedJsCode = localStorage.getItem("jsCode");

  htmlTextarea.value = savedHtmlCode || "";
  cssTextarea.value = savedCssCode || "";
  jsTextarea.value = savedJsCode || "";
}

retrieveFromLocalStorage();

function handleButtonClick(event) {
  const clickedButton = event.target;
  const language = clickedButton.dataset.language;

  // Hide all textareas
  htmlTextarea.classList.add("hidden");
  cssTextarea.classList.add("hidden");
  jsTextarea.classList.add("hidden");

  // Show the selected textarea
  if (language === "html") {
    htmlTextarea.classList.remove("hidden");
  } else if (language === "css") {
    cssTextarea.classList.remove("hidden");
  } else if (language === "js") {
    jsTextarea.classList.remove("hidden");
  }

  // Update the active button
  buttons.forEach((button) => button.classList.remove("active"));
  clickedButton.classList.add("active");

  // Update the output
  htmlCode = htmlTextarea.value;
  cssCode = cssTextarea.value;
  jsCode = jsTextarea.value;
  updateOutput();
}

// Add click event listeners to the buttons
buttons.forEach((button) =>
  button.addEventListener("click", handleButtonClick)
);

// Add input event listeners to the textareas
htmlTextarea.addEventListener("input", () => {
  htmlCode = htmlTextarea.value;
  updateOutput();
});

cssTextarea.addEventListener("input", () => {
  cssCode = cssTextarea.value;
  updateOutput();
});

jsTextarea.addEventListener("input", () => {
  jsCode = jsTextarea.value;
  updateOutput();
});

// Update the output initially
updateOutput();

const copyBtn = document.getElementById("copy-btn");
const htmlInput = document.getElementById("html-input");
const cssInput = document.getElementById("css-input");
const jsInput = document.getElementById("js-input");

copyBtn.addEventListener("click", function () {
  if (document.querySelector(".active").dataset.language === "html") {
    htmlInput.select();
    document.execCommand("copy");
    alert("HTML code copied to clipboard!");
  } else if (document.querySelector(".active").dataset.language === "css") {
    cssInput.select();
    document.execCommand("copy");
    alert("CSS code copied to clipboard!");
  } else if (document.querySelector(".active").dataset.language === "js") {
    jsInput.select();
    document.execCommand("copy");
    alert("JavaScript code copied to clipboard!");
  }
});

const clearBtn = document.getElementById("clear-btn");

clearBtn.addEventListener("click", function () {
  htmlInput.value = "";
  cssInput.value = "";
  jsInput.value = "";
});
