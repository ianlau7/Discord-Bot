const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
const axios = require('axios');
const sql = ('sqlite'); // for a database feature coming soon

// command object imports
const {Crypto} = require('./commands/Crypto');
const {Stock} = require('./commands/Stock');
const {EightBall} = require('./commands/EightBall');
const {Help} = require('./commands/Help');
const {Mood} = require('./commands/Mood');



// logger settings configuration

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize: true});

logger.level = 'debug';

// initialize the bot (using the bot token key in our JSON file (auth.json))

const bot = new Discord.Client({ token: auth.token, autorun: true });

/**
 * when bot is turned on (event: bot starts)
 * - log that the bot is connected to Discord
 * - log that the user who logged in is admin
 * - log the bot name and ID
 */
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: Admin');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

/**
 * when a message is sent (event: a message is sent in the chat)
 * @user (the name of the user who sent the message)
 * @userID (the id of the user who sent the message)
 * @channelID (the id of the channel the message was sent in)
 * @message (the actual string that was sent by the user)
 */
bot.on('message', async function (user, userID, channelID,
                                  message, evt) {

    // check if message starts with !

    if (message.substring(0, 1) === '!') {

        let args = message.substring(1).split(' '); // split input by space
        const cmd = args[0]; // first argument is the command
        args = args.splice(1); // args is now the rest of the arguments excluding the command

        const idTag = '<@' + userID.toString() + '>'; // string to mention a user on Discord

        switch (cmd) {

            // !help - give a list of commands that can be used by this bot

            case 'help':

                // instantiate help command object
                const help = new Help(bot, channelID);

                // create the data (message) to be sent to the channel
                help.createData(idTag);

                // send the message to the channel
                help.toChannel();

                break;

            // !hello - say hello to the user!

            case 'hello':

                bot.sendMessage({to: channelID, message: 'Hello ' + idTag + '!'});

                break;

            // !mood - send a random mood

            case 'mood':

                // instantiate mood command object
                const mood = new Mood(bot, channelID);

                // create data (message) to be sent to the channel
                mood.createData();

                // send the message to the channel
                mood.toChannel();

                break;

            // !8ball - respond w a random 8 ball response

            case '8ball':

                // instantiate the 8 ball command object
                const eightball = new EightBall(bot, channelID);

                // if there is no question following the command, send an argument error message
                // to the channel
                if (args.length < 1) {

                    eightball.toChannelArgumentError();

                } else {

                    // create data (message) to be sent to the channel
                    eightball.createData();

                    // send the message to the channel
                    eightball.toChannel();
                }

                break;

            // !crypto (coin abbreviation) (currency)
            // get the sell, buy, and spot price of any crypto available on Coinbase in any currency

            case 'crypto':

                // instantiate the crypto command object
                const crypto = new Crypto(bot, channelID);

                // if there aren't enough arguments or too many arguments, send an error message
                // to the channel
                if (args.length !== 2) {

                    crypto.toChannelArgumentError();

                } else {

                    // make an array that contains the coin abbreviation and the currency type
                    const [coinAbb, currencyType] = args;

                    // creates the cURLs to access JSONs for parsing
                    crypto.createURL(coinAbb, currencyType);

                    try {

                        // parses data from the JSONs
                        const sellInput = await axios.get(crypto.urlSell); // sell price data
                        const buyInput = await axios.get(crypto.urlBuy); // buy price data
                        const spotInput = await axios.get(crypto.urlSpot); // spot price data

                        // creates the data (message) using the arguments as well as the parsed JSON
                        // data
                        crypto.createData(coinAbb, currencyType, sellInput, buyInput, spotInput);

                        // sends the message to the channel
                        crypto.toChannel();

                    } catch (e) {

                        // send an error message to the channel if the input is wrong
                        crypto.incorrectInputError();

                    }
                }

                break;

            // !stock (stock abbreviation) (date)
            // for a specific day, retrieve the PPS (Price Per Share) of a specific stock for
                // - pre market (USD)
                // - when market opened (USD)
                // - when market closed (USD)
                // - post market (USD)
            // as well as
                // - price High and Low (USD)
                // - Volume
            case 'stock':

                const stock = new Stock(bot, channelID);

                // if there aren't enough arguments or if there are too many, send an error message
                // to the  channel
                if (args.length !== 2) {

                    stock.toChannelArgumentError();

                } else {

                    // make an array that contains the stock abbreviation and the date
                    const [stockAbb, inputDate] = args;

                    // create the cURL using the inputs
                    stock.createURL(stockAbb, inputDate);

                    try {

                        // retrieve data from the JSON from the cURL
                        const input = await axios.get(stock.url);

                        // creates the data (message) using the arguments and parsed JSON data
                        stock.createData(stockAbb, input);

                        // sends the message to the channel
                        stock.toChannel();

                    } catch (e) {

                        // send an error message if the input is wrong
                        stock.incorrectInputError();

                    }
                }

                break;
        }
    }
});
