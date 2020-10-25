const urlBase = "https://developer.nps.gov/api/v1/parks";

const apiKey = "api_key=9NPqO7TqbXHyISrF2UDHjaJUs4ZYYdXblOppbmgy";


// curl -X GET "https://developer.nps.gov/api/v1/parks?stateCode=mo&stateCode=hi" -H  "accept: application/json"

// full name, description, url, address, (photo?)

// steps
/*
1. set watch form
2. set params
3. set params to url function 
4. set fetch
5. set result watch 
*/

//const st = 'sc, hi';
//const searchArrayDemo = st.split(/[' ',]+/);


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('#results-list').empty();
    const searchTerm = $('#js-search-term').val();
    //console.log(searchTerm);
    const searchArray = searchTerm.split(/[' ',]+/);
    console.log(searchArray);
    const maxResults = $('#js-max-results').val();
    getUrls(searchArray, urlBase, maxResults);
    //console.log(finalUrl);
    //getResults(finalUrl);
  });
}
$(watchForm);





function getUrls(array, url, resultNum) {
  // YOU HAVE TO USE LET

  
for (let i=0; i< array.length; i++){
    let queryString = url;
  queryString += `?stateCode=${array[i]}`;
    //console.log(queryString);
    //const finalString = queryString.concat(string);
    //return finalString;
    const addLimit = "&limit="+resultNum;
     const addAPI = "&"+apiKey;
  const finalString = queryString.concat(addLimit, addAPI);
   fetch(finalString)
   .then(response => response.json())
    .then(responseJson => {
         //console.log(responseJson);
         displayResults(responseJson);
    });
  }
 
  //console.log("this is the full url"+ finalString);
  // => https://developer.nps.gov/api/v1/parks?stateCode=mo&stateCode=hi&api_key=9NPqO7TqbXHyISrF2UDHjaJUs4ZYYdXblOppbmgy
  //return finalString;
}


//function fetchFunction(finalUrl){

//console.log(finalUrl);
// => It ran twice! - got rid of params /*https://developer.nps.gov/api/v1/parks?stateCode=co&api_key=9NPqO7TqbXHyISrF2UDHjaJUs4ZYYdXblOppbmgy { method: 'GET',headers: { accept: 'application/json' },limit: '10' }
//https://developer.nps.gov/api/v1/parks?stateCode=ny&api_key=9NPqO7TqbXHyISrF2UDHjaJUs4ZYYdXblOppbmgy { method: 'GET',headers: { accept: 'application/json' },limit: '10' }/*

/* fetch(finalUrl)
    .then(response => {
          if (response.ok) {
        return response.json();
         console.log(responseJson);
      }
    });
   // .then(responseJson => displayResults(responseJson, resultNum));
}*/

// $('#results-list').append

function displayResults(responseJson){
  $('#results').removeClass('hidden');
  console.log(responseJson.data.length);
  for(let i=0; i< responseJson.data.length; i++){
  $('#results-list').append(`<li>${responseJson.data[i].fullName}<br><a href="${responseJson.data[i].url}">LINK HERE</a><br>Description: ${responseJson.data[i].description}<br> ADDRESS:<br>${responseJson.data[i].addresses[i].line1} - ${responseJson.data[i].addresses[i].line2}<br>${responseJson.data[i].addresses[i].city}<br>${responseJson.data[i].addresses[i].stateCode}</li>`);
  }
}