/************************************************************************************************************************************************************************/
/* >>> COMMENT CODER AVEC LE BOT (instruction) :                                                                                                                        */
/*     - Tous d'abord tous le code que vous allez effectuer doit se dérouler dans la fonction 'builder()'.                                                              */                                                                          
/*     - Dedans vous remarquez le paramètre 'bot', il permet tous simplement de récupérer le bot en question.                                                           */                                                                    
/*                                                                                                                                                                      */ 
/*  ¤ Conseil : Apprenez à utiliser/coder son bot discord en utilisant les bonne méthodes, Lisez la documentation officiel : https://discord.js.org/#/docs/discord.js/  */                                                              
/************************************************************************************************************************************************************************/

// Dans cette class vous allez vous amusez à coder votre petit bijoux :D !
class EvhoSong {

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
        const SongManager = require("./managers/SongManager"); // Quelques Méthodes Utile avec les Musiques
      
        const { DisTube } = require('distube'); // Méthode récupérant l'API de musique
        const { SpotifyPlugin } = require('@distube/spotify'); // Méthode récupérant un plugin pour l'API de musique (spotify)
        const { SoundCloudPlugin } = require('@distube/soundcloud'); // Méthode récupérant un plugin pour l'API de musique (soundcloud)
        const { YtDlpPlugin } = require('@distube/yt-dlp'); // Méthode récupérant un plugin pour l'API de musique (youtube)
 
                           /*  ------------------------------------------  */

        bot.distube = new DisTube(bot, {

            savePreviousSongs: true,
            emitAddSongWhenCreatingQueue: false,
            searchSongs: 0,
            nsfw: false,
            emptyCooldown: 25,
            ytdlOptions: {
              highWaterMark: 1024 * 1024 * 64,
              format: "audioonly",
              liveBuffer: 60000,
              dlChunkSize: 1024 * 1024 * 4,
            },
            plugins: [

                new SpotifyPlugin({ emitEventsAfterFetching: true }),
                new SoundCloudPlugin(),
                new YtDlpPlugin({ update: true })
            ]
        })

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
                name: '• __' + cmdPrefix + 'help / ' + cmdPrefix + '? :__',
                value: "***- Affiche la liste des commandes***",
            },
            {
                name: '• __' + cmdPrefix + 'add :__',
                value: "***- Ajoute une piste à la file d'attente***",
            },
            {
                name: '• __' + cmdPrefix + 'clear-queue / ' + cmdPrefix + 'cq :__',
                value: "***- Supprime tous les pistes de la file d'attente***",
            },
            {
                name: '• __' + cmdPrefix + 'queue :__',
                value: "***- Liste les pistes de la file d'attentes***",
            },
            {
                name: '• __' + cmdPrefix + 'pause :__',
                value: "***- Met en pause la lecture***",
            },
            {
                name: '• __' + cmdPrefix + 'resume :__',
                value: "***- Reprend la lecture***",
            },
            {
                name: '• __' + cmdPrefix + 'stop :__',
                value: "***- Arrête la lecture et vide la liste d'attente***",
            },
            {
                name: '• __' + cmdPrefix + 'play :__',
                value: "***- Lance la lecture de la file d'attente et connecte le bot dans son salon vocal (Salon -  [Musique 🎶]) ***",
            },
            {
                name: '• __' + cmdPrefix + 'replay :__',
                value: "***- Rejoue le morceau en cours***",
            },
            {
                name: '• __' + cmdPrefix + 'previous :__',
                value: "***- Joue le morceau précédent***",
            },
            {
                name: '• __' + cmdPrefix + 'skip :__',
                value: "***- Passe à la piste suivante***",
            },
            {
                name: '• __' + cmdPrefix + 'search-skip / ' + cmdPrefix + 'ss :__',
                value: "***- Recherche un morceau dans la file d'attente et la passe comme piste suivantes***",
            },
            {
                name: '• __' + cmdPrefix + 'vote-skip  / ' + cmdPrefix + 'vs :__',
                value: "***- Lance un vote pour passer à la prochaine piste***",
            },
            {
                name: '• __' + cmdPrefix + 'shuffle :__',
                value: "***- Mélange les morceaux de la file piste sauf celle en cours***",
            },
            // Espace Vide //
            {
                name: "\u200b",
                value: "\u200b",
            },
            // Espace Vide //
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
            if(BotManager.msgCmdHasOnlyCmdPrefix(messageContent, cmdPrefix, cmdAlias) || 
               BotManager.msgCmdIs(messageContent, cmdPrefix, cmdAlias, "help") || BotManager.msgCmdIs(messageContent, cmdPrefix, cmdAlias, "?")) {
                
                embedMessage = BotManager.sendEmbedMsg(0x9c36f5, "**__Besoin d'aide ? :__**", bot.user.username, bot.user.displayAvatarURL(), 
                                "*🎶 Voici mes différentes commandes utiles 🎶*", helpFields, null, `${author.tag}`, author.displayAvatarURL());

                                        /* ----------- */
                                        
            //Commande pour ajouter une musique à la fille d'attente
            } else if(BotManager.msgCmdStartsWith(messageContent, cmdPrefix, cmdAlias, "add")) { 
                
                if(BotManager.msgCmdEndsWith(messageContent, cmdPrefix, cmdAlias, "add")) {

                    embedMessage = BotManager.sendEmbedMsg(0xe02d2d, null, null, null, 
                        "⚠️ *Veuillez taper une **URL** de vidéo Youtube ou des **Mots Clés** !*", null, null, `${author.tag}`, 
                        author.displayAvatarURL());

                } else { 
                    
                    const substrMessage = messageContent.substring(0, messageContent.indexOf('h'))
                    const finalMessage = messageContent.replace(substrMessage, ''.repeat(substrMessage.length)); 
                    embedMessage = await SongManager.add(bot, author, message, finalMessage); 
                }   

            //Commande pour lancer la lecture de la file d'attente
            } else if(BotManager.msgCmdIs(messageContent, cmdPrefix, cmdAlias, "play")) { 
                
                embedMessage = SongManager.checkUserIsNotInMusicChannel(author, member);
                if(embedMessage == null) { embedMessage = SongManager.play(bot, author, message);  } 

            //Commande pour stopper la lecture de la file d'attente
            } else if(BotManager.msgCmdIs(messageContent, cmdPrefix, cmdAlias, "stop")) { 
                
                embedMessage = SongManager.checkUserIsNotInMusicChannel(author, member);
                if(embedMessage == null) { embedMessage = SongManager.stop(SongManager.getActualQueue(), author);  } 
            } 

                                        /* ----------- */
            //Commande inexistant                            
            else {      

                embedMessage = BotManager.sendEmbedMsg(0xe02d2d, null, null, null, 
                                "⚠️ *La **commande** est **incorrect**, veuillez vérifié(e) la liste des commandes de Musique !*", null, null, `${author.tag}`, 
                                author.displayAvatarURL());
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
module.exports = EvhoSong; //Cette partie est pas importante, elle sert juste à exporter la class en question pour qu'il puisse être lu par d'autre fichiers
 


