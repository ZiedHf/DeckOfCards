export function isRedCard(card) {
    let cardNumber = getNumberFromClass(card);
    if(Number.isInteger(cardNumber)) {
        // Get the number of this card and convert it
        return cardNumber < 27;
    }

    if (Number.isInteger(card) && card < 53 && card > 0) {
        return card < 27;
    } else {
        // card is not the className, neither a right number
        console.error('Something wrong here');
    }
    return false;
};

export function getNumberFromClass(card) {
    if(typeof card === `string` && card.includes('card')) {
        // Get the number of this card and convert it to
        return Number.parseInt(card.slice(4));
    }
    return false;
};

export function getCardClass(card) {
    return isRedCard(card) ? 'cardBackRed' : 'cardBackBlack';
};