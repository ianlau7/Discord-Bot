const {ACommand} = require("./ACommand");
/**
 * Class Help (for the '!help' command).
 *
 * @class Help
 * @extends ACommand
 */
class Help extends ACommand {

    // create data (the message)
    createData(id) {
        this.msg = 'Hi ' + id + '!' + "\n" + // greeting
                   "Welcome to the server. Here are some possible "
                   + "commands:" +
                   // hello command
                   "\n" + "    **!hello:**" + "\n" + // command
                   " I will say hello to you! :)" + "\n" // description
                   // mood command
                   + "    **!mood:** " + "\n" + // command
                   "I will tell you how I am feeling!" + // desc
                   // crypto command
                   "\n" + "    **!crypto:** " + "\n" + // command
                   "I will tell you the unit price" + // description
                   " (sell, buy, and spot), in any currency, "
                   + "for any crypto " + "available on coinbase. "
                   + "The format for this command "
                   + "should be as follows:" + "\n"
                   + "                        " // indentation
                   + "***!crypto [coin abbreviation]" // format
                   + " [currency type]***" + "\n" +
                   "                          " // indentation
                   + "*ex: !crypto BTC USD*" + // example
                   // stock command
                   "\n" + "    **!stock:** " + "\n" +
                   "I will tell you the price (opening, closing, " // desc
                   + "pre-market, post-market), in USD, " +
                   " for any US stock, on any date "
                   + "(2 years prior to today's date). "
                   + "The format for this command " +
                   "should be as follows:" + "\n" +
                   "                      " // indentation
                   + "***!stock [stock abbreviation]" // format
                   + " [date] *** " + "\n" +
                   "                      " // indentation
                   + "(date must be in this format:" // date format
                   + " **mm/dd/yyyy**)"
                   + "\n" + "                        " // indentation
                   + "*ex: !stock AAPL 01/24/2020*" // example cmd
                   // 8 ball command
                   + "\n" + "    **!8ball:** " + "\n" // command
                   + "Enter a question" + // desc
                   " (cannot be blank) and it will be answered with "
                   + "traditional 8 ball answers.";

        this.embd = {title: 'invite me elsewhere :)', // hyperlink name
            url: 'https://discordapp.com/oauth2/authorize?&client_id=9'
                 + '33417568872583279&scope=bot&permissions=8'}
    }
}

module.exports = { Help }
