class Main {

    constructor() {

        /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

        const { Client, GatewayIntentBits, ActivityType } = require('discord.js'); // API Discord.js
        const CFG = require("./config/parameter.json"); // Fichier 'parameter.json'

        /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

                                        // ## Permisssions pour les Bots ## //
        const intents = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessageReactions, 
                        GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildIntegrations,
                        GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions]; 
                                        // ## Permisssions pour les Bots ## //

        /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

        const ClientBot = require("./ClientBot"); // Class Principale pour les Bots

        /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

            /************************************************************************************************************************************************************************/
            /* >>> COMMENT CODER AVEC LE BOT (instruction) :                                                                                                                        */
            /*     - D'abord, vous récupérerez le fichier que vous créerez dans le dossier 'bots' (astuce : copier/coller le contenu du fichier 'BotTest.js' et changer son nom)    */                                                                                                                               
            /*     - Exemple : const BotTest = require("./bots/BotTest"); // Class Bot de Test                                                                                      */                                                                    
            /*                                                                                                                                                                      */ 
            /*  ¤ Conseil : Apprenez à utiliser/coder son bot discord en utilisant les bonne méthodes, Lisez la documentation officiel : https://discord.js.org/#/docs/discord.js/  */                                                              
            /************************************************************************************************************************************************************************/

        const EvhoSong = require("./bots/EvhoSong"); // Class Bot de Musique
        const EvhoBotsCfg = require("./bots/EvhoBotsCfg"); // Class Bot de Configuration

        /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

            /************************************************************************************************************************************************************************/
            /* >>> COMMENT CODER AVEC LE BOT (instruction) :                                                                                                                        */
            /*     - Ensuite, vous allez créer un nouveau client de votre bot en question en lui donnant ses permissions                                                            */                                                                                                                               
            /*     - Exemple : const BotTestClient = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: intents });                                                */                                                                                               
            /*                                                                                                                                                                      */ 
            /*  ¤ Conseil : Apprenez à utiliser/coder son bot discord en utilisant les bonne méthodes, Lisez la documentation officiel : https://discord.js.org/#/docs/discord.js/  */                                                              
            /************************************************************************************************************************************************************************/

        const EvhoSongClient = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: intents });
        const EvhoBotsCfgClient = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: intents });

        /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

            /************************************************************************************************************************************************************************/
            /* >>> COMMENT CODER AVEC LE BOT (instruction) :                                                                                                                        */
            /*    - Pour finir, vous allez appelé la class principale 'ClientBot' et définir ses différents paramètres (voir instruction dans le fichier 'ClientBot.js')            */                                                                                                                               
            /*    - Exemple : new ClientBot(BotTest, BotTestClient, ['dnd', ['faire des Test', ActivityType.Playing, null]], CFG.BOTTEST_PREFIX_CMD, null, CFG.BOTTEST_TOKEN);        */                                                                                               
            /*                                                                                                                                                                      */ 
            /*  ¤ Conseil : Apprenez à utiliser/coder son bot discord en utilisant les bonne méthodes, Lisez la documentation officiel : https://discord.js.org/#/docs/discord.js/  */                                                              
            /************************************************************************************************************************************************************************/

        new ClientBot(EvhoBotsCfg, EvhoBotsCfgClient, ['dnd', ['la config des Bots', ActivityType.Watching, null]], CFG.EVHOBOTSCFG_PREFIX_CMD, "cfg!", CFG.EVHOBOTSCFG_TOKEN);
        new ClientBot(EvhoSong, EvhoSongClient, ['dnd', ['des sons', ActivityType.Listening, null]], CFG.EVHOSONG_PREFIX_CMD, "s!", CFG.EVHOSONG_TOKEN);

        /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
    }
}
module.exports = Main; // Exporte la class 'Main'