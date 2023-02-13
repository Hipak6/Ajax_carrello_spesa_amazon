
const lista = document.querySelector('#lista');
const vistaProdottoSingolo = document.querySelector('#vistaProdottoSingolo');

const url = "https://dummyjson.com/products";

fetch(url)
    .then(data => { return data.json() })
    .then(response => {
        console.log(response); // il singolo oggetto dell'API
        console.log(response.products); //array di 30 oggetti "product"
        let products = response.products;

        products.forEach(product => {
            //data-quelloCheTiPare = "qualcosa"
            lista.innerHTML +=
            `<li> ${product.brand} - ${product.title} 
                <button data-idProdotto="${product.id}" class="btn btn-primary" id="btn${product.id}">Mostra Info </button> 
            </li>`;
        });

        //prendo i singoli pulsanti -> NOdelist
        let pulsanti = document.querySelectorAll('.btn');

        [...pulsanti].forEach(pulsante => {
            pulsante.addEventListener('click', function () {
                let id = pulsante.getAttribute('data-idProdotto');
                stampaSingolo(id);
            });
        })

    }); //si chiude la prima fetch

function stampaSingolo(id) {
    console.log("Ciao sei il prodotto num " + id);

    fetch(url + "/" + id)
        .then(data => { return data.json() })
        .then(response => {
            console.log(response);
            vistaProdottoSingolo.innerHTML =
                `<div class="card" style="width: 18rem;">
                    <img src="${response.images[Math.floor(Math.random() * response.images.length)]}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${response.title}</h5>
                            <p class="card-text">${response.description}</p>
                            <button href="#" class="btn btn-primary">Metti nel carrello</button>
                        </div>
                </div>`
        });


}