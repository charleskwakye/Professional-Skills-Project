if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeItemButton = document.querySelectorAll('.fa-trash-can')
    console.log(removeItemButton)
    for (let i = 0; i < removeItemButton.length; i++) {
        let button = removeItemButton[i]
        button.addEventListener('click', removeItemFromCart)
    }
    let inputsForQuantity = document.getElementsByClassName('item-quantity')
    for (let i = 0; i < inputsForQuantity.length; i++) {
        let realInput = inputsForQuantity[i]
        realInput.addEventListener('change', changeQuantity)
    }
    let addToCartBtns = document.getElementsByClassName('add-button')
    for (let i = 0; i < addToCartBtns.length; i++) {
        let button = addToCartBtns[i]
        button.addEventListener('click', addWhenClicked)
    }
    document.getElementsByClassName('button-buy-now')[0].addEventListener('click', buyNowClicked)
}

function buyNowClicked() {
    // let boughtShoeNames = []
    // let boughtShoePrice = []
    // let cartItemNames = wholeCart.getElementsByClassName('item-name')
    // for (let i = 0; i < cartItemNames.length; i++) {
    //     let nowName = cartItemNames[i].innerText
    //     boughtShoeNames.push(nowName)
    //
    // }
    //
    // let cartItemPrices = wholeCart.getElementsByClassName('item-price')
    // for (let i = 0; i < cartItemPrices.length; i++) {
    //     let nowPrice = cartItemPrices[i].innerText
    //     boughtShoePrice.push(nowPrice)
    //
    // }


    // const firstArray = ['New Balance', 'Adidas', 'Nike']
    // const secondArray = ['120', '350', '900']
    // let namesOfShoesInfo = firstArray.toString()
    // let pricesOfShoesInfo = secondArray.toString()
    //
    // let shoeNameSent = boughtShoeNames.toString()
    // let shoePriceSent = boughtShoePrice.toString()
    // let shoeNamesInput = document.querySelector('#namesOfShoes')
    // let shoesPriceInput = document.querySelector('#pricesOfShoes')
    //
    // shoeNamesInput.setAttribute("value", namesOfShoesInfo)
    // shoesPriceInput.setAttribute("value", pricesOfShoesInfo)

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thanks for your order!',
        showConfirmButton: false,
        timer: 1500
    })

    let wholeCart = document.getElementsByClassName('items-cart')[0]
    while (wholeCart.hasChildNodes()){
        wholeCart.removeChild(wholeCart.firstChild)
    }
    updateTotalCart()
    return true; // change back to allow form to submit
}



function addWhenClicked(event) {
    let button = event.target
    let storeItem = button.parentElement.parentElement
    let title = storeItem.getElementsByClassName('item-name')[0].innerText
    let price = storeItem.getElementsByClassName('item-price')[0].innerText
    let imageSource = storeItem.getElementsByClassName('item-price')[0].parentElement.parentElement.previousElementSibling.src

    console.log(title, price, imageSource)
    addItemClickedItemToCart(title, price, imageSource)
    updateTotalCart()
}

function addItemClickedItemToCart(title, price, imageSource) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('row')
    let wholeCart = document.getElementsByClassName('items-cart')[0]
    let cartItemNames = wholeCart.getElementsByClassName('item-name')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title){
            swal.fire('This item has already been added to your cart')
            return
        }
    }
    let contentsOfCartRow = `
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
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotalCart()
}

function removeItemFromCart(event) {
    let clickedButton = event.target
    clickedButton.parentElement.parentElement.parentElement.remove()
    updateTotalCart()
}


function updateTotalCart() {
    let containerOfCartItems = document.getElementsByClassName('items-cart')[0]
    let rowsInCart = containerOfCartItems.getElementsByClassName('row')
    let total = 0
    for (let i = 0; i < rowsInCart.length; i++) {
        let cartRow = rowsInCart[i]
        let priceElement = cartRow.getElementsByClassName('item-price')[0]
        let quantityElement = cartRow.getElementsByClassName('item-quantity')[0]
        let realPrice = parseFloat(priceElement.innerText.replace('€', ''))
        let realQuantity = quantityElement.value
        total = total + (realPrice * realQuantity)
        console.log(realPrice)
    }
    document.getElementsByClassName('total-price-cart')[0].innerText = '€' + total + '.00'
}