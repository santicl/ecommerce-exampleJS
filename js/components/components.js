export const showCarts = (tour, newPrice) => {
    console.log("showcarts");
    return `<div id="div" class="product-container">
    <h3>${tour.title}</h3>
    <img src="img/${tour.img}" />
    <div class="container-included">
      <div id="${tour.title}"></div>
    </div>
    <h4>$ ${newPrice}</h4>
    <div id="${tour.id}-${tour.title}">
    <button class="button-add">
    <a href='https://api.whatsapp.com/send?phone=573162421339&text=Hola%20TourOpen%20%F0%9F%98%84%F0%9F%98%84%3B%20estoy%20interesado%20en%20el%20tour%20${tour.title}' class="button-add">Cotizar</a>
    </button>
    </div>
</div>`;
}

export const verifyBtnRemove = () => {
    let btnState = true;
    let dataContent = {};
    let tour = JSON.parse(localStorage.getItem("Invoices"));
    for (let i = 0; i < tour.length; i++) {
        tour[i] = JSON.parse(tour[i]);
        for (let j = 0; j < tour[i].length; j++) {
            const { id, title } = tour[i][j];
            dataContent = { btnState, id, title };
            let IDChange = getIdTransform(dataContent);
            console.log(document.getElementById(IDChange));
            document.getElementById(IDChange).innerHTML = `<button id="${id}" class="button-remove">Quitar</button>`;
        }
    }
    arrayElementsByBtn();
    arrayBtnItems();
}

const arrayElementsByBtn = () => {
    let btns = document.getElementsByClassName("button-remove");
    for (const el of btns) {
        el.addEventListener('click', (e) => {
            modifyClassName(e.target.id);
            deleteItem(e.target.id);
        })
    }
}

const getIdTransform = (dataContent) => {
    let ID;
    if (dataContent.btnState === true) {
        ID = dataContent.id + "-" + dataContent.title;
    }
    if (dataContent.btnState === false) {
        ID = dataContent.title + "-" + dataContent.id;
    }
    return ID;
}

const deleteItem = (ID) => {
    console.log("delete");
    let dataTotal = [];
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    invoices.map(function (item) {
        item = JSON.parse(item);
        for (let i = 0; i < item.length; i++) {
            const { id, title } = item[i];
            if (id == ID) {
                console.log(ID);
                item.splice(i, 1);
            }
        }
        dataTotal.push(JSON.stringify(item));
        for (let i = 0; i < dataTotal.length; i++) {
            if (dataTotal[i] === "[]" || dataTotal[i] === null) {
                dataTotal.splice(i, 1);
            }
        }
    });
    localStorage.setItem("Invoices", JSON.stringify(dataTotal));
    btnPay();
}

const modifyClassName = (idBtn) => {
    let tour = JSON.parse(localStorage.getItem("Invoices"));
    for (let i = 0; i < tour.length; i++) {
        tour[i] = JSON.parse(tour[i]);
        console.log(tour[i]);
        for (let j = 0; j < tour[i].length; j++) {
            const { id, title } = tour[i][j];
            if (id == idBtn) {
                document.getElementById(id + "-" + title).innerHTML = `<button id="${id}" class="button-add">Agregar</button>`;
            }
        }
    }
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

export const getSumaAsync = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
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

const getItems = (data, idData) => {
    let newData;
    for (let i = 0; i < data.length; i++) {
        data[i] = JSON.parse(data[i]);
        for (let j = 0; j < data[i].length; j++) {
            const { id } = data[i][j];
            if (id === idData) {
                newData = data[i][j];
            }
        }
    }
    return newData;
}

export const arrayBtnItems = () => {
    let btnAdd = document.getElementsByClassName("button-add");
    for (const el of btnAdd) {
        el.addEventListener('click', (e) => {
            // getID for set to API Firebase.
            let tour = JSON.parse(localStorage.getItem("Invoices"));
            let getTour = getItems(tour, e.target.id);
            console.log(getTour);
        })
    }
}