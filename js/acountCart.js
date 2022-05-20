
let totalSum = 0;
let total = 0;
var cart;
let totalCarts = [];
let pro = [];
const URL = 'https://api-tours-default-rtdb.firebaseio.com/tours.json';





if ((window.location.href === 'http://localhost/paginaTours/tours/shop.html') || (window.location.href === 'https://toursopen.netlify.app/shop.html')) {
    window.onload = readOutsideOrInsideTour;
}

readOutsideOrInsideTour.onload = verifyContentStorage;

function readOutsideOrInsideTour() {
    console.log("readOutsideOrInsideTour");
    let showOutside = '';
    let showInside = '';
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            totalCarts = data;
            console.log(totalCarts)
            try {
                for (let i = 0; i < data.length; i++) {
                    const { title, img, price, include, id, type } = data[i];
                    let newPrice = new Intl.NumberFormat('es-ES').format(price);
                    if (type === 'outside') {
                        console.log(type)
                        showOutside += `<div id="div" class="product-container">
                    <h3>${title}</h3>
                    <img src="img/${img}" />
                    <div class="container-included">
                      <div id="${title}"></div>
                    </div>
                    <h4>$ ${newPrice}</h4>
                    <button id="add${id}" onclick="add('${id}')" class="button-add">Agregar</button>
                    <button style="visibility: hidden" id="${id}" onclick="deleteItem('${id}')" class="button-add">Quitar</button>
                </div>`
                    } else {
                        showInside += `<div id="div" class="product-container">
                        <h3>${title}</h3>
                        <img src="img/${img}" />
                        <div class="container-included">
                          <div id="${title}"></div>
                        </div>
                        <h4>$ ${newPrice}</h4>
                        <button id="add${id}" onclick="add('${id}')" class="button-add">Agregar</button>
                        <button style="visibility: hidden" id="${id}" onclick="deleteItem('${id}')" class="button-delete">Quitar</button>
                    </div>`
                    }
                }
                document.getElementById("content_product").innerHTML = showOutside;
                document.getElementById("carousel__container_content_product").innerHTML = showInside;
                verifyContentStorage();
                btnPay();
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
            console.log(total);
        }
    }

    let b = document.getElementById("checkoutB");
    let w = document.getElementById("w");

    if (total > 0) {
        b.style.visibility = "visible";
    }

    totalSum = new Intl.NumberFormat('es-ES').format(total);
    document.getElementById("checkoutB").innerHTML = `Pagar $${totalSum}`;
    btnPay();
    verifyContentStorage();
}

function btnPay() {
    let totalPrice = 0;
    let b = document.getElementById("checkoutB");
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        value = JSON.parse(value);
        value.map(tour => {
            tour = JSON.parse(tour);
            for (let j = 0; j < tour.length; j++) {
                totalPrice += tour[j].price;
            }
        })
    }

    if (totalPrice > 0) {
        console.log("entro en btn");
        b.style.visibility = "visible";
        totalPrice = new Intl.NumberFormat('es-ES').format(totalPrice);
        b.innerHTML = `Pagar $${totalPrice}`;
    }
    if (totalPrice == 0) {
        b.style.visibility = "hidden";
    }
}

function verifyContentStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        value = JSON.parse(value);
        if (value.length > 0) {
            for (let j = 0; j < value.length; j++) {
                value[j] = JSON.parse(value[j]);
                value[j].map(tour => {
                    const { id } = tour;
                    const idBtn = "add" + id;
                    console.log(idBtn);
                    document.getElementById(idBtn).style.visibility = "hidden";
                    document.getElementById(id).style.visibility = "visible";
                    document.getElementById(id).style.position = "absolute";
                })
            }
        }
    }
}

function deleteItem(id) {
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
            for (let i = 0; i < dataTotal.length; i++) {
                if (dataTotal[i] === "[]" || dataTotal[i] === null) {
                    dataTotal.splice(i, 1);
                }
            }
            console.log(dataTotal);
        });
        localStorage.setItem("Invoices", JSON.stringify(dataTotal));
        readOutsideOrInsideTour();
        verifyContentStorage();
}