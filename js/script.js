"use strict";
let productNameElem = document.getElementById("productName");
let productPriceElem = document.getElementById("productPrice");
let productCategoryElem = document.getElementById("productCategory");
let productDescElem = document.getElementById("productDesc");
let formElems = document.querySelectorAll(".form-control");
let formBtn = document.querySelector(".form-btn");
let tableHeader = document.querySelector(".table-head");
let alertName = document.querySelector(".validate-name");
let alertPrice = document.querySelector(".validate-price");
let alertCategory = document.querySelector(".validate-category");
let alertDesc = document.querySelector(".validate-desc");
let formInputs = document.querySelectorAll(".form-inputs");
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
  if (
    validateProductName() &&
    validateProductPrice() &&
    validateProductCategory() &&
    validateProductDesc()
  ) {
    if (formBtn.textContent !== "Update") {
      createProduct();
    }

    addToDocument();
    localStorage.setItem("productList", JSON.stringify(productList));

    clearForm();
    formBtn.textContent = "Add product";
    alertName.style.cssText = "display: none !important";
    alertPrice.style.cssText = "display: none !important";
    alertCategory.style.cssText = "display: none !important";
    alertDesc.style.cssText = "display: none !important";
    productNameElem.classList.remove("is-invalid");
    productPriceElem.classList.remove("is-invalid");
    productCategoryElem.classList.remove("is-invalid");
    productDescElem.classList.remove("is-invalid");
  } else {
    if (!validateProductName()) {
      alertName.style.cssText = "display: block !important";
      productNameElem.classList.add("is-invalid");
    }
    if (!validateProductPrice()) {
      alertPrice.style.cssText = "display: block !important";
      productPriceElem.classList.add("is-invalid");
    }
    if (!validateProductCategory()) {
      alertCategory.style.cssText = "display: block !important";
      productCategoryElem.classList.add("is-invalid");
    }
    if (!validateProductDesc()) {
      alertDesc.style.cssText = "display: block !important";
      productDescElem.classList.add("is-invalid");
    }
  }
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

function validateProductName() {
  let regex = /[A-Z][a-z]{2,6}/;
  if (regex.test(productNameElem.value)) {
    return true;
  } else {
    return false;
  }
}

function validateProductPrice() {
  let regex = /^([1-9][0-9]{3}|10000)/;
  if (regex.test(productPriceElem.value)) {
    return true;
  } else {
    return false;
  }
}

function validateProductCategory() {
  let regex = /(mobile|tv)/;
  if (regex.test(productCategoryElem.value)) {
    return true;
  } else {
    return false;
  }
}

function validateProductDesc() {
  let regex = / +/;
  if (regex.test(productDescElem.value)) {
    return true;
  } else {
    return false;
  }
}
