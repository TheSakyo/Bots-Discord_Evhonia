/************************************************************************************************************************************************************************/
/* >>> COMMENT CODER AVEC LE BOT (instruction) :                                                                                                                        */
/*     - Tous d'abord tous le code que vous allez effectuer doit se dérouler dans la fonction 'builder()'.                                                              */                                                                          
/*     - Dedans vous remarquez le paramètre 'bot', il permet tous simplement de récupérer le bot en question.                                                           */                                                                    
/*                                                                                                                                                                      */ 
/*  ¤ Conseil : Apprenez à utiliser/coder son bot discord en utilisant les bonne méthodes, Lisez la documentation officiel : https://discord.js.org/#/docs/discord.js/  */                                                              
/************************************************************************************************************************************************************************/

// Dans cette class vous allez vous amusez à coder votre petit bijoux :D !
class BotTest {

    /** 
    * Fonction permettant de coder le bot en question permettant de créer ses différentes fonctions
    *
    * @param {Client} bot - Bot en question.
    * @param {String} cmdPrefix - Préfix de la Commande chargé par le Bot Discord en question (Recommandé : Préfix récupérable dans 'parameter.json').
    * @param {String} cmdAlias - Préfix Alias de la Commande chargé par le Bot Discord en question.
    */
    builder(bot, cmdPrefix, cmdAlias) {
        
        // ⬇️ ... CODE ICI ... ⬇️ //

        const BotManager = require("./managers/BotManager"); // Quelques Méthodes Utile avec le Bot en question

                        /*  ------------------------------------------  */
                        
        // Message d'aide ayant la liste des commandes du Bot en question //                 
        const helpFields = [
            // Espace Vide //
            {
                name: "\u200b",
                value: "\u200b",
            },
            {
                name: '__‶' + cmdAlias + '″ :__',
                value: "`Préfixe de commande alias`",
            },
            // Espace Vide //
            {
                name: "\u200b",
                value: "\u200b",
            },
            {
                nname: '• __' + cmdPrefix + 'help :__',
                value: "***Affiche la liste des commandes***",
            },
            // Espace Vide //
            {
                name: "\u200b",
                value: "\u200b",
            },
        ];
        // Message d'aide ayant la liste des commandes du Bot en question //    

                        /*  ------------------------------------------  */

        // --------------------------------------------------------- //
        // Évènement quand l'utilisateur écrit dans un salon textuel //
        // --------------------------------------------------------- //
        bot.on('messageCreate', async(message) => {
            
            let embedMessage = null; //Ceci nous permettra de récupérer le Contenue de notre Réponse.
            
            const messageContent = message.content; // Contenu du Message.
            const author = message.author; //Auteur du Message.
            const member = message.member; //Membre du Serveur en question du Message.

                        /*  --------------------- */

            //Vérifie si celui qui écrit est le bot en question alors on retourne (fait rien)
            if(message.author.bot) { return; }

            /* Vérifie si le contenue du message ne commence pas par 'cmdPrefix' et 'cmdAlias'
                (valeur étant le préfix pour effectuer une commande avec le bot) alors on retourne (fait rien) */
            if(!messageContent.startsWith(cmdPrefix) && !messageContent.startsWith(cmdAlias)) { return; }

                        /*  --------------------- */
                        /*  --------------------- */
            
            //Commande d'aide (Liste des Commandes)
            if(BotManager.msgCmdHasOnlyCmdPrefix(messageContent, cmdPrefix, cmdAlias) || BotManager.msgCmdIs(messageContent, cmdPrefix, cmdAlias, "help")) {
    
               embedMessage = BotManager.sendEmbedMsg(0x4aa4ff, "**__Liste des commandes :__**", bot.user.username, bot.user.displayAvatarURL(), 
                               "*⚙️ Voici mes différentes commandes utiles ⚙️*", helpFields, null, `${author.tag}`, author.displayAvatarURL());            
            }
            
                        /*  --------------------- */
                        /*  --------------------- */
            
            BotManager.replyMsg(bot, message, embedMessage, true); //Renvoie la réponse en question.
        });
        // --------------------------------------------------------- //
        // Évènement quand l'utilisateur écrit dans un salon textuel //
        // --------------------------------------------------------- //
        
        // ⬆️ ... CODE ICI ... ⬆️ //
    }

}
module.exports = BotTest; //Cette partie est pas importante, elle sert juste à exporter la class en question pour qu'il puisse être lu par d'autre fichiers
 


