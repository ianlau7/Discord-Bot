/**
 * Abstract Class ACommand.
 *
 * @class ACommand
 */
class ACommand {

    bot;
    channel;
    msg;
    embd;

    // constructs object, initializes bot and channel fields if not the abstract class
    constructor(client, channelID) {
        if (this.constructor === ACommand) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.bot = client;
        this.channel = channelID;
    }

    // create data (the message)
    createData() {
        throw new Error("Method 'createData' must be implemented.");
    }

    // send message to the channel
    toChannel() {
        if (this.constructor === ACommand) {
            throw new Error("Method 'toChannel' must be implemented.");
        }

        if (this.channel == null) {
            throw new Error('no channel found');
        } else if (this.msg != null && this.embd == null) {
            this.bot.sendMessage({to: this.channel, message: this.msg});
        } else if (this.msg == null && this.embd != null) {
            this.bot.sendMessage({to: this.channel, embed: this.embd});
        } else if (this.msg != null && this.embd != null) {
            this.bot.sendMessage({to: this.channel, message: this.msg, embed: this.embd});
        } else {
            throw new Error('no message or embed to be sent');
        }
    }

    // send an error message to the channel if the number of arguments is incorrect
    toChannelArgumentError() {
        throw new Error("Method 'toChannelArgumentError' must be implemented.");
    }

    // constructs the cURL API to access JSON data
    createURL() {
        throw new Error("Method 'createURL' must be implemented.");
    }
}

module.exports = { ACommand }