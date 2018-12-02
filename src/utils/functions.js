export const numberOfCards = 5;
export const loadingEffectIn = 2000;
export function isRedCard(card) {
  let cardNumber = getNumberFromClass(card);
  if (Number.isInteger(cardNumber)) {
    // Get the number of this card and convert it
    return cardNumber < 27;
  }

  if (Number.isInteger(card) && card < 53 && card > 0) {
    return card < 27;
  } else {
    // card is not the className, neither a right number
    console.error("Something wrong here");
  }
  return false;
}

export function getNumberFromClass(card) {
  if (typeof card === `string` && card.includes("card")) {
    // Get the number of this card and convert it to
    return Number.parseInt(card.slice(4));
  }
  return false;
}

export function getCardClass(card) {
  return isRedCard(card) ? "cardBackRed" : "cardBackBlack";
}

/** Shuffle cards and get random order */
export function shuffle(cards) {
  cards = cards && cards.length ? cards : getInitialCards();
  // We will shuffle the cases 51 times here
  for (let i = 0; i < cards.length - 1; i++) {
    // Get a random number between 0 and (i+1)
    const j = Math.floor(Math.random() * (i + 1));
    // Switch using es6 (no need to temporary variable)
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

/** Get the initial card numbers */
export function getInitialCards() {
  let cards = [];
  for (let i = 0; i < numberOfCards; i++) {
    cards.push(i + 1);
  }
  return cards;
}
