/* ----------------------------------------------------------------------------------------------------------  */

/* -----------------------------------------------------------  */

/** 
* Vérifie si le Bot Discord en question récupère en message dans un salon textuel le préfix de sa Commande (Préfix et Alias).
*
* @param {String} messageContent - Contenu de la Commande Entrée.
* @param {String} prefix - Préfix de la Commande Entrée chargé par le Bot Discord en question.
* @param {String} alias - Préfix Alias de la Commande Entrée chargé par le Bot Discord en question.
*
* @return {Boolean} Une valeur booléenne (Vrai ou Faux).
*/
function msgCmdHasOnlyCmdPrefix(messageContent, prefix, alias) {

    if(messageContent === prefix || messageContent === alias) return true;
    else return false;
}

/* -----------------------------------  */

/** 
* Vérifie si le Bot Discord en question récupère en message dans un salon textuel le préfix de sa Commande (Préfix et Alias) + un Message (Commande) demandé.
*
* @param {String} messageContent - Contenu de la Commande Entrée.
* @param {String} prefix - Préfix de la Commande Entrée chargé par le Bot Discord en question.
* @param {String} alias - Préfix Alias de la Commande Entrée chargé par le Bot Discord en question.
* @param {String} messageValue - Contenu de la Commande à vérifiée.
*
* @return {Boolean} Une valeur booléenne (Vrai ou Faux).
*/
function msgCmdIs(messageContent, prefix, alias, messageValue) {

    if(messageContent === prefix + messageValue || messageContent === alias + messageValue) return true;
    else return false;
}

/** 
* Vérifie si le Bot Discord en question récupère en préfix d'un message dans un salon textuel le préfix de sa Commande (Préfix et Alias) + un Message (Commande) demandé.
*
* @param {String} messageContent - Contenu de la Commande Entrée.
* @param {String} prefix - Préfix de la Commande Entrée chargé par le Bot Discord en question.
* @param {String} alias - Préfix Alias de la Commande Entrée chargé par le Bot Discord en question.
* @param {String} messageValue - Contenu de la Commande à vérifiée.
*
* @return {Boolean} Une valeur booléenne (Vrai ou Faux).
*/
function msgCmdStartsWith(messageContent, prefix, alias, messageValue) {

    if(messageContent.startsWith(prefix + messageValue) || messageContent.startsWith(alias + messageValue)) return true;
    else return false;
}


/** 
* Vérifie si le Bot Discord en question récupère en suffix d'un message dans un salon textuel le préfix de sa Commande (Préfix et Alias) + un Message (Commande) demandé.
*
* @param {String} messageContent - Contenu de la Commande Entrée.
* @param {String} prefix - Préfix de la Commande Entrée chargé par le Bot Discord en question.
* @param {String} alias - Préfix Alias de la Commande Entrée chargé par le Bot Discord en question.
* @param {String} messageValue - Contenu de la Commande à vérifiée.
* @param {any} endPosition - 'Index' du caractère à partir de la fin (peut être null).
*
* @return {Boolean} Une valeur booléenne (Vrai ou Faux).
*/
function msgCmdEndsWith(messageContent, prefix, alias, messageValue, endPosition = null) {

    if(endPosition != null) {

        if(messageContent.endsWith(prefix + messageValue, endPosition) || messageContent.endsWith(alias + messageValue, endPosition)) return true;
       
    } else {

        if(messageContent.endsWith(prefix + messageValue) || messageContent.endsWith(alias + messageValue)) return true;
    }

    return false;
}


/* -----------------------------------------------------------  */

/** 
* Envoie une réponse d'un Message en particulier à l'endroit du Message en question.
*    
* @param {Client} bot - Bot en question.
* @param {Message} message - Une Instance de la class Message de 'discord.js'.
* @param {Object<EmbedBuilder>} response - Contenue de la réponse du Message à renvoyé en format d'objet de la class 'EmbedBuilder' de "discord.js".
* @param {Boolean} messageDeleted - Voulez-vous supprimé le message aprés avoir reçu la réponse ? ('true' ou 'false').
*
* @return {Promise<Message>} Une réponse du message récupéré en paramètre.
*/
function replyMsg(bot, message, response, messageDeleted) {

    return message.reply({ embeds: [response] }).then(() => setTimeout(() => { if(messageDeleted) message.delete() }, 500))
            .then(() => console.log(`${bot.user.tag} a répondu à la reqûete de ${message.author.tag}, Commande : "${message.content}"`)).catch(console.error);
}

/* -----------------------------------------------------------  */

/** 
* Vérifie si le Bot Discord en question récupère en message dans un salon textuel le préfix de sa Commande (Préfix et Alias) + un Message (Commande) demandé.
*
* @param color - Couleur gauche du conteneur (valeur accepté : 0xhex).
* @param {String} title - Titre du conteneur.
* @param {String} author_name - Nom de l'Auteur.
* @param {String} author_icon - Icône de l'Auteur.
* @param {String} description - Description du conteneur.
* @param {Array} fields  - Messages du conteneur (comprenant un objet ayant {name (nom), value (valeur), inline (vrai ou faux)}).
* @param {String} image_url - Image du Conteneur (si besoin).
* @param {String} footer_text - Message de pied de page pour le conteneur.
* @param {String} footer_url - image de pied de page pour le conteneur.
*
* @return {EmbedBuilder} Un Message Conteneur
*/
function sendEmbedMsg(color = null, title = null, author_name = null, author_icon = null, description = "*❔[...]❔*", fields = null, image_url = null, footer_text = null, footer_url = null) {

    return {
        color: color,
        title: title,
        author: {
            name: author_name,
            icon_url: author_icon,
        },
        description: description,
        fields: fields,
        image: { url: image_url, },
        timestamp: new Date().toISOString(),
        footer: {
            text: footer_text,
            icon_url: footer_url,
        },
    };
}

/* -----------------------------------  */

/**
 * 
 * Vérifie si une chaîne de caractère en question est une URL (Lien) valide.
 * 
 * @param {*} str - La chaîne de caractère à vérifier
 * 
 * @returns {Boolean} Une valeur booléenne
 */
function validURL(str) {
    
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // Protocal
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // Nom de Domaine
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // Adresse IP V4
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // Chemin et Port
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // Requête
      '(\\#[-a-z\\d_]*)?$','i'); // Localisateur de fragments

    return !!pattern.test(str); // On retourne un test du paterne
}

/* -----------------------------------  */

/* -----------------------------------------------------------  */

            /* -----------------------------  */

module.exports = { msgCmdHasOnlyCmdPrefix, msgCmdIs, msgCmdStartsWith, msgCmdEndsWith, replyMsg, sendEmbedMsg, validURL };

            /* -----------------------------  */

/* ----------------------------------------------------------------------------------------------------------  */