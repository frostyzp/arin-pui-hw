// HANDLES CART PAGE - REMOVING, STORING, ADDING OF ITEMS


class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
            this.type = rollType;
            this.glazing = rollGlazing;
            this.size = packSize;
            this.basePrice = basePrice;
            this.element = null;
            this.totalPrice = basePrice * packSize;
        }
    }

  const cart = new Set();


function addCart(rollType, rollGlazing, packSize, basePrice){
    const addRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.add(addRoll);
    console.log('addCart', cart);
    // return reference to newly created roll object
    return addRoll
}

// ADDING TO CART, DELETING ITEMS // 
// const rollOn = addCart("original", "Sugar Milk", 1, 2.49);


// need to create a new element to be used, rn 
// its replacing the current one
function createElement(roll){
    const template = document.querySelector('#roll-cart-template');
    const clone = template.content.cloneNode(true);

    // store a reference to the newly copied element
    roll.element = clone.querySelector('.cart-item-flex');
    console.log('element', roll.element);

    // appending to a list, which will be displayed 
    const cartList = document.querySelector('.nav-right');
    cartList.append(roll.element);
    updateElement(roll);

    // reference to the remove button
    const btnRemove = roll.element.querySelector('p.remove');
    btnRemove.addEventListener('click', () => {
        deleteRoll(roll);
    });

}


function updateElement(roll){
    //get references to the elements from DOM
    const rollImageElement = roll.element.querySelector('.product-img');
    const rollTitleElement = roll.element.querySelector('.titleElement');
    const rollGlazing = roll.element.querySelector('.glazeElement');
    const rollSize = roll.element.querySelector('.sizeElement');
    const rollPrice = roll.element.querySelector('div#banner');
    const rollTotalPrice = roll.element.querySelector('div#banner');

    // update price so it accurately reflects content

    //update element properties on DOM
    rollImageElement.src = 'img/products/' + roll.type + '-cinnamon-roll.jpg'
    rollTitleElement.innerText = roll.type[0].toUpperCase() + roll.type.slice(1) +' Cinnamon Roll';
    rollGlazing.innerText = "Glazing: " +roll.glazing;
    rollSize.innerText = "Pack Size: " +roll.size;
    rollPrice.innerText = roll.basePrice;
    rollTotalPrice.innerText = '$' +roll.totalPrice;

}

function deleteRoll(roll){
    roll.element.remove();
    cart.delete(roll);
    // make sure to update total price
    displayTotal();
    saveToLocalStorage();

}

function displayTotal() {
    let totalCalculation = 0;
    for (const roll of cart){
        // add total prices of roll w each roll in cart
        totalCalculation += roll.totalPrice;
        // rounding to two decimal places
        totalCalculation = Math.round(totalCalculation * 100) / 100;
    }
    // update DOM and HTML
    let totalElement = document.querySelector('.total-item-flex>#banner');
    totalElement.innerText = '$' +totalCalculation;

}

// ###### DATA STORAGE ########
function saveToLocalStorage() {
    const cartArray = Array.from(cart);
    console.log('array', cartArray);

    // string of text is something we can save!
    const cartArrayString = JSON.stringify(cartArray);
    // console.log('cartArrString', cartArrayString);

    // set item to save text, as local storage
    localStorage.setItem('storedCart', cartArrayString);
  }


  function retrieveFromLocalStorage() {
    const cartArrayString = localStorage.getItem('storedCart');
    // console.log('cartArrayString', cartArrayString)

    // turn string of text BACK INTO a js array
    const cartArray = JSON.parse(cartArrayString);

    // for each object, create a new object to repopulate the page
    for (const rollData of cartArray) {
        const roll = addCart(rollData.type, rollData.glazing,
            rollData.size, rollData.basePrice);
        createElement(roll);
        }
    console.log('Retrieved cart Array', cartArray);

}

if (localStorage.getItem('storedCart') != null) {
    console.log('Retrieving from local storage!');
    retrieveFromLocalStorage();
}

// updates the total price
displayTotal();






