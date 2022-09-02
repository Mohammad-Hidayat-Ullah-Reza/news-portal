//global variable
const categoriesContainer = document.getElementById("categories-container");
const newsCardsContainer = document.getElementById("news-cards-container");
const modalSection = document.getElementById("modal-section");
const spinner = document.getElementById("spinner");
const itemsFoundNumber = document.getElementById("items-found-number");
const itemsFoundCategory = document.getElementById("items-found-category");

// loadAllCategories() function calls the api for all categories
const loadAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.data.news_category));
};

//displayAllCategories() function appends html elements to show news categories
const displayAllCategories = (categories) => {
  categories.forEach((category) => {
    const CategoryDiv = document.createElement("div");
    CategoryDiv.classList.add("col");
    CategoryDiv.classList.add("p-1");
    CategoryDiv.innerHTML = `<p id="${category.category_id}" onclick="loadAllNewsInACategory('${category.category_id}')" class="fw-semibold text-black-50">${category.category_name}</p>`;
    categoriesContainer.appendChild(CategoryDiv);
  });
};

//loadAllNewsInACategory() calls the api for all the news of a category, it calls the spinner() function and chages the textContent of itemsFoundCategory
const loadAllNewsInACategory = (categoryId) => {
  toggleSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
  categoryName(categoryId);
};

//displayNews() function appends all the elements for news cards
const displayNews = (newses) => {
  newsCardsContainer.textContent = "";
  newses.forEach((news) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("card");
    newsCard.classList.add("mb-3");
    newsCard.innerHTML = `
          <div class="row g-0">
              <div class="col-md-3 p-3">
                <img
                  src="${news.thumbnail_url}"
                  class="img-fluid rounded"
                  alt="..."
                />
              </div>
              <div class="col-md-9">
                <div
                  class="card-body h-100 d-flex flex-column justify-content-between"
                >                
                  <div>
                    <h5 class="card-title display-6 fw-semibold title-text-overflow-elipsis">${news.title}</h5>
                    <p class="card-text text-overflow-elipsis">
                      ${news.details}
                    </p>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <div>
                        <img
                          src="${news.author.img}"
                          class="rounded-circle me-3 author-img"
                          alt=""
                        />
                      </div>
                      <div>
                        <p class="m-0">${news.author.name}</p>
                        <p class="m-0 text-black-50">${news.author.published_date}</p>
                      </div>
                    </div>
                    <div><i class="bi bi-eye me-2"></i>${news.total_view}</div>
                    <div>${news.rating.number}</div>
                    <div id="${news._id}" onclick="loadNewsDetails('${news._id}')"  data-bs-toggle="modal"
                    data-bs-target="#newsModal"><i class="bi bi-arrow-right text-primary"></i></div>
                  </div>
                </div>
              </div>
            </div>
    `;
    newsCardsContainer.appendChild(newsCard);
  });
  toggleSpinner(false);
  itemsFoundNumber.textContent = newsCardsContainer.childElementCount;
};

//this function gets the category name
const categoryName = (name) => {
  if (name === "01") {
    itemsFoundCategory.textContent = "Breaking News";
  } else if (name === "02") {
    itemsFoundCategory.textContent = "Regular News";
  } else if (name === "03") {
    itemsFoundCategory.textContent = "International News";
  } else if (name === "04") {
    itemsFoundCategory.textContent = "Sports";
  } else if (name === "05") {
    itemsFoundCategory.textContent = "Entertainment";
  } else if (name === "06") {
    itemsFoundCategory.textContent = "Culture";
  } else if (name === "07") {
    itemsFoundCategory.textContent = "Arts";
  } else if (name === "08") {
    itemsFoundCategory.textContent = "All News";
  }
};

//loadNewsDetails() function calls the api for each news article
const loadNewsDetails = (articleId) => {
  fetch(`https://openapi.programming-hero.com/api/news/${articleId}`)
    .then((res) => res.json())
    .then((data) => displayNewsModal(data.data[0]));
};

//displayNewsModal() appends all the elements to show the article news details in a modal
const displayNewsModal = (news) => {
  console.log(news);
  const newsModalTitle = document.getElementById("newsModalLabel");
  newsModalTitle.innerText = `${news.title}`;
  const newsBody = document.getElementById("news-body");
  newsBody.innerHTML = `
    <div class="pb-3"><img src="${news.image_url}" class="img-fluid" /></div>
    <p>${news.details}</p>
  `;
  const newsModalFooter = document.getElementById("news-modal-footer");
  newsModalFooter.innerHTML = `
                  <div
                    class="d-flex justify-content-between align-items-center px-4 pb-3"
                  >
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <div>
                        <img
                          src="${news.author.img}"
                          class="rounded-circle me-3 author-img"
                          alt=""
                        />
                      </div>
                      <div>
                        <p class="m-0">${news.author.name}</p>
                        <p class="m-0 text-black-50">${news.author.published_date}</p>
                        <p class="m-0 text-black-50"><small>${news.author.published_date}</small></p>
                      </div>
                    </div>
                    <div><i class="bi bi-eye me-2"></i>${news.total_view}</div>
                    <div>
                    <div>${news.rating.number}</div>
                    <div><i class="bi bi-award"></i>${news.rating.badge}</div>
                    </div>
                  </div>
  `;
};

//toggleSpinner() function toggles the bootstrap spinner
const toggleSpinner = (toggle) => {
  if (toggle) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

loadAllCategories();
loadAllNewsInACategory("08");
