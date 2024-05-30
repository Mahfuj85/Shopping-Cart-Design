//OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon")
const cart = document.querySelector(".cart")
const closeCart = document.querySelector("#cart-close")

cartIcon.addEventListener("click", ()=>{
    cart.classList.add("active");
})

closeCart.addEventListener("click", ()=>{
    cart.classList.remove("active");
})

//Srart when the document is ready
if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', start);
} else{
    start()
}

// ============== START ===============
 function start(){
    addEvents()
 }

 // ============ UPDATE & RERENDER
 function update(){
    addEvents();
    updateTotal();
 }

 // ============ ADD EVENTS ============
 function addEvents(){
    // Remove items from cart
     let cartRemoveBtns = document.querySelectorAll(".cart-remove");
     console.log(cartRemoveBtns);
     cartRemoveBtns.forEach((btn) => {
        btn.addEventListener('click', handle_removeCartItem);
     }); 

     // Change items quantity
     let cartQuantityInputs = document.querySelectorAll('.cart-quantity');
     cartQuantityInputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
     });

     // Add item to cart
     let addCartBtns = document.querySelectorAll(".add-cart");
     addCartBtns.forEach(btn => {
        btn.addEventListener("click", handle_addCartItem); 
     });

     //Buy Order
     const buyBtn = document.querySelector(".btn-buy");
     buyBtn.addEventListener("click", handle_buyOrder);
 }

 // =========== HANDLE EVENTS FUNCTIONS ===========
 let itemsAdded = []
function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // Handle item is already exist
    if(itemsAdded.find((el) => el.title == newToAdd.title)) {
        alert("This Item Is Already Exist!");
        return;
    } else {
        itemsAdded.push(newToAdd);
    }
    
    // Add product to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc); 
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}

 function handle_removeCartItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        (el) => 
            el.title != 
            this.parentElement.querySelector('.cart-product-title').innerHTML
    );
    
    update();
  }

  function handle_changeItemQuantity() {
    if(isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
     this.value = Math.floor(this.value);  // to keep it integer

    update();
  }

  function handle_buyOrder() {
    if(itemsAdded.length <= 0) {
        alert("There is No Order to Place Yet! \nPlease Make an Order First.")
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Your Order is Placed Successfully :)");
    itemsAdded = [];

    update();
  }

// =============== UPDATE & RERENDER FUNCTIONS ==========
function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let priceElemnet = cartBox.querySelector(".cart-price"); 
        let price = parseFloat(priceElemnet.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    })

     // Keep the total to 2 digits after the decimal point
     total = total.toFixed(2);
     // Or you can use also
     //total = Math.round(total * 100) / 100;

    totalElement.innerHTML = "$" + total;
}

// ============ HTML COMPONENTS ==============
function CartBoxComponent(title, price, imgSrc) {
    return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART -->
        <i class='bx bxs-trash-alt cart-remove'></i>

    </div>`;
}