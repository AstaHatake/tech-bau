/* VARIABLES PARA UTILIZAR EN EL JAVASCRIPT Y VARIABLES DEL DOM */

let cartItems = []

const cart = document.querySelector(".cart");

const cartIcon = document.querySelector("#cart-icon");

const cartIconResponsive = document.querySelector("#cart-icon-large");

let total = 0;

let clickInCartIcon = false;

let wd = window.innerWidth;

/* FUNCIONES */
    
function loadHTML(){
    document.querySelector(".cart-itemsContainer").innerHTML = '<i class="fa-solid fa-cart-shopping" aria-hidden="true" id="cart-icon-large"></i>';
    cartItems.forEach(cartItemSave => {
        let cartItemSaveHTML = `
        <div class="cart-item">
            <img src="${cartItemSave.image}" alt="" class="cart-item-image">
            <div class="cart-item-container">
                <h6>Nombre</h6>
                <h3 class="cart-item-name">${cartItemSave.name}  <span class="cart-item-quantity"> x ${cartItemSave.quantity}</span>
                </h3>
            </div>
            <div class="cart-item-container">
                <h6>Precio</h6>
                <h4 class="cart-item-price"><i class="fa-solid fa-dollar-sign"></i> ${cartItemSave.price}</h4>
            </div>
            <button class="cart-item-buttonDelete" onclick="deleteToCart(this)">ELIMINAR</button>
        </div>  
        `
        document.querySelector(".cart-itemsContainer").innerHTML += cartItemSaveHTML;
    })
}

function addToCart (item) {
    const nameItem = item.getElementsByTagName("H4")[0].textContent;
    const priceItem = item.getElementsByTagName("SPAN")[0];
    const imageItem = item.getElementsByTagName("IMG")[0].src;
    const priceItemNUMBER = item.getElementsByTagName("SPAN")[0].textContent.match(/\d+(\.\d+)?/)[0]; 


    let itemSave = {
        "name" : nameItem,
        "price" : priceItemNUMBER,
        "quantity" : 1,
        "image": imageItem
    }

    let existInCar = cartItems.some(itemCart => itemCart.name == itemSave.name);

    if (existInCar) {

        cartItems.forEach(cartItemSave =>{
            if (cartItemSave.name == itemSave.name) {
                if (cartItemSave.quantity < 10) {
                    console.log(cartItemSave.price)
                    console.log(itemSave.price)
                    cartItemSave.quantity = parseInt(cartItemSave.quantity) + 1 ;
                    cartItemSave.price = (parseFloat(cartItemSave.price) + parseFloat(itemSave.price)).toFixed(2);  
                    total = (parseFloat(total) + parseFloat(itemSave.price)).toFixed(2);
                    if (clickInCartIcon){
                        cartIcon.innerHTML = `<h4>Total $${total}</h4>`
                    }                
                }
            }
            
        })

        loadHTML();
    }

    else {
        cartItems.push(itemSave);
        total = (parseFloat(total) + parseFloat(itemSave.price)).toFixed(2);   
        loadHTML();
    }


}  

function deleteToCart(item) {
    let parentItem = item.parentElemennt;
    let nameItem = parentItem.querySelector(".cart-item-name");
    gastos.some()
}

function hideCart (){
    alert("asd")
    if (!clickInCartIcon ) {
        if (wd <= 500){
            cartIcon.classList.remove("fa-solid");
            cartIcon.classList.remove("fa-cart-shopping");
            cartIcon.classList.add("cart-icon-active")
            cartIcon.innerHTML = `<h4>Total $${total}</h4>`
            cart.style.display = "flex";
            cart.style.height = "200px  !important";
            cart.style.width = "100% !important"
            cart.style.borderTop = "5px solid #000";
            cart.style.backgroundColor = "#fafafa";
            clickInCartIcon = true;
        
        }
        if (wd > 500) {
            cartIcon.classList.remove("fa-solid");
            cartIcon.classList.remove("fa-cart-shopping");
            cartIcon.classList.add("cart-icon-active")
            cartIcon.innerHTML = `<h4>Total $${total}</h4>`
            cart.style.display = "flex";
            cart.style.height = "100%";
            cart.style.width = "70%";
            cart.style.backgroundColor = "#fafafa71";
            clickInCartIcon = true;
        
        }

    }

    else {
        cartIcon.classList.add("fa-solid");
        cartIcon.classList.add("fa-cart-shopping");
        cartIcon.classList.remove("cart-icon-active");
        cartIcon.innerHTML = ` `;
        cartIcon.style.bottom = "10%"
        cart.style.display = "flex";
        cart.style.height = "0px";
        cart.style.borderTop = "none";
        cart.style.backgroundColor = "transparent";
        clickInCartIcon = false;
    
    }
}

/* EVENTOS CON EL DOM */

cartIcon.addEventListener("click",()=>{
    alert("asd")
    hideCart(clickInCartIcon);
})

cartIconResponsive.addEventListener("click",()=>{
    hideCart(clickInCartIcon);
})

/* MAPA */

let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('<h6 id="mark"><i class="fa-solid fa-shop"></i> Teach Buy</h6>')
    .openPopup();
