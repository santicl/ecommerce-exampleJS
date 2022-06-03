import { sumTotal } from "./components/components.js";

window.onload = readCheckout;
readCheckout.onload = productNull;
readCheckout.ready = totalCheckout;
readCheckout.ready = showProducts;
readCheckout.ready = rankStar;

const url = 'https://api-tours-default-rtdb.firebaseio.com/tours.json';

let acountTotal = [];

function readCheckout() {
    if ((window.location.href === 'http://localhost/paginaTours/tours/checkout.html') || (window.location.href === 'https://toursopen.netlify.app/checkout.html')) {
        let invoices = JSON.parse(localStorage.getItem("Invoices"));
        acountTotal = invoices;
        let title = '';


        productNull();
        document.getElementById("content_product_checkout").innerHTML = '';
        for (let i = 0; i < invoices.length; i++) {
            invoices[i] = JSON.parse(invoices[i]);

            for (let j = 0; j < invoices[i].length; j++) {
                title += "(" + invoices[i][j].title + ") ";
                document.getElementById("content_product_checkout").innerHTML += `<div class="container-products">
                <div class="produc">
                        <img src="img/${invoices[i][j].img}" alt="${invoices[i][j].title}">
                    <div class="descriptions">
                        <h2>${invoices[i][j].title}</h2>
                        <div class="star" id="${invoices[i][j].id}"></div>
                    </div>
                    <div class="rank-and-btn">
                        <button id="${invoices[i][j].id}" class="button-delete" onclick="dele('${invoices[i][j].id}')">Eliminar</button>
                    </div>
                </div>
            </div>`;
            }

        }
        let input = document.getElementById("content-input__title").value = title;
        totalCheckout();
    }
    showProducts();
    rankStar();
}

function totalCheckout() {
    let suma = sumTotal();
    document.getElementById("sub").innerHTML = `<h3> $ ${new Intl.NumberFormat('es-ES').format(suma.suma)}</h3>`;
    document.getElementById("iva").innerHTML = `<h3> $ ${new Intl.NumberFormat('es-ES').format(suma.porcent)}</h3>`;
    document.getElementById("total").innerHTML = `<h3> $ ${new Intl.NumberFormat('es-ES').format(suma.suma + suma.porcent)}</h3>`;

}

document.getElementById("body").addEventListener("click", function (e) {
    if (e.target.classList.contains("button-delete")) {
        dele(e.target.id);
    }
})

function dele(id) {
    let dataTotal = [];
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    let idCart = id;
    invoices.map(function (item) {
        item = JSON.parse(item);
        for (let i = 0; i < item.length; i++) {
            if (item[i].id == idCart) {
                item.splice(i, 1);
            }
        }
        dataTotal.push(JSON.stringify(item));
        for (let i = 0; i < dataTotal.length; i++) { // Para eliminar el elemento del localStorage
            if (dataTotal[i] === "[]" || dataTotal[i] === null) {
                dataTotal.splice(i, 1);
            }
        }
    });
    localStorage.setItem("Invoices", JSON.stringify(dataTotal));
    readCheckout();
    productNull();
    totalCheckout();
}


function showProducts() {
    let b = document.getElementById("products");
    b.innerHTML = '';
    let v;
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        value = JSON.parse(value);
        value.forEach(tour => {
            tour = JSON.parse(tour);
            tour.forEach(product => {
                if (localStorage.length > 1) {
                    console.log(value);
                }
              b.innerHTML += `<div class="container-span"><span class="span-title">${product.title}<div class="i-dele"><i onclick="dele('${product.id}')" id="delete" class="fi fi-rr-cross-circle"></i></div><span></div>`
            })
        })
    }
}

function productNull() {
    if (document.getElementById("content_product_checkout").innerHTML === '') {
        document.getElementById("content_product_null").style.visibility = "visible";
        document.getElementById("container_product").style.visibility = "hidden";
        document.getElementById("container_product").style.position = "absolute";
        document.getElementById("subtotal_checkout").style.visibility = "hidden";
        document.getElementById("iva").style.visibility = "hidden";
        document.getElementById("container-total").style.visibility = "hidden";
        document.getElementById("container-total").style.position = "absolute";
        document.getElementById("total").style.visibility = "hidden";
        document.getElementById("total").style.position = "absolute";
        document.getElementById("container_product").style.position = "absolute";
        document.getElementById("subtotal_checkout").style.position = "absolute";
        document.getElementById("iva").style.position = "absolute";
    } else {
        document.getElementById("content_product_null").style.position = "block";
        document.getElementById("content_product_null").style.visibility = "hidden";
    }
}

function rankStar() {
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    let container;
    for (let i = 0; i < invoices.length; i++) {
        invoices[i] = JSON.parse(invoices[i]);
        for (let j = 0; j < invoices[i].length; j++) {
            const { rank, id } = invoices[i][j];
            container = document.getElementById(id);
            container.innerHTML = '';
            for (let r = 0; r < rank; r++) {
                container.innerHTML += `<i class="fi fi-sr-star"></i>`;
            }
            console.log(container);
        }
    }
}

readCheckout();
totalCheckout();