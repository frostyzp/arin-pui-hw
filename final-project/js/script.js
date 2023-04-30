// Store show items in a set
const showSet = new Set();

class Show {
  constructor(title, year, description, img) {
          this.title = title;
          this.year = year;
          this.description = description;
          this.img = img;

          this.imgSrc = 'shows/' +this.img + '.jpg'
          this.element = null;
      }
  }

// GET REFERENCES TO THE CONTAINER ELEMENT IN HTML FILE
const container = document.getElementById('container');
const items = document.querySelectorAll('.item');

// CREATE OBJECTS FROM THE ARRAY (SHOWS)
  for (const showtest in shows) {
    console.log("Created Objects", shows[showtest]);
    showObj = shows[showtest]
    addShows(showObj.title, showObj.year, showObj.description, showObj.img);
  }

// CREATE DOM ELEMENTS FOR EACH ITEM
for (const showItem of showSet) {
  console.log('SHOWITEM', showItem);
  createElement(showItem);
}

// CREATE ELEMENTS (HTML) TO BE DISPLAYED
function createElement(showItem){
  const template = document.querySelector('#show-template');
  const clone = template.content.cloneNode(true);
  showItem.element = clone.querySelector('.item');

  const showListElement = document.querySelector('#show-list');
  showListElement.append(showItem.element);

  updateElement(showItem);
}

// UPDATE ELEMENTS BASED ON JS ARRAY - IMG, YEARS, DESCRIPTION ETC.
function updateElement(showItem){
    const showImgElement = showItem.element.querySelector('.show');
    showImgElement.src = 'assets/shows/' +showItem.img + '.jpg';

    console.log('UPDATE / UPDATE', showItem.element)
    showItem.element.dataset.year = showItem.title;
    showItem.element.dataset.description = showItem.description;
    // const newElement = document.createElement('p');
}

// ADD SHOW OBJECTS TO A SET WHICH WILL BE RENDERED ONTO THE PAGE
function addShows(title, year, description, img){
  const showItem = new Show (title, year, description, img);
  showSet.add(showItem);
  return showItem
}
