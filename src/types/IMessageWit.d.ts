import { Message } from "botkit";
export interface IMessageWit extends Message {
    entities: Array<any>;
    response: string;
    intents: Array<any>;
    attachments: any;
}
