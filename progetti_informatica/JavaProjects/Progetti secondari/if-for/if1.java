import java.util.*;
public class if1{
  public static void main(String[] args){
    System.out.println("dimmi un numero");
    Scanner scan = new Scanner(System.in);
    int a = scan.nextInt();
    int b = 2;
    if(a==b){
      System.out.println("2+2=3");
    }
    else{
      System.out.println(a+"+2=99 ;)");
    }
  }
}
