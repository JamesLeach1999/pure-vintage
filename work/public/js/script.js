var menuItems = document.getElementById("MenuItems");

menuItems.style.maxHeight = "0px";

function menutoggle() {
  // double equals cos compairson operator, guess thats a thing in vanilla js
  if (menuItems.style.maxHeight == "0px") {
    menuItems.style.maxHeight = "200px";
  } else {
    menuItems.style.maxHeight = "0px";
  }
}

// js for product gallery

var productImg = document.getElementById("productImg");
// 4 images so will be an array
var smallImg = document.getElementsByClassName("smallImg");

smallImg[0].onclick = function () {
  productImg.src = smallImg[0].src;
};
smallImg[1].onclick = function () {
  productImg.src = smallImg[1].src;
};
smallImg[2].onclick = function () {
  productImg.src = smallImg[2].src;
};
smallImg[3].onclick = function () {
  productImg.src = smallImg[3].src;
};
