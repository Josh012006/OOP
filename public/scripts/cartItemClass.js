class cartItem {
    constructor(product) {
        this.product = product;
        this.quantity = 1;
    }

    givePrice() {
        return (Number((this.quantity * this.product.price).toFixed(2)));
    }
}


export default cartItem;