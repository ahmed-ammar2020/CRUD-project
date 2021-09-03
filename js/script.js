"use strict";
// every single product is an object
let productNameElem = document.getElementById("productName");
let productPriceElem = document.getElementById("productPrice");
let productCategoryElem = document.getElementById("productCategory");
let productDescElem = document.getElementById("productDesc");
let formElems = document.querySelectorAll(".form-control");
let formBtn = document.querySelector(".form-btn");
let tableHeader = document.querySelector(".table-head");
let productList;
let updatedProductIndex;

if (!localStorage.getItem("productList")) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("productList"));
  addToDocument();
}

function createProduct() {
  let product = {
    name: productNameElem.value,
    price: productPriceElem.value,
    category: productCategoryElem.value,
    desc: productDescElem.value,
  };

  productList.push(product);
  localStorage.setItem("productList", JSON.stringify(productList));
}

function addToDocument() {
  let tableContent = "";
  let tableBody = document.getElementById("tableContent");

  if (
    (updatedProductIndex || updatedProductIndex === 0) &&
    formBtn.textContent === "Update"
  ) {
    productList.splice(updatedProductIndex, 1, {
      name: productNameElem.value,
      price: productPriceElem.value,
      category: productCategoryElem.value,
      desc: productDescElem.value,
    });
    localStorage.setItem("productList", JSON.stringify(productList));
  }

  for (let i = 0; i < productList.length; i++) {
    tableContent += `
      <tr>
      <td>${i + 1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category}</td>
      <td>${productList[i].desc}</td>
      <td><button class="btn btn-outline-info" onclick="updateProduct(${i})">Update</button></td>
      <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})" >Delete</button></td>
    </tr>
  `;
  }
  tableBody.innerHTML = tableContent;
}

function displayProduct() {
  if (formBtn.textContent !== "Update") {
    createProduct();
  }

  addToDocument();
  localStorage.setItem("productList", JSON.stringify(productList));

  clearForm();
  formBtn.textContent = "Add product";
}

function deleteProduct(index) {
  productList.splice(index, 1);
  addToDocument();
  localStorage.setItem("productList", JSON.stringify(productList));
}

function clearForm() {
  formElems.forEach((elem) => {
    elem.value = "";
  });
}

function updateProduct(index) {
  productNameElem.value = productList[index].name;
  productPriceElem.value = productList[index].price;
  productCategoryElem.value = productList[index].category;
  productDescElem.value = productList[index].desc;
  formBtn.textContent = "Update";
  updatedProductIndex = index;
}

function search(e) {
  let searchTerm = e.target.value;
  let tableContent = "";
  let tableBody = document.getElementById("tableContent");
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
      tableContent += `
          <tr>
          <td>${i + 1}</td>
          <td>${productList[i].name}</td>
          <td>${productList[i].price}</td>
          <td>${productList[i].category}</td>
          <td>${productList[i].desc}</td>
          <td><button class="btn btn-outline-info" onclick="updateProduct(${i})">Update</button></td>
          <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})" >Delete</button></td>
        </tr>
      `;
    }
  }
  tableBody.innerHTML = tableContent;
}
