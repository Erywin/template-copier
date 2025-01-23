document.addEventListener("DOMContentLoaded", () => {
  const templateButtonsContainer = document.getElementById("template-buttons");
  const statusMessage = document.getElementById("status-message");
  const templatesUrl = `${window.location.origin}/templates.json`;

  // Fetch templates list and generate buttons
  async function loadTemplates() {
    try {
      const response = await fetch(templatesUrl);
      if (!response.ok) throw new Error("Failed to fetch templates list.");

      const templates = await response.json();

      // Create a button for each template
      templates.forEach(template => {
        const button = document.createElement("button");
        button.className = "button is-primary";
        button.textContent = template;
        button.addEventListener("click", () => copyTemplate(template));
        templateButtonsContainer.appendChild(button);
      });
    } catch (error) {
      console.error("Error loading templates:", error);
      templateButtonsContainer.innerHTML = `<p class="notification is-danger">Error loading templates. Please try again later.</p>`;
    }
  }

  // Copy template content to clipboard
  async function copyTemplate(templateName) {
    const templateUrl = `${window.location.origin}/template/${templateName}`;
    try {
      const response = await fetch(templateUrl);
      if (!response.ok) throw new Error(`Failed to fetch ${templateName}.`);

      const text = await response.text();

      // Copy text to clipboard
      await navigator.clipboard.writeText(text);

      statusMessage.textContent = `Template "${templateName}" copied to clipboard!`;
      statusMessage.classList.remove("is-hidden", "is-danger");
      statusMessage.classList.add("is-success");
    } catch (error) {
      console.error("Error copying template:", error);
      statusMessage.textContent = `Failed to copy "${templateName}". Please try again.`;
      statusMessage.classList.remove("is-hidden", "is-success");
      statusMessage.classList.add("is-danger");
    }
  }

  // Initialize template buttons
  loadTemplates();
});