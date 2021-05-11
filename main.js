let carts = document.querySelectorAll('.add-cart');

let products=[
    {
        name:'Fancy-hoodie',
        tag:'fancyhoodie',
        price:499,
        inCart:0,
        description:'55%OFF'
    },
    {
        name:'mens-polo-tshirt',
        tag:'menspolotshirt',
        price:599,
        inCart:0,
        description:'55%OFF'
    },
    {
        name:'yellow-tshirt',
        tag:'yellowtshirt',
        price:599,
        inCart:0,
        description:'55%OFF'
    },
    {
        name:'Blue-tshirt',
        tag:'bluetshirt',
        price:599,
        inCart:0,
        description:'50%OFF'
    },
    {
        name:'Green-tshirt',
        tag:'greentshirt',
        price:599,
        inCart:0,
        description:'55%OFF'
    },
    {
        name:'white-tshirt',
        tag:'whitetshirt',
        price:599,
        inCart:0,
        description:'50%OFF'
    }


];

for(let i=0;i<carts.length;i++)
{
    carts[i].addEventListener('click',()=>{
       cartNumbers(products[i]);
       totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers'); 
    if(productNumbers)
    {
        document.querySelector('.cart span').textContent=productNumbers;
    }
}





function cartNumbers(product ,action){
    let productNumbers=localStorage.getItem('cartNumbers');
    


    productNumbers=parseInt(productNumbers);
    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");}
   else if(productNumbers){
    localStorage.setItem("cartNumbers",productNumbers+1);
    document.querySelector('.cart span').textContent=productNumbers+1;
    }
    else{
        localStorage.setItem("cartNumbers",1);
        document.querySelector('.cart span').textContent=1;

    }
    setItems(product);
}
function setItems(product)
{
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null ) {
        let currentProduct = product.tag;
        
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;
        // console.log(cartItems[currentProduct]);

    } else {
        product.inCart = 1;
        let x=product.tag;
        cartItems = { 
            [x]: product
        };
    }
   
       
  
    
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}
function totalCost(product,action){
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}
function displayCart()
{
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer=document.querySelector(".products");

    if(cartItems && productContainer){
        productContainer.innerHTML='';
        Object.values(cartItems).map((item , index )=>{
        productContainer.innerHTML+=`<div class="products">
        <ion-icon name="close-circle"></ion-icon>

        <img src="../${item.tag}.jpg"/>
        <span class="sm-hide">${item.name}</span>
        <span class="des">${item.description}</span>
        </div>
        <div class="price sm-hide">RS${item.price}</div>
        <div class="quantity">
            <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
            <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
        </div>
        <div class="total">Rs${item.inCart * item.price}</div>
        `
    });
    productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">Rs${cart}</h4>
            </div>`

        deleteButtons();
        manageQuantity();
        
        

    }

}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log("/////////",cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            // console.log(currentProduct);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/[^a-zA-Z ]/g, "").trim();
            console.log(currentProduct);
            console.log("1111111111", cartItems[currentProduct].inCart);
            // console.log("..................", decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/[^a-zA-Z ]/g, "").trim());

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });
        increaseButtons[i].addEventListener('click', () => {
            // console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            // console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/[^a-zA-Z ]/g, "").trim();
            // console.log(currentProduct);
            //  console.log(cartItems[currentProduct]);
            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}
function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.products ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    // console.log(cartItems);
    

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.querySelector('span').textContent.toLocaleLowerCase().replace(/[^a-zA-Z ]/g, "").trim();
        //  console.log("00000000000000",productName, " 000000000");
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));
             
            delete cartItems[productName];
        
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        });
    }
}

onLoadCartNumbers();
displayCart();