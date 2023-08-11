var brewFormEl = document.querySelector('#brewForm');
var zipInputEl = document.querySelector('#zipInput');
var brewDisEl = document.querySelector('#zipDisplay');
var brewContainerEl = document.querySelector('#brewContainer');


var zipSubmitHandler = function (event) {
    event.preventDefault();
    brewDisEl.textContent = zipInputEl.value.trim();
    var zipCode = zipInputEl.value.trim();


    if (zipCode) {
        getBrew(zipCode);
        //may need to add different text
        brewContainerEl.textContent = '';
        zipInputEl.value = '';
    } else {
        alert('Please enter a valid zipcode');
    }
};

var getBrew = function (zipCode) {
    var apiUrl = 'https://api.openbrewerydb.org/v1/breweries?by_postal=' + zipCode + '&per_page=5';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayBrews(data, zipCode);
                });
                //is this doing anything?
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to find breweries');
        });
};


var brewery = [];

var displayBrews = function (brewery, brewDisEl) {
    if (brewery.length === 0) {
        brewContainerEl.textContent = 'No breweries found.';
        return;
    }

    for (var i = 0; i < brewery.length; i++) {

        var brewName = brewery[i].name

        console.log(brewName);

        var locationEl = document.createElement('li');
        locationEl.classList = 'list-item flex-row justify-space-between align-center';

        brewContainerEl.appendChild(locationEl);
    }
};

brewFormEl.addEventListener('submit', zipSubmitHandler);

console.log(brewery)