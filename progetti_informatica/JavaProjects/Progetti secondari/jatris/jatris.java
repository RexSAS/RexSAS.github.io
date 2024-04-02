import java.util.*;
public class jatris{
  public static void main(String[] args) {
    int x,o,i;
    Scanner scanx = new Scanner(System.in);
    Scanner scano = new Scanner(System.in);
    char[] tab = {' ',' ',' ',' ',' ',' ',' ',' ',' '};
    System.out.println("tabella:\n "+tab[0]+" | "+tab[1]+" | "+tab[2]+"\n - - - - -\n "+tab[3]+" | "+tab[4]+" | "+tab[5]+"\n - - - - -\n "+tab[6]+" | "+tab[7]+" | "+tab[8]);
    for (i=0;i<9;i++){
      if (i%2==0) {
        System.out.println("tocca a X\ninserisci il numero della casella:");
        x = scanx.nextInt();
        if(x<=0 || x>9){
            System.out.println("valore non in tabella, inserire un numero da 1 a 9.\n");
        i--;
        continue;
        }
        //Controllo X   --------------------------------
                if(x==1){
                	if(tab[0]==' ')tab[0]='X';
                else{
                	System.out.println("Casella occupata");
                	i--;
                	continue;
        		}
        		}
                if(x==2){
                	if(tab[1]==' ')tab[1]='X';
                else{
                	System.out.println("Casella occupata");
                	i--;
                	continue;
        		}
        		}
                if(x==3){
                	if(tab[2]==' ')tab[2]='X';
                else{
                	System.out.println("Casella occupata");
                	i--;
                	continue;
        		}
        		}

                if(x==4){
                	if(tab[3]==' ')tab[3]='X';
                else{
                	System.out.println("Casella occupata");
                	i--;
                	continue;
        		}
        		}

                if(x==5){
                	if(tab[4]==' ')tab[4]='X';
                else{
                	System.out.println("Casella occupata");
                	i--;
                	continue;
        		}
        		}

                if(x==6){
                	if(tab[5]==' ')tab[5]='X';
                else{
                	System.out.println("Casella occupata");
                	i--;
                	continue;
        		}
        		}

                if(x==7){
                	if(tab[6]==' ')tab[6]='X';
                else{
                	System.out.println("Casella occupata");
                	i--;
                	continue;
        		}
        		}

                if(x==8){
                	if(tab[7]==' ')tab[7]='X';
                else{
                	System.out.println("Casella occupata");
                	i--;
                	continue;
        		}
        		}

                if(x==9){
                	if(tab[8]==' ')tab[8]='X';
                else{
                	System.out.println("Casella occupata");
                	i--;
                	continue;
        		}
        		}

        //  ----------------------------------------
        System.out.println("tabella:\n "+tab[0]+" | "+tab[1]+" | "+tab[2]+"\n - - - - -\n "+tab[3]+" | "+tab[4]+" | "+tab[5]+"\n - - - - -\n "+tab[6]+" | "+tab[7]+" | "+tab[8]);
        if(tab[0]==tab[1] && tab[1]==tab[2] && tab[0]=='X'){System.out.println("\n\nLa X ha vinto!!");break;}
        if(tab[3]==tab[4] && tab[3]==tab[5] && tab[3]=='X'){System.out.println("\n\nLa X ha vinto!!");break;}
        if(tab[6]==tab[7] && tab[6]==tab[8] && tab[6]=='X'){System.out.println("\n\nLa X ha vinto!!");break;}
        if(tab[0]==tab[3] && tab[0]==tab[6] && tab[0]=='X'){System.out.println("\n\nLa X ha vinto!!");break;}
        if(tab[1]==tab[4] && tab[1]==tab[7] && tab[1]=='X'){System.out.println("\n\nLa X ha vinto!!");break;}
        if(tab[2]==tab[5] && tab[2]==tab[8] && tab[2]=='X'){System.out.println("\n\nLa X ha vinto!!");break;}
        if(tab[0]==tab[4] && tab[0]==tab[8] && tab[0]=='X'){System.out.println("\n\nLa X ha vinto!!");break;}
        if(tab[2]==tab[4] && tab[2]==tab[6] && tab[2]=='X'){System.out.println("\n\nLa X ha vinto!!");break;}
      }
      if(i%2!=0){
      System.out.println("tocca a O\ninserisci il numero della tabella:");
      o = scano.nextInt();
      if(o<=0 || o>9){
      System.out.println("valore non in tabella, inserire un numero da 1 a 9.\n");
      i--;
      continue;
      }
//Controllo X   --------------------------------
      if(o==1){
        if(tab[0]==' ')tab[0]='O';
      else{
        System.out.println("Casella occupata");
        i--;
        continue;
  }
  }
      if(o==2){
        if(tab[1]==' ')tab[1]='O';
      else{
        System.out.println("Casella occupata");
        i--;
        continue;
  }
  }
      if(o==3){
        if(tab[2]==' ')tab[2]='O';
      else{
        System.out.println("Casella occupata");
        i--;
        continue;
  }
  }

      if(o==4){
        if(tab[3]==' ')tab[3]='O';
      else{
        System.out.println("Casella occupata");
        i--;
        continue;
  }
  }

      if(o==5){
        if(tab[4]==' ')tab[4]='O';
      else{
        System.out.println("Casella occupata");
        i--;
        continue;
  }
  }

      if(o==6){
        if(tab[5]==' ')tab[5]='O';
      else{
        System.out.println("Casella occupata");
        i--;
        continue;
  }
  }

      if(o==7){
        if(tab[6]==' ')tab[6]='O';
      else{
        System.out.println("Casella occupata");
        i--;
        continue;
  }
  }

      if(o==8){
        if(tab[7]==' ')tab[7]='O';
      else{
        System.out.println("Casella occupata");
        i--;
        continue;
  }
  }

      if(o==9){
        if(tab[8]==' ')tab[8]='O';
      else{
        System.out.println("Casella occupata");
        i--;
        continue;
  }
  }

//  ----------------------------------------
      System.out.println("tabella:\n "+tab[0]+" | "+tab[1]+" | "+tab[2]+"\n - - - - -\n "+tab[3]+" | "+tab[4]+" | "+tab[5]+"\n - - - - -\n "+tab[6]+" | "+tab[7]+" | "+tab[8]);
      if(tab[0]==tab[1] && tab[1]==tab[2] && tab[0]=='O'){System.out.println("\n\nLa O ha vinto!!");break;}
      if(tab[3]==tab[4] && tab[3]==tab[5] && tab[3]=='O'){System.out.println("\n\nLa O ha vinto!!");break;}
      if(tab[6]==tab[7] && tab[6]==tab[8] && tab[6]=='O'){System.out.println("\n\nLa O ha vinto!!");break;}
      if(tab[0]==tab[3] && tab[0]==tab[6] && tab[0]=='O'){System.out.println("\n\nLa O ha vinto!!");break;}
      if(tab[1]==tab[4] && tab[1]==tab[7] && tab[1]=='O'){System.out.println("\n\nLa O ha vinto!!");break;}
      if(tab[2]==tab[5] && tab[2]==tab[8] && tab[2]=='O'){System.out.println("\n\nLa O ha vinto!!");break;}
      if(tab[0]==tab[4] && tab[0]==tab[8] && tab[0]=='O'){System.out.println("\n\nLa O ha vinto!!");break;}
      if(tab[2]==tab[4] && tab[2]==tab[6] && tab[2]=='O'){System.out.println("\n\nLa O ha vinto!!");break;}
      }

  }
    }
  }
