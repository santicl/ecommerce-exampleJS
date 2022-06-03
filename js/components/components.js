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
    console.log("entro en verify");
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
                    console.log(idBtn);
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

export const sumTotal = () => {
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