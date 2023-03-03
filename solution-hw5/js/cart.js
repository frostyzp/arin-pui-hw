const cart = new Set();

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
            this.type = rollType;
            this.glazing =  rollGlazing;
            this.size = packSize;
            this.basePrice = basePrice;
            this.element = null;
        }
    }

function addCart(rollType, rollGlazing, packSize, basePrice){
    const addRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.add(addRoll);
    console.log('addCart', cart);
    // return reference to newly created roll object
    return addRoll
}

// ADDING TO CART, DELETING ITEMS // 

// need to create a new element to be used, rn 
// its replacing the current one
function createElement(roll){
    const template = document.querySelector('#roll-cart-template');
    console.log('template', template);
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

    console.log('roll update', roll)

    //update element properties on DOM
    rollImageElement.src = 'img/products/' + roll.type + '-cinnamon-roll.jpg'
    rollTitleElement.innerText = roll.type[0].toUpperCase() + roll.type.slice(1) +' Cinnamon Roll';
    rollGlazing.innerText = "Glazing: " +roll.glazing;
    rollSize.innerText = "Pack Size: " +roll.size;
    rollPrice.innerText = roll.basePrice;
}

function deleteRoll(roll){
    roll.element.remove();
    cart.delete(roll);
}

// make roll objects
const rollOn = addCart("original", "Sugar Milk", 1, 2.49)
const rollTwo = addCart("walnut", "Vanilla Milk", 12, 3.49)
const rollThree = addCart("raisin", "Sugar Milk", 3, 2.99)
const rollFour = addCart("apple", "Original", 3, 3.49)

// loop through the set and create a DOM element for each Notecard object.
for (const roll of cart){
    createElement(roll);
}



// div#banner -> total price (total-item-flex)
// div#banner  -- in cart item flex