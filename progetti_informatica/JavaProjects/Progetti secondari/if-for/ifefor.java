import java.util.*;
public class ifefor{
  public static void main(String[] args){
    System.out.println("dimmi più numeri e metti lo zero per finire.");
    Scanner scan = new Scanner(System.in);
    int b=0;
    for(int i=0;;i++){
      int a = scan.nextInt();
      if(a==0){
        break;
      }
      else{
        b = b+a;
      }
    }
    System.out.println("La somma dei valori è: "+b);
  }
}
