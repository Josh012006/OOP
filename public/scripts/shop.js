import Product from './productClass.js';


let firstGames = [
    new Product('1', 'Legend of Zelda - Ocarina of Time', 16.19, 'https://romsfun.com/wp-content/uploads/2019/11/Ocarina-of-Time-3D-3ds.jpg'),
    new Product('2', 'Pokémon X', 45.94, 'https://m.media-amazon.com/images/I/61AmJXSoA8L._AC_UF1000,1000_QL80_.jpg'),
    new Product('3', 'Détective Pikachu', 40.89, 'https://romsfun.com/wp-content/uploads/2019/11/Screenshot_1.png'),
    new Product('4', 'Pokémon Ultra Moon', 45, 'https://romsfun.com/wp-content/uploads/2019/11/Pok%C3%A9mon-Ultra-Sun-and-Ultra-Moon-3ds.png'),
    new Product('5', 'Yo kai Watch 2: Psychic Specters', 76.75, 'https://romsfun.com/wp-content/uploads/2019/11/Psychic-Specters.png'),
    new Product('6', 'Super Mario Maker', 39.99, 'https://romsfun.com/wp-content/uploads/2019/11/Nintendo-3DS-3ds.png'),
    new Product('7', 'Tomodachi Life', 60.82, 'https://romsfun.com/wp-content/uploads/2019/11/tomodachi-life-3ds.jpg')
];

let secondGames = [
    new Product('8', 'Dragon Quest VII - L\' odysée du Roi maudit', 67.99, 'https://romsfun.com/wp-content/uploads/2019/09/playstation-2-ps2-dragon-quest-viii-journey-of-the-cursed-king.jpg'),
    new Product('9', 'Dragon Ball Z: Budokai 3', 189.97, 'https://romsfun.com/wp-content/uploads/2019/09/DragonBall-Z-Budokai-3.jpg'),
    new Product('10', 'God of War II', 44.76, 'https://romsfun.com/wp-content/uploads/2019/08/God-of-War-II-ps2.jpg'),
    new Product('11', 'Resident Evil 4', 78.34, 'https://romsfun.com/wp-content/uploads/2019/08/resident-evil-4.jpg'),
    new Product('12', 'Grand Theft Auto: San Andreas', 32.30, 'https://romsfun.com/wp-content/uploads/2019/08/59606-grand-theft-auto-san-andreas-special-edition-playstation-2-front-cover.jpg'),
    new Product('13', 'Need for Speed – Most Wanted', 109.99, 'https://romsfun.com/wp-content/uploads/2019/09/Need-for-Speed-Most-Wanted-250x349t.jpg'),
    new Product('14', 'Naruto Shippuden – Ultimate Ninja 5', 52.08, 'https://romsfun.com/wp-content/uploads/2019/08/Naruto-Shippuden-Ultimate-Ninja-5.jpg'),
    new Product('15', 'Final Fantasy X', 19.56, 'https://romsfun.com/wp-content/uploads/2019/08/Final-Fantasy-X.png'),
    new Product('16', 'PES 2014: Pro Evolution Soccer', 164, 'https://romsfun.com/wp-content/uploads/2021/04/1618689360-69fe8d97-366d-474e-836c-49aa1cb3e8f4.jpg')
]

let thirdGames = [
    new Product('17', 'Mortal Kombat: Deception', 49.72, 'https://romsfun.com/wp-content/uploads/2019/11/Deception-xbox.jpg'),
    new Product('18', 'Spider: Man 2', 43.85, 'https://romsfun.com/wp-content/uploads/2019/11/spider-man-2-xbox.jpg'),
    new Product('19', 'Halo: Combat Evolved', 98.74, 'https://romsfun.com/wp-content/uploads/2019/11/November-15-2001.jpg'),
    new Product('20', 'The SpongeBob SquarePants Movie', 61.33, 'https://romsfun.com/wp-content/uploads/2019/11/the-spongebob-squarepants-movie-xbox.jpg')
]



let firstContainer = document.getElementById("jeux3DS");
let secondContainer = document.getElementById("jeuxPS2");
let thirdContainer = document.getElementById("jeuxXbox");


// Remplissage de la page des produits
function fill (items, container) {
    items.forEach(element => {
        let div = document.createElement("div");
        div.innerHTML = `
        <img alt = "gameImage" src = ${element.path} width = "250" height = "227" style = "margin: 8px;">
        <div class = "text-white p-2">
            <h2 class = "text-xl font-bold">${element.name}</h2>
            <span>${element.price} $US</span> <br>
            <i class="fa-sharp fa-solid fa-cart-plus addItem text-xl m-1 cursor-pointer"></i>
        </div>
        `;
        div.id = element.id;
        div.style.width = "266px";
        div.style.margin = "8px";
        div.className = "rounded-lg flex flex-col bg-slate-900";

        if(Number(element.id) >= 8) {
            div.style.height = "490px";
        }
        else {
            div.style.height = "370px";
        }  

        container.appendChild(div);
    });
}


fill(firstGames, firstContainer);
fill(secondGames, secondContainer);
fill(thirdGames, thirdContainer);





// Gestion de l'ajout au panier
// localStorage.removeItem("cartElements"); utilisé pour vider le localStorage pour faire le debugging
// Création d'un objet qui contient les items dans le localStorage
if(localStorage.getItem("cartElements") === null) {
    localStorage.setItem("cartElements", JSON.stringify([{}]));
}


// Au clic sur un bouton d'ajout, l'item est ajouté à l'objet plus haut
let cartButtons = Array.from(document.getElementsByClassName("addItem"));

//Une petite fonction pour vérifier quel jeu est concerné étant donné que je n'utilise pas une base de donnée ici
function findGame (searched) {
    if(Number(searched) <= 7) {
        return firstGames.find((j) => (j.id == Number(searched)));
    }
    else if(Number(searched) <= 16) {
        return secondGames.find((j) => (j.id == Number(searched)));
    }
    else {
        return thirdGames.find((j) => (j.id == Number(searched)));
    }
}

cartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        let cartElements = JSON.parse(localStorage.getItem("cartElements"));
        let itemId = event.target.parentElement.parentElement.id;
        if(cartElements.find((j) => j.id === itemId) === undefined) {
            let game = findGame(itemId);
            cartElements.push(game);
            localStorage.setItem("cartElements", JSON.stringify(cartElements));
            alert("Element added to cart");
        }
    });
});







// Gestion de la pub
let pubImage = document.querySelector("#carousel img");

let imagesURL = [
    "https://thumb.canalplus.pro/http/unsafe/1440x810/filters:quality(80)/canalplus-cdn.canal-plus.io/p1/unit/21400086/canal-ouah_50001/STD169/myCANAL_16x9_MEA_1920x1080",
    "https://i.ytimg.com/vi/_EfSGoLXlmc/maxresdefault.jpg",
    "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-sun-pokemon-moon/a/a5/Legend4.png",
    "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_3ds_25/SI_3DS_TomodachiLife.jpg",
    "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/07/PS2-Games-Like-FF7R-Featured.jpg",
    "https://assetsio.gnwcdn.com/XboxSeriesXTech_Inline5.jpg?width=1200&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
    "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/02/leon-s-kennedy-jill-valentine-claire-redfield-from-resident-evil.jpg",
    "https://cdromance.org/wp-content/uploads/2015/05/Dragon-Ball-Z_-Budokai-3-PS2-Gameplay-HD-PCSX2-7-13-screenshot.jpg",
    "https://www.gematsu.com/wp-content/uploads/2014/05/DQ8-Now-iOS-Android-West.jpg?w=640",
    "https://ds.static.rtbf.be/article/image/1920x1080/5/0/6/6f61316d545b9e25a9bbcaacb9159179-1628074027.jpg",
    "https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/08d70d94-96d7-11e6-89a0-00163ec9f5fa/3810251302/naruto-shippuden-ultimate-ninja-storm-4-screenshot.jpg",
    "https://media.gqmagazine.fr/photos/60ec44a224ddaa5ec8e00694/16:9/w_3840,h_2160,c_limit/z9nxry6Jvu8VylWG5bSxwUrJ.jpg",
    "https://jeu.video/files/wxrimport/2017-01/zeldabow.jpg",
    "https://blog.fr.playstation.com/tachyon/sites/10/2022/06/17beeefc8aa6008903d5f4fe83c276e6266c75fc.jpg",
];

let i = 0;
setInterval(function() {
    i = ((i + 1) % (imagesURL.length));
    pubImage.src = imagesURL[i];
}, 3000);

