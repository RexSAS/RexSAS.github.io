import java.util.Scanner;

public class scanner{
  public static void main(String[] args){
      System.out.println("scrivi qualcosa:");
      Scanner leggi = new Scanner(System.in);
      // nextLine con la L maiuscola!!!
      String testo = leggi.nextLine();
      System.out.println("hai scritto:"+testo);


  }
}
