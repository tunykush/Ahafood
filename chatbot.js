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