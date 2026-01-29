const menuData = [
  {
    id: "hot-drinks",
    title: "Sıcak İçecekler",
    items: [
      ["Türk Kahvesi", "100 ₺"],
      ["Sütlü Türk Kahvesi", "110 ₺"],
      ["Dibek Kahvesi", "100 ₺"],
      ["Menengiç Kahvesi", "130 ₺"],
      ["Cappuccino", "100 ₺"],
      ["Sıcak Çikolata", "130 ₺"],
      ["Salep", "130 ₺"],
      ["Çay", "25 ₺"]
    ]
  },
  {
    id: "cold-drinks",
    title: "Soğuk İçecekler",
    items: [
      ["Kutu Kola", "100 ₺"],
      ["Şişe Kola", "95 ₺"],
      ["Meyve Suyu", "100 ₺"],
      ["Fuse Tea", "100 ₺"],
      ["Limonata", "100 ₺"],
      ["Ayran", "30 ₺"],
      ["Churchill", "140 ₺"]
    ]
  },
  {
    id: "milkshake",
    title: "Milkshake",
    items: [
      ["Çilek", "150 ₺"],
      ["Çikolata", "150 ₺"],
      ["Karadut", "150 ₺"],
      ["Muz", "150 ₺"]
    ]
  },
  {
    id: "chicken",
    title: "Tavuk Yemekleri",
    items: [
      ["Köri Soslu Tavuk", "300 ₺"],
      ["Mexican Soslu Tavuk", "300 ₺"],
      ["Kremalı Mantarlı Tavuk", "300 ₺"],
      ["Tavuk Fajita", "300 ₺"],
      ["Tavuk Schnitzel", "300 ₺"]
    ]
  },
  {
    id: "pasta",
    title: "Makarnalar",
    items: [
      ["Penne Alfredo", "300 ₺"],
      ["Spagetti Bolonez", "300 ₺"],
      ["Mantı Pesto Soslu", "300 ₺"]
    ]
  },
  {
    id: "snacks",
    title: "Aparatifler",
    items: [
      ["Karışık Menemen", "200 ₺"],
      ["Kaşarlı Gözleme", "200 ₺"],
      ["Karışık Tost", "200 ₺"],
      ["Patates Cips", "120 ₺"]
    ]
  }
];

/**
 * Creates a navigation button for a category
 * @param {Object} category
 * @returns {HTMLButtonElement}
 */
function createNavButton(category) {
  const btn = document.createElement("button");
  btn.className = "nav-button";
  btn.setAttribute('data-category', category.id);
  btn.innerHTML = `<span style="font-size: var(--font-size-xs); color: var(--muted-foreground)">${category.title}</span>`;

  btn.onclick = () => {
    const element = document.getElementById(category.id);
    if (element) {
      const offset = 100; // Account for sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  return btn;
}

/**
 * Creates a menu item row
 * @param {Array} item [name, price]
 * @returns {string} HTML string
 */
function createMenuItem(item) {
  return `
    <div class="menu-item">
      <span class="menu-item-name">${item[0]}</span>
      <span class="menu-item-price">${item[1]}</span>
    </div>
  `;
}

/**
 * Creates a category section with its items
 * @param {Object} category
 * @returns {HTMLElement}
 */
function createCategorySection(category) {
  const section = document.createElement("section");
  section.id = category.id;
  section.className = "menu-category";

  section.innerHTML = `
    <div class="menu-card">
      <div class="menu-category-title">
        ${category.title}
      </div>
      <div class="menu-items-grid">
        ${category.items.map(item => createMenuItem(item)).join("")}
      </div>
    </div>
  `;
  return section;
}

/**
 * Initializes the application
 */
function init() {
  const app = document.getElementById("app");
  const nav = document.getElementById("categoryNav");

  if (!app || !nav) return;

  menuData.forEach(category => {
    nav.appendChild(createNavButton(category));
    app.appendChild(createCategorySection(category));
  });

  setupIntersectionObserver();
}

/**
 * Highlights the active navigation button based on scroll position
 */
function setupIntersectionObserver() {
  const sections = document.querySelectorAll('.menu-category');
  const navButtons = document.querySelectorAll('.nav-button');

  const options = {
    root: null,
    rootMargin: '-10% 0px -80% 0px', // Adjust to trigger when section is near top
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navButtons.forEach(btn => {
          if (btn.getAttribute('data-category') === id) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => observer.observe(section));
}

// Start the app
document.addEventListener("DOMContentLoaded", init);
