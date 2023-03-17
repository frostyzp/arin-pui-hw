// UPDATES THE PRODUCT DETAIL PAGE W RELEVANT PICTURES AND DETAILS OF ROLLS 

// If no cart exists in storage, create an empty cart
const cart = new Set();

// store options for dropdown
const glazesArray = [
    {
        glaze: 'Keep Original',
        price: 0,
    },
    {
        glaze: 'Sugar Milk',
        price: 0,
    },
    {
        glaze: 'Vanilla Milk',
        price: 0.50,
    },
    {
        glaze: 'Double Chocolate',
        price: 1.50,
    }
];

const packArray = [
    {
        packSize: '1',
        price: 1,
    },
    {
        packSize: '3',
        price: 3,
    },
    {
        packSize: '6',
        price: 5,
    },
    {
        packSize: '12',
        price: 10,
    }
];


class Roll {
constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.element = null;
        this.glazingPrice = glazingPrice;
    }
}

// Fetch element from HTML
let glazeElement = document.querySelector('#glazingOptions'); 
let packElement = document.querySelector('#packOptions');

// Retrieve URL
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

// Update the header text
const headerElement = document.querySelector("#banner");
headerElement.innerText = rollType[0].toUpperCase() + rollType.slice(1) +' Cinnamon Roll';

// Update the image
const rollImage = document.querySelector(".product-img");
rollImage.src = 'img/products/' + rollType + '-cinnamon-roll.jpg';

// Update the base price
let basePrice = rolls[rollType].basePrice;

function glazingChange(element) {
    // Convert the string value to an integer
    let glazeIndex = parseInt(element.value);
    // Now retrieve the object at the index specified by the select's value
    glazingPrice = glazesArray[glazeIndex].price;
    rollGlazing = glazesArray[glazeIndex].glaze;

    // Update the UI
    displayTotal();
}

function packChange(element) {
    // Convert the string value to an integer
    let packIndex = parseInt(element.value);
    // Now retrieve the object at the index specified by the select's value
     packPrice = packArray[packIndex].price;
     packSize = packArray[packIndex].packSize;
    // Update the UI
     displayTotal();
}

// Update UI for total price
function displayTotal() {
    let totalElement = document.querySelector('#add-cart span');  
    let totalCalculation = Math.round((basePrice + glazingPrice) * packPrice * 100) / 100; 
    totalElement.innerText = '$ ' +totalCalculation;
  }

// Populate drop down
for (let i = 0; i < glazesArray.length; i++){
    var option = document.createElement('option');
    option.text = glazesArray[i].glaze;
    option.value = i; 
    glazeElement.add(option);  
}
for (let i = 0; i < packArray.length; i++){
    var option = document.createElement('option');
    option.text = packArray[i].packSize;
    option.value = i;
    packElement.add(option);  
}

function addCart(rollType, rollGlazing, packSize, basePrice){
    const addRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.add(addRoll);
    console.log('addCart', cart);
    displayTotal();
    // return reference to newly created roll object
    return addRoll
}


// Initially, display the price with the default settings
let glazingPrice = glazesArray[0].price;
let rollGlazing = glazesArray[0].glaze;
let packPrice = packArray[0].price;
let packSize = packArray[0].packSize;
displayTotal();

const btnAddCart = document.querySelector('#add-cart .highlight');
btnAddCart.addEventListener('click', () => {
    // updated cart to JSON, save it in the local storage, and print the current contents of the cart in local storage after saving.

    // If no cart exists in the storage, create an empty cart array.
    const roll = addCart(rollType, rollGlazing, packSize, basePrice);
    saveToLocalStorage();
    console.log('Added item to cart - saved to local storage');
});

// stores arrays as text
function saveToLocalStorage() {
    const cartArray = Array.from(cart);

    // string of text is something we can save!
    const cartArrayString = JSON.stringify(cartArray);

    // set item to save text
    localStorage.setItem('storedCart', cartArrayString);
  }

function retrieveFromLocalStorage() {
    const cartArrayString = localStorage.getItem('storedCart');

    // turn back into a js ar
    const cartArray = JSON.parse(cartArrayString);
    console.log('Retrieved cart Array', cartArray);

    for (const rollData of cartArray) {
        const roll = addCart(rollData.type, rollData.glazing,
          rollData.size, rollData.basePrice);
      }
}

if (localStorage.getItem('storedCart') != null) {
        console.log('RETRIEVING FROM STORAGE!');
        retrieveFromLocalStorage();
      } 
