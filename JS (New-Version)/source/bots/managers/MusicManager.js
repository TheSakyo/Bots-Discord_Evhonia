/* ----------------------------------------------------------------------------------------------------------  */

const BotManager = require("./BotManager"); // Quelques Méthodes Utile avec le Bot en question
const ytdl = require('ytdl-core-discord'); // Méthode récupérant autre API de musique utile (notamment pour les liens)
const { Song, Queue } = require('distube'); // Méthode récupérant la classe des Son de l'API de musique Distube
const { GuildMember, VoiceChannel } = require("discord.js");

/* ---------------------------------------  */

let queriesVideo = [];
let playable = false;

/* ----------------------------  */


/** 
* Permet d'ajouter une musique à une file d'attente.
*
* @param {Client} bot - Le bot en question.
* @param {User} author - Auteur de la demande.
* @param {Message} message - Message de l'Utilisateur.
* @param {String} query - Contenu du message (soit la recherche/lien) de l'Utilisateur.
*
* @return {EmbedBuilder} Un Message Container de Confirmation.
*/
function add(bot, author, message, query) {    

    let finalQuery = null;

                /* --------------------------------------- */
    
    if(BotManager.validURL(query)) {

        const substrQuery = query.substring(query.length, query.indexOf('&'))
        finalQuery = query.replace(substrQuery, ''.repeat(substrQuery.length));
    } 
                    /* ------------------------------- */     

    if(!finalQuery) finalQuery = query;

                /* --------------------------------------- */

    return bot.distube.search(finalQuery.trim(), { limit: 1, member: message.member, textChannel: message.channel, message: message }).then((videos) => {

        let song = new Song(videos[0]);

                    /* ---------------------------- */

        videos.forEach(video => {
            
            if(video == video.url) { song = new Song(video); } 
        });
                    /* ---------------------------- */

        queriesVideo.splice(0, 0, song);

        return BotManager.sendEmbedMsg(0x34eb4c, null, null, null, `✅ *Le **son** de la **video** a été ajouté à la **file d'attente : \`${song.name}\`***`, null, null, `${author.tag}`, author.displayAvatarURL());;
        
    }).catch(() => { return BotManager.sendEmbedMsg(0xe02d2d, null, null, null, "⚠️ *Le **son** de la **vidéo** est introuvable*", null, null, `${author.tag}`, author.displayAvatarURL()); });
}

/** 
* Permet de lancer la lecture associé à une file d'attente.
*
* @param {Client} bot - Le bot en question.
* @param {User} author - Auteur de la demande.
* @param {Message} message - Message de l'Utilisateur.
*
* @return {EmbedBuilder} Un Message Container de Confirmation.
*/
function play(bot, author, message) {

    let embedMessage = null; //Ceci nous permettra de récupérer le Contenue de notre Réponse.

                        /* ----------------- */

    if(queriesVideo.length <= 0) {

        embedMessage = BotManager.sendEmbedMsg(0xe02d2d, null, null, null, "⚠️ *Aucune **vidéo(s)** n'a été trouvée(s) dans la **file d'attente** !*", null, null, `${author.tag}`, author.displayAvatarURL());

    } else {
        
        if(playable) {   
           
            embedMessage = BotManager.sendEmbedMsg(0xe02d2d, null, null, null, "⚠️ *Il y'a déjà une lecture en cours !*", null, null, `${author.tag}`, author.displayAvatarURL());

        } else {

            queues(bot, author, message); 
            embedMessage = BotManager.sendEmbedMsg(0x34eb4c, null, null, null, "✅ *Lancement de la lecture...*", null, null, `${author.tag}`, author.displayAvatarURL());
        } 
    }                                
                        /* ----------------- */

    return embedMessage; //Retourne la réponse.
}

/* -----------------------------------------------  */

/** 
* Vérifie si le membre est connecté au salon vocal de musique dédié.
*
* @param {User} author - Auteur de la demande.
* @param {GuildMember} member - Membre de la demande.
*
* @return {EmbedBuilder} Un Message Container de Confirmation.
*/
function checkUserIsNotInMusicChannel(author, member) {

    let embedMessage = null; //Ceci nous permettra de récupérer le Contenue de notre Réponse.

                        /* ----------------- */
                        
    if(!member.voice.channel) { embedMessage = BotManager.sendEmbedMsg(0xe02d2d, null, null, null, "⚠️ *Veuillez vous connecter au salon vocal dédié à la Musique  : \"**(:notes:) ~ Musique**\" !*", null, null, `${author.tag}`, author.displayAvatarURL()); }                   

                        /* ----------------- */

    return embedMessage; //Retourne la réponse.
}

/* -----------------------------------  */

/** 
* @private
* Permet de lancer les vidéos dans les files d'attentes.
*
* @param {Client} bot - Le bot en question.
* @param {User} author - Auteur de la demande.
* @param {Message} message - Message de l'Utilisateur.
*
*/
function queues(bot, author, message) {

    let channel = message.member.voice.channel;

            /* ----------------------------------------- */

    bot.distube.voices.join(channel).then((voiceConnection) => voiceConnection.setSelfMute(false));        
    run(bot, queriesVideo[queriesVideo.length-1], message);

    playable = true;

            /* ----------------------------------------- */

    events(bot, author, message); // Initialise les évènements
}

/** 
* @private 
* Joue le son une vidéo.
*
* @param {Client} bot - Le bot en question.
* @param {Song} video - Le son de la vidéo à lancer.
* @param {Message} message - Message de l'Utilisateur.
*
*/
function run(bot, video, message) {

    let channel = message.member.voice.channel;
    bot.distube.play(channel, video, { message, textChannel: message.channel, member: message.member }); // Joue le stream
}

/** 
* @private 
* Arrête de jouer le son dans la file d'attente.
*
* @param {Client} bot - Le bot en question.
* @param {Queue} queue - La file d'attente en question (gérer par distube).
* @param {User} author - Auteur de la demande.
*
*/
function stop(bot, queue, author) {
    
    queriesVideo = []; // Vide la liste d'attente
    queue.stop(); // Arrête le stream
    playable = false; // Définit la lecture sur faux

    let embedMessage = { embeds: [BotManager.sendEmbedMsg(0x9c36f5, null, null, null, 
        `*⏸️ -- La lecture est terminée, vous pouvez toujours rajouter des vidéos dans la file d'attente ` + 
        `**(music!add <url|titre_de_musique>)** et relancer la lecture **(music!play)**, a la revoyure 🎶🎶 -- ⏸️*`, null, null, 
        `${author.tag}`, author.displayAvatarURL())] };

    queue.textChannel.send(embedMessage);
}

/* -----------------------------------  */

/** 
* @private 
* Initialise les évènements gérer par l'API Distube.
*
* @param {Client} bot - Le bot en question.
* @param {User} author - Auteur de la demande.
* @param {Message} message - Message de l'Utilisateur.
*
*/
function events(bot, author, message) {

            // ---------------------------- //
            // Évènement avec l'API Distube //
            // ---------------------------- //

    bot.distube
    .on('error', (textChannel, e) => {

        let embedMessage = { embeds: [BotManager.sendEmbedMsg(0xe02d2d, null, null, null, 
            `**⚠️ Une erreur s'est produite 😣:** *${e.message.slice(0, 2000)} ⚠️*`, null, null, null, null)] };
        queue.textChannel.send(embedMessage);

        console.error(e);
        textChannel.send(`Une erreur s'est produite 😣: ${e.message.slice(0, 2000)}`);
    })
    .on('playSong', (queue, song) => {
        
        queriesVideo.pop(); // On retire dans la liste la vidéo en cours

        let embedMessage = { embeds: [BotManager.sendEmbedMsg(0x9c36f5, null, null, null, 
            `*▶️ -- **Son de la vidéo en cours : ** __\`${song.name}\`__ - __\`${song.formattedDuration}\`__ -- ◀️*`, 
            null, null, `${song.user.tag}`, song.user.displayAvatarURL())] };
    
        queue.textChannel.send(embedMessage);
        queue.setVolume(85);
        queue.songs = [];
    })
    .on('finishSong', (queue, song) => { 

        if(queriesVideo.length <= 0) { stop(bot, queue, author); } 
        else { 
            
            let nextSong = queriesVideo[queriesVideo.length-1];

            queue.songs.push(nextSong);
            run(bot, nextSong, message); 
        }
    })
    .on('finish', queue => { 
        
        if(queriesVideo.length <= 0) { stop(bot, queue, author); } 
        else { run(bot, queriesVideo[queriesVideo.length-1], message); }

    }).on('empty', queue => {

        queue.stop(); // Arrête le stream
        playable = false; // Définit la lecture sur faux

    });
        
            // ---------------------------- //
            // Évènement avec l'API Distube //
            // ---------------------------- //
}

/* -----------------------------------  */

/* -----------------------------------------------------------  */

            /* -----------------------------  */

module.exports = { checkUserIsNotInMusicChannel, play, add };

            /* -----------------------------  */

/* ----------------------------------------------------------------------------------------------------------  */