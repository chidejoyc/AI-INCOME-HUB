document.addEventListener("DOMContentLoaded", function () {
  if (typeof AIH_DATA === "undefined") {
    console.error("AI Income Hub data could not be loaded.");
    return;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function createCard(title, description, category, url) {
    const link = url
      ? `<a class="btn btn-outline btn-sm" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">Visit tool →</a>`
      : "";

    return `
      <article class="card">
        <div class="card-icon">
          <span>✦</span>
        </div>

        <span class="tag">${escapeHTML(category || "Featured")}</span>

        <h3>${escapeHTML(title)}</h3>

        <p>${escapeHTML(description)}</p>

        ${link}
      </article>
    `;
  }

  function renderTools() {
    const container = document.getElementById("home-tools");

    if (!container) return;

    const tools = AIH_DATA.tools || [];

    container.innerHTML = tools
      .slice(0, 8)
      .map(tool =>
        createCard(
          tool.name,
          tool.description,
          tool.category,
          tool.url
        )
      )
      .join("");
  }

  function renderTutorials() {
    const container = document.getElementById("home-tutorials");

    if (!container) return;

    const tutorials = AIH_DATA.tutorials || [];

    container.innerHTML = tutorials
      .slice(0, 6)
      .map(item =>
        createCard(
          item.title,
          item.description,
          item.category
        )
      )
      .join("");
  }

  function renderIncome() {
    const container = document.getElementById("home-income");

    if (!container) return;

    const income = AIH_DATA.income || [];

    container.innerHTML = income
      .slice(0, 6)
      .map(item =>
        createCard(
          item.title,
          item.description,
          "Income Path"
        )
      )
      .join("");
  }

  function renderProducts() {
    const container = document.getElementById("home-products");

    if (!container) return;

    const products = AIH_DATA.products || [];

    container.innerHTML = products
      .slice(0, 6)
      .map(item =>
        createCard(
          item.title,
          `${item.description} ${item.price ? "• " + item.price : ""}`,
          "Digital Product"
        )
      )
      .join("");
  }

  function renderResources() {
    const container = document.getElementById("home-resources");

    if (!container) return;

    const resources = AIH_DATA.resources || [];

    container.innerHTML = resources
      .slice(0, 8)
      .map(item => `
        <li>
          <a href="ai-tutorials.html">
            <span>
              <strong>${escapeHTML(item.title)}</strong><br>
              <small class="text-muted">${escapeHTML(item.description)}</small>
            </span>
          </a>
        </li>
      `)
      .join("");
  }

  function renderArticles() {
    const container = document.getElementById("home-articles");

    if (!container) return;

    const articles = AIH_DATA.articles || [];

    container.innerHTML = articles
      .slice(0, 6)
      .map(item =>
        createCard(
          item.title,
          item.description,
          item.category
        )
      )
      .join("");
  }

  renderTools();
  renderTutorials();
  renderIncome();
  renderProducts();
  renderResources();
  renderArticles();
});
