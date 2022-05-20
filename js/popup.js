const popup = document.getElementById("popup");
const close = document.getElementById("btn-cerrar-popup");
const openPopup = document.getElementById("info-iva");

openPopup.addEventListener("click", () => {
    console.log("click");
    popup.style.visibility = "visible";
    popup.style.display = "block";
});

close.addEventListener("click", () => {
    popup.style.display = "none";
    popup.style.visibility = "hidden";
});

