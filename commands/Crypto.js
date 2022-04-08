const {ACommand} = require("./ACommand");
/**
 * Class Crypto (for the '!crypto' command).
 *
 * @class Crypto
 * @extends ACommand
 */
class Crypto extends ACommand {

    urlSell;
    urlBuy;
    urlSpot;

    // create data (the message)
    createData(coinAbb, currencyType, sellData, buyData, spotData) {

        try {

            // price data
            const sellInput = sellData; // sell price data
            const buyInput = buyData; // buy price data
            const spotInput = spotData; // spot price data

            // if the coin abbreviation and currency type inputted by the user do not
            // line up with the data within the JSON, throw an error

            if (!sellInput.data.data.base === coinAbb ||
                !sellInput.data.data.currency === currencyType ||
                !buyInput.data.data.base === coinAbb ||
                !buyInput.data.data.currency === currencyType ||
                !spotInput.data.data.base === coinAbb ||
                !spotInput.data.data.currency === currencyType) throw Error();

            // if everything is correct, then send the message containing the specific
            // unit price for the given coin in the given currency

            this.msg = '**' + '```CSS' + '\n' + 'For 1 ' + coinAbb.toUpperCase() + ': ' + '\n'
                       + 'sell price: ' + sellInput.data.data.amount + ' ' +
                       currencyType.toUpperCase() + '\n' + 'buy price: ' + buyInput.data.data.amount
                       + ' ' + currencyType.toUpperCase() + '\n' + 'spot price: ' +
                       spotInput.data.data.amount + ' ' + currencyType.toUpperCase() + '\n'
                       + '```' + "**";

        } catch (e) {

            // error handling: if coin or currency argument does not match JSON

            this.msg = 'inputs and JSON do not match: make sure your inputs are'
                       + ' correct. They should be in this format: '
                       + '**!crypto BTC USD**';
        }
    }

    // send an error message to the channel if the number of arguments is incorrect
    toChannelArgumentError() {
        this.bot.sendMessage({to: this.channel,
                                 message: 'Please provide a valid **coin abbreviation** '
                                          + '(ex. BTC) and **currency type** (ex. USD)'});
    }

    // constructs the cURL API to access JSON data
    createURL(coinAbb, currencyType) {
        // constructs the sell price URL needed for the axios GET call
        this.urlSell = 'https://api.coinbase.com/v2/prices/'
                        + coinAbb
                        + '-'
                        + currencyType
                        + '/'
                        + 'sell';

        // constructs the buy price URL needed for the axios GET call
        this.urlBuy = 'https://api.coinbase.com/v2/prices/'
                       + coinAbb
                       + '-'
                       + currencyType
                       + '/'
                       + 'buy';

        // constructs the spot price URL needed for the axios GET call
        this.urlSpot = 'https://api.coinbase.com/v2/prices/'
                        + coinAbb
                        + '-'
                        + currencyType
                        + '/'
                        + 'spot';
    }

    // sends an error message to the channel if the input is incorrect
    incorrectInputError() {
        this.bot.sendMessage({to: this.channel, message: 'Could not find coin: make sure '
                                                         + 'your inputs are correct. ' + '\n'
                                                         + 'They should be in this format: '
                                                         + '**!crypto BTC USD**'});
    }
}

module.exports = { Crypto }

