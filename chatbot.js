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
  // Normalize the message to handle variations in user input
  const normalizedMessage = message.toLowerCase();

  // Define possible status reports based on the customer feedback categories
  const statusReports = {
    "order status": {
      summary: "Total orders this month: 245",
      revenue: "Total revenue: 1,914,000 VND",
      coins: "Coins earned: 115",
      level: "Current level: Silver"
    },
    "leaderboard": {
      summary: "Current Position: You're at the bottom of the leaderboard this month.",
      encouragement: "Don’t worry, with small changes, you’ll bounce back! 💪"
    },
    "feedback summary": {
      food_quality: "Fresh and tasty dishes, great portion size",
      delivery_speed: "Arrived on time, packaging kept food fresh",
      customer_service: "Friendly and helpful staff, quick response to questions",
      order_accuracy: "Order exactly as requested, no missing items",
      packaging: "Ensure packaging prevents damage during transit"
    }
  };

  // Generate personalized status reports based on keywords in the message
  for (const category in statusReports) {
    if (normalizedMessage.includes(category)) {
      const report = statusReports[category];
      return Object.values(report).join("\n\n");
    }
  }

  // Default fallback response if no specific command is matched
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
