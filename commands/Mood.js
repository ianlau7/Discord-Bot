const {ACommand} = require("./ACommand");
/**
 * Class Mood (for '!mood' command).
 *
 * @class Mood
 * @extends ACommand
 */
class Mood extends ACommand {

    // create data (the message)
    createData() {
        const moods = ['Im feeling great today.', 'I am feeling terrible.', 'Go away.',
                       'I am doing okay.', 'help', 'Pushin P'];

        const num = Math.floor(Math.random() * 6); // random array index

        this.msg = moods[num];
    }
}

module.exports = { Mood }