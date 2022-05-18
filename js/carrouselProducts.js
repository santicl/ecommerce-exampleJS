window.addEventListener("load", function() {
    new Glider(document.querySelector('.content_product'), {
        slidesToShow: 5,
        slidesToScroll: 5,
        draggable: true,
        dots: '.carousel__indicadores',
        arrows: {
            prev: '.carousel__btn-anterior',
            next: '.carousel__btn-despues'
        }
    });
})