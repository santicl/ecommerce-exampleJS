window.addEventListener("load", function() {
    new Glider(document.querySelector('.content_product'), {
        slidesToShow: 5,
        slidesToScroll: 5,
        draggable: true,
        dots: '.carousel__indicadores',
    });
    showNext();
});


function showNext() {
    new Glider(document.querySelector('.carousel__container_content_product'), {
        slidesToShow: 3,
        slidesToScroll: 3,
        draggable: true,
        dots: '.carousel__indicadores_inside',
    });
}