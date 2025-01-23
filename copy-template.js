document.addEventListener("DOMContentLoaded", () => {
  const templateButtonsContainer = document.getElementById("template-buttons");
  const statusMessage = document.getElementById("status-message");
  const templatesUrl = `${window.location.origin}/template-copier/templates.json`;

  console.log("Script loaded, initializing...");

  // Fetch templates list and generate buttons
  async function loadTemplates() {
    try {
      console.log("Fetching templates from:", templatesUrl);

      const response = await fetch(templatesUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch templates list. Status: ${response.status}`);
      }

      const templates = await response.json();
      console.log("Templates loaded:", templates);

      // Create a button for each template
      templates.forEach(template => {
        console.log("Adding button for template:", template);

        const button = document.createElement("button");
        button.className = "button is-primary";
        button.textContent = template;
        button.addEventListener("click", () => copyTemplate(template));
        templateButtonsContainer.appendChild(button);
      });

      console.log("All template buttons added.");
    } catch (error) {
      console.error("Error loading templates:", error);
      templateButtonsContainer.innerHTML = `<p class="notification is-danger">Error loading templates. Please try again later.</p>`;
    }
  }

  // Copy template content to clipboard
  async function copyTemplate(templateName) {
    const templateUrl = `${window.location.origin}/template-copier/template/${templateName}`;
    console.log("Attempting to copy template:", templateName, "from:", templateUrl);

    try {
      const response = await fetch(templateUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${templateName}. Status: ${response.status}`);
      }

      const text = await response.text();
      console.log(`Template "${templateName}" content fetched successfully.`);

      // Copy text to clipboard
      await navigator.clipboard.writeText(text);
      console.log(`Template "${templateName}" copied to clipboard!`);

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
