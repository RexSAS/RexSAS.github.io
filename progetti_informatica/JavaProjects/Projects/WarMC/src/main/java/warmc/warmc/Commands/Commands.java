package warmc.warmc.Commands;

import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.World;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;



public class Commands implements CommandExecutor {
    @Override
    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        if (sender instanceof Player){
            Player player = (Player) sender;
        }
        else{
            Bukkit.getLogger().info("[WarMC] Solo i player possono eseguire questo comando");
            return true;
        }
        if(cmd.getName().equalsIgnoreCase("site")){
            ((Player) sender).sendRawMessage("§6Clicca sul link per visitare il nostro sito!");
            ((Player) sender).sendRawMessage("☠ §c§lwarmc.it§f ☠");

        }
        if(cmd.getName().equalsIgnoreCase("bag")){
            sender.getServer().dispatchCommand(sender, "backpack");
        }
        if(cmd.getName().equalsIgnoreCase("help")){
            ((Player) sender).sendRawMessage("§6Clicca sul link per visitare la pagina del sito inerente agli aiuti:");
            ((Player) sender).sendRawMessage("☠ §c§lwarmc.it/aiuto§f ☠");
        }
        if(cmd.getName().equalsIgnoreCase("vote")){
            ((Player) sender).sendRawMessage("§6Clicca sul link per andare a votare il nostro server su Minecraft Italia!");
            ((Player) sender).sendRawMessage("☠ §2§lminecraft-italia.it/server/warmc§f ☠");
        }
        if(cmd.getName().equalsIgnoreCase("discord")){
            ((Player) sender).sendRawMessage("§6Clicca sul link per visitare il nostro Discord!");
            ((Player) sender).sendRawMessage("☠ §9§lwarmc.it/discord§f ☠");
        }
        if(cmd.getName().equalsIgnoreCase("jeb")){
            ((Player) sender).sendRawMessage("§6Clicca sul link per visitare il canale twitch di JEBX28!");
            ((Player) sender).sendRawMessage("☠ §5§ltwitch.tv/jebx28_§f ☠");
        }
        if(cmd.getName().equalsIgnoreCase("ig")){
            ((Player) sender).sendRawMessage("§6Clicca sul link per visitare il nostro Instagram!");
            ((Player) sender).sendRawMessage("☠ §d§lwarmc.it/instagram§f ☠");
        }
        if(cmd.getName().equalsIgnoreCase("social")){
            ((Player) sender).sendRawMessage("§f☠ §6Questi sono tutti i comandi relativi ai nostri social! §f☠");
            ((Player) sender).sendRawMessage(" §c§l/sito");
            ((Player) sender).sendRawMessage(" §5§l/jeb");
            ((Player) sender).sendRawMessage(" §9§l/discord");
            ((Player) sender).sendRawMessage(" §d§l/instagram");
        }
        if(cmd.getName().equalsIgnoreCase("changelog")){
            ((Player) sender).sendRawMessage("§6Ecco l'ultimo changelog!");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Aggiunte 4 nuove armmi§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Aggiunti 4 nuovi cibi§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Aggiunte nuove siringhe§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Aggiunta nuova granata§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Aggiunti nuvi gadget§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Aggiunti nuovo kit§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Aggiunta nuova mappa§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Aggiunto nuovo drop§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Modificate le granate§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Modificato lo shop§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Aggiunte build§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Modificate le texture§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Modificato lo shop§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Modificata la gui delle modalità§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Modificata la mistery box§f ☠");
            ((Player) sender).sendRawMessage("☠ §d§l[+] Fix minori§f ☠");
            ((Player) sender).sendRawMessage("§6Per ulteriori informazioni esegui il comando /discord per visitare il nostro discord!");
        }



        return true;
    }
}
