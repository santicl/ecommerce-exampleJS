var popup = document.getElementById("popup"),
    btnCloded = document.getElementById("btn-cerrar-popup"),
    openPopup = document.getElementById("info-iva");



    openPopup.addEventListener("click", function (e) {
    popup.style.visibility = "visible";
})

btnCloded.addEventListener("click", function (e) {
    e.preventDefault();
    popup.style.display = "none";
    popup.style.visibility = "hidden";
})