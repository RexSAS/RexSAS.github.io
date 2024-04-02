import java.util.*;

public class Main{
  public static void main(String[] args){
    String testo="";
    Scanner scan = new Scanner(System.in);
    while(testo.isEmpty()){
        System.out.println("Scrivi una parola \nHai un massimo di 10 lettere");
        testo = scan.nextLine();
        System.out.println("SCRIVI NON PREMERE INVIO A CASO -__- ");
    }
    System.out.println("hai scritto "+testo+" e si può scomporre in:");
    char[] car=testo.toCharArray();
    int lunghezza = testo.length();
    if(lunghezza>10)
        lunghezza=10;
    for(int i=0;i<lunghezza;i++)
        System.out.println(car[i]);
  }
}
