const zomatoEndpoint = 'https://developers.zomato.com/api/v2.1/geocode';

function getDataFromApi(searchTerm, callback) {
  const query = {
    // 'user-key': '79f6bb0db344b1df724ab923597bc410',
    lat: searchTerm.coords.latitude,
    lon: searchTerm.coords.longitude
  }
  // $.getJSON(zomatoEndpoint, query, callback);
  
  
  fetch(zomatoEndpoint + '?lat=' + query.lat + '&lon=' + query.lon, {
    headers: {'user-key': '79f6bb0db344b1df724ab923597bc410'}
  }).then(res => res.json()).then(callback);
  
  console.log(zomatoEndpoint + '?lat=' + query.lat + '&lon=' + query.lon);
  /**({
    url: zomatoEndpoint,
    type: 'GET',
    datatype: 'json',
    success: callback,
    beforeSend: setHeader
  })
  **/
}

/**
        $.ajax({
          url: 'service.svc/Request',
          type: 'GET',
          dataType: 'json',
          success: function() { alert('hello!'); },
          error: function() { alert('boo!'); },
          beforeSend: setHeader
        });
      });

      function setHeader(xhr) {
        xhr.setRequestHeader('securityCode', 'Foo');
        xhr.setRequestHeader('passkey', 'Bar');
      }
**/

function displayZomatoResults(data) {
  const display = data.nearby_restaurants.map((item,index) => {
    const rest = item.restaurant;
    // <h1>${rest.name}</h1>
    // let streetAddress = ${rest.location.address}.split(" ");
    // console.log(streetAddress);
    return `
      <main>
        <section class="resultsContainer">
          <img src="http://via.placeholder.com/310x200" class="thumbnailSize">
          <ul>
            <li id="no-list">
              <h2><a href="#">${rest.name}</a></h2>
            </li>
            <li>${rest.cuisines}</li>
            <li>${rest.user_rating.aggregate_rating}/5 stars &#8226; ${rest.user_rating.votes} votes</li>
            <li>600 N. Baldwin Ave</li>
            <li>${rest.location.city} ${rest.location.zipcode}</li>
            <li>(212) 228-2930</li>
          </ul>
        </section>
      </main>
    `;
  });
  // split address at comma
  console.log(data);
  
  $('main').html(display);
}



function eventListeners() {
  $('.js-button').on('click', function(event) {
    $('header').addClass('clickHeader');
    $('.js-button').addClass('clickButton');
    $('.slogan').css('display', 'block');
    $('.titleLink').css('cursor', 'pointer');
    geo = navigator.geolocation.getCurrentPosition(coords => getDataFromApi(coords, displayZomatoResults));
  });
    $('.titleLink').on('click', function(event){
    location.reload();
  });
}

$(eventListeners);