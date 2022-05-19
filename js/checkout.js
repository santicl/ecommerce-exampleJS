window.onload = readCheckout;
readCheckout.onload = dele;
readCheckout.onload = productNull;
readCheckout.ready = totalCheckout;
readCheckout.ready = returnItemDescription;
readCheckout.ready = showProducts;
readCheckout.ready = rank;

const url = 'https://api-tours-default-rtdb.firebaseio.com/tours.json';

let acountTotal = [];
let totalSuma = [];

function load() {
    $(window).load(function () {
        $(".loader").fadeOut("slow");
        document.getElementById("page_pay").style.position = "block";
    })
}

function readCheckout() {
    if ((window.location.href === 'http://localhost/paginaTours/tours/checkout.html') || (window.location.href === 'https://toursopen.netlify.app/checkout.html')) {
        let invoices = JSON.parse(localStorage.getItem("Invoices"));
        console.log(invoices);
        acountTotal = invoices;
        let title = '';


        productNull();
        document.getElementById("content_product_checkout").innerHTML = '';
        for (let i = 0; i < invoices.length; i++) {

            invoices[i] = JSON.parse(invoices[i]);


            for (let j = 0; j < invoices[i].length; j++) {
                title += "(" + invoices[i][j].title + ") ";
                let price = new Intl.NumberFormat('es-ES').format(invoices[i][j].price);
                document.getElementById("content_product_checkout").innerHTML += `<div class="container-products">
                <div class="produc">
                        <img src="img/${invoices[i][j].img}" alt="${invoices[i][j].title}">
                    <div class="descriptions">
                        <h2>${invoices[i][j].title}</h2>
                        <div class="star" id="${invoices[i][j].id}"></div>
                    </div>
                    <div class="rank-and-btn">
                        <button class="button-dele" onclick="dele('${invoices[i][j].id}')">Eliminar</button>
                    </div>
                </div>
            </div>`;
            }

        }
        let input = document.getElementById("content-input__title").value = title;
        console.log(input);
        totalCheckout();
    }
    showProducts();
    rank();
}

function showDescriptions() {
    let container;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let value = localStorage.getItem(key);
        value = JSON.parse(value);
        for (let j = 0; j < value.length; j++) {
            let value2 = JSON.parse(value[j]);
            value2.map(contentDescription => {
                const { include, title } = contentDescription;
                container = document.getElementById(title);
                container.innerHTML = '';
                include.map(description => {
                    container.innerHTML += `<li class="list"><i class="fi fi-br-shield-check"></i> ${description}</li><br>`;
                })
            })
        }
    }
    productNull();
    totalCheckout();
}


function totalCheckout() {
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    let suma = 0;
    let porcent = 0;
    for (let i = 0; i < invoices.length; i++) {
        invoices[i] = JSON.parse(invoices[i]);
        for (let j = 0; j < invoices[i].length; j++) {
            invoices[i][j].price = parseInt(invoices[i][j].price);
            suma += invoices[i][j].price;
            porcent = suma * 0.19;
            console.log(suma);
        }
    }
    let sumaT = suma + porcent;
    document.getElementById("sub").innerHTML = `<h3> $ ${new Intl.NumberFormat('es-ES').format(suma)}</h3>`;
    document.getElementById("iva").innerHTML = `<h3> $ ${new Intl.NumberFormat('es-ES').format(porcent)}</h3>`;
    document.getElementById("total").innerHTML = `<h3> $ ${new Intl.NumberFormat('es-ES').format(sumaT)}</h3>`;

}



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
        for (let i = 0; i < dataTotal.length; i++) {
            if (dataTotal[i] === "[]" || dataTotal[i] === null) {
                dataTotal.splice(i, 1);
            }
        }
        console.log(dataTotal);
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
        document.getElementById("content_product_null").style.visibility = "hidden";
        document.getElementById("content_product_null").style.position = "block";
    }
}

function rank() {
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    let rankStars;
    let container;
    for (let i = 0; i < invoices.length; i++) {
        invoices[i] = JSON.parse(invoices[i]);
        for (let j = 0; j < invoices[i].length; j++) {
            const { rank, id } = invoices[i][j];
            container = document.getElementById(id);
            container.innerHTML = '';
            for (let r = 0; r < rank; r++) {
                container.innerHTML += `<i class="fi fi-ss-star"></i>`;
            }
            console.log(container);
        }
    }
}

readCheckout();
totalCheckout();