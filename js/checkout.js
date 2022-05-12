window.onload = readCheckout;
readCheckout.onload = dele;
readCheckout.onload = productNull;
readCheckout.ready = totalCheckout;

let acountTotal = [];
let forPerson = 1;
let totalSuma = [];

function load() {
    $(window).load(function () {
        $(".loader").fadeOut("slow");
        heroSecond.style.position = "absolute";
    })
}

function readCheckout() {
    load();
    if ((window.location.href === 'http://localhost/paginaTours/tours/checkout.html') || (window.location.href === 'https://toursopen.netlify.app/checkout.html')) {
        let invoices = JSON.parse(localStorage.getItem("Invoices"));
        console.log(invoices);
        acountTotal = invoices;
        //console.log(acountTotal);
        //console.log(invoices);


        productNull();
        document.getElementById("content_product_checkout").innerHTML = '';
        for (let i = 0; i < invoices.length; i++) {

            invoices[i] = JSON.parse(invoices[i]);


            for (let j = 0; j < invoices[i].length; j++) {
               // console.log(invoices[i][j]);

                //totalSuma.push(invoices[i][j].price);
                //console.log(totalSuma);
                const  { include } = invoices[i][j];
                let price = new Intl.NumberFormat('es-ES').format(invoices[i][j].price);
                document.getElementById("content_product_checkout").innerHTML += `<div class="product-container">
                <h3>${invoices[i][j].title}</h3>
                <img src="img/${invoices[i][j].img}" />
                <div class="container-included">
                      <div id="${invoices[i][j].title}"></div>
                    </div>
                <div class="container-data text-center">
                   <input type="date" name="" id="">
                </div>
                <h4>$ ${price}</h4>
                <button id="add" class="button-add" onclick="dele('${invoices[i][j].id}')">Eliminar</button>
            </div>`;
            }

        }
        totalCheckout();
    }
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

function morePerson(idCant) {
    console.log("entro");
    let id = idCant;
    let dataCarts = [];
    for (let i = 0; i < acountTotal.length; i++) {
        //acountTotal[i] = JSON.parse(acountTotal[i]);
        //console.log(acountTotal[i]);
        for (let j = 0; j < acountTotal[i].length; j++) {
            if (acountTotal[i][j].id == id) {
                acountTotal[i][j].count = parseInt(acountTotal[i][j].count);
                acountTotal[i][j].count = acountTotal[i][j].count + 1;
                acountTotal[i][j].count = acountTotal[i][j].count.toString();
                acountTotal[i] = JSON.stringify(acountTotal[i]);
                //dataCarts.push(JSON.stringify(acountTotal[i][j]));
                //dataCarts.push(totalCarts[i]);
                
            } else if (acountTotal[i][j].id !== id) {
                acountTotal[i] = acountTotal[i];
                console.log(acountTotal[i]);
            }
        }
        //dataCarts.push(acountTotal[i]);
        
    }
    //dataCarts.push(acountTotal);
    console.log(dataCarts);
    console.log(acountTotal);
    localStorage.setItem("Invoices", JSON.stringify(acountTotal));
}

function lessPerson(idCant) {
    console.log("entro");
    let id = idCant;
    //let dataCarts = [];
    for (let i = 0; i < acountTotal.length; i++) {
        //acountTotal[i] = JSON.parse(acountTotal[i]);
        console.log(acountTotal[i]);
        for (let j = 0; j < acountTotal[i].length; j++) {
            if (acountTotal[i][j].id == id) {
                acountTotal[i][j].count = parseInt(acountTotal[i][j].count);
                acountTotal[i][j].count = acountTotal[i][j].count - 1;
                acountTotal[i][j].count = acountTotal[i][j].count.toString();
                acountTotal[i] = JSON.stringify(acountTotal[i]);
                //dataCarts.push(JSON.stringify(acountTotal[i][j]));
                //dataCarts.push(totalCarts[i]);
                
            }
        }
        //dataCarts.push(acountTotal[i]);
        
    }

    localStorage.setItem("Invoices", JSON.stringify(acountTotal));
    readCheckout();
}


function totalCheckout() {
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    let suma = 0;
    let porcent = 0;
    document.getElementById("subtotal_checkout").innerHTML = '';
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

    document.getElementById("subtotal_checkout").innerHTML += `<h3>SubTotal: $ ${new Intl.NumberFormat('es-ES').format(suma)}</h3>`;
    document.getElementById("iva").innerHTML = `<h3>IVA: $ ${new Intl.NumberFormat('es-ES').format(porcent)}</h3>`;
    document.getElementById("total").innerHTML = `<h3>Total: $ ${new Intl.NumberFormat('es-ES').format(sumaT)}</h3>`;
    //document.getElementById("total_checkout").innerHTML = `<h3>Total: $ ${new Intl.NumberFormat('es-ES').format(suma)}</h3>`;


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


function productNull() {
    if (document.getElementById("content_product_checkout").innerHTML === '') {
        document.getElementById("content_product_null").style.visibility = "visible";
        document.getElementById("subtotal_checkout").style.visibility = "hidden";
        document.getElementById("iva").style.visibility = "hidden";
        document.getElementById("total").style.visibility = "hidden";
    } else {
        document.getElementById("content_product_null").style.visibility = "hidden";
    }
}

load();
readCheckout();
totalCheckout();
