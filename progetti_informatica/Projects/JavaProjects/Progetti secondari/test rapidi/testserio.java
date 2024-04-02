public class testserio{
  public static void main(String[] args) {
    int[] nums = new int[11];
    int a = 4;
    for (int i=1;i<=10;i++){
      a = a+10;
      nums[i] = a;
      System.out.println("Il valore della casella "+i+" vale "+nums[i]);
    }
  }
}
