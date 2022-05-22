if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeItemButton = document.querySelectorAll('.fa-trash-can')
    console.log(removeItemButton)
    for (var i = 0; i < removeItemButton.length; i++) {
        var button = removeItemButton[i]
        button.addEventListener('click', removeItemFromCart)
    }
    var inputsForQuantity = document.getElementsByClassName('item-quantity')
    for (var i = 0; i < inputsForQuantity.length; i++) {
        var realInput = inputsForQuantity[i]
        realInput.addEventListener('change', changeQuantity)
    }
    var addToCartBtns = document.getElementsByClassName('add-button')
    for (var i = 0; i < addToCartBtns.length; i++) {
        var button = addToCartBtns[i]
        button.addEventListener('click', addWhenClicked)
    }
    document.getElementsByClassName('button-buy-now')[0].addEventListener('click', buyNowClicked)
}

function buyNowClicked() {

    alert('Thank you for your order')
    var wholeCart = document.getElementsByClassName('items-cart')[0]
    while (wholeCart.hasChildNodes()){
        wholeCart.removeChild(wholeCart.firstChild)
    }
    updateTotalCart()
}

function addWhenClicked(event) {
    var button = event.target
    var storeItem = button.parentElement.parentElement
    var title = storeItem.getElementsByClassName('item-name')[0].innerText
    var price = storeItem.getElementsByClassName('item-price')[0].innerText
    var imageSource = storeItem.getElementsByClassName('item-price')[0].parentElement.parentElement.previousElementSibling.src

    console.log(title, price, imageSource)
    addItemClickedItemToCart(title, price, imageSource)
    updateTotalCart()
}

function addItemClickedItemToCart(title, price, imageSource) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('row')
    var wholeCart = document.getElementsByClassName('items-cart')[0]
    var cartItemNames = wholeCart.getElementsByClassName('item-name')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title){
            alert('This item has already been added to your cart')
            return
        }
    }
    var contentsOfCartRow = `
        <div class="col-4 d-flex justify-content-center align-items-center"><img src="${imageSource}" alt="item" width="150" height="150"><span class="item-name">${title}</span></div>
            <div class="col-4 d-flex justify-content-center align-items-center"><span class="item-price">${price}</span></div>
            <div class="col-4 d-flex justify-content-center align-items-center"><input class="item-quantity" type="number" value="1">
                <button role="button" class="btn button-remove"><i class="fa-regular fa-trash-can"></i></button>
            </div>`
    cartRow.innerHTML = contentsOfCartRow
    wholeCart.append(cartRow)
    cartRow.getElementsByClassName('fa-trash-can')[0].addEventListener('click',removeItemFromCart)
    cartRow.getElementsByClassName('item-quantity')[0].addEventListener('change', changeQuantity)
}

function changeQuantity(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotalCart()
}

function removeItemFromCart(event) {
    var clickedButton = event.target
    clickedButton.parentElement.parentElement.parentElement.remove()
    updateTotalCart()
}


function updateTotalCart() {
    var containerOfCartItems = document.getElementsByClassName('items-cart')[0]
    var rowsInCart = containerOfCartItems.getElementsByClassName('row')
    var total = 0
    for (var i = 0; i < rowsInCart.length; i++) {
        var cartRow = rowsInCart[i]
        var priceElement = cartRow.getElementsByClassName('item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('item-quantity')[0]
        var realPrice = parseFloat(priceElement.innerText.replace('€', ''))
        var realQuantity = quantityElement.value
        total = total + (realPrice * realQuantity)
        console.log(realPrice)
    }
    document.getElementsByClassName('total-price-cart')[0].innerText = '€' + total + '.00'
}