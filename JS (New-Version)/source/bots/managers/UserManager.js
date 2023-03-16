/* ----------------------------------------------------------------------------------------------------------  */

const BotManager = require("./BotManager"); // Quelques Méthodes Utile avec le Bot en question

/* -----------------------------------------------------------  */

/** 
* Vérifie si le Rôle Demandé est attribué au Membre demandé.
*
* @param {GuildMember} member - Membre en question.
* @param {String} roleID - ID du Rôle à vérifié en format "Chaîne de Catactère".
*
* @return {Boolean} Une valeur booléenne (Vrai ou Faux).
*/
function hasRole(member, roleID) {

    if(member.roles.cache.has(roleID)) { return true; }
    return false;
}

/* -----------------------------------  */

/** 
* Supprime Rôle de Configuration des Bots à l'Utilisateur en question ayant en train d'écrire un message.
*
* @param {String} message - Contenu du message de l'Utilisateur.
* @param {String} roleID - ID du Rôle de Configuration des Bots à supprimé en format "Chaîne de Catactère".
*
* @return {EmbedBuilder} Un Message Container de Confirmation.
*/
function removeCfgRole(message, roleID) {

    let embedMessage = null; //Ceci nous permettra de récupérer le Contenue de notre Réponse.

    const author = message.author; //Auteur du Message.
    const member = message.member; //Membre du Serveur en question du Message.

    let role = message.guild.roles.cache.find(role => role.id === roleID);

    if(hasRole(member, roleID) == true) {

        member.roles.remove(role).catch(console.error);

        embedMessage = BotManager.sendEmbedMsg(0x34eb4c, null, null, null, "✅ **__Succès :__** *Le rôle **" + `<@&${role.id}> ` + "** vous a été enlevé !*", 
                        null, null, `${author.tag}`, author.displayAvatarURL());
    
    } else { 
        
        embedMessage = BotManager.sendEmbedMsg(0xe02d2d, null, null, null, "⚠️ **__Erreur :__** *Vous ne possédez pas le rôle **" + `<@&${role.id}> ` + "** !*", 
                        null, null, `${author.tag}`, author.displayAvatarURL());         
    }

    return embedMessage; //Retourne la réponse.
}

/* -----------------------------------  */

/** 
* Ajoute le Rôle de Configuration des Bots à l'Utilisateur en question ayant en train d'écrire un message.
*
* @param {Client} bot - Bot en question
* @param {String} message - Contenu du message de l'Utilisateur
* @param {String} roleID - ID du Rôle de Configuration des Bots à ajouté en format "Chaîne de Catactère".
*
* @return {EmbedBuilder} Un Message Container de Confirmation.
*/
function addCfgRole(bot, message, roleID) {

    let embedMessage = null; //Ceci nous permettra de récupérer le Contenue de notre Réponse.

    const author = message.author; //Auteur du Message.
    const member = message.member; //Membre du Serveur en question du Message.
    
    let role = message.guild.roles.cache.find(role => role.id === roleID);

    if(hasRole(member, roleID) != true) {

        member.roles.add(role).catch(console.error);
        removeCfgRoleWithTimer(bot.user.tag, author, member, role, 210000, BotManager);

        embedMessage = BotManager.sendEmbedMsg(0x34eb4c, null, null, null, "✅ **__Succès :__** *Le rôle **" + `<@&${role.id}> ` + "** vous a été ajouté !*", 
                        null, null, `${author.tag}`, author.displayAvatarURL());
    
    } else { 
        
        embedMessage = BotManager.sendEmbedMsg(0xe02d2d, null, null, null, "⚠️ **__Erreur :__** *Vous possédez déjà le rôle **" + `<@&${role.id}> ` + "** !*", 
                        null, null, `${author.tag}`, author.displayAvatarURL());         
    }

    return embedMessage; //Retourne la réponse.
}

/* -----------------------------------  */
/* -----------------------------------  */

/** 
* Supprime le Rôle de Configuration des Bots avec un temps précis à l'Utilisateur en question et lui envoie un message privée en retour.
*
* @param {String} botTag - Tag du Bot en question.
* @param {User} user - Utilisateur en question.
* @param {GuildMember} member - Membre du Serveur en question.
* @param {String} roleID - ID du Rôle de Configuration des Bots à supprimé en format "Chaîne de Catactère".
* @param {Number} time - Temps en milliseconde du délai.
*
*/
function removeCfgRoleWithTimer(botTag, user, member, role, time) {

    setTimeout(() => { 
            
        if(member.roles.cache.has(role.id)) { 

            member.roles.remove(role).catch(console.error);
            
            embedMessage = BotManager.sendEmbedMsg(0xe6930e, `**🤖 Hey ${user.username}**`, null, null, 
                            "🕰️ **__Temps Écoulé :__** *Le délai de __3.5 minutes__ est dépasser !\n\n Vous n'avez donc plus le rôle **" + role.name + "***\n", null, null, 
                            `${botTag}`, null);

                            /* ------------------------- */ 

            member.send({ embeds: [embedMessage] }).then(() => console.log(`${botTag} a répondu en privé à ${user.tag}, le temps est écoulé !`))
            .catch(console.error);
        }
        
    }, time);
}

/* -----------------------------------------------------------  */

            /* -----------------------------  */

module.exports = { hasRole, removeCfgRole, addCfgRole, };

            /* -----------------------------  */

/* ----------------------------------------------------------------------------------------------------------  */