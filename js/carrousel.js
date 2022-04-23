const btnPrev = document.getElementById('button-prev');
const btnNext = document.getElementById('button-next');
const track = document.getElementById('track');
const slickList = document.getElementById('slick-list');
const slick = document.querySelectorAll('.slick');

const slickW = slick[0].offsetWidth;

btnPrev.onclick = () => Move(1);
btnNext.onclick = () => Move(2);

function Move(value){
    const trackW = track.offsetWidth;
    const listW = slickList.offsetWidth;

    track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);
    if(leftPosition < (trackW - listW) && value == 2) {
        track.style.left = `${-1 * (leftPosition + slickW)}px`;
    } else if(leftPosition > 0 && value == 1){
        track.style.left = `${-1 * (leftPosition - slickW)}px`;
    }
}