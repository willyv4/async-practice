const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=1";

// /*
// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
// Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
// */

async function getDeck(url) {
  try {
    const resp = await axios.get(url);
    console.log(resp);
    const suit = resp.data.cards[0].suit;
    const val = resp.data.cards[0].value;
    const card = `${val} of ${suit}`;
    console.log(card);
  } catch (e) {
    console.log(e);
  }
}

getDeck(url);

// /*
// Make a request to the deck of cards API
// to request a single card from a newly shuffled deck.
// Once you have the card, make a request to the same API to get one more card from the same deck.
// */

async function getDeckafterOneDeck(url) {
  try {
    const resp = await axios.get(url);
    console.log(resp);
    const suit = resp.data.cards[0].suit;
    const val = resp.data.cards[0].value;
    const card = `${val} of ${suit}`;
    console.log(card);

    const resp2 = await axios.get(url);
    const suit1 = resp2.data.cards[0].suit;
    const val1 = resp2.data.cards[0].value;
    const card1 = `${val1} of ${suit1}`;
    console.log(card1);
  } catch (e) {
    console.log(e);
  }
}

getDeckafterOneDeck(url);

/*
Build an HTML page that lets you draw cards from a deck.
When the page loads, go to the Deck of Cards API to create a new deck,
and show a button on the page that will let you draw a card.
Every time you click the button, display a new card, until there are no cards left in the deck.
*/

$("#card-button").on("click", getCard);
let deck = null;
let deckCount = 52;

async function genDeckGame() {
  const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=1";
  try {
    const resp = await axios.get(url);
    const deckId = resp.data.deck_id;
    return deckId;
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function getDeckGame() {
  const deckId = await genDeckGame();
  deck = deckId;
}

getDeckGame();

$("#new-deck").on("click", async function () {
  $("#card-container").empty();
  deckCount = 52;
  const deckId = await genDeckGame();
  deck = deckId;
});

async function getCard() {
  deckCount--;
  const { num, otherNum } = randomNum();
  try {
    const resp = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
    );
    const card = resp.data.cards[0].image;
    $("#card-container").append(
      `<img src="${card}" alt="card" id="images" class="absolute flex items-center justfiy-center" style="transform: rotate(${num}deg); top: ${otherNum}px;"/>`
    );
  } catch (e) {
    console.log(e);
  }

  if (deckCount === 0) {
    $("#messages")
      .append(
        "<h3 id='message' class='absolute top-0 w-screen bg-zinc-900 text-white font-bold text-2xl p-2'>Out of Cards!</h3>"
      )
      .fadeIn();
    setTimeout(() => {
      $("#message").fadeOut();
    }, 4000);
  }
}

function randomNum() {
  const num = Math.floor(Math.random() * 70 - 35);
  const otherNum = Math.floor(Math.random() * 45) + 170;
  return { num, otherNum };
}
