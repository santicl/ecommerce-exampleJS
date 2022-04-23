
let totalSum = 0;
let total = 0;
var cart;
let totalCarts = [];
let pro = [];





if (window.location.href === 'http://localhost/paginaTours/tours/shop.html') {
    window.onload = read;
}

//read.onload = removeCommon;

function read() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'products.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText); //Obtengo los datos.
            totalCarts = data;
            console.log(totalCarts);
            document.getElementById("content_product").innerHTML = '';
            for (var i = 0; i < data.length; i++) {
                let title = data[i].title;
                let img = data[i].img;
                let priceShow = data[i].price;
                //let included = data[i].include;
                //pro.push(data[i].include)
                //console.log(data[i].include)
                //let datas = [];


             
                let price = new Intl.NumberFormat('es-ES').format(data[i].price);
                let id = data[i].id;
                //console.log(datas)
                document.getElementById("content_product").innerHTML += `<div id="div" class="product-container">
                    <h3>${title}</h3>
                    <img src="img/${img}" />
                    <div class="container-included">
                      <span id="span">${data[i].include.map(item => {
                    //console.log(item.pro);
                    return `<li class="list"><i class="fi fi-br-shield-check"></i> ${item.pro}</li>`
                })}</span>
                    </div>
                    <h4>$ ${price}</h4>
                    <button id="add" class="button-add" onclick = "add(${priceShow}, ${id})">Agregar</button>
                </div>`;
            }
        } 
    }
    removeCommon();
}


function removeCommon() {
    let body = document.getElementById("body");
    console.log(body.childNodes);
    let nodes = body.childNodes;
    for (let i = 0; i < nodes.length; i++) {
        //console.log(nodes[i].textContent);
        if (nodes[i].nodeValue == "\n    ") {
            console.log("si esta");
            //nodes[i].ownerDocument.hidden = true;
            console.log(nodes[i].textContent)
        }
    }
    //c = span.innerHTML.replace(",", "");
    //c = c.replace(",", "");
    //c = c.replace(",", "");
    //document.getElementById("span").innerHTML = c;
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
            //console.log(dataCarts + "Es donde se muestra");
        }
    }

    //console.log(d);
    data.push(dataCarts);
    console.log(data);
    //dataCarts.push(totalCarts[i]);
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
