import cart from './cartClass.js';
import cartItem from "./cartItemClass.js";



let products = document.getElementById("products");
let priceContainer = document.getElementById("price");

let cartElements = JSON.parse(localStorage.getItem("cartElements"));


// Création d'un objet cart qui contient les produits ajouté au panier
let cartSample = new cart(products);

// Insertion de tous les produits du localStorage dans le panier
if(cartElements.length > 1) {
    for(let i = (cartElements.length - 1); i > 0; i--) {
        cartSample.add(new cartItem(cartElements[i]));
    }
    cartSample.displayItems();
    priceContainer.innerHTML = `${cartSample.getTotalPrice()} US`;
}


// Gestion de la suppression d'un produit du panier
let deleteButtons = Array.from(document.getElementsByClassName("deletion"));

deleteButtons.forEach(element => {
    element.addEventListener("click", function(event) {
        // Je sélectionne l'id du produit et j'applique la fonction remove. Elle le supprime de l'array des produits
        // du cart et le met en display none
        let removeId = event.target.parentElement.parentElement.id;
        cartSample.remove(removeId);

        // Je supprime également le produit du localStorage
        let cartElements = JSON.parse(localStorage.getItem("cartElements"));
        cartElements = cartElements.filter((j) => j.id != removeId);

        localStorage.setItem("cartElements", JSON.stringify(cartElements));

        // J'appelle la fonction getTotalPrice pour actualiser le prix 
        priceContainer.innerHTML = `${cartSample.getTotalPrice()} US`;
    });
});


// Gestion de la quantité de chaque produit dans le panier

// Réduction de la quantité
let minusButtons = Array.from(document.getElementsByClassName("fa-minus"));

minusButtons.forEach(element => {
    element.addEventListener("click", function(event) {
        let span = event.target.nextElementSibling;
        let quantity = Number(span.innerHTML);

        if(quantity > 1) {
            // Je prend l'id de l'item concerné
            let itemId = event.target.parentElement.parentElement.parentElement.id;

            // Je modifie la quantité et je change sa valeur dans le HTML
            quantity--;
            span.innerHTML = `${quantity}`;

            // Je baisse aussi la quantité dans le tableau du panier
            cartSample.array.forEach(j => {
                if(j.product.id == itemId) {
                    j.quantity--;
                }
            });

            // J'appelle la fonction getTotalPrice pour actualiser le prix 
            priceContainer.innerHTML = `${cartSample.getTotalPrice()} US`;
        }
    });
});

// Augmentation de la quantité
let plusButtons = Array.from(document.getElementsByClassName("fa-plus"));

plusButtons.forEach(element => {
    element.addEventListener("click", function(event) {
        let span = event.target.previousElementSibling;
        let quantity = Number(span.innerHTML);

        if(quantity < 6) {
            // Je prend l'id de l'item concerné
            let itemId = event.target.parentElement.parentElement.parentElement.id;

            // Je modifie la quantité et je change sa valeur dans le HTML
            quantity++;
            span.innerHTML = `${quantity}`;

            // J'augmente aussi la quantité dans le tableau du panier
            cartSample.array.forEach(j => {
                if(j.product.id == itemId) {
                    j.quantity++;
                }
            });

            // J'appelle la fonction getTotalPrice pour actualiser le prix 
            priceContainer.innerHTML = `${cartSample.getTotalPrice()} US`;
        }
    });
});







// Gestion du paiement
let payButton = document.getElementById("pay");

payButton.addEventListener("click", function() {
    if(cartSample.array.length != 0) {
        let confirmation = confirm("Do you want to confirm your payment?");
        if(confirmation) {
            alert("Payment successful!");
            deleteButtons.forEach((element) => element.click());
        }
    }
});