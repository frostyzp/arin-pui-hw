// Store show items in a set
const showSet = new Set();

class Show {
  constructor(title, year, creator, description, img) {
          this.title = title;
          this.year = year;
          this.description = description;
          this.img = img;
          this.creator = creator;

          this.imgSrc = 'shows/' +this.img + '.jpg'
          this.element = null;
      }
  }

// GET REFERENCES TO THE CONTAINER ELEMENT IN HTML FILE
const container = document.getElementById('container');

// CREATE OBJECTS FROM THE ARRAY (SHOWS)
  for (const showtest in shows) {
    showObj = shows[showtest]
    addShows(showObj.title, showObj.year, showObj.creator, showObj.description, showObj.img);
  }

// ADD SHOW OBJECTS TO A SET WHICH WILL BE RENDERED ONTO THE PAGE
function addShows(title, year, creator, description, img){
  const showItem = new Show (title, year, creator, description, img);
  showSet.add(showItem);
  return showItem
}

// CREATE DOM ELEMENTS FOR EACH ITEM
for (const showItem of showSet) {
  createElement(showItem);
}

// CREATE ELEMENTS (HTML) TO BE DISPLAYED
function createElement(showItem){
  const template = document.querySelector('#show-template');
  const clone = template.content.cloneNode(true);
  showItem.element = clone.querySelector('.showItem');

  const showListElement = document.querySelector('#show-list');
  showListElement.append(showItem.element);

  updateElement(showItem);
}

// UPDATE ELEMENTS BASED ON JS ARRAY - IMG, YEARS, DESCRIPTION ETC.
function updateElement(showItem){
    const showImgElement = showItem.element.querySelector('.show');
    showImgElement.src = 'assets/shows/' +showItem.img + '.jpg';
    showImgElement.alt = 'COVER IMAGE OF ' +showItem.title 

    showItem.element.dataset.title = showItem.title;
    showItem.element.dataset.year = showItem.year;
    showItem.element.dataset.creator = showItem.creator;
    showItem.element.dataset.description = showItem.description;
    showItem.element.dataset.category = showItem.year;
}





