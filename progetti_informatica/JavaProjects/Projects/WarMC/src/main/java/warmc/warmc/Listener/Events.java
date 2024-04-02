package warmc.warmc.Listener;


import net.md_5.bungee.api.ChatMessageType;
import net.md_5.bungee.api.chat.TextComponent;
import net.milkbowl.vault.economy.Economy;
import org.bukkit.*;
import org.bukkit.block.Block;
import org.bukkit.entity.*;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.entity.EntityDeathEvent;
import org.bukkit.event.entity.ProjectileHitEvent;
import org.bukkit.event.player.*;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.ItemMeta;
import org.bukkit.potion.PotionEffect;
import org.bukkit.potion.PotionEffectType;
import org.bukkit.util.BlockIterator;
import warmc.warmc.WarMC;


import java.util.Objects;

import static org.bukkit.Bukkit.*;
import static org.bukkit.entity.EntityType.ZOMBIE;

public class Events implements Listener {


    Economy eco = WarMC.getEconomy();


    @EventHandler
    public void MobDrop(EntityDeathEvent e) {
        if (e.getEntity().getType() == ZOMBIE) {
            int amount = 1;
            if (e.getEntity().getWorld().getTime() == 1567) amount = 4;
            e.getDrops().clear();
            e.setDroppedExp(0);

            if (((Zombie)e.getEntity()).isBaby()){
                amount = amount + 3;
            }
            e.getDrops().add(new ItemStack(Material.BONE, 1));
            e.getDrops().add(new ItemStack(Material.EMERALD, amount));
        }
        if (e.getEntity().getType() == EntityType.PLAYER) {
            e.setDroppedExp(0);
            String name = e.getEntity().getName();
            Player player = getServer().getPlayer(name);
            assert player != null;
            int amount = 5;
            e.getDrops().add(new ItemStack(Material.EMERALD, amount));
            eco.withdrawPlayer(player, amount);
            String message = "§c§l-" + amount + "$";
            player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText(message));
        }
    }

    @EventHandler
    public void onPickup(PlayerPickupItemEvent event) {
        Player pl = event.getPlayer();
        Material item = event.getItem().getItemStack().getType();
        Material eme = Material.EMERALD;
        int amount = event.getItem().getItemStack().getAmount();
        if (item != eme) {
            return;
        }
        eco.depositPlayer(pl, amount);
        String message = "§a§l+" + amount + "$";
        pl.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText(message));
        event.setCancelled(true);
        event.getItem().remove();
    }


    @EventHandler
    public void Pickaxe(PlayerInteractEvent e) {
        WarMC warmc = WarMC.getInstance();
        Player player = e.getPlayer();
        if (e.getItem() == null) return;
        int amount = e.getItem().getAmount()-1;
        if (player.getItemInHand().equals(new ItemStack(Material.WOODEN_PICKAXE))) {
            player.setItemInHand(new ItemStack(Material.AIR));
            ItemStack granata = new ItemStack(Material.SNOWBALL, 2);
            ItemMeta meta = granata.getItemMeta();
            meta.setCustomModelData(2030);
            meta.setDisplayName("§c§lGranata Ad Impatto");
            granata.setItemMeta(meta);
            Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                @Override
                public void run() {
                    player.getInventory().addItem(granata);
                }
            }, 10);
        } else if (player.getItemInHand().equals(new ItemStack(Material.STONE_PICKAXE))) {
            player.setItemInHand(new ItemStack(Material.AIR));
            ItemStack granata = new ItemStack(Material.SNOWBALL, 2);
            ItemMeta meta = granata.getItemMeta();
            meta.setCustomModelData(2032);
            meta.setDisplayName("§b§lFlash-Bang");
            granata.setItemMeta(meta);
            Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                @Override
                public void run() {
                    player.getInventory().addItem(granata);
                }
            }, 10);
        } else if (player.getItemInHand().equals(new ItemStack(Material.IRON_PICKAXE))) {
            player.setItemInHand(new ItemStack(Material.AIR));
            ItemStack granata = new ItemStack(Material.SNOWBALL, 2);
            ItemMeta meta = granata.getItemMeta();
            meta.setCustomModelData(2031);
            meta.setDisplayName("§6§lGranata Velenosa");
            granata.setItemMeta(meta);
            Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                @Override
                public void run() {
                    player.getInventory().addItem(granata);
                }
            }, 10);
        } else if (player.getItemInHand().equals(new ItemStack(Material.GOLDEN_PICKAXE))) {
            player.setItemInHand(new ItemStack(Material.AIR));
            ItemStack granata = new ItemStack(Material.SNOWBALL, 2);
            ItemMeta meta = granata.getItemMeta();
            meta.setCustomModelData(2033);
            meta.setDisplayName("§4§lMolotov");
            granata.setItemMeta(meta);
            Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                @Override
                public void run() {
                    player.getInventory().addItem(granata);
                }
            }, 10);
        } else if ( Objects.requireNonNull(e.getItem().getItemMeta()).hasCustomModelData() && Objects.requireNonNull(e.getItem().getItemMeta()).getCustomModelData() == 2031 && !e.getItem().getType().equals(Material.SNOWBALL)) {
            ItemStack speed = e.getItem();
            speed.setAmount(amount);
            ItemMeta meta = speed.getItemMeta();
            speed.setItemMeta(meta);
            player.setItemInHand(new ItemStack(Material.AIR));
            Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                @Override
                public void run() {
                    player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, 20*10,2,true,false));
                    player.getInventory().addItem(speed);
                }
            }, 10);
        }else if (Objects.requireNonNull(e.getItem().getItemMeta()).hasCustomModelData() && Objects.requireNonNull(e.getItem().getItemMeta()).getCustomModelData() == 2030 && !e.getItem().getType().equals(Material.SNOWBALL)) {
            ItemStack regen = e.getItem();
            regen.setAmount(amount);
            ItemMeta meta = regen.getItemMeta();
            regen.setItemMeta(meta);
            player.setItemInHand(new ItemStack(Material.AIR));
            Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                @Override
                public void run() {
                    player.addPotionEffect(new PotionEffect(PotionEffectType.REGENERATION, 20*10,2,true,false));
                    player.getInventory().addItem(regen);
                }
            }, 10);
        }
    }

    @EventHandler
    public void eatEvent(PlayerItemConsumeEvent e){
        WarMC warmc = WarMC.getInstance();
        Player player = e.getPlayer();
        int done = 0;
        int heal = 0;
        int amount = player.getItemInHand().getAmount()-1;
        if (player.getItemInHand().getType().equals(Material.ENCHANTED_GOLDEN_APPLE)){
            if (player.getHealth() == 20){
                player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§c§lHai la vita al massimo!"));
                e.setCancelled(true);
                return;
            }
            e.setCancelled(true);
            player.setItemInHand(new ItemStack(Material.AIR));
            player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§l3"));
            player.setWalkSpeed(0.05F);
            Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                @Override
                public void run() {
                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§l2"));
                    Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                        @Override
                        public void run() {
                            player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§l1"));
                            Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                                @Override
                                public void run() {
                                    player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§b§l0"));
                                    player.setHealth(20.0);
                                    player.setWalkSpeed(0.2F);
                                    player.getInventory().addItem(new ItemStack(Material.ENCHANTED_GOLDEN_APPLE, amount));
                                }
                            },20);
                        }
                    },20);
                }
            },20);
        }else if (player.getItemInHand().getType().equals(Material.GOLDEN_APPLE)){
            if (player.getHealth() == 20){
                player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§c§lHai la vita al massimo!"));
                e.setCancelled(true);
                return;
            }
            e.setCancelled(true);
            player.setItemInHand(new ItemStack(Material.AIR));
            if (player.getHealth() <10){
                player.setHealth(player.getHealth()+10);
                player.getInventory().addItem(new ItemStack(Material.GOLDEN_APPLE, amount));
            }else {
                player.setHealth(20);
                player.getInventory().addItem(new ItemStack(Material.GOLDEN_APPLE, amount));
            }

            //--------------------new-------------------------------------

        }else if (player.getItemInHand().getType().equals(Material.MUSHROOM_STEW)){
            if (player.getFoodLevel() == 20){
                player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§c§lHai la fame al massimo!"));
                e.setCancelled(true);
                return;
            }
            e.setCancelled(true);
            player.getInventory().setItemInHand(new ItemStack(Material.AIR));
            if (player.getFoodLevel() < 10){
                player.setFoodLevel(player.getFoodLevel()+10);
            }else {
                player.setFoodLevel(20);
            }
            done = 1;
        }
        if (done == 1)return;

        if (player.getItemInHand().getType().equals(Material.COOKED_BEEF)){
            if (player.getFoodLevel() == 20){
                player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§c§lHai la fame al massimo!"));
                e.setCancelled(true);
                return;
            }
            e.setCancelled(true);
            player.getInventory().setItemInHand(new ItemStack(Material.AIR));
            if (player.getFoodLevel() < 14){
                player.setFoodLevel(player.getFoodLevel()+6);
                player.getInventory().addItem(new ItemStack(Material.COOKED_BEEF, amount));
            }else {
                player.setFoodLevel(20);
                player.getInventory().addItem(new ItemStack(Material.COOKED_BEEF, amount));
            }
        }
        if (e.getItem().getItemMeta() == null) {
            return;
        }
         if (Objects.requireNonNull(player.getItemInHand().getItemMeta()).hasCustomModelData() && player.getItemInHand().getItemMeta().getCustomModelData() == 2040 && e.getItem().getType().equals(Material.MILK_BUCKET)){
            heal = 1;
             if (player.getHealth() == 20){
                 player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 20*32, 1, true, false));
                 player.addPotionEffect(new PotionEffect(PotionEffectType.CONFUSION, 20*15, 1, true, false));
                 return;
            }
            e.setCancelled(true);
             player.getInventory().setItemInHand(new ItemStack(Material.AIR));
             if (player.getHealth() < 20-heal){
                player.setHealth(player.getHealth()+heal);
                player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 20*32, 1, true, false));
                player.addPotionEffect(new PotionEffect(PotionEffectType.CONFUSION, 20*15, 1, true, false));
            }else {
                player.setHealth(20);
                player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 20*32, 1, true, false));
                player.addPotionEffect(new PotionEffect(PotionEffectType.CONFUSION, 20*15, 1, true, false));
            }
             done = 1;
        }
        if (done == 1)return;


        if (player.getItemInHand().getItemMeta().hasCustomModelData() && player.getItemInHand().getItemMeta().getCustomModelData() == 2041 && e.getItem().getType().equals(Material.MILK_BUCKET)){
            heal = 5;
            if (player.getHealth() == 20){
                player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§c§lHai la vita al massimo!"));
                e.setCancelled(true);
                return;
            }
            e.setCancelled(true);
             player.getInventory().setItemInHand(new ItemStack(Material.AIR));
             if (player.getHealth() < 20-heal){
                player.setHealth(player.getHealth()+heal);
            }else {
                player.setHealth(20);
            }
        }
    }

    @EventHandler
    public void snowballLand(ProjectileHitEvent e) {
        WarMC warmc = WarMC.getInstance();
        Entity grenade = e.getEntity();
        if (grenade instanceof Snowball && Objects.equals(Objects.requireNonNull(((Snowball) grenade).getItem().getItemMeta()).getDisplayName(), "§c§lGranata Ad Impatto")) {
            Location location = grenade.getLocation();
            BlockIterator iterator = new BlockIterator(location.getWorld(), location.toVector(), grenade.getVelocity().normalize(), 0, 2);
            while (iterator.hasNext()) {
                Block hitBlock = iterator.next();
                if (hitBlock != null) {
                    location.getWorld().createExplosion(location, 5, false);
                    for (Entity entity : grenade.getNearbyEntities(3, 3, 3)) {
                        if (entity instanceof Player || entity instanceof Zombie) {
                            ((LivingEntity) entity).damage(1000);
                        }
                    }
                    break;
                }
            }
        }
        if (grenade instanceof Snowball && Objects.equals(Objects.requireNonNull(((Snowball) grenade).getItem().getItemMeta()).getDisplayName(), "§b§lFlash-Bang")) {
            Location location = grenade.getLocation();
            BlockIterator iterator = new BlockIterator(location.getWorld(), location.toVector(), grenade.getVelocity().normalize(), 0, 2);
            while (iterator.hasNext()) {
                Block hitBlock = iterator.next();
                if (hitBlock != null) {
                    location.getWorld().spawnParticle(Particle.FLASH, location, 10);
                    location.getWorld().playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 50, 5);
                    for (Entity entity : grenade.getNearbyEntities(5, 5, 5)) {
                        if (entity instanceof Player || entity instanceof Zombie) {
                            ((LivingEntity) entity).addPotionEffect(new PotionEffect(PotionEffectType.BLINDNESS, 3 * 20, 10, true, false));
                        }
                    }
                    break;
                }
            }
        }
        if (grenade instanceof Snowball && Objects.equals(Objects.requireNonNull(((Snowball) grenade).getItem().getItemMeta()).getDisplayName(), "§4§lMolotov")) {
            Location location = grenade.getLocation();
            BlockIterator iterator = new BlockIterator(location.getWorld(), location.toVector(), grenade.getVelocity().normalize(), 0, 2);
            while (iterator.hasNext()) {
                Block hitBlock = iterator.next();
                if (hitBlock != null) {
                    location.getWorld().playSound(location, Sound.ITEM_FIRECHARGE_USE, 50, 5);
                            double cx = location.getX();
                            double cy = location.getY();
                            double cz = location.getZ();
                            for (double x = cx - 3; x <= cx + 3; x++) {
                                for (double y = cy - 1; y <= cy + 1; y++) {
                                    for (double z = cz - 3; z <= cz + 3; z++) {
                                        Location block = new Location(location.getWorld(), x, y, z);
                                        Location forGrass = new Location(location.getWorld(), x,y-1,z);
                                        if (block.getBlock().getType() != Material.AIR || forGrass.getBlock().getType() == Material.GRASS) {
                                            continue;
                                        }

                                        if (location.distanceSquared(block) <= 5 * 5) {
                                            block.getBlock().setType(Material.FIRE);
                                            Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                                                @Override
                                                public void run() {
                                                    block.getBlock().setType(Material.AIR);
                                                }
                                            }, 20 * 6);
                                        }
                                    }
                                }
                            }

                    break;
                }
            }
        }
        if (grenade instanceof Snowball && Objects.equals(Objects.requireNonNull(((Snowball) grenade).getItem().getItemMeta()).getDisplayName(), "§6§lGranata Velenosa")) {
            Location location = grenade.getLocation();
            BlockIterator iterator = new BlockIterator(location.getWorld(), location.toVector(), grenade.getVelocity().normalize(), 0, 2);
            while (iterator.hasNext()) {
                Block hitBlock = iterator.next().getRelative(0, 1, 0);
                int i = 0;
                if (hitBlock != null) {

                    double cx = location.getX();
                    double cy = location.getY();
                    double cz = location.getZ();
                    location.getWorld().playSound(location, Sound.BLOCK_FIRE_EXTINGUISH, 25, 0.5F);
                    for (double x = cx - 5; x <= cx + 5; x++) {
                        for (double y = cy - 5; y <= cy + 5; y++) {
                            for (double z = cz - 5; z <= cz + 5; z++) {
                                Location block = new Location(location.getWorld(), x, y, z);

                                if (location.distanceSquared(block) <= 5 * 5) {
                                    location.getWorld().spawnParticle(Particle.ASH, block, 20);
                                }
                                for (Entity entity : grenade.getNearbyEntities(5, 5, 5)) {
                                    if (entity instanceof Player || entity instanceof Zombie) {
                                        ((LivingEntity) entity).damage(5);
                                    }
                                }
                            }
                        }
                    }


                    Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                        @Override
                        public void run() {


                            for (double x = cx - 5; x <= cx + 5; x++) {
                                for (double y = cy - 5; y <= cy + 5; y++) {
                                    for (double z = cz - 5; z <= cz + 5; z++) {
                                        Location block = new Location(location.getWorld(), x, y, z);

                                        if (location.distanceSquared(block) <= 5 * 5) {
                                            location.getWorld().spawnParticle(Particle.ASH, block, 20);
                                        }
                                        for (Entity entity : grenade.getNearbyEntities(5, 5, 5)) {
                                            if (entity instanceof Player || entity instanceof Zombie) {
                                                ((LivingEntity) entity).damage(5);
                                            }
                                        }
                                    }
                                }
                            }

                            Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                                @Override
                                public void run() {


                                    for (double x = cx - 5; x <= cx + 5; x++) {
                                        for (double y = cy - 5; y <= cy + 5; y++) {
                                            for (double z = cz - 5; z <= cz + 5; z++) {
                                                Location block = new Location(location.getWorld(), x, y, z);

                                                if (location.distanceSquared(block) <= 5 * 5) {
                                                    location.getWorld().spawnParticle(Particle.ASH, block, 20);
                                                }
                                                for (Entity entity : grenade.getNearbyEntities(5, 5, 5)) {
                                                    if (entity instanceof Player || entity instanceof Zombie) {
                                                        ((LivingEntity) entity).damage(5);
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                                        @Override
                                        public void run() {


                                            for (double x = cx - 5; x <= cx + 5; x++) {
                                                for (double y = cy - 5; y <= cy + 5; y++) {
                                                    for (double z = cz - 5; z <= cz + 5; z++) {
                                                        Location block = new Location(location.getWorld(), x, y, z);

                                                        if (location.distanceSquared(block) <= 5 * 5) {
                                                            location.getWorld().spawnParticle(Particle.ASH, block, 20);
                                                        }
                                                        for (Entity entity : grenade.getNearbyEntities(5, 5, 5)) {
                                                            if (entity instanceof Player || entity instanceof Zombie) {
                                                                ((LivingEntity) entity).damage(5);
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                                                @Override
                                                public void run() {


                                                    for (double x = cx - 5; x <= cx + 5; x++) {
                                                        for (double y = cy - 5; y <= cy + 5; y++) {
                                                            for (double z = cz - 5; z <= cz + 5; z++) {
                                                                Location block = new Location(location.getWorld(), x, y, z);

                                                                if (location.distanceSquared(block) <= 5 * 5) {
                                                                    location.getWorld().spawnParticle(Particle.ASH, block, 20);

                                                                }
                                                                for (Entity entity : grenade.getNearbyEntities(5, 5, 5)) {
                                                                    if (entity instanceof Player || entity instanceof Zombie) {
                                                                        ((LivingEntity) entity).damage(5);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                    Bukkit.getScheduler().scheduleSyncDelayedTask(warmc, new Runnable() {
                                                        @Override
                                                        public void run() {


                                                            for (double x = cx - 5; x <= cx + 5; x++) {
                                                                for (double y = cy - 5; y <= cy + 5; y++) {
                                                                    for (double z = cz - 5; z <= cz + 5; z++) {
                                                                        Location block = new Location(location.getWorld(), x, y, z);

                                                                        if (location.distanceSquared(block) <= 5 * 5) {
                                                                            location.getWorld().spawnParticle(Particle.ASH, block, 20);
                                                                        }
                                                                        for (Entity entity : grenade.getNearbyEntities(5, 5, 5)) {
                                                                            if (entity instanceof Player || entity instanceof Zombie) {
                                                                                ((LivingEntity) entity).damage(5);
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }, 20);
                                                }
                                            }, 20);
                                        }
                                    }, 20);
                                }
                            }, 20);
                        }
                    }, 20);
                }
                break;
            }
        }
    }


    @EventHandler
    public void clickEmerald(PlayerInteractEvent e) {
        Player player = e.getPlayer();
        Material eme = Material.EMERALD;
        Material item = player.getItemInHand().getType();
        if (item != eme) {
            return;
        }
        ItemStack air = new ItemStack(Material.AIR);
        int amount = player.getItemInHand().getAmount();
        String message = "§a§l+" + amount + "$";
        player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText(message));
        player.setItemInHand(air);
        eco.depositPlayer(player, amount);
    }
}
