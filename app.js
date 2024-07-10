document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("product-form");
  const productsList = document.getElementById("products-list");
  let products = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    const product = { name, price, image };
    addProduct(product);
    form.reset();
  });

  const addProduct = (product) => {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
      products.push(data);
      displayProducts(products);
    });
  };

  const displayProducts = (products) => {
    productsList.innerHTML = "";
    products.forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <div class="product-info">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info-down">
          <div> 
            <h3>${product.name}</h3>
            <p>$ ${product.price}</p>
          </div>
          <button onclick="deleteProduct(${product.id})">🗑️</button>
          </div>
        </div>
      `;
      productsList.appendChild(productCard);
    });
  };

  const loadProducts = () => {
    fetch("http://localhost:3000/products")
      .then(response => response.json())
      .then(data => {
        products = data;
        displayProducts(products);
      });
  };

  window.deleteProduct = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      products = products.filter(product => product.id !== id);
      displayProducts(products);
    });
  };

  loadProducts();
});
