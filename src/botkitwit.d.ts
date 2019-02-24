import { Wit } from 'node-wit';
import { NextFunction } from 'express';
import { IMessageWit } from './types/IMessageWit';
import { IConfig } from './types/IConfig';
import { IBotKitWit } from './types/IBotKitWit';
export declare class BotKitWit implements IBotKitWit {
    private config;
    private client;
    constructor(configWit: IConfig);
    getClientWit: () => Wit;
    receive: (bot: any, message: IMessageWit, next: NextFunction) => void;
    heard: (tests: string[], message: IMessageWit) => boolean;
}
