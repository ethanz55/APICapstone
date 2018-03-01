const zomatoEndpoint = 'https://developers.zomato.com/api/v2.1/search';

function getDataFromApi(searchTerm, callback) {
  // still trying to figure out how to get location
  // and use the location in the api with just a button
  // this is just in case I decide to use an input box
  const query = {
    q: `${searchTerm}`,
    key: '79f6bb0db344b1df724ab923597bc410',
    page: 1,
    per_page: 18
  }
  $.getJSON(zomatoEndpoint, query, callback);
}

function renderResults() {
  return `
    <section class="resultsContainer">
      <img src="http://via.placeholder.com/312x200" class="thumnailSize">
      <ul>
        <li>
          <h2><a href="#">Normon's Yummies</a></h2>
        </li>
        <li>Cafe</li>
        <li>3.7/5 stars &#8226; 1046 votes</li>
        <li>600 N. Baldwin Ave</li>
        <li>Arcadia, CA 91007</li>
        <li>(212) 228-2930</li>
      </ul>
    </section>
  `;
}




function eventListeners() {
  $('.js-button').on('click', function(event) {
    $('header').addClass('clickHeader');
    $('.js-button').addClass('clickButton');
    $('.slogan').css('display', 'block');
  });
    $('.titleLink').on('click', function(event){
    location.reload();
  });
}

$(eventListeners);