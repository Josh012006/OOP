
class cart {
    constructor(containerElement) {
        this.array = [];
        this.container = containerElement;
    }

    getCount() {
        return this.array.length;
    }

    getTotalPrice () {
        if(this.array.length == 0) {
            return 0;
        }

        else {
            return Number((this.array.reduce((totalPrice, currentValue) => {
                return totalPrice + currentValue.givePrice();
            }, 0)).toFixed(2));
        }
    }

    add (item) {
        this.array.push(item);
        console.log("Item correctly added to the cart!: ", this.array);
        console.log(typeof item.givePrice === 'function');
    }

    remove (id) {
        // Le tableau des items est trié de telle manière à supprimer le produit
        this.array = this.array.filter((elem) => {
            elem.product.id != parseInt(id, 10);
        });

        // On applique un display none à l'élément
        document.getElementById(id).style.display = "none";
    }

    displayItems () {
        // On crée un élément div pour cahque item et on l'ajoute au conteneur fourni au constructeur à la création de la classe
        this.array.forEach((cartItem) => {
            let itemElement = document.createElement('div');
            itemElement.id = cartItem.product.id;
            itemElement.innerHTML = `
                <img src = ${cartItem.product.path} alt = 'cartItem' style = "height: 270px; width: 300px;">
                <div class = "p-4 flex flex-col justify-around">
                    <p class = "text-xl font-bold">${cartItem.product.name}</p>
                    <p>${cartItem.product.price} $US</p>
                    <div class = "flex justify-between items-center">
                        <i class="fa-solid fa-minus m-2 bg-slate-800 cursor-pointer rounded-lg p-2"></i>
                        <span>${cartItem.quantity}</span>
                        <i class="fa-solid fa-plus m-2 bg-slate-800 cursor-pointer rounded-lg p-2"></i>
                    </div>
                    <span class = "deletion cursor-pointer p-2 text-center bg-slate-800 rounded-lg justify-self-center my-2">Delete from cart</span>
                </div>
            `;
            itemElement.className = "flex flex-col bg-slate-900 border-solid border-4 border-slate-700 m-4 lg:flex-row";
            itemElement.style.width = "600px";

            this.container.appendChild(itemElement);
        });
    }
}




export default cart;