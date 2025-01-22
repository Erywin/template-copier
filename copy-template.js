document.addEventListener("DOMContentLoaded", () => {
  const copyButton = document.getElementById("copy-button");
  const templateSelect = document.getElementById("template-select");
  const statusMessage = document.getElementById("status-message");
  const templatesUrl = `${window.location.origin}/templates.json`;

  // Fetch the list of templates and populate the dropdown
  async function loadTemplates() {
    try {
      const response = await fetch(templatesUrl);
      if (!response.ok) throw new Error("Failed to fetch templates list.");

      const templates = await response.json();

      // Clear existing options and add templates
      templateSelect.innerHTML = templates
        .map(template => `<option value="${template}">${template}</option>`)
        .join("");

      copyButton.disabled = false; // Enable the button
    } catch (error) {
      console.error("Error loading templates:", error);
      templateSelect.innerHTML = `<option disabled>Error loading templates</option>`;
    }
  }

  // Handle template copying
  copyButton.addEventListener("click", async () => {
    const selectedTemplate = templateSelect.value; // Get selected template
    const templateUrl = `${window.location.origin}/template/${selectedTemplate}`; // Construct URL

    try {
      const response = await fetch(templateUrl);
      if (!response.ok) throw new Error("Failed to fetch the template file.");

      const text = await response.text();

      // Copy text to clipboard
      await navigator.clipboard.writeText(text);

      statusMessage.textContent = `Template "${selectedTemplate}" copied to clipboard!`;
      statusMessage.classList.remove("is-hidden", "is-danger");
      statusMessage.classList.add("is-success");
    } catch (error) {
      console.error("Error copying template:", error);
      statusMessage.textContent = `Failed to copy "${selectedTemplate}". Please try again.`;
      statusMessage.classList.remove("is-hidden", "is-success");
      statusMessage.classList.add("is-danger");
    }
  });

  // Initialize the dropdown
  loadTemplates();
});