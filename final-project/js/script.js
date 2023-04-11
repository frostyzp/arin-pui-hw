
// Scatter different elements across the screen/page
const items = document.querySelectorAll('.item');
console.log(items)

items.forEach((box, index) => {
    const randomInt = Math.random(); // Generates a random integer between 1 and 10 (inclusive)
    console.log(randomInt)
    multiplier = 1;

    // if (randomInt >= 0.5) {
    //     multiplier -= 60;
    //   }

  const leftPosition = (index / items.length) * 30;
  const vertPosition = (index / items.length) * 100 * multiplier;


  box.style.left = `${leftPosition}%`;
  box.style.top = `${vertPosition}%`
});