import {products} from "../data/products.js";
import {cart, addToCart} from "../data/cart.js";
let productHtml='';
      products.forEach((product)=>{
        const html=`
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${product.priceCents /100}
            </div>

            <div class="product-quantity-container">
                <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-cart-button"
            data-product-name="${product.id}">
                Add to Cart
            </button>
        </div>
        `;

        productHtml+=html;
      });

      document.querySelector('.products-grid').innerHTML=productHtml;

      function updateCartQuantity(){
        let totalQuantity=0;
        cart.forEach((item)=>{
            totalQuantity+=item.Quantity;
            });
            
            document.querySelector('.js-cart-quantity').innerHTML=totalQuantity;
        }
      document.querySelectorAll('.js-add-cart-button').forEach((buttonElement)=>{
        buttonElement.addEventListener('click',()=>{
            const productId=buttonElement.dataset.productId;
            addToCart(productId);
            updateCartQuantity();
        })
      });
      