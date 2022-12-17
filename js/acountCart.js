import { showCarts, getDataTour, btnPay, sumTotal, verifyBtnRemove, getSumaAsync } from "./components/components.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getDatabase, ref, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD0lXJwJCWfoyyMeQm8I5CS83qFsqaAU-0",
    authDomain: "db-checkout.firebaseapp.com",
    databaseURL: "https://db-checkout-default-rtdb.firebaseio.com",
    projectId: "db-checkout",
    storageBucket: "db-checkout.appspot.com",
    messagingSenderId: "554449152349",
    appId: "1:554449152349:web:97acf721cbb9609526e0b4",
    measurementId: "G-F2TNB7KC4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// API TOURS
const URL = 'https://api-tours-default-rtdb.firebaseio.com/tours.json';
const URL_DB_CHECKOUT = 'https://db-checkout-default-rtdb.firebaseio.com/tour.json';

let totalSum = 0, total = 0, totalCarts = [];
var cart;

if ((window.location.href === 'http://localhost/paginaTours/tours/') || (window.location.href === 'https://toursopen.netlify.app/' || window.location.href === 'https://toursopen.netlify.app/index.html' || window.location.href === 'http://localhost/paginaTours/tours/index.html')) {
    window.onload = readOutsideOrInsideTour;
}

readOutsideOrInsideTour.onload = returnItemDescription;
readOutsideOrInsideTour.onload = verifyBtnRemove;

function readOutsideOrInsideTour() {
    localStorage.clear();
    let showOutside = '', showInside = '';
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            totalCarts = data;
            try {
                for (let i = 0; i < data.length; i++) {
                    let { type, price } = data[i];
                    let newPrice = new Intl.NumberFormat('es-ES').format(price);
                    if (type === 'outside') {
                        showOutside += showCarts(getDataTour(data[i]), newPrice);
                    } else {
                        showInside += showCarts(getDataTour(data[i]), newPrice);
                    }
                }
                document.getElementById("content_product").innerHTML = showOutside;
                document.getElementById("carousel__container_content_product").innerHTML = showInside;
                verifyBtnRemove();
            } catch (error) {
                console.log(error);
            }
        })
        .catch(error => console.log(error));
    returnItemDescription();
    btnPay();
}

function returnItemDescription() {
    let container = '';
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const { title, include } = data[i];
                container = document.getElementById(title);
                container.innerHTML = '';
                for (let j = 0; j < include.length; j++) {
                    container.innerHTML += `<li class="list"><i class="bi bi-check2-circle"></i> ${include[j]}</li><br>`;
                }
            }
        })
}

document.getElementById("body-shop").addEventListener("click", function (e) {
    if (e.target.classList.contains("button-add")) {
        add(e.target.id);
    }
})

function add(id) {
    let dataCarts = [], data = [], b = document.getElementById("checkoutB");;
    cart = id;
    for (let i = 0; i < totalCarts.length; i++) {
        if (totalCarts[i].id == cart) {
            dataCarts.push(totalCarts[i]);
            dataCarts = JSON.stringify(dataCarts);
            insertDB(totalCarts[i], totalCarts[i].id);
        }
    }

    if (localStorage.getItem("Invoices") === null) {
        let invoices = [];
        invoices.push(dataCarts);
        localStorage.setItem("Invoices", JSON.stringify(invoices));
    } else {
        let invoices = JSON.parse(localStorage.getItem("Invoices"));
        invoices.push(dataCarts);
        localStorage.setItem("Invoices", JSON.stringify(invoices));
    }

    total = sumTotal();

    if (total.suma > 0) {
        b.style.visibility = "visible";
    }

    totalSum = new Intl.NumberFormat('es-ES').format(total.suma);
    document.getElementById("checkoutB").innerHTML = `Pagar $${totalSum}`;
    verifyBtnRemove();
}

const insertDB = (data, id) => {
    set(ref(db, 'tour/' + id), {
        title: data.title,
        price: data.price,
        type: data.type,
        include: data.include,
        id: data.id,
        rank: data.rank
    });
}

const removeItem = (id) => {
    remove(ref(db, 'tour/' + id));
}

readOutsideOrInsideTour.onload = async (URL_DB_CHECKOUT) => {
    let data = await getSumaAsync(URL_DB_CHECKOUT);
    console.log(data);
}


/*
import { showCarts, getDataTour, btnPay, sumTotal, verifyBtnRemove } from "./components/components.js";
import { arrayBtnItems } from "./components/components.js";
//import { initializeApp } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js";
//import { getDatabase } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js";

// CONFIG FIREBASE
//const firebaseConfig = {
//    apiKey: "AIzaSyAYzSPpwPVcQRyv7J7zNbGCFFW_QUc6cKA",
//    authDomain: "bd-api-data.firebaseapp.com",
//    databaseURL: "https://bd-api-data-default-rtdb.firebaseio.com",
//    projectId: "bd-api-data",
//    storageBucket: "bd-api-data.appspot.com",
//    messagingSenderId: "137490408138",
//    appId: "1:137490408138:web:7a05a9d61728c712bbca33",
//    measurementId: "G-HS1VJ4SR1G"
//};

//Firebase
//const app = initializeApp(firebaseConfig);
//const db = getDatabase(app);

// API TOURS
const URL = 'https://api-tours-default-rtdb.firebaseio.com/tours.json';

let totalSum = 0, total = 0, totalCarts = [];
var cart;

if ((window.location.href === 'http://localhost/paginaTours/tours/') || (window.location.href === 'https://toursopen.netlify.app/' || window.location.href === 'https://toursopen.netlify.app/index.html' || window.location.href === 'http://localhost/paginaTours/tours/index.html')) {
    window.onload = readOutsideOrInsideTour;
}

readOutsideOrInsideTour.onload = returnItemDescription;
readOutsideOrInsideTour.onload = verifyBtnRemove;

function readOutsideOrInsideTour() {
    localStorage.clear();
    let showOutside = '', showInside = '';
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            totalCarts = data;
            try {
                for (let i = 0; i < data.length; i++) {
                    let { type, price } = data[i];
                    let newPrice = new Intl.NumberFormat('es-ES').format(price);
                    if (type === 'outside') {
                        showOutside += showCarts(getDataTour(data[i]), newPrice);
                    } else {
                        showInside += showCarts(getDataTour(data[i]), newPrice);
                    }
                }
                document.getElementById("content_product").innerHTML = showOutside;
                document.getElementById("carousel__container_content_product").innerHTML = showInside;
                verifyBtnRemove();
            } catch (error) {
                console.log(error);
            }
        })
        .catch(error => console.log(error));
    returnItemDescription();
    btnPay();
}

function returnItemDescription() {
    let container = '';
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const { title, include } = data[i];
                container = document.getElementById(title);
                container.innerHTML = '';
                for (let j = 0; j < include.length; j++) {
                    container.innerHTML += `<li class="list"><i class="bi bi-check2-circle"></i> ${include[j]}</li><br>`;
                }
            }
        })
}

document.getElementById("body-shop").addEventListener("click", function (e) {
    if (e.target.classList.contains("button-add")) {
        add(e.target.id);
    }
})

function add(id) {
    let dataCarts = [], data = [], b = document.getElementById("checkoutB");;
    cart = id;
    for (let i = 0; i < totalCarts.length; i++) {
        if (totalCarts[i].id == cart) {
            dataCarts.push(totalCarts[i]);
            dataCarts = JSON.stringify(dataCarts);
        }
    }

    if (localStorage.getItem("Invoices") === null) {
        let invoices = [];
        invoices.push(dataCarts);
        localStorage.setItem("Invoices", JSON.stringify(invoices));
    } else {
        let invoices = JSON.parse(localStorage.getItem("Invoices"));
        invoices.push(dataCarts);
        localStorage.setItem("Invoices", JSON.stringify(invoices));
    }

    total = sumTotal();

    if (total.suma > 0) {
        b.style.visibility = "visible";
    }

    totalSum = new Intl.NumberFormat('es-ES').format(total.suma);
    document.getElementById("checkoutB").innerHTML = `Pagar $${totalSum}`;
    verifyBtnRemove();
}
*/