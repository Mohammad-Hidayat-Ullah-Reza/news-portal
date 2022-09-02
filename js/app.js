//global variable
const categoriesContainer = document.getElementById("categories-container");

const loadAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.data.news_category));
};

const displayAllCategories = (categories) => {
  categories.forEach((category) => {
    console.log(category);
    const CategoryDiv = document.createElement("div");
    CategoryDiv.classList.add("col");
    CategoryDiv.classList.add("p-1");
    CategoryDiv.innerHTML = `<p class="fw-semibold text-black-50">${category.category_name}</p>`;
    categoriesContainer.appendChild(CategoryDiv);
  });
};

loadAllCategories();
