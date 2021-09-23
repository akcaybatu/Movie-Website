let container = document.getElementById("movie-container");
const searchBox =  document.getElementById('searchBox');
const search = document.getElementById('search');
const headerSearch = document.querySelector("h3");

const imgLink = "https://image.tmdb.org/t/p/w500/";
const apiBase = "https://api.themoviedb.org/3";
const apiKey = "&api_key=9733f925b98455b7c1761d7869b5f55b";

const byPopularity = "/discover/movie?sort_by=popularity.desc"
const byRate = "/discover/movie?certification_country=US&certification=R&sort_by=vote_average.desc"
const byInTheater = "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"
const byTomCruise = "/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc";



getMovies(apiBase + byInTheater + apiKey);

function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(resJson => {;
        movieList(resJson.results);
    })    
}

const categories = document.querySelectorAll("a");
categories.forEach((a) => {
    a.addEventListener('click', function(e){
        let targetCategory = e.target.innerHTML;
        headerSearch.innerText = targetCategory;
    });       
});

function movieList(data){
    container.innerHTML = "";

    data.forEach(movie => {  
        const movieElement = document.createElement('div');
        if (movie.poster_path == null) {       
            movieElement.innerHTML = `
            <img src="assets/random.jpg">
            <div class="movie-info">
                <div class="title-release">
                    <p class="movie-title">${(movie.title = movie.title.length > 10 ? movie.title : `${movie.title.slice(0, 10)} ...`)}</p>
                    <p class="release-date">${movie.release_date.slice(0, 4)}</p>
                </div>                
                <p class="average">${movie.vote_average}</p>
            </div>
          `
        } else {
            movieElement.innerHTML = `
            <img src="${imgLink + movie.poster_path}">
            <div class="movie-info">
                <div class="title-release">
                    <p class="movie-title">${movie.title}</p>
                    <p class="release-date">${movie.release_date.slice(0, 4)}</p>
                </div>
                <p class="average">${movie.vote_average}</p>
            </div>    
          `
        }
        movieElement.classList.add("movieDivs");
        container.appendChild(movieElement);
    });
}

searchBox.addEventListener('submit', (e) =>{
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(apiBase + "/search/movie?" + apiKey + '&query=' + searchTerm);
    }
    else{
        getMovies(apiBase + byInTheater + apiKey)
    }
    headerSearch.innerText = search.value;
    if (search.value > 10) {
        headerSearch.innerText.slice(0, 10);
    }
})

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

//Autocomplete//
//------------//
// function autocomplete(inp, arr) {
//     /*the autocomplete function takes two arguments,
//     the text field element and an array of possible autocompleted values:*/
//     var currentFocus;
//     /execute a function when someone writes in the text field:/
//     inp.addEventListener("input", function(e) {
//         var a, b, i, val = this.value;
//         /close any already open lists of autocompleted values/
//         closeAllLists();
//         if (!val) { return false;}
//         currentFocus = -1;
//         /create a DIV element that will contain the items (values):/
//         a = document.createElement("DIV");
//         a.setAttribute("id", this.id + "autocomplete-list");
//         a.setAttribute("class", "autocomplete-items");
//         /append the DIV element as a child of the autocomplete container:/
//         this.parentNode.appendChild(a);
//         /for each item in the array.../
//         for (i = 0; i < arr.length; i++) {
//           /check if the item starts with the same letters as the text field value:/
//           if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//             /create a DIV element for each matching element:/
//             b = document.createElement("DIV");
//             /make the matching letters bold:/
//             b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//             b.innerHTML += arr[i].substr(val.length);
//             /insert a input field that will hold the current array item's value:/
//             b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//             /execute a function when someone clicks on the item value (DIV element):/
//             b.addEventListener("click", function(e) {
//                 /insert the value for the autocomplete text field:/
//                 inp.value = this.getElementsByTagName("input")[0].value;
//                 /*close the list of autocompleted values,
//                 (or any other open lists of autocompleted values:*/
//                 closeAllLists();
//             });
//             a.appendChild(b);
//           }
//         }
//     });
//     /execute a function presses a key on the keyboard:/
//     inp.addEventListener("keydown", function(e) {
//         var x = document.getElementById(this.id + "autocomplete-list");
//         if (x) x = x.getElementsByTagName("div");
//         if (e.keyCode == 40) {
//           /*If the arrow DOWN key is pressed,
//           increase the currentFocus variable:*/
//           currentFocus++;
//           /and and make the current item more visible:/
//           addActive(x);
//         } else if (e.keyCode == 38) { //up
//           /*If the arrow UP key is pressed,
//           decrease the currentFocus variable:*/
//           currentFocus--;
//           /and and make the current item more visible:/
//           addActive(x);
//         } else if (e.keyCode == 13) {
//           /If the ENTER key is pressed, prevent the form from being submitted,/
//           e.preventDefault();
//           if (currentFocus > -1) {
//             /and simulate a click on the "active" item:/
//             if (x) x[currentFocus].click();
//           }
//         }
//     });
//     function addActive(x) {
//       /a function to classify an item as "active":/
//       if (!x) return false;
//       /start by removing the "active" class on all items:/
//       removeActive(x);
//       if (currentFocus >= x.length) currentFocus = 0;
//       if (currentFocus < 0) currentFocus = (x.length - 1);
//       /add class "autocomplete-active":/
//       x[currentFocus].classList.add("autocomplete-active");
//     }
//     function removeActive(x) {
//       /a function to remove the "active" class from all autocomplete items:/
//       for (var i = 0; i < 1; i++) {
//         x[i].classList.remove("autocomplete-active");
//       }
//     }
//     function closeAllLists(elmnt) {
//       /*close all autocomplete lists in the document,
//       except the one passed as an argument:*/
//       var x = document.getElementsByClassName("autocomplete-items");
//       for (var i = 0; i < 1; i++) {
//         if (elmnt != x[i] && elmnt != inp) {
//           x[i].parentNode.removeChild(x[i]);
//         }
//       }
//     }
//     /execute a function when someone clicks in the document:/
//     document.addEventListener("click", function (e) {
//         closeAllLists(e.target);
//     });
//   }
//   autocomplete(document.getElementById("search"), countries);