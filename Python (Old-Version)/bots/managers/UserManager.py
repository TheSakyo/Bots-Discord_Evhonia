import discord # IMPORTATION DISCORD
from discord.utils import get # IMPORTATION 'DISCORD.UTILS.GET'
import time # IMPORTATION TEMPS 'TIME'

timer = {} # Variable pour définir un 'timer'


## Petite méthode "boolean" pour vérifier le rôle du membre ##
async def hasRole(user, message, roleID):

    if type(roleID) == list:

        for ids in roleID:

            check_role = get(message.guild.roles, id=ids)

            if check_role in user.roles: return True

        return False

    else:

        check_role = get(message.guild.roles, id=roleID)

        if check_role not in user.roles: return False
            
        else: return True


## Petite méthode "boolean" pour vérifier le rôle du membre ##




## Petite méthode pour ajouter un rôle aux membre ##
async def addRole(user, message, ID):

    role = get(message.guild.roles, id=ID)

    if await hasRole(user, message, ID) == False:
        
        await user.add_roles(role)

        Success = user.mention + " ***Succès :***  Le rôle **" + role.mention + "** vous a été ajouté !"

        await message.channel.send(Success)

        
        ## Active le timer ##
        timer[user] = True
        ## Active le timer ##


        time.sleep(210)

        await removeRoleWithTimer(user, message, role.id)

    else:

        Error = user.mention + " ***Erreur :***  Vous possédez déja le rôle **" + role.mention + "** !"
       
        await message.channel.send(Error)

## Petite méthode pour ajouter un rôle aux membre ##



## Petite méthode pour supprimer le rôle du membre ##
async def removeRole(user, message, ID):

    role = get(message.guild.roles, id=ID)

    if await hasRole(user, message, ID) == True:

        await user.remove_roles(role)

        Success = user.mention + " ***Succès :***  Le rôle **" + role.mention + "** vous a été enlevé !"

        await message.channel.send(Success)

        if timer[user] == True: timer[user] = False
    else:

        Error = user.mention + " ***Erreur :***  Vous ne possédez pas le rôle **" + role.mention + "** !"
       
        await message.channel.send(Error)

## Petite méthode pour supprimer le rôle du membre ##


## Petite méthode pour supprimer le rôle du membre ##
async def removeRoleWithTimer(user, message, ID):

    role = get(message.guild.roles, id=ID)

    if timer[user] == True:

        await user.remove_roles(role)

        Time = "**Temps Écoulé**, le delai de 3.5 minutes est dépasser ! Vous n'avez plus le rôle **" + role.name + "**"
        
        await user.send(Time)

        timer[user] = False

## Petite méthode pour supprimer le rôle du membre ##


