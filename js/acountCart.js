
let totalSum = 0;
let total = 0;
var cart;
let totalCarts = [];
let pro = [];





if (window.location.href === 'http://localhost/paginaTours/tours/shop.html') {
    window.onload = read;
}

const URL = 'https://api-tours-default-rtdb.firebaseio.com/tours.json';

function proof() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}

proof();

function read() {
    let show = '';
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            try {
                for (let i = 0; i < data.length; i++) {
                    console.log("enteo")
                    const { title, img, price, include } = data[i];
                    show += `<div id="div" class="product-container">
                    <h3>${title}</h3>
                    <img src="img/${img}" />
                    <div class="container-included">
                      <div id="span">${include.map(item => {
                        //console.log(item.pro);
                        return `<li class="list"><i class="fi fi-br-shield-check"></i> ${item}</li>`
                    })}</div>
                    </div>
                    <h4>$ ${price}</h4>
                    <button id="add" class="button-add">Agregar</button>
                </div>`
                }
                document.getElementById("content_product").innerHTML = show;
            } catch (error) {
                console.log(error);
            }
        })
}



function add(price, id) {
    let dataCarts = [];
    let data = [];

    cart = id;
    //console.log(id)
    for (let i = 0; i < totalCarts.length; i++) {
        if (totalCarts[i].id == cart) {
            console.log(totalCarts[i])
            dataCarts.push(totalCarts[i]);
            dataCarts = JSON.stringify(dataCarts);
        }
    }

    data.push(dataCarts);
    console.log(data);
    if (localStorage.getItem("Invoices") === null) {
        let invoices = [];
        invoices.push(dataCarts);
        localStorage.setItem("Invoices", JSON.stringify(invoices));
    } else {
        let invoices = JSON.parse(localStorage.getItem("Invoices"));
        invoices.push(dataCarts);
        localStorage.setItem("Invoices", JSON.stringify(invoices));
    }

    console.log("Se guardo correctamente");

    let productPrice = price;
    console.log(productPrice);
    total += productPrice;

    let b = document.getElementById("checkoutB");
    let w = document.getElementById("w");

    if (total > 0) {
        b.style.visibility = "visible";
    }

    totalSum = new Intl.NumberFormat('es-ES').format(total);
    document.getElementById("checkoutB").innerHTML = `Pagar $${totalSum}`;
}
