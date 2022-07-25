document.getElementById("btn-cus").addEventListener('click', () => {
    const ss = 'Medellín%2C+Antioquia%2C+Colombia';
    const numberRooms = document.getElementById("rooms").value;
    const newDate = new Date();
    const year = newDate.getUTCFullYear();
    let day = newDate.getDate();
    let month = newDate.getMonth();
    let monthBefore = month + 1;
    if (window.location.href === 'http://localhost/paginaTours/tours/hoteles-en-cartagena-de-indias.html' || window.location.href === 'https://toursopen.netlify.app/hoteles-en-cartagena-de-indias.html') {
        const URL_NEW_WINDOW = 'https://www.booking.com/searchresults.es.html?aid=2233299&sid=476b093bdf2306ce2cd3ea489c7cd091&sb=1&sb_lp=1&src=theme_landing_index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fhotel%2Findex.es.html%3Faid%3D2233299%26sid%3D476b093bdf2306ce2cd3ea489c7cd091%26&ss=Cartagena+de+Indias%2C+Bol%C3%ADvar%2C+Colombia&is_ski_area=&checkin_year=' + year + '&checkin_month=' + month + '&checkin_monthday=' + day + '&checkout_year=' + year + '&checkout_month=' + monthBefore + '&checkout_monthday=' + day + '&group_adults=2&group_children=0&no_rooms=' + numberRooms + '&b_h4u_keep_filters=&from_sf=1&ss_raw=car&ac_position=0&ac_langcode=es&ac_click_type=b&dest_id=-579943&dest_type=city&iata=CTG&place_id_lat=10.425008&place_id_lon=-75.546906&search_pageview_id=10d87aa1538701ea&search_selected=true&search_pageview_id=10d87aa1538701ea&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0';
        window.open(URL_NEW_WINDOW)
    }
    if (window.location.href === 'http://localhost/paginaTours/tours/hoteles-en-medellin.html' || window.location.href === 'http://toursopen.netlify.app/hoteles-en-medellin.html') {
        const URL_NEW_WINDOW = 'https://www.booking.com/searchresults.es.html?aid=2233299&sid=476b093bdf2306ce2cd3ea489c7cd091&sb=1&sb_lp=1&src=theme_landing_index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fhotel%2Findex.es.html%3Faid%3D2233299%26sid%3D476b093bdf2306ce2cd3ea489c7cd091%26&ss=' + ss + '%2C+Bol%C3%ADvar%2C+Colombia&is_ski_area=&checkin_year=' + year + '&checkin_month=' + month + '&checkin_monthday=' + day + '&checkout_year=' + year + '&checkout_month=' + monthBefore + '&checkout_monthday=' + day + '&group_adults=2&group_children=0&no_rooms=' + numberRooms + '&b_h4u_keep_filters=&from_sf=1&ss_raw=car&ac_position=0&ac_langcode=es&ac_click_type=b&dest_id=-579943&dest_type=city&iata=CTG&place_id_lat=10.425008&place_id_lon=-75.546906&search_pageview_id=10d87aa1538701ea&search_selected=true&search_pageview_id=10d87aa1538701ea&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0';
        window.open(URL_NEW_WINDOW)
    }
});