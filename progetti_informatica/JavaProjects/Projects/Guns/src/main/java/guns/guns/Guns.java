package guns.guns;

import guns.guns.Events.Interact;
import guns.guns.Method.Shift;
import org.bukkit.ChatColor;
import org.bukkit.plugin.java.JavaPlugin;

public final class Guns extends JavaPlugin {

    static Guns instance;

    @Override
    public void onEnable() {
        instance = this;
        getServer().getPluginManager().registerEvents(new Interact(), this);
        getServer().getPluginManager().registerEvents(new Shift(), this);
        getServer().getConsoleSender().sendRawMessage(ChatColor.GREEN+"[WarMC]:------------------------------------");
        getServer().getConsoleSender().sendRawMessage(ChatColor.GREEN+"[WarMC]:               ︻デ═一");
        getServer().getConsoleSender().sendRawMessage(ChatColor.GREEN+"[WarMC]:           GUNS ABILITATO");
        getServer().getConsoleSender().sendRawMessage(ChatColor.GREEN+"[WarMC]:               ︻デ═一");
        getServer().getConsoleSender().sendRawMessage(ChatColor.GREEN+"[WarMC]:------------------------------------");

    }

    @Override
    public void onDisable() {
        getServer().getConsoleSender().sendRawMessage(ChatColor.RED+"[WarMC]:------------------------------------");
        getServer().getConsoleSender().sendRawMessage(ChatColor.RED+"[WarMC]:               ︻デ═一");
        getServer().getConsoleSender().sendRawMessage(ChatColor.RED+"[WarMC]:           GUNS ABILITATO");
        getServer().getConsoleSender().sendRawMessage(ChatColor.RED+"[WarMC]:               ︻デ═一");
        getServer().getConsoleSender().sendRawMessage(ChatColor.RED+"[WarMC]:------------------------------------");    }

    public static Guns getInstance(){
        return instance;
    }
}
