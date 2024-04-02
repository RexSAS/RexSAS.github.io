package guns.guns.Events;

import guns.guns.Guns;
import net.md_5.bungee.api.ChatMessageType;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.entity.*;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.Action;
import org.bukkit.event.player.PlayerInteractEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.ItemMeta;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static guns.guns.Method.Targeter.getTargetEntity;

// GUNS CMD LIST
// - Pistol 0 | ammo 100
// - ShotGun 1 | ammo 101


public class Interact implements Listener {
    Guns guns = Guns.getInstance();

    @EventHandler
    public void onPress(PlayerInteractEvent e) {
        if (e.getItem() == null) return;
        Player player = e.getPlayer();
        ItemStack item = e.getItem();
        ItemMeta meta = item.getItemMeta();
        boolean hasAmmo = false;
        int pos = 0;
        Entity target = getTargetEntity(player);
        int slot = player.getInventory().getHeldItemSlot();
        if (!item.hasItemMeta() || !Objects.requireNonNull(item.getItemMeta()).hasCustomModelData() || item.getItemMeta().getCustomModelData() != 0 || e.getAction() != Action.RIGHT_CLICK_AIR && e.getAction() != Action.RIGHT_CLICK_BLOCK) return;
        e.setCancelled(true);

        //------------------0000------------------------
        if (Objects.requireNonNull(item.getItemMeta()).getCustomModelData() == 0){
            assert meta != null;
            if (meta.getLore() == null){
                List<String> lore = new ArrayList<>(List.of("Ammo: 0"));
                meta.setLore(lore);
                item.setItemMeta(meta);
            }
            List<String> lore = meta.getLore();
            //-------------RELOAD-------
            for (int i = 0; i<player.getInventory().getSize(); i++){
                if (player.getInventory().getItem(i) != null && player.getInventory().getItem(i).getItemMeta().hasCustomModelData() && player.getInventory().getItem(i).hasItemMeta() && player.getInventory().getItem(i).getItemMeta().getCustomModelData() == 100){
                    hasAmmo = true;
                    pos = i;
                }
            }
            if (hasAmmo) {
                if (meta.getLore().get(0).equals("Ammo: 0")) {
                    int amount = player.getInventory().getItem(pos).getAmount();
                    ItemStack ammo = player.getInventory().getItem(pos);
                    ItemMeta ammoMeta = player.getInventory().getItem(pos).getItemMeta();
                    ammo.setItemMeta(ammoMeta);
                    ammo.setAmount(amount-1);
                    player.getInventory().setItem(pos, new ItemStack(Material.AIR));
                    player.getInventory().addItem(ammo);
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§c§lReloading..."));
                    lore.set(0, "Ammo: Reloading...");
                    meta.setLore(lore);
                    item.setItemMeta(meta);
                    Bukkit.getScheduler().scheduleSyncDelayedTask(guns, new Runnable() {
                        @Override
                        public void run() {
                            player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§lMunizioni: 5/5"));
                            lore.set(0, "Ammo: 5");
                            meta.setLore(lore);
                            item.setItemMeta(meta);
                        }
                    }, 20 * 4);
                    return;
                }
            } else if (meta.getLore().get(0).equals("Ammo: 0")){
                player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§c§lNon hai munizioni!"));
                return;
            }
            //-----------------RELOAD------------
            switch (meta.getLore().get(0)){
                case "Ammo: 5":
                    lore.set(0,"Ammo: 4");
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§lMunizioni: 4/5"));
                    meta.setLore(lore);
                    item.setItemMeta(meta);
                    player.getInventory().setItem(slot, item);
                    if (target != null && !target.isDead() && target instanceof Zombie || target instanceof Player)((LivingEntity)target).damage(5 , player);
                    return;
                case "Ammo: 4":
                    lore.set(0,"Ammo: 3");
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§lMunizioni: 3/5"));
                    meta.setLore(lore);
                    item.setItemMeta(meta);
                    player.getInventory().setItem(slot, item);
                    if (target != null && !target.isDead() && target instanceof Zombie || target instanceof Player)((LivingEntity)target).damage(5 , player);
                    return;
                case "Ammo: 3":
                    lore.set(0,"Ammo: 2");
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§lMunizioni: 2/5"));
                    meta.setLore(lore);
                    item.setItemMeta(meta);
                    player.getInventory().setItem(slot, item);
                    if (target != null && !target.isDead() && target instanceof Zombie || target instanceof Player)((LivingEntity)target).damage(5 , player);
                    return;
                case "Ammo: 2":
                    lore.set(0,"Ammo: 1");
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§lMunizioni: 1/5"));
                    meta.setLore(lore);
                    item.setItemMeta(meta);
                    player.getInventory().setItem(slot, item);
                    if (target != null && !target.isDead() && target instanceof Zombie || target instanceof Player)((LivingEntity)target).damage(5 , player);
                    return;
                case "Ammo: 1":
                    lore.set(0,"Ammo: 0");
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§lMunizioni: 0/5"));
                    meta.setLore(lore);
                    item.setItemMeta(meta);
                    player.getInventory().setItem(slot, item);
                    if (target != null && !target.isDead() && target instanceof Zombie || target instanceof Player)((LivingEntity)target).damage(5 , player);
                    return;
                case "Ammo: Reloading...":
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§c§lReloading..."));
                    return;
            }
        }


        //------------------0001------------------------
        if (Objects.requireNonNull(item.getItemMeta()).getCustomModelData() == 1){
            assert meta != null;
            if (meta.getLore() == null){
                List<String> lore = new ArrayList<>(List.of("Ammo: 0"));
                meta.setLore(lore);
                item.setItemMeta(meta);
            }
            List<String> lore = meta.getLore();
            //-------------RELOAD-------
            for (int i = 0; i<player.getInventory().getSize(); i++){
                if (player.getInventory().getItem(i) != null && player.getInventory().getItem(i).getItemMeta().hasCustomModelData() && player.getInventory().getItem(i).hasItemMeta() && player.getInventory().getItem(i).getItemMeta().getCustomModelData() == 101){
                    hasAmmo = true;
                    pos = i;
                }
            }
            if (hasAmmo) {
                if (meta.getLore().get(0).equals("Ammo: 0")) {
                    int amount = player.getInventory().getItem(pos).getAmount();
                    ItemStack ammo = player.getInventory().getItem(pos);
                    ItemMeta ammoMeta = player.getInventory().getItem(pos).getItemMeta();
                    ammo.setItemMeta(ammoMeta);
                    ammo.setAmount(amount-1);
                    player.getInventory().setItem(pos, new ItemStack(Material.AIR));
                    player.getInventory().addItem(ammo);
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§c§lReloading..."));
                    lore.set(0, "Ammo: Reloading...");
                    meta.setLore(lore);
                    item.setItemMeta(meta);
                    Bukkit.getScheduler().scheduleSyncDelayedTask(guns, new Runnable() {
                        @Override
                        public void run() {
                            player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§lMunizioni: 5/5"));
                            lore.set(0, "Ammo: 5");
                            meta.setLore(lore);
                            item.setItemMeta(meta);
                        }
                    }, 20 * 4);
                    return;
                }
            } else if (meta.getLore().get(0).equals("Ammo: 0")){
                player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§c§lNon hai munizioni!"));
                return;
            }
            //-----------------RELOAD------------
            switch (meta.getLore().get(0)){
                case "Ammo: 5":
                    lore.set(0,"Ammo: 4");
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§lMunizioni: 4/5"));
                    meta.setLore(lore);
                    item.setItemMeta(meta);
                    player.getInventory().setItem(slot, item);
                    if (target != null && !target.isDead() && target instanceof Zombie || target instanceof Player)((LivingEntity)target).damage(15 , player);
                    return;
                case "Ammo: 4":
                    lore.set(0,"Ammo: 3");
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§lMunizioni: 3/5"));
                    meta.setLore(lore);
                    item.setItemMeta(meta);
                    player.getInventory().setItem(slot, item);
                    if (target != null && !target.isDead() && target instanceof Zombie || target instanceof Player)((LivingEntity)target).damage(15 , player);
                    return;
                case "Ammo: 3":
                    lore.set(0,"Ammo: 2");
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§lMunizioni: 2/5"));
                    meta.setLore(lore);
                    item.setItemMeta(meta);
                    player.getInventory().setItem(slot, item);
                    if (target != null && !target.isDead() && target instanceof Zombie || target instanceof Player)((LivingEntity)target).damage(15 , player);
                    return;
                case "Ammo: 2":
                    lore.set(0,"Ammo: 1");
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§lMunizioni: 1/5"));
                    meta.setLore(lore);
                    item.setItemMeta(meta);
                    player.getInventory().setItem(slot, item);
                    if (target != null && !target.isDead() && target instanceof Zombie || target instanceof Player)((LivingEntity)target).damage(15 , player);
                    return;
                case "Ammo: 1":
                    lore.set(0,"Ammo: 0");
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§lMunizioni: 0/5"));
                    meta.setLore(lore);
                    item.setItemMeta(meta);
                    player.getInventory().setItem(slot, item);
                    if (target != null && !target.isDead() && target instanceof Zombie || target instanceof Player)((LivingEntity)target).damage(15 , player);
                    return;
                case "Ammo: Reloading...":
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§c§lReloading..."));
                    return;
            }
        }
    }
}