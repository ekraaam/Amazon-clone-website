export let cart = [{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    Quantity: 2
},
{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    Quantity:1
}];

export function addToCart(productId){
    let matchingItem;
        cart.forEach((item)=>{
            if(productId===item.productId){
                matchingItem = item;
            }
        });
    if(matchingItem) {
        matchingItem.Quantity +=1;
    }else{
        cart.push(
            {
                productId: productId,
                Quantity : 1
            }
        );
    }
}

export function removeCartItem(productId){
    const newCart=[];
    cart.forEach((item)=> {
        if(item.productId !== productId) {
            newCart.push(item);
        }
    });
    cart=newCart;
}
