import { sumTotal, API_WapSend } from "./components/components.js";

var sumCarts = 0;

window.onload = readCheckout;
readCheckout.onload = productNull;
readCheckout.ready = totalCheckout;
readCheckout.ready = showProducts;
readCheckout.ready = rankStar;

let acountTotal = [];

const url = 'https://api-tours-default-rtdb.firebaseio.com/tours.json';

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
    }

    showProducts();
    rankStar();
}

function totalCheckout(sumCarts) {
    let suma = sumTotal();
    document.getElementById("code").value = "";
    document.getElementById("sub").innerHTML = `<h3> $ ${new Intl.NumberFormat('es-ES').format(suma.suma)}</h3>`;
    document.getElementById("discount").innerHTML = `<h3>- $ ${new Intl.NumberFormat('es-ES').format(sumCarts)}</h3>`;
    document.getElementById("total").innerHTML = `<h3> $ ${new Intl.NumberFormat('es-ES').format(suma.suma)}</h3>`;

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
}


function showProducts() {
    let productContainer = document.getElementById("products");
    productContainer.innerHTML = '';
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
                productContainer.innerHTML += `<div class="container-span"><span class="span-title">${product.title}<div class="i-dele"><i onclick="dele('${product.id}')" id="delete" class="bi bi-trash-fill"></i></div><span></div>`
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
                container.innerHTML += `<i class="bi bi-star-fill"></i>`;
            }
        }
    }
}

readCheckout();
totalCheckout(sumCarts);

document.getElementById("btnCheck").addEventListener("click", function (e) {
    e.preventDefault();
    API_WapSend();
});

document.getElementById("code-apply").addEventListener("click", function () {
    let code = document.getElementById("code").value;
    let tour = JSON.parse(localStorage.getItem("Invoices"));
    let data;
    getDescount(code, tour, data);
});

const getDescount = (code, tour, data) => {
    let tours = [];
    let sumPorcent;
    if (code === "3212") {
        for (let i = 0; i < tour.length; i++) {
            tour[i] = JSON.parse(tour[i]);
            for (let j = 0; j < tour[i].length; j++) {
                if (tour[i][j].des === false) {
                    sumPorcent = tour[i][j].price * 0.10;
                    sumCarts = sumCarts + sumPorcent;
                    tour[i][j].price = tour[i][j].price - sumPorcent;
                    tour[i][j].des = true;
                    tour[i] = JSON.stringify(tour[i]);
                    data = tour[i];
                    tours.push(data);
                    localStorage.setItem("Invoices", JSON.stringify(tours));
                }
                if (tour[i][j].des === true) {
                    alert("El código ya fue aplicado a: " + tour[i][j].title);
                    tour[i] = JSON.stringify(tour[i]);
                    data = tour[i];
                    tours.push(data);
                    localStorage.setItem("Invoices", JSON.stringify(tours));
                }
            }
        }
    } else {
        alert("Código no válido");
    }
    //window.location.reload();
    totalCheckout(sumCarts);
}

window.onbeforeunload = function () {
    localStorage.clear();
    return "¿Estás seguro de que quieres salir?";
}

function verifyContent() {
    let content = JSON.parse(localStorage.getItem("Invoices"));
    if (content === null) {
        document.getElementById("container_all").innerHTML = showNull();
    } else if(content !== null) {
        readCheckout();
    }
}

function showNull() {
    return `
    <div id="content_product_null" class="page-content">
        <div class="container-btn-shop text-center">
            <img class="img_cart" src="img/cart.jpg" alt="" loading="lazy">
            <a href="index.html" class="btn custom-btn">Comprar en la tienda</a>
        </div>
    </div>
    `;
}