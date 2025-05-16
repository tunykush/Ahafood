// Executes when document is loaded
document.addEventListener("DOMContentLoaded", (ev) => {
  // Recent Orders Data
  document.getElementById("holding--table").appendChild(buildTableBody());

  // Updates Data
  document
    .getElementsByClassName("square")
    .item(0)
    .appendChild(buildUpdatesList());

  // Coin Markets
  const salesAnalytics = document.getElementById("analytics");
  buildSalesAnalytics(salesAnalytics);

  
});

// Document Builder
const buildTableBody = () => {
  const recentOrderData = RECENT_ORDER_DATA;

  const tbody = document.createElement("tbody");

  let bodyContent = "";
  for (const row of recentOrderData) {
    bodyContent += `
      <tr>
        <td>${row.coin}</td>
        <td>${row.total}</td>
        <td>${row.price}</td>
        <td class="${row.growthColor}">${row.growth}</td>
        <td class="primary">Claim</td>
      </tr>
    `;
  }

  tbody.innerHTML = bodyContent;

  return tbody;
};

const buildUpdatesList = () => {
  const updateData = UPDATE_DATA;

  const div = document.createElement("div");
  div.classList.add("updates");

  let updateContent = "";
  for (const update of updateData) {
    updateContent += `
      <div class="update">
        <div class="profile-photo">
          <img src="${update.imgSrc}" />
        </div>
        <div class="message">
          <p><b>${update.profileName}</b></p>
          <div>${update.message}</div>
          <small class="text-muted">${update.updatedTime}</small>
        </div>
      </div>
    `;
  }

  div.innerHTML = updateContent;

  return div;
};


const buildSalesAnalytics = (element) => {
  const salesAnalyticsData = SALES_ANALYTICS_DATA;

  for (const analytic of salesAnalyticsData) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.classList.add(analytic.itemClass);

    const itemHtml = `
      <div class="icon">
        <div class="profile-photo">
          <img src="${analytic.icon}" />
        </div>
      </div>
      <div class="right">
        <div class="info">
          <h3>${analytic.name}</h3>
          <small class="text-muted"> Last 24 Hours </small>
        </div>
        <h5 class="${analytic.colorClass}">${analytic.percentage}%</h5>
        <h3>${analytic.price}</h3>
      </div>
    `;

    item.innerHTML = itemHtml;

    element.appendChild(item);
  }
};

// Document operation functions
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// Show Sidebar
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

// Hide Sidebar
closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

// Change Theme
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

function toggleChat() {
  const chatPopup = document.getElementById("chatbot-popup");
  chatPopup.classList.toggle("active");
}

function handleChat(event) {
  if (event.key === "Enter") sendMessage();
}

function sendMessage() {
  const chatBody = document.getElementById("chat-body");
  const chatInput = document.getElementById("chat-input");
  const message = chatInput.value.trim();
  if (message) {
    // Add user message
    const userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.textContent = message;
    chatBody.appendChild(userMessage);

    // Clear input
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // Show typing indicator
    showTypingIndicator(chatBody);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const botMessage = document.createElement("div");
      botMessage.className = "chat-message bot";
      botMessage.textContent = generateBotResponse(message);
      chatBody.appendChild(botMessage);
      removeTypingIndicator(chatBody);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000); // Adjust this delay as needed
  }
}

function showTypingIndicator(chatBody) {
  const typingIndicator = document.createElement("div");
  typingIndicator.id = "typing-indicator";
  typingIndicator.className = "chat-message bot typing";
  typingIndicator.innerHTML = `
    <span></span><span></span><span></span>
  `;
  chatBody.appendChild(typingIndicator);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator(chatBody) {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) typingIndicator.remove();
}

function generateBotResponse(message) {
  // Custom bot responses
  const normalizedMessage = message.toLowerCase();
  if (normalizedMessage === "reported pls" || normalizedMessage === "overview" || normalizedMessage === "data pls" ) {
    return `Minh, I’ve just completed the food ordering performance review for this month:\n\nOrder: 15\n\nRevenue: 1.914.000\n\nCoin: 115 coins\n\nLevel: Silver\n\nCurrent Position: You're at the bottom of the leaderboard this month.\n\nDon’t worry, we’ll start with small changes, and AhaFood.AI will guide you back to control! 💪`;
  }
  // Default response if no specific command is matched
  return "I’m here to assist you! Please let me know how I can help.";
}


// Toggle Chatbot Animation
document.addEventListener("DOMContentLoaded", () => {
  const chatbotIcon = document.getElementById("chatbot-icon");

  // Stop animation on click
  chatbotIcon.addEventListener("click", () => {
    chatbotIcon.classList.toggle("paused");
  });
});

