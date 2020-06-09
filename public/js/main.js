// active class for menu
let path = window.location.pathname.split("/").pop();
console.log(path);
if (path == "") {
  path = "/";
}

let target = $('nav a[href="' + path + '"]');
target.addClass("active");
//end of active class

// Slide Menu
function openMenu() {
  document.querySelector("header").style.display = "block";
}
function closeMenu() {
  document.querySelector("header").style.display = "none";
}
