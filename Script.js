let men = document.getElementById("men");
let women = document.getElementById("women");
let kids = document.getElementById("kids");

let layoutCard = document.getElementById("cardLayout");

function displayLayout(products) {
  layoutCard.textContent = "";

  for (let eachProduct of products) {
    let { badge_text, compare_at_price, image, price, title, vendor } = eachProduct;
    let subContainer = document.createElement("div");

    let imageContainer = document.createElement("div");
    imageContainer.style.backgroundImage = "url(" + image + ")";
    imageContainer.classList.add("imageContainer");

    let badge = document.createElement("p");
    badge.textContent = badge_text;
    badge.classList.add("badge");
    if (badge_text !== null) {
      imageContainer.appendChild(badge);
    }

    subContainer.appendChild(imageContainer);

    let titleContainer = document.createElement("div");
    titleContainer.classList.add("titleContainer");

    let titleElement = document.createElement("h1");
    titleElement.textContent = title;
    titleElement.classList.add("titleElement");
    titleContainer.appendChild(titleElement);

    let vendorElement = document.createElement("p");
    vendorElement.textContent = " * " + vendor;
    titleContainer.appendChild(vendorElement);

    subContainer.appendChild(titleContainer);

    let priceContainer = document.createElement("div");
    priceContainer.classList.add("priceContainer");

    let priceElement = document.createElement("p");
    priceElement.textContent = "Rs." + price;
    priceContainer.appendChild(priceElement);

    let comparePriceElement = document.createElement("p");
    comparePriceElement.textContent = compare_at_price;
    comparePriceElement.classList.add("comparePriceElement");
    priceContainer.appendChild(comparePriceElement);

    let offElement = document.createElement("p");
    offElement.textContent = "50% off";
    offElement.classList.add("offElement");
    priceContainer.appendChild(offElement);

    subContainer.appendChild(priceContainer);

    let cartButton = document.createElement("button");
    cartButton.textContent = "Add to Cart";
    cartButton.classList.add("cartButton");

    subContainer.appendChild(cartButton);

    layoutCard.appendChild(subContainer);
  }
}

async function fetchData(categoryName) {
  let url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
  let options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const jsonData = await response.json();

    let { categories } = jsonData;
    for (let eachCategory of categories) {
      if (eachCategory.category_name === categoryName) {
        let categoryProducts = eachCategory.category_products;
        displayLayout(categoryProducts);
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

men.classList.add("highlight-tab");
fetchData("Men");

men.onclick = function () {
  men.classList.add("highlight-tab");
  women.classList.remove("highlight-tab");
  kids.classList.remove("highlight-tab");
  fetchData("Men");
};

women.onclick = function () {
  men.classList.remove("highlight-tab");
  women.classList.add("highlight-tab");
  kids.classList.remove("highlight-tab");
  fetchData("Women");
};

kids.onclick = function () {
  men.classList.remove("highlight-tab");
  women.classList.remove("highlight-tab");
  kids.classList.add("highlight-tab");
  fetchData("Kids");
};