//global variable
const categoriesContainer = document.getElementById("categories-container");
const newsCardsContainer = document.getElementById("news-cards-container");

const loadAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.data.news_category));
};

const displayAllCategories = (categories) => {
  categories.forEach((category) => {
    const CategoryDiv = document.createElement("div");
    CategoryDiv.classList.add("col");
    CategoryDiv.classList.add("p-1");
    CategoryDiv.innerHTML = `<p id="${category.category_id}" onclick="loadNews('${category.category_id}')" class="fw-semibold text-black-50">${category.category_name}</p>`;
    categoriesContainer.appendChild(CategoryDiv);
  });
};

const loadNews = (categoryId) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};

const displayNews = (newses) => {
  console.log(newses);
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
                    <h5 class="card-title display-6 fw-semibold">Card title</h5>
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
                    <div id="${news._id}"><i class="bi bi-arrow-right text-primary"></i></div>
                  </div>
                </div>
              </div>
            </div>
    `;
    newsCardsContainer.appendChild(newsCard);
  });
};

loadAllCategories();
