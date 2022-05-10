
let totalSum = 0;
let total = 0;
var cart;
let totalCarts = [];
let pro = [];
const URL = 'https://api-tours-default-rtdb.firebaseio.com/tours.json';





if ((window.location.href === 'http://localhost/paginaTours/tours/shop.html') || (window.location.href === 'https://toursopen.netlify.app/shop.html')) {
    window.onload = read;
}

function read() {
    let show = '';
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            totalCarts = data;
            console.log(totalCarts)
            try {
                for (let i = 0; i < data.length; i++) {
                    const { title, img, price, include, id } = data[i];
                    let returnItem = returnItemDescription(include);
                    show += `<div id="div" class="product-container">
                    <h3>${title}</h3>
                    <img src="img/${img}" />
                    <div class="container-included">
                      <div id="${title}"></div>
                    </div>
                    <h4>$ ${price}</h4>
                    <button id="add" onclick="add('${id}')" class="button-add">Agregar</button>
                </div>`
                }
                document.getElementById("content_product").innerHTML = show;
            } catch (error) {
                console.log(error);
            }
        })
        .catch(error => console.log(error));
    returnItemDescription();
}

function returnItemDescription() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const { title, img, price, include, id } = data[i];
                container = document.getElementById(title);
                container.innerHTML = '';
                for (let j = 0; j < include.length; j++) {
                    container.innerHTML += `<li class="list"><i class="fi fi-br-shield-check"></i> ${include[j]}</li><br>`;
                }
            }
        })
  }



function add(id) {
    let dataCarts = [];
    let data = [];
    cart = id;
    console.log(id)
    for (let i = 0; i < totalCarts.length; i++) {
        console.log(totalCarts[i].id)
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
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    for (let i = 0; i < invoices.length; i++) {
        invoices[i] = JSON.parse(invoices[i]);
        console.log(invoices[i]);
        for (let j = 0; j < invoices[i].length; j++) {
            invoices[i][j].price = parseInt(invoices[i][j].price);
            total += invoices[i][j].price;
            console.log(suma);
        }
    }

    let b = document.getElementById("checkoutB");
    let w = document.getElementById("w");

    if (total > 0) {
        b.style.visibility = "visible";
    }

    totalSum = new Intl.NumberFormat('es-ES').format(total);
    document.getElementById("checkoutB").innerHTML = `Pagar $${totalSum}`;
}
