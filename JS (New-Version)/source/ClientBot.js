/************************************************************************************************************************************************************************/
/* >>> COMMENT CODER AVEC LE BOT (instruction) :                                                                                                                        */
/*      - Dans le fichier 'parameter.json' situé dans le dossier 'config' à l'arborescence (respectez la trames) :                                                                               */
/*          ° Vous créerai une clé "MONBOT_TOKEN" et lui stocker la valeur "clé du bot" [Example: "MONBOT_TOKEN": "CLÉDUBOT"]                                           */       
/*          ° Vous créerai une clé "MONBOT_PREFIX_CMD" et lui stocker la valeur "prefix principal de la commande" [Example: "MONBOT_PREFIX_COMMAND": "BOT!"]            */            
/*                                                                                                                                                                      */
/*      - Vous utiliserez les paramètres :                                                                                                                              */                                                                                                                          
/*          ° 'botClass' - Récupère le fichier de la class du bot en question que vous créerez dans un nouveau fichier 'MonBot.js' dans le dossier 'bots'.              */
/*          ° 'bot' - pour récupérer votre bot en question en utilisant.                                                                                                */
/*          ° 'presence' - tableau récupérant le status, le nom de l'activité et son type (['status', 'blablabla', 'type']).                                            */
/*          ° 'cmdPrefix' - pour récupérer la chaîne de caractère du préfix pour effectuer une commande avec le bot en question (récupèrable dans 'parameter.json').    */
/*          ° 'cmdAlias' - pour récupérer une autre chaîne de caractère alias du préfix pour effectuer une commande avec le bot en question.                            */
/*          ° 'token' - pour récupérer la chaîne de caractère de la clé de votre bot en question (récupèrable dans 'parameter.json').                                   */
/*          ° 'source' - Récupère l'emplacement source où sont hébergés les fichiers (utilisez le paramètre 'source' du constructeur de la class 'main').               */  
/*                                                                                                                                                                      */
/*  ¤ Conseil : Apprenez à utiliser/coder son bot discord en utilisant les bonne méthodes, Lisez la documentation officiel : https://discord.js.org/#/docs/discord.js/  */
/************************************************************************************************************************************************************************/

// ### Class principal pour les Bots ! ### //
class ClientBot {

    /** 
    * Constructeur de la class du Bot Discord en question. (c'est dedans ou le code est interprété principalement)
    *
    * @param {Class} botClass - Fichier de Class du Bot en question correspondant.
    * @param {Client} bot - Bot en question.
    * @param {Array} presence - Tableau récupérant le status, le nom de/des activitée(s) et le/les type(s) et une/des 'url(s)' en cas de stream du Bot Discord en question (Exemple : ['online', ['faire un test', ActivityType.Playing, 'url_stream']]).
    * @param {String} cmdPrefix - Préfix de la Commande chargé par le Bot Discord en question (Recommandé : Préfix récupérable dans 'parameter.json').
    * @param {String} cmdAlias - Préfix Alias de la Commande chargé par le Bot Discord en question.
    * @param {String} token - Clé de connexion du Bot Discord en question (Recommandé : Clé récupérable dans 'parameter.json').
    *
    */
    constructor(botClass, bot, presence, cmdPrefix, cmdAlias, token) {
        
        // LE CODE DONC S'EFFECTUE ICI :) ! //

                /*  --------------------- */
        
        if(cmdAlias == null) cmdAlias = cmdPrefix; //Si le Préfix Alias de la commande est null, on lui donne la valeur du préfix de la commande
       
                /*  --------------------- */

        /*  ------------------------------------------  */

        // ----------------------------------------------- //
        // Évènement quand le bot en question est connecté //
        // ----------------------------------------------- //
        bot.on('ready', () => {
            
            let activitiesArray = []; // Permettra de récupérer une liste d'activité du Bot
            let activitiesString = []; // Permettra de récupérer la liste des activité du Bot en chaîne de caractère
            bot.user.presence.activities

                    /* -------------------------------------------------------------------------- */

            for(let i = 0; i < presence.length; i++) {
                
                if(presence[i] != presence[0]) {

                    activitiesArray.push({ name: presence[i][0], type: presence[i][1], url: presence[i][2] });
                }
            }
                    /* -------------------------------------------------------------------------- */

            //Définit le Statut du Bot (dnd = ne pas déranger) ainsi que son Activité et son type d'Activité
            bot.user.setPresence({ status: presence[0], activities: activitiesArray });    

                    /* -------------------------------------------------------------------------- */

                for(let i = 0; i < bot.user.presence.activities.length; i++) {
                
                    const botActivities = bot.user.presence.activities[i];
                            
                    switch(botActivities.type) {
                        case 0:
                            activitiesString[i] = ' [Play] Joue à ' + botActivities.name;
                            break;
                        case 1:
                            activitiesString[i] = ' [Stream] Joue à ' + botActivities.name;
                            break;
                        case 2:
                            activitiesString[i] = ' [Listen] Écoute ' + botActivities.name;
                            break;
                        case 3:
                            activitiesString[i] = ' [Watch] Regarde ' + botActivities.name;
                            break;
                        case 4:
                            activitiesString[i] = ' [Personalize] Custom ' + botActivities.name;
                            break;
                        case 5:
                            activitiesString[i] = ' [Compete] Participant à: ' + botActivities.name;
                            break;
                        default: 
                            activitiesString[i] = ' -- Erreur de type -- ' + botActivities.name;
                            break;
                    }
                }
                    
                    /* -------------------------------------------------------------------------- */                 

            //Affiche un message dans la console disant que le bot avec son tag discord est connecté + affiche son status et son activité.
            console.log(`${bot.user.tag} est connecté (Status : ${bot.user.presence.status}) || Activitée(s) :` + activitiesString + `) !`); 
        });
        // ----------------------------------------------- //
        // Évènement quand le bot en question est connecté //
        // ----------------------------------------------- //

        /*  ------------------------------------------  */

        new botClass(bot).builder(bot, cmdPrefix, cmdAlias);

        /*  ------------------------------------------  */
        /*  ------------------------------------------  */

        bot.login(token); //Connecte le Bot en question (Conseil : Ne pas toucher ceci. | Attention : Cette ligne de code doit être en dernier dans le constructeur !)

        /*  ------------------------------------------  */
    }
}
// ### Class principal pour les Bots ! ### //

/* -------------------------------------------------------------------------------------------------------------------------------------------------------------- */

module.exports = ClientBot; //Cette partie est pas importante, elle sert juste à exporter la class principal pour qu'il puisse être lu par d'autre fichiers
 


