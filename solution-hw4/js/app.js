
class Roll {
constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
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
headerElement.innerText = rollType +' Cinnamon Roll';

// Update the image
const rollImage = document.querySelector(".product-img");
rollImage.src = 'img/products/' + rollType + '-cinnamon-roll.jpg';

// Update the base price
let basePrice = rolls[rollType].basePrice;

// store cart
let cart = [];

// store options for dropdown
let glazesArray = [
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
let packArray = [
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

function addCart(){
    const addRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.push(addRoll);
    console.log(cart);
    displayTotal();
}


const btnAddCart = document.querySelector('#add-cart .highlight');
btnAddCart.onclick = addCart;
console.log(btnAddCart)


// Initially, display the price with the default settings
let glazingPrice = glazesArray[0].price;
let rollGlazing = glazesArray[0].glaze;
let packPrice = packArray[0].price;
let packSize = packArray[0].packSize;
displayTotal();





