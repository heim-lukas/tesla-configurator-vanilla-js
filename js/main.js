const topBar = document.querySelector("#top-bar");
const exteriorColorSection = document.querySelector("#exterior-buttons");
const interiorColorSection = document.querySelector("#interior-buttons");
const exteriorImage = document.querySelector("#exterior-image");
const interiorImage = document.querySelector("#interior-image");
const wheelButtonsSection = document.querySelector("#wheel-buttons");
const performanceBtn = document.querySelector("#performance-btn");
const totalPriceElement = document.querySelector("#total-price");
const fullSelfDrivingCheckbox = document.querySelector(
  "#full-self-driving-checkbox"
);
const accessoriesCheckboxes = document.querySelectorAll(
  ".accessory-form-checkbox"
);

const basePrice = 52490;
let currentPrice = basePrice;

let selectedColor = "Stealth Grey";
const selectedOptions = {
  PerformanceWheels: false,
  PerformancePackage: false,
  FullSelfDriving: false,
  Accessories: {
    "Center Console Trays": false,
    Sunshade: false,
    "All-Weather Interior Liners": false,
  },
};

const pricing = {
  PerformanceWheels: 2500,
  PerformancePackage: 5000,
  FullSelfDriving: 8500,
  Accessories: {
    "Center Console Trays": 35,
    Sunshade: 105,
    "All-Weather Interior Liners": 225,
  },
};

// Update total price in the UI
const updateTotalPrice = () => {
  // Reset the current price to base price
  currentPrice = basePrice;

  // Performance Wheels Option
  if (selectedOptions["PerformanceWheels"]) {
    currentPrice += pricing.PerformanceWheels;
  }

  // Performance Package Option
  if (selectedOptions["PerformancePackage"]) {
    currentPrice += pricing.PerformancePackage;
  }

  // Full Self-Driving Option
  if (selectedOptions["FullSelfDriving"]) {
    currentPrice += pricing.FullSelfDriving;
  }

  // Accessories Options
  Object.entries(selectedOptions.Accessories).forEach(
    ([accessory, isSelected]) => {
      if (isSelected) {
        currentPrice += pricing.Accessories[accessory];
      }
    }
  );

  // Update the total price in the UI
  totalPriceElement.textContent = `$${currentPrice.toLocaleString()}`;
};

// Handle Top Bar on scroll
const handleScroll = () => {
  const atTop = window.scrollY === 0;
  topBar.classList.toggle("visible-bar", atTop);
  topBar.classList.toggle("hidden-bar", !atTop);
};

// Image Mapping
const exteriorImages = {
  "Stealth Grey": "./images/model-y-stealth-grey.jpg",
  "Pearl White": "./images/model-y-pearl-white.jpg",
  "Deep Blue": "./images/model-y-deep-blue-metallic.jpg",
  "Solid Black": "./images/model-y-solid-black.jpg",
  "Ultra Red": "./images/model-y-ultra-red.jpg",
  Quicksilver: "./images/model-y-quicksilver.jpg",
};

const interiorImages = {
  Dark: "./images/model-y-interior-dark.jpg",
  Light: "./images/model-y-interior-light.jpg",
};

// Handle Color Selection
const handleColorButtonClick = (event) => {
  let button;

  if (event.target.tagName === "IMG") {
    button = event.target.closest("button");
  } else if (event.target.tagName === "BUTTON") {
    button = event.target;
  }

  if (button) {
    const buttons = event.currentTarget.querySelectorAll("button");
    buttons.forEach((btn) => btn.classList.remove("btn-selected"));
    button.classList.add("btn-selected");

    // Change exterior image
    if (event.currentTarget === exteriorColorSection) {
      selectedColor = button.querySelector("img").alt;
      updateExteriorImage();
    }

    // Change interior image
    if (event.currentTarget === interiorColorSection) {
      const color = button.querySelector("img").alt;
      interiorImage.src = interiorImages[color];
    }
  }
};

// Update Exterior Image based on color and wheels
const updateExteriorImage = () => {
  const performanceSuffix = selectedOptions["PerformanceWheels"]
    ? "-performance"
    : "";

  const colorKey =
    selectedColor in exteriorImages ? selectedColor : "Stealth Grey";

  exteriorImage.src = exteriorImages[colorKey].replace(
    ".jpg",
    `${performanceSuffix}.jpg`
  );
};

// Handle Wheel Selection
const handleWheelButtonClick = (event) => {
  if (event.target.tagName === "BUTTON") {
    const buttons = document.querySelectorAll("#wheel-buttons button");

    buttons.forEach((btn) => btn.classList.remove("bg-gray-700", "text-white"));

    // Add selected styles to clicked button
    event.target.classList.add("bg-gray-700", "text-white");

    selectedOptions["PerformanceWheels"] =
      event.target.textContent.includes("Performance");

    updateExteriorImage();
    updateTotalPrice();
  }
};

// Performance Package Selection
const handlePerformanceBtnClick = () => {
  const isSelected = performanceBtn.classList.toggle("bg-gray-700");
  performanceBtn.classList.toggle("text-white");

  // Update selected options
  selectedOptions["PerformancePackage"] = isSelected;

  updateTotalPrice();
};

// Full Self-Driving Selection
const handleFullSelfDrivingCheckboxChange = () => {
  selectedOptions["FullSelfDriving"] = fullSelfDrivingCheckbox.checked;
  updateTotalPrice();
};

// Accessory Selection
const handleAccessorySelection = (event) => {
  const accessoryLabel = event.target
    .closest("label")
    .querySelector("span")
    .textContent.trim();
  selectedOptions.Accessories[accessoryLabel] = event.target.checked;
  updateTotalPrice();
};

// Event Listeners
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener("click", handleColorButtonClick);
interiorColorSection.addEventListener("click", handleColorButtonClick);
wheelButtonsSection.addEventListener("click", handleWheelButtonClick);
performanceBtn.addEventListener("click", handlePerformanceBtnClick);
fullSelfDrivingCheckbox.addEventListener(
  "change",
  handleFullSelfDrivingCheckboxChange
);
// Handle accessory checkboxes listeners
accessoriesCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", handleAccessorySelection);
});
