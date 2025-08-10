let windowZIndex = 10; // Keep track of a window's z-index
let iconZIndex = 1; // Keep track of an icon's z-index
const openWindows = new Map(); // Use a Map to track open windows by type

// Function to display custom message box
function showMessage(message) {
  document.getElementById("message-box-content").textContent = message;
  document.getElementById("message-box-overlay").style.display = "flex";
}

function hideMessage() {
  document.getElementById("message-box-overlay").style.display = "none";
}

// Function to create and open a new window
function openWindow(type) {
  // If a window of this type is already open, focus it and return
  if (openWindows.has(type)) {
    const windowElement = openWindows.get(type);
    makeWindowActive(windowElement);
    return;
  }

  const template = document.getElementById("window-template");
  const clone = document.importNode(template.content, true);
  const windowElement = clone.querySelector(".window");
  const windowTitle = windowElement.querySelector(".window-title span");
  const windowTitleIcon = windowElement.querySelector(".window-title-icon");
  const windowContent = windowElement.querySelector(".window-content");

  // Assign a type to the window for tracking
  windowElement.dataset.windowType = type;

  // Set initial position randomly to avoid overlapping and fix "glued to right" bug
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const menuBarHeight = 28; // Approximate height of the menu bar

  const initialWidth = 500;
  const initialHeight = 350;

  let posX = Math.random() * (viewportWidth - initialWidth - 40) + 20; // Ensure some margin
  let posY =
    Math.random() * (viewportHeight - initialHeight - menuBarHeight - 40) +
    menuBarHeight +
    20; // Ensure below menu bar

  // Clamp positions to ensure they are within the visible area
  posX = Math.max(20, Math.min(posX, viewportWidth - initialWidth - 20));
  posY = Math.max(
    menuBarHeight + 20,
    Math.min(posY, viewportHeight - initialHeight - 20)
  );

  windowElement.style.width = `${initialWidth}px`;
  windowElement.style.height = `${initialHeight}px`;
  windowElement.style.left = `${posX}px`;
  windowElement.style.top = `${posY}px`;

  const iconMap = {
    "my-computer": {
      src: "_assets/icons/my-computer.png",
      alt: "My Computer",
    },
    about: { src: "_assets/icons/profile.png", alt: "About Me" },
    projects: { src: "_assets/icons/projects.png", alt: "Projects" },
    contact: { src: "_assets/icons/contact-me.png", alt: "Contact Me" },
  };

  if (iconMap[type]) {
    windowTitleIcon.src = iconMap[type].src;
    windowTitleIcon.alt = iconMap[type].alt;
  } else {
    windowTitleIcon.style.display = "none";
  }

  switch (type) {
    case "about":
      windowTitle.textContent = "About Me";
      windowContent.appendChild(
        document.getElementById("about-me-content").content.cloneNode(true)
      );
      break;
    case "projects":
      windowTitle.textContent = "My Projects";
      windowContent.appendChild(
        document.getElementById("projects-content").content.cloneNode(true)
      );
      break;
    case "contact":
      windowTitle.textContent = "Contact Me";
      windowContent.appendChild(
        document.getElementById("contact-me-content").content.cloneNode(true)
      );
      break;
    case "my-computer":
      windowTitle.textContent = "My Computer";
      windowContent.innerHTML = `
                        <h2>My Computer</h2>
                        <p>Welcome to My Computer! This section would typically display your drives and connected devices. For this demo, it's just a placeholder.</p>
                        <p>Operating System: Mac OS 9.2.2 (Simulated)</p>
                        <p>Processor: PowerPC G4 (Simulated)</p>
                        <button class="macos9-button" onclick="showMessage('System information unavailable.');">System Info</button>
                    `;
      break;
    case "help":
      windowTitle.textContent = "Help Center";
      windowContent.appendChild(
        document.getElementById("help-content").content.cloneNode(true)
      );
      break;
    case "project-details":
      windowTitle.textContent = "Project Details";
      windowContent.appendChild(
        document
          .getElementById("project-details-content")
          .content.cloneNode(true)
      );
      break;
    default:
      // Generic window
      windowTitle.textContent = "New Window";
      windowContent.innerHTML = `
                        <h2>Untitled Window</h2>
                        <p>This is a generic new window created from the "File > New Window" menu option.</p>
                        <p>You can drag, resize, and close this window.</p>
                        <button class="macos9-button" onclick="showMessage('You clicked a generic button!');">Click Me</button>
                    `;
  }

  document.body.appendChild(windowElement);
  makeWindowDraggable(windowElement);
  makeWindowActive(windowElement); // Make the newly opened window active

  // Add the new window to the tracking map
  openWindows.set(type, windowElement);

  // Event listeners for window controls
  windowElement.querySelector(".close-button").addEventListener("click", () => {
    windowElement.remove();
    openWindows.delete(type);
  });
  windowElement
    .querySelector(".minimize-button")
    .addEventListener("click", () => {
      // In a real OS, this would hide to a dock. Here, we'll just hide it.
      windowElement.style.display = "none";
      openWindows.delete(type);
    });
  windowElement
    .querySelector(".maximize-button")
    .addEventListener("click", () => {
      // Simple toggle for maximize/restore
      if (windowElement.classList.contains("maximized")) {
        windowElement.style.width = windowElement._originalWidth || "500px";
        windowElement.style.height = windowElement._originalHeight || "350px";
        windowElement.style.left = windowElement._originalLeft || "50px";
        windowElement.style.top = windowElement._originalTop || "50px";
        windowElement.classList.remove("maximized");
      } else {
        windowElement._originalWidth = windowElement.style.width;
        windowElement._originalHeight = windowElement.style.height;
        windowElement._originalLeft = windowElement.style.left;
        windowElement._originalTop = windowElement.style.top;

        windowElement.style.width = "calc(100vw - 4px)";
        windowElement.style.height =
          "calc(100vh - 4px - 28px)"; /* Account for menu bar */
        windowElement.style.left = "0px";
        windowElement.style.top = "28px"; /* Below menu bar */
        windowElement.classList.add("maximized");
      }
    });

  // Make window active on click
  windowElement.addEventListener("mousedown", () =>
    makeWindowActive(windowElement)
  );
}

// Function to handle window dragging
function makeWindowDraggable(windowElement) {
  const titlebar = windowElement.querySelector(".window-titlebar");
  let isDragging = false;
  let offsetX, offsetY;

  titlebar.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - windowElement.getBoundingClientRect().left;
    offsetY = e.clientY - windowElement.getBoundingClientRect().top;
    titlebar.style.cursor = "grabbing";
    makeWindowActive(windowElement); // Make active when dragging starts
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    windowElement.style.left = `${e.clientX - offsetX}px`;
    windowElement.style.top = `${e.clientY - offsetY}px`;

    // Boundary checks
    const bodyRect = document.body.getBoundingClientRect();
    const windowRect = windowElement.getBoundingClientRect();

    if (windowRect.left < bodyRect.left)
      windowElement.style.left = `${bodyRect.left}px`;
    if (windowRect.top < bodyRect.top + 28)
      windowElement.style.top = `${bodyRect.top + 28}px`; // Below menu bar
    if (windowRect.right > bodyRect.right)
      windowElement.style.left = `${bodyRect.right - windowRect.width}px`;
    if (windowRect.bottom > bodyRect.bottom)
      windowElement.style.top = `${bodyRect.bottom - windowRect.height}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    titlebar.style.cursor = "grab";
  });
}

// Function to handle icon dragging
function makeIconDraggable(iconElement) {
  let isDragging = false;
  let hasDragged = false;
  let offsetX, offsetY;

  iconElement.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return; // Only drag with left mouse button
    isDragging = true;
    hasDragged = false;
    offsetX = e.clientX - iconElement.getBoundingClientRect().left;
    offsetY = e.clientY - iconElement.getBoundingClientRect().top;

    // Set z-index to bring icon to front
    iconElement.style.zIndex = ++iconZIndex;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    hasDragged = true; // Flag that a drag has occurred

    // Update cursor and prevent text selection only when dragging starts
    if (iconElement.style.cursor !== "grabbing") {
      iconElement.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    }

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Boundary checks
    const bodyRect = document.body.getBoundingClientRect();
    const iconRect = iconElement.getBoundingClientRect();
    const menuBarHeight = 28;

    if (newX < 0) newX = 0;
    if (newY < menuBarHeight) newY = menuBarHeight;
    if (newX + iconRect.width > bodyRect.width) {
      newX = bodyRect.width - iconRect.width;
    }
    if (newY + iconRect.height > bodyRect.height) {
      newY = bodyRect.height - iconRect.height;
    }

    iconElement.style.left = `${newX}px`;
    iconElement.style.top = `${newY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    iconElement.style.cursor = "pointer";
    document.body.style.userSelect = "";
  });

  // Prevent click event from firing after a drag to avoid interfering with dblclick
  iconElement.addEventListener("click", (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
}

// Function to manage active/inactive window states
function makeWindowActive(clickedWindow) {
  clickedWindow.style.zIndex = ++windowZIndex;

  // Deactivate all other windows
  document.querySelectorAll(".window").forEach((win) => {
    if (win !== clickedWindow) {
      win.classList.add("inactive");
    }
  });

  // Activate the clicked window
  clickedWindow.classList.remove("inactive");
}

function orderIconsByName() {
  const icons = Array.from(document.querySelectorAll(".desktop-icon"));
  icons.sort((a, b) => {
    const nameA = a.querySelector("span:last-child").textContent.trim();
    const nameB = b.querySelector("span:last-child").textContent.trim();
    return nameA.localeCompare(nameB);
  });

  const initialTop = 70;
  const initialLeft = 20;
  const yOffset = 100;

  icons.forEach((icon, index) => {
    icon.style.top = `${initialTop + index * yOffset}px`;
    icon.style.left = `${initialLeft}px`;
  });
}

// Event listeners for desktop icons
document
  .getElementById("my-computer-icon")
  .addEventListener("dblclick", () => openWindow("my-computer"));
document
  .getElementById("about-me-icon")
  .addEventListener("dblclick", () => openWindow("about"));
document
  .getElementById("projects-icon")
  .addEventListener("dblclick", () => openWindow("projects"));
document
  .getElementById("contact-me-icon")
  .addEventListener("dblclick", () => openWindow("contact"));

// Update time in menu bar
function updateTime() {
  const now = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  document.getElementById("time-display").textContent = now.toLocaleTimeString(
    "en-US",
    options
  );
}
setInterval(updateTime, 1000);
updateTime(); // Initial call

// Context Menu Functionality
const contextMenu = document.getElementById("context-menu");

document.body.addEventListener("contextmenu", function (e) {
  e.preventDefault(); // Prevent default browser context menu
  contextMenu.style.display = "block";
  contextMenu.style.left = `${e.clientX}px`;
  contextMenu.style.top = `${e.clientY}px`;

  // Adjust position if it goes off-screen
  const menuRect = contextMenu.getBoundingClientRect();
  if (menuRect.right > window.innerWidth) {
    contextMenu.style.left = `${e.clientX - menuRect.width}px`;
  }
  if (menuRect.bottom > window.innerHeight) {
    contextMenu.style.top = `${e.clientY - menuRect.height}px`;
  }
});

// Hide context menu when clicking anywhere else
document.addEventListener("click", function (e) {
  if (!contextMenu.contains(e.target)) {
    contextMenu.style.display = "none";
  }
});

function closeContextMenu() {
  contextMenu.style.display = "none";
}

// Initial windows for demonstration
window.onload = function () {
  openWindow("about");

  // Make all desktop icons draggable
  document.querySelectorAll(".desktop-icon").forEach(makeIconDraggable);
};
