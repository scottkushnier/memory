const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let card1 = null;
let card2 = null;
let wait_until_clear = null;   // disable clicking until cards blank out again


function clearCards() {
  card1.style.backgroundColor = null;
  card2.style.backgroundColor = null;
  card1 = null;
  card2 = null;
  wait_until_clear = null;
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  if (wait_until_clear) {
    return;
  }
  let div = event.target;
  if (div.style.backgroundColor) {
    return;
  }

  if (!card1) {
    div.style.backgroundColor = div.classList[0];
    card1 = div;
  } else if (!card2) {
    card2 = div;
    div.style.backgroundColor = div.classList[0];
    if (card1.classList[0] === card2.classList[0]) {   // match!
      card1 = null;
      card2 = null;
    } else {             // fail!
      wait_until_clear = true;
      setTimeout(clearCards, 1000);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
