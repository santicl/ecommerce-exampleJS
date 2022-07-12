export const showCarts = (tour, newPrice) => {
    return `<div id="div" class="product-container">
    <h3>${tour.title}</h3>
    <img src="img/${tour.img}" />
    <div class="container-included">
      <div id="${tour.title}"></div>
    </div>
    <h4>$ ${newPrice}</h4>
    <button id="${tour.id}" class="button-add">Agregar</button>
    <button style="visibility: hidden" id="${tour.id}" onclick="deleteItem('${tour.id}')" class="button-delete">Quitar</button>
</div>`;
}

export const verifyContentStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        value = JSON.parse(value);
        if (value.length > 0) {
            for (let j = 0; j < value.length; j++) {
                value[j] = JSON.parse(value[j]);
                value[j].map(tour => {
                    const { id } = tour;
                    const idBtn = id + "quip";
                    document.getElementById(idBtn).style.visibility = "hidden";
                    document.getElementById(id).style.visibility = "visible";
                    document.getElementById(id).style.position = "absolute";
                })
            }
        }
    }
}

export const getDataTour = (value) => {
    const { title, img, id } = value;
    const tour = { title, img, id };
    return tour;
}

export const sumTotal = () => { //aqui se puede hacer el descuento del 10%
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    let suma = 0, porcent = 0, sumAndPorcent = {};
    
    for (let i = 0; i < invoices.length; i++) {
        invoices[i] = JSON.parse(invoices[i]);
        for (let j = 0; j < invoices[i].length; j++) {
            invoices[i][j].price = parseInt(invoices[i][j].price);
            suma += invoices[i][j].price;
            porcent = suma * 0.19;
        }
        sumAndPorcent = { suma, porcent };
    }
    return sumAndPorcent;
}

export const btnPay = () => {
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
        b.style.visibility = "visible";
        totalPrice = new Intl.NumberFormat('es-ES').format(totalPrice);
        b.innerHTML = `Pagar $${totalPrice}`;
    }
    if (totalPrice == 0) {
        b.style.visibility = "hidden";
    }
}

export const API_WapSend = () => {
        let name = document.getElementById("name").value;
        let date = document.getElementById("date-tour").value;
        let hourLocal = document.getElementById("hour-local").value;
        let numberPerson = document.getElementById("number-persons").value;
        let tours = getTours();

        const API = 'https://api.whatsapp.com/send?phone=573162421339&text=Hola%20%F0%9F%98%8A%2C%20mi%20nombre%20es%20' + name + '%20deseo%20reservar%20uno%20o%20varios%20tures%20como%20' + tours + '%2C%20en%20la%20hora%20y%20fecha%20' + hourLocal + ' ' + date + '%20%2C%20para%20' + numberPerson + '%2C%20quisiera%20mas%20informaci%C3%B3n';
        window.location.href = API;
}

const getTours = () => {
    let data = " ";
    let tour = JSON.parse(localStorage.getItem("Invoices"));
    for (let i = 0; i < tour.length; i++) {
        tour[i] = JSON.parse(tour[i]);
        for (let j = 0; j < tour[i].length; j++) {
            const { title } = tour[i][j];
        data += title + ", ";
        }
    }
    return data;
}