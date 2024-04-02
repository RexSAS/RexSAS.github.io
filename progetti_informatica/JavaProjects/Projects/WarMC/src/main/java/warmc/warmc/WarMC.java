package warmc.warmc;


import net.milkbowl.vault.economy.Economy;
import org.bukkit.ChatColor;
import org.bukkit.plugin.RegisteredServiceProvider;
import org.bukkit.plugin.java.JavaPlugin;
import warmc.warmc.Commands.Commands;
import warmc.warmc.Listener.Events;

import java.util.Objects;


public final class WarMC extends JavaPlugin {

    public static Economy econ = null;
    static WarMC instance;


    @Override
    public void onEnable() {
        instance = this;
        if (!setupEconomy()){
            getServer().getConsoleSender().sendRawMessage(ChatColor.RED + "[WarMC] VAULT NON COLLEGATO!!");
            getServer().getPluginManager().disablePlugin(this);
            return;
        }
        Commands commands =new Commands();
        getServer().getPluginManager().registerEvents(new Events(), this);
        Objects.requireNonNull(getCommand("site")).setExecutor(commands);
        Objects.requireNonNull(getCommand("bag")).setExecutor(commands);
        Objects.requireNonNull(getCommand("help")).setExecutor(commands);
        Objects.requireNonNull(getCommand("vote")).setExecutor(commands);
        Objects.requireNonNull(getCommand("discord")).setExecutor(commands);
        Objects.requireNonNull(getCommand("jeb")).setExecutor(commands);
        Objects.requireNonNull(getCommand("ig")).setExecutor(commands);
        Objects.requireNonNull(getCommand("social")).setExecutor(commands);
        Objects.requireNonNull(getCommand("changelog")).setExecutor(commands);
        getServer().getConsoleSender().sendRawMessage(ChatColor.GREEN+"[WarMC]:------------------------------------");
        getServer().getConsoleSender().sendRawMessage(ChatColor.GREEN+"[WarMC]:           WARMC ABILITATO");
        getServer().getConsoleSender().sendRawMessage(ChatColor.GREEN+"[WarMC]:------------------------------------");
    }


    @Override
    public void onDisable() {
        // Plugin shutdown logic
        getServer().getConsoleSender().sendRawMessage(ChatColor.RED+"[WarMC]:------------------------------------");
        getServer().getConsoleSender().sendRawMessage(ChatColor.RED+"[WarMC]:          WARMC DISABILITATO");
        getServer().getConsoleSender().sendRawMessage(ChatColor.RED+"[WarMC]:------------------------------------");
    }



    public static WarMC getInstance(){
        return instance;
    }





    private boolean setupEconomy() {
        if (getServer().getPluginManager().getPlugin("Vault") == null) {
            return false;
        }
        RegisteredServiceProvider<Economy> rsp = getServer().getServicesManager().getRegistration(Economy.class);
        if (rsp == null) {
            return false;
        }
        econ = rsp.getProvider();
        return econ != null;
    }

    public static Economy getEconomy(){
        return econ;
    }




}
