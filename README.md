# BotKitWit-TS

BotKitWit is an alternative, typescript, version (up to date) of https://github.com/howdyai/botkit-middleware-witai

## Compatibility with:
* Node-Wit ^5.0.0

## Use Wit.ai's natural language tools in your Botkit-powered Bot!

This middleware plugin for [Botkit](http://howdy.ai/botkit) allows you
to seamlessly integrate Wit.ai natural language intent APIs into your Botkit bot.

[Wit.ai](http://wit.ai) provides a service that uses machine learning to
help developers handle natural language input.  The Wit API receives input
from the user, and translates it into one or more "intents" which map to known
actions or choices.  The power of Wit is that it can continually be trained
to understand more and more responses without changing the underlying bot code!

## Setup

Create a Wit application [here](https://wit.ai/apps/new).  Then, set up and
train at least one entity.

Add botkitwit as a dependency to your Botkit bot!

```
npm install --save botkitwit
```

Enable the middleware:

```

let config: IConfig = { token: 'WIT_ACCESS_TOKEN', minimum_confidence: 0.5 }
let wit = new BotKitWit(config)

controller.middleware.receive.use(wit.receive);

controller.hears(['wit_entity_1', 'wit_entity_2'],'direct_message',wit.hears,function(bot, message) {

    // ...
    // message.text         (your message)
    // message.response     (WIT's response)
    bot.reply(message, message.text);
});
```

For a full example see [example_bot.ts.template](example_bot.ts.template)