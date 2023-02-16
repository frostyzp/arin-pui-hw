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

// Fetch element from HTML
let glazeElement = document.querySelector('#glazingOptions'); 
let packElement = document.querySelector('#packOptions');
let baseprice = 2.49;


function glazingChange(element) {
    // Convert the string value to an integer
    let glazeIndex = parseInt(element.value);
    // Now retrieve the object at the index specified by the select's value
    glazingPrice = glazesArray[glazeIndex].price;
    // Update the UI
    displayTotal();
}

function packChange(element) {
    // Convert the string value to an integer
    let packIndex = parseInt(element.value);
    // Now retrieve the object at the index specified by the select's value
     packPrice = packArray[packIndex].price;
     console.log('packprize', packPrice);
    // Update the UI
     displayTotal();
}

// Update UI for total price
function displayTotal() {
    let totalElement = document.querySelector('#add-cart span');  
    let totalCalculation = Math.round((baseprice + glazingPrice) * packPrice * 100) / 100; 
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

// Initially, display the price with the default settings
let glazingPrice = glazesArray[0].price;
let packPrice = packArray[0].price;
displayTotal();
