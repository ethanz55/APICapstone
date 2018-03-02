const zomatoEndpoint = 'https://developers.zomato.com/api/v2.1/geocode';

function getDataFromApi(searchTerm, callback) {
  const query = {
    // 'user-key': '79f6bb0db344b1df724ab923597bc410',
    lat: searchTerm.coords.latitude,
    lon: searchTerm.coords.longitude
  }
  
  fetch(zomatoEndpoint + '?lat=' + query.lat + '&lon=' + query.lon, {
    headers: {'user-key': '79f6bb0db344b1df724ab923597bc410'}
  }).then(res => res.json()).then(callback);
  
  console.log(zomatoEndpoint + '?lat=' + query.lat + '&lon=' + query.lon);
}

//    streetAddress = $(data.nearby_restaurants.restaurant.location.address).text().split(",");
//    console.log(streetAddress);

function displayZomatoResults(data) {
  let streetAddress = null;
  const display = data.nearby_restaurants.map((item,index) => {
    const rest = item.restaurant;
    return `
        <section class="resultsContainer">
          <img onload="spinnerStop()" src="https://aquaair-wetdry.com/wp-content/uploads/CroppedImage1600900-restaurant-alpenhof-zermatt.jpg" class="thumbnailSize" alt="picture of the restaurant">
          <ul>
            <li class="no-list">
              <h2><a href="${rest.url}" target="_blank">${rest.name}</a></h2>
            </li>
            <li>${rest.cuisines}</li>
            <li>${rest.user_rating.aggregate_rating}/5 stars &#8226; ${rest.user_rating.votes} votes</li>
            <li>600 N. Baldwin Ave</li>
            <li>${rest.location.city} ${rest.location.zipcode}</li>
            <li>(212) 228-2930</li>
            <li>Average Cost For Two: &#36;${rest.average_cost_for_two}</li>
          </ul>
        </section>
    `;
  });
  console.log(data);
  
  $('main').html(display);
}

function spinnerStop() {
  $('aside').addClass('displayed');
}

function addClasses() {
  $('header').addClass('clickHeader');
  $('.js-button').addClass('clickButton');
  $('.slogan').css('display', 'block');
  $('.titleLink').css('cursor', 'pointer');
  $('aside').removeClass('displayed');
}

function eventListeners() {
  $('.js-button').on('click', function(event) {
    var snd = new Audio("buttonPress.mp3");
    snd.play();
    addClasses();
    geo = navigator.geolocation.getCurrentPosition(coords => getDataFromApi(coords, displayZomatoResults));
  });
    $('.titleLink').on('click', function(event){
    location.reload();
  });
}

$(eventListeners);