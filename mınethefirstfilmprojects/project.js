const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films")


// Tüm Eventleri Yükleme

addEventListeners();

function addEventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);

    });

    cardBody.addEventListener("click",deleteFilm);
    document.addEventListener("click",clearAllFilms);
}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;


    if (title === "" || director === "" || url === ""){
        // HATA
        UI.displayMessages("please fill in the all empty field...","danger");
    }
    else {
        // Yeni Film Oluşturma
        const newFilm = new Film (title,director,url);

        UI.addFilmToUI(newFilm);
        Storage.addFilmToStorage(newFilm);
        UI.displayMessages("Movie is added...","success")
    }


    UI.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm(e){

    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        UI.displayMessages("movie is deleted","success");
        
    }
}
