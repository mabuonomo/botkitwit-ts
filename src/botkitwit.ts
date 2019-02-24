import { Wit } from 'node-wit';
import { NextFunction } from 'express';
import { IMessageWit } from './types/IMessageWit';
import { IConfig } from './types/IConfig';
import { IBotKitWit } from './types/IBotKitWit';

export class BotKitWit implements IBotKitWit {
    private config: IConfig;
    private client: Wit;
    constructor(configWit: IConfig) {
        this.config = configWit;
        this.client = new Wit({ accessToken: this.config.token });
    }

    getClientWit = (): Wit => {
        return this.client;
    }

    receive = (bot, message: IMessageWit, next: NextFunction) => {
        // Only parse messages of type text
        if (message.text) {
            this.getClientWit().message(message.text, {})
                .then((data) => {
                    message.entities = data.entities;
                    message.response = JSON.stringify(data);
                    next();
                }).catch((error) => {
                    next(error);
                });
        } else if (message.attachments) {
            message.intents = [];
            next();
        } else {
            next();
        }
    };

    heard = (tests: Array<string>, message: IMessageWit) => {
        let keys = Object.keys(message.entities);
        while (keys.length > 0) {
            let key: string = keys.shift();
            let entity = message.entities[key].shift();
            let confidence = entity.confidence;

            if (tests.find((value) => value == key) &&
                confidence >= this.config.minimum_confidence) {
                return true;
            }
        }
        return false;
    };
}