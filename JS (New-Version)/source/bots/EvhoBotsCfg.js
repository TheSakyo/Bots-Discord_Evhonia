/************************************************************************************************************************************************************************/
/* >>> COMMENT CODER AVEC LE BOT (instruction) :                                                                                                                        */
/*     - Tous d'abord tous le code que vous allez effectuer doit se dérouler dans la fonction 'builder()'.                                                              */                                                                          
/*     - Dedans vous remarquez le paramètre 'bot', il permet tous simplement de récupérer le bot en question.                                                           */                                                                    
/*                                                                                                                                                                      */ 
/*  ¤ Conseil : Apprenez à utiliser/coder son bot discord en utilisant les bonne méthodes, Lisez la documentation officiel : https://discord.js.org/#/docs/discord.js/  */                                                              
/************************************************************************************************************************************************************************/

// Dans cette class vous allez vous amusez à coder votre petit bijoux :D !
class EvhoBotsCfg {

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
        const UserManager = require("./managers/UserManager"); // Quelques Méthodes Utile avec gérer les Utilisateurs

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
            {
                name: "\u200b",
                value: "\u200b",
            },
            {
                name: '• __' + cmdPrefix + 'help :__',
                value: "***- Affiche la liste des commandes***",
            },
            {
                name: '• __' + cmdPrefix + 'bots :__',
                value: "***- Ajoute le rôle de configuration des bots au membre***",
            },
            {
                name: '• __' + cmdPrefix + 'del :__',
                value: "***- Enlève le rôle de configuration des bots au membre***",
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

            const roleID = "763426565144969216"; //ID du Rôle de configuration des Bots
            const adminRoleID = "921845554621874227"; // ID du Rôle ayant la Permission d'effectuer la commande
                 
                        /*  --------------------- */
            
            //Vérifie si celui qui écrit est le bot en question alors on retourne (fait rien)
            if(message.author.bot) { return; }

            /* Vérifie si le contenue du message ne commence pas par 'cmdPrefix' et 'cmdAlias'
                (valeur étant le préfix pour effectuer une commande avec le bot) alors on retourne (fait rien) */
            if(!messageContent.startsWith(cmdPrefix) && !messageContent.startsWith(cmdAlias)) { return; }

            //Vérifie si le Membre du message (Utilisateur) à le rôle ayant la Permission d'effectuer la commande, si ce n'st pas les cas alors on retourne (fait rien) 
            if(!(UserManager.hasRole(message.member, adminRoleID))) { return; }

                        /*  --------------------- */
                        /*  --------------------- */
            
            //Commande d'aide (Liste des Commandes)            
            if(BotManager.msgCmdHasOnlyCmdPrefix(messageContent, cmdPrefix, cmdAlias) || BotManager.msgCmdIs(messageContent, cmdPrefix, cmdAlias, "help")) {
                
                embedMessage = BotManager.sendEmbedMsg(0x9c36f5, "**__Voici pour toi :__**", bot.user.username, bot.user.displayAvatarURL(), 
                                "*🤖 Voici mes différentes commandes utiles pour la configuration des bots 🤖*", helpFields, null, `${author.tag}`, author.displayAvatarURL());
                                        
                                        /* ----------- */

            //Commande pour ajouter le rôle de configuration des bots à un Utilisateur     
            } else if(BotManager.msgCmdIs(messageContent, cmdPrefix, cmdAlias, "del")) { embedMessage = UserManager.removeCfgRole(message, roleID); } 

                                        /* ----------- */

            //Commande pour enlever le rôle de configuration des bots à un Utilisateur                          
            else if(BotManager.msgCmdIs(messageContent, cmdPrefix, cmdAlias, "bots")) { embedMessage = UserManager.addCfgRole(bot, message, roleID); } 
                                        
                                        /* ----------- */
            //Commande inexistant                             
            else { 
                    
                embedMessage = BotManager.sendEmbedMsg(0xe02d2d, null, null, null, 
                                "⚠️ **__Erreur :__** *La **commande** est **incorrect**, veuillez vérifié(e) la liste des commandes !*", null, null, 
                                `${author.tag}`, author.displayAvatarURL());
            }  

                        /*  --------------------- */
                        /*  --------------------- */
            
            return BotManager.replyMsg(bot, message, embedMessage, true); //Renvoie la réponse en question.

        });
        // --------------------------------------------------------- //
        // Évènement quand l'utilisateur écrit dans un salon textuel //
        // --------------------------------------------------------- //
        
        // ⬆️ ... CODE ICI ... ⬆️ //
    }
}
module.exports = EvhoBotsCfg; //Cette partie est pas importante, elle sert juste à exporter la class en question pour qu'il puisse être lu par d'autre fichiers

