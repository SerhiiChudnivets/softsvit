const preloader = document.getElementById('preloader');

document.addEventListener("DOMContentLoaded", ()=> {
    const siteBody = document.querySelector('body');
    siteBody.classList.remove("loading");
    preloader.classList.remove("active");
});