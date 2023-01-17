const islands = [
    { img: './img/islas-del-rosario.webp', name: 'Islas del Rosario', url: 'islas-del-rosario-cartagena-2023.html' },
    { img: './img/isla-fuerte.jpg', name: 'Isla Fuerte', url: '' },
    { img: './img/isla-san-bernardo.jpg', name: 'Isla San Bernardo', url: 'isla-de-san-bernardo.html' },
    { img: './img/isla-baru.jpg', name: 'Isla Barú', url: 'baru-playa-blanca.html' },
    { img: './img/tierra-bomba.jpg', name: 'Tierra Bomba', url: 'tierra-bomba.html' }
]

islands.map(isla => {
    document.getElementById("islands").innerHTML += `<a href="${isla.url}" id="div" class="island-item">
    <img id="${isla.name}" src="${isla.img}" alt="${isla.name}" />
            <div id="${isla.name}" class="island-info">
                <h3 id="${isla.name}">${isla.name}</h3>
            </div>
    </div>
</a>`;
})