import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './fetchCountries.js';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

refs = {
    inputSearch: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.inputSearch.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
    const nameCountry = refs.inputSearch.value.trim();

    if (nameCountry === '') {
        clearCountry();
        return console.warn('Field cannot be emply');
    }
        clearCountry()
        API.fetchCountries(nameCountry)
            .then((countries) => {
                if (countries.length > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                } else if (countries.length >= 2 && countries.length <= 10) {
                    renderCountryList(countries);
                    console.log(countries);
                } else {
                    renderCountryInfo(countries);
                    console.log(countries);
                }
            }) 
            .catch(onFetchError);
    } 
    
    
    


function renderCountryList(countries) {
  const markup = countries
    .map((country) => {
      return `
          <li class = country-item>
            <img class = country-img src="${country.flags.svg}" alt="${country.name.official}" width="30" hight="30">
            <p>${country.name.official}</p>
          </li>
      `;
    })
    .join("");
  refs.countryList.innerHTML = markup;
}

function renderCountryInfo(countries) {
    const country = countries[0];
    const languages = Object.values(country.languages).join(', ');
    const markupInfo =`<div class=country-item>
    <img class= country-img src="${country.flags.svg}" alt="${country.name.official}" width="40" hight="40">
    <h2>${country.name.official}</h2>
    </div>
    <p><b>Capital</b>: ${country.capital[0]}</p>
    <p><b>Population</b>: ${country.population}</p>
    <p><b>Languages</b>: ${languages}</p>`

    refs.countryInfo.innerHTML = markupInfo;
}

function clearCountry() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}

function onFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}

