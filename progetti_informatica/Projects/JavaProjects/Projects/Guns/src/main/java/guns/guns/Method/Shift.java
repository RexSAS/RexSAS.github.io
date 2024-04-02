package guns.guns.Method;

import net.md_5.bungee.api.ChatMessageType;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerToggleSneakEvent;

public class Shift implements Listener {

    @EventHandler
    public void onShift(PlayerToggleSneakEvent e){
        Player player = e.getPlayer();
        if(!player.getItemInHand().hasItemMeta() || player.getItemInHand().getItemMeta().hasCustomModelData() || player.getItemInHand().getItemMeta().getCustomModelData() != 3)return;
        player.spigot().sendMessage(ChatMessageType.ACTION_BAR, TextComponent.fromLegacyText("§c§lStai shiftando"));
        if (player.getItemInHand().getItemMeta().getCustomModelData() == 0 && !player.isSneaking()){
            player.setWalkSpeed(-0.60F);
        }else if (player.isSneaking()){
            player.setWalkSpeed(0.2F);
        }
    }
}
