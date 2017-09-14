/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = "arn:aws:lambda:us-east-1:442666017492:function:debbie-downer-facts";

var SKILL_NAME = "Debbie Downer Facts";
var GET_FACT_MESSAGE = "Here's your fact: ";
var HELP_MESSAGE = "Hi, tell me to give you a quote unquote fact, or, you can say exit... that's it. What do you want?";
var HELP_REPROMPT = "Once time a person died from waiting, don't make me. What do you want?";
var STOP_MESSAGE = "Goodbye!";


//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
    "Chocolate can be used to calm a person down, it also on average contains three bug legs",
    "There are 7.2 billion people in the world which is still fewer than lifeforms living on your skin.",
    "Koala bears are a huge staple in the Australian culture. However 90% have chlamydia which is threatening their species",
    "Most laugh tracks were filmed in the 50's, which means you are listening to the laughter of dead people",
    "Dr Seus is the most celebrated author of all time. Too bad his wife commited suicide after she realized he was an adulterer.",
    "Nothing beats the smell of cut grass. However, the smell is a chemical distress signal the grass sends. It's basically screams of grass being maimed.",
    "Did you know the song Happy Birthday, is copyrighted? Even crazier is the Mars Rover sings Happy Birthday to itself on Mars making it the loneliest birthday ever",
    "The oldest creature ever, Ming, the clam is 507 years old. However, we killed him when we wanted to find out how old he was.",
    "CPR can save lives, however, only 2% of those who receive CPR will actually be saved",
    "Mount Everest is the highest point in the world. So high, in fact, that 200 bodies liter the mountain and are unreachable",
    "More US soliders died from sucicide than combat",
    "You are a beautiful person. However, on average people see themselves as 10% more attractive than how people perceive them.",
    "A cow makes 2.2 dollars from the European government daily. This is more than 1.2 billion people in poverty",
    "80% of the world\'s population lives on less than $10 dollars a day",
    "Christmas is a time of joy where kids tell Santa want they want. Too bad, the tenth most requested Christmas gift is more a paternal figure.",
    "Hunger is a huge problem in the world, too bad obesity is now a more common health risk."


];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
