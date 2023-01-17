const islands = [
    { img: './img/islas-del-rosario.webp', name: 'Islas del Rosario' },
    { img: './img/isla-fuerte.jpg', name: 'Isla Fuerte' },
    { img: './img/isla-san-bernardo.jpg', name: 'Isla San Bernardo' },
    { img: './img/isla-baru.jpg', name: 'Isla Barú' },
    { img: './img/tierra-bomba.jpg', name: 'Tierra Bomba' }
]

islands.map(isla => {
    document.getElementById("islands").innerHTML += `<a id="div" class="island-item">
    <img id="${isla.name}" src="${isla.img}" alt="${isla.name}" />
            <div id="${isla.name}" class="island-info">
                <h3 id="${isla.name}">${isla.name}</h3>
            </div>
    </div>
</a>`;
})