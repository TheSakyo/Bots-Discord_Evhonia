import discord # IMPORTATION DISCORD
import managers.UserManager # IMPORTATION UserManager   
from discord.ext import commands # IMPORTATION DISCORD


EvhoBotsCfg_Token = "NzYzMzMwODMwMDAwMDYyNDc0.X32JOw.m50Bp-2hTugolHm2ZfbPnXhMZjU"

EvhoBotsCfg_prefix = "conf!" # Variable pour la commande (préfix)

EvhoBotsCfg = commands.Bot(command_prefix = EvhoBotsCfg_prefix)


#* Variable pour les rôles d'administrations *#

Cfg_Role = 763426565144969216

admin_role = [7007312048776806510, 743600745219096767, 823504542594498560, 698332243784892437]

#* Variable pour les rôles d'administrations *#



#*# Évènement quand le bot est connecté #*#
@EvhoBotsCfg.event
async def on_ready():
   await EvhoBotsCfg.change_presence(activity=discord.Game(name="Configurer les bots !"))
   print(EvhoBotsCfg.user.display_name +  " est connecté !")
#*# Évènement quand le bot est connecté #*#


#*# Évènement quand on écrit dans un salon textuel #*#
@EvhoBotsCfg.event
async def on_message(message):
    
    User = message.author

    if User == EvhoBotsCfg.user: return

    else:

        if message.content.startswith(EvhoBotsCfg_prefix):

            if " " in message.content: return

            if message.content.endswith("bots"):

                if await managers.UserManager.hasRole(User, message, admin_role):

                    await message.delete()
                    await managers.UserManager.addRole(User, message, Cfg_Role)

                else: return

            elif message.content.endswith("del"):

                if managers.UserManager.hasRole(User, message, admin_role):

                    await message.delete()
                    await managers.UserManager.removeRole(User, message, Cfg_Role)

                else: return

            elif message.content.endswith("help"):

                if await managers.UserManager.hasRole(User, message, admin_role):

                    await message.delete()
                    await message.channel.send(User.mention + " **Voici pour toi  :wink:  :**\n" + 
                        "```conf!help: Affiche la liste des commandes\n\n" +
                        "conf!bots: Ajoute le rôle de configuration des bots au membre\n\n" + 
                        "conf!del: Enlève le rôle de configuration des bots au membre```")

                else: return

            else:

                if await managers.UserManager.hasRole(User, message, admin_role):

                    await message.delete()
                    await message.channel.send(User.mention + " ***Erreur :***  Essayez ***conf!help*** pour voir la liste des commandes !")

                else: return


#*# Évènement quand on écrit dans un salon textuel #*#

EvhoBotsCfg.run(EvhoBotsCfg_Token)