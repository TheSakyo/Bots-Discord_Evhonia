import discord # IMPORTATION DISCORD
from discord.ext import commands # IMPORTATION DISCORD


BotTest_Token = "NzYzNDY5MTg4Njg0OTcyMDcy.X34KFw.lPNm_j2TOxrb3Ic8KxIiTzhDyiU"

BotTest_prefix = "t!" # Variable pour la commande (préfix)

BotTest = commands.Bot(command_prefix = BotTest_prefix)




#*# Évènement quand le bot est connecté #*#
@BotTest.event
async def on_ready():
    await BotTest.change_presence(activity=discord.Game(name="Faire des tests "))
    print(BotTest.user.display_name +  " est connecté !")
#*# Évènement quand le bot est connecté #*#


#*# Évènement quand on écrit dans un salon textuel #*#
@BotTest.event
async def on_message(message):

    User = message.author

    if User == BotTest.user: return

    else:

        if message.content.startswith(BotTest_prefix):

            if message.content.endswith("ping"):
                await message.delete()
                await message.channel.send(User.mention + " Pong ! 😁")
    
            elif message.content.endswith("help"):
                await message.delete()
                await message.channel.send(User.mention + " **Voici une petite aide pour toi  :wink:  :**\n" +
                                           "```t!help: Affiche la liste des commandes\n\n" +
                                           "t!ping: Affiche un message contenant 'Pong ! 😁'```")

            else: await message.channel.send(User.mention + " **Erreur :** Commande Introuvable !")
        

#*# Évènement quand on écrit dans un salon textuel #*#

BotTest.run(BotTest_Token)