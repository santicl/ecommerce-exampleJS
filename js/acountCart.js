import { showCarts, getDataTour, btnPay, sumTotal, verifyBtnRemove } from "./components/components.js";

let totalSum = 0, total = 0, totalCarts = [];
var cart;

const URL = 'https://api-tours-default-rtdb.firebaseio.com/tours.json';

if ((window.location.href === 'http://localhost/paginaTours/tours/') || (window.location.href === 'https://toursopen.netlify.app/' || window.location.href === 'https://toursopen.netlify.app/index.html' || window.location.href === 'http://localhost/paginaTours/tours/index.html')) {
    window.onload = readOutsideOrInsideTour;
}

readOutsideOrInsideTour.onload = returnItemDescription;
readOutsideOrInsideTour.onload = verifyBtnRemove;

function readOutsideOrInsideTour() {
    let showOutside = '', showInside = '';
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            totalCarts = data;
            try {
                for (let i = 0; i < data.length; i++) {
                    let { type, price } = data[i];
                    let newPrice = new Intl.NumberFormat('es-ES').format(price);
                    if (type === 'outside') {
                        showOutside += showCarts(getDataTour(data[i]), newPrice);
                    } else {
                        showInside += showCarts(getDataTour(data[i]), newPrice);
                    }
                }
                document.getElementById("content_product").innerHTML = showOutside;
                document.getElementById("carousel__container_content_product").innerHTML = showInside;
                verifyBtnRemove();
            } catch (error) {
                console.log(error);
            }
        })
        .catch(error => console.log(error));
    returnItemDescription();
    btnPay();
}

function returnItemDescription() {
    let container = '';
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const { title, include } = data[i];
                container = document.getElementById(title);
                container.innerHTML = '';
                for (let j = 0; j < include.length; j++) {
                    container.innerHTML += `<li class="list"><i class="fi fi-br-shield-check"></i> ${include[j]}</li><br>`;
                }
            }
        })
}

document.getElementById("body-shop").addEventListener("click", function (e) {
    if (e.target.classList.contains("button-add")) {
        add(e.target.id);
    }
})

function add(id) {
    let dataCarts = [], data = [], b = document.getElementById("checkoutB");;
    cart = id;
    for (let i = 0; i < totalCarts.length; i++) {
        if (totalCarts[i].id == cart) {
            dataCarts.push(totalCarts[i]);
            dataCarts = JSON.stringify(dataCarts);
        }
    }

    if (localStorage.getItem("Invoices") === null) {
        let invoices = [];
        invoices.push(dataCarts);
        localStorage.setItem("Invoices", JSON.stringify(invoices));
    } else {
        let invoices = JSON.parse(localStorage.getItem("Invoices"));
        invoices.push(dataCarts);
        localStorage.setItem("Invoices", JSON.stringify(invoices));
    }

    total = sumTotal();

    if (total.suma > 0) {
        b.style.visibility = "visible";
    }

    totalSum = new Intl.NumberFormat('es-ES').format(total.suma);
    document.getElementById("checkoutB").innerHTML = `Pagar $${totalSum}`;
    verifyBtnRemove();
}