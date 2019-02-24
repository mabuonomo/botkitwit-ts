"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_wit_1 = require("node-wit");
class BotKitWit {
    constructor(configWit) {
        this.getClientWit = () => {
            return this.client;
        };
        this.receive = (bot, message, next) => {
            if (message.text) {
                this.getClientWit().message(message.text, {})
                    .then((data) => {
                    message.entities = data.entities;
                    message.response = JSON.stringify(data);
                    next();
                }).catch((error) => {
                    next(error);
                });
            }
            else if (message.attachments) {
                message.intents = [];
                next();
            }
            else {
                next();
            }
        };
        this.heard = (tests, message) => {
            let keys = Object.keys(message.entities);
            while (keys.length > 0) {
                let key = keys.shift();
                let entity = message.entities[key].shift();
                let confidence = entity.confidence;
                if (tests.find((value) => value == key) &&
                    confidence >= this.config.minimum_confidence) {
                    return true;
                }
            }
            return false;
        };
        this.config = configWit;
        this.client = new node_wit_1.Wit({ accessToken: this.config.token });
    }
}
exports.BotKitWit = BotKitWit;
