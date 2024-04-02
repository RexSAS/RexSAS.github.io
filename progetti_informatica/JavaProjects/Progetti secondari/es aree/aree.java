import java.util.*;
import java.lang.Math;
public class aree{
  public static void main(String[] args){
    System.out.println("Determina il valore:");
    Scanner D = new Scanner(System.in);
    int d = D.nextInt();
    double Q,C,T;
    Q = d*d;
    System.out.println("\nL'area del quadrato di lato "+d+" vale "+Q);
    C = (Math.PI*Q)/4;
    System.out.println("\nL'area del cerchio di diametro "+d+" vale "+C);
    T = (Math.sqrt(3)/4)*Math.pow(d,2);
    System.out.println("\nL'area del triangolo di lato "+d+" vale "+T);
  }
}
