const {ACommand} = require("./ACommand");
/**
 * Class Stock (for the '!stock' command).
 *
 * @class Stock
 * @extends ACommand
 */
class Stock extends ACommand {

    url;
    day;
    month;
    year;
    date;

    // create data (the message)
    createData(stockAbb, data) {

        try {

            // retrieves data from the JSON
            const input = data;

            // if the stock abbreviation and date inputted by the user do not
            // line up with the data within the JSON, throw an error

            if (!input.data.symbol === stockAbb ||
                this.date === !input.data.from) throw Error();

            // array of all months to output
            const months = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November",
                            "December"]

            const monthIndex = parseInt(this.month);

            // if everything is correct, then set the message containing the specific
            // unit price for the given coin in the given currency
            this.msg = '**' + '```CSS' + '\n' + stockAbb.toUpperCase() + ' '  + 'on ' +
                       months[monthIndex - 1] + " " + this.day + ", " + this.year + ': ' + '\n' +
                       'Price per share before market opened: ' + input.data.preMarket + " USD" +
                       '\n' +
                       'Price per share when market opened: ' + input.data.open + " USD" +'\n' +
                       'Price per share when market closed: ' + input.data.close + " USD" +'\n' +
                       'Price per share after market closed: ' + input.data.afterHours + " USD" +
                       '\n' +
                       'Price High: ' + input.data.high + " USD" +'\n' +
                       'Price Low: ' + input.data.low + " USD" +'\n' +
                       'Volume: ' + input.data.volume + " shares" + '\n' + '\n' + '```' + "**";

        } catch (e) {

            // error handling: if stock or date does not match JSON

            this.msg = 'input does not match JSON: make sure your '
                       + 'inputs are correct. They should be in this format: '
                       + '**!stock AAPL 10/14/2020**' + '\n' +
                       "10/14/2020 represents the date October 14th, 2020"
                       + '\n' + "  ***note: ***" +
                       " *date and time should be in* " +
                       "** mm/dd/yyyy**"+ " *format*";
        }
    }

    // send an error message to the channel if the number of arguments is incorrect
    toChannelArgumentError() {
        this.bot.sendMessage({to: this.channel,
                                 message: 'Please provide a valid **stock abbreviation** '
                                          + '(ex. AAPL) and **date** (ex. 10/14/2020)'});
    }

    // constructs the cURL API to access JSON data
    createURL(stockAbb, inputDate) {
        //breaks down the date input into the proper format for the URL
        const dateBreakdown = inputDate.split('/');
        this.month = dateBreakdown[0];
        this.day = dateBreakdown[1];
        this.year = dateBreakdown[2];
        this.date = this.year + "-" + this.month + "-" + this.day;

        // constructs the URL needed for the axios GET call
        this.url = 'https://api.polygon.io/v1/open-close/' +
                    stockAbb +
                    '/' +
                   this.date +
                    '?adjusted=true&apiKey=vQLg0mwHKuR3zzEF0MjPpEKmEFo3INDV';
    }

    // sends an error message to the channel if the input is incorrect
    incorrectInputError() {
        this.bot.sendMessage({to: this.channel, message: 'Could not find stock or date: make '
                                                         + 'sure your inputs are correct. ' + '\n'
                                                         + 'They should be in this format: '
                                                         + '**!stock AAPL 10/14/2020**' + '\n' +
                                                         "*(10/14/2020 represents the date "
                                                         + "October 14th, 2020)*" + '\n' +
                                                         "    ***note: ***" +
                                                         " *date and time should be in* " +
                                                         "** mm/dd/yyyy**"+ " *format*"});
    }
}

module.exports = { Stock }
