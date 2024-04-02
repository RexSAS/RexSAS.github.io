#include <stdio.h>
#include <math.h>
#include <stdlib.h>
int main()
{
    int x,o,i;
    char tab[9]={' ',' ',' ',' ',' ',' ',' ',' ',' '};
    for(i=0;i<9;i++){
    	system("cls");
    printf("tabella:\n %c | %c | %c\n - - - - -\n %c | %c | %c\n - - - - -\n  %c| %c | %c\n",tab[0],tab[1],tab[2],tab[3],tab[4],tab[5],tab[6],tab[7],tab[8]);
        if(i%2==0){
        printf("tocca a X\ninserisci il numero della casella:");
        scanf("%d",&x);
        if(x<=0 || x>9){
            printf("valore non in tabella, inserire un numero da 1 a 9.\n");
        i--;
        continue;
        }
//Controllo X   --------------------------------
        if(x==1){
        	if(tab[0]==' ')tab[0]='X';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}
        if(x==2){
        	if(tab[1]==' ')tab[1]='X';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}
        if(x==3){
        	if(tab[2]==' ')tab[2]='X';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

        if(x==4){
        	if(tab[3]==' ')tab[3]='X';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

        if(x==5){
        	if(tab[4]==' ')tab[4]='X';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

        if(x==6){
        	if(tab[5]==' ')tab[5]='X';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

        if(x==7){
        	if(tab[6]==' ')tab[6]='X';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

        if(x==8){
        	if(tab[7]==' ')tab[7]='X';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

        if(x==9){
        	if(tab[8]==' ')tab[8]='X';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

//  ----------------------------------------
    	system("cls");
        printf("tabella:\n %c | %c | %c\n - - - - -\n %c | %c | %c\n - - - - -\n  %c| %c | %c\n",tab[0],tab[1],tab[2],tab[3],tab[4],tab[5],tab[6],tab[7],tab[8]);
        if(tab[0]==tab[1] && tab[1]==tab[2] && tab[0]=='X'){printf("\n\nLa X ha vinto!!");break;}
        if(tab[3]==tab[4] && tab[3]==tab[5] && tab[3]=='X'){printf("\n\nLa X ha vinto!!");break;}
        if(tab[6]==tab[7] && tab[6]==tab[8] && tab[6]=='X'){printf("\n\nLa X ha vinto!!");break;}
        if(tab[0]==tab[3] && tab[0]==tab[6] && tab[0]=='X'){printf("\n\nLa X ha vinto!!");break;}
        if(tab[1]==tab[4] && tab[1]==tab[7] && tab[1]=='X'){printf("\n\nLa X ha vinto!!");break;}
        if(tab[2]==tab[5] && tab[2]==tab[8] && tab[2]=='X'){printf("\n\nLa X ha vinto!!");break;}
        if(tab[0]==tab[4] && tab[0]==tab[8] && tab[0]=='X'){printf("\n\nLa X ha vinto!!");break;}
        if(tab[2]==tab[4] && tab[2]==tab[6] && tab[2]=='X'){printf("\n\nLa X ha vinto!!");break;}

        }
        if(i%2!=0){
        printf("tocca a O\ninserisci il numero della tabella:");
        scanf("%d",&o);
        if(o<=0 || o>9){
        printf("valore non in tabella, inserire un numero da 1 a 9.\n");
        i--;
        continue;
        }
//Controllo X   --------------------------------
        if(o==1){
        	if(tab[0]==' ')tab[0]='O';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}
        if(o==2){
        	if(tab[1]==' ')tab[1]='O';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}
        if(o==3){
        	if(tab[2]==' ')tab[2]='O';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

        if(o==4){
        	if(tab[3]==' ')tab[3]='O';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

        if(o==5){
        	if(tab[4]==' ')tab[4]='O';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

        if(o==6){
        	if(tab[5]==' ')tab[5]='O';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

        if(o==7){
        	if(tab[6]==' ')tab[6]='O';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

        if(o==8){
        	if(tab[7]==' ')tab[7]='O';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

        if(o==9){
        	if(tab[8]==' ')tab[8]='O';
        else{
        	printf("Casella occupata");
        	i--;
        	continue;
		}
		}

//  ----------------------------------------
    	system("cls");
        printf("tabella:\n %c | %c | %c\n - - - - -\n %c | %c | %c\n - - - - -\n  %c| %c | %c\n",tab[0],tab[1],tab[2],tab[3],tab[4],tab[5],tab[6],tab[7],tab[8]);
        if(tab[0]==tab[1] && tab[1]==tab[2] && tab[0]=='O'){printf("\n\nLa O ha vinto!!");break;}
        if(tab[3]==tab[4] && tab[3]==tab[5] && tab[3]=='O'){printf("\n\nLa O ha vinto!!");break;}
        if(tab[6]==tab[7] && tab[6]==tab[8] && tab[6]=='O'){printf("\n\nLa O ha vinto!!");break;}
        if(tab[0]==tab[3] && tab[0]==tab[6] && tab[0]=='O'){printf("\n\nLa O ha vinto!!");break;}
        if(tab[1]==tab[4] && tab[1]==tab[7] && tab[1]=='O'){printf("\n\nLa O ha vinto!!");break;}
        if(tab[2]==tab[5] && tab[2]==tab[8] && tab[2]=='O'){printf("\n\nLa O ha vinto!!");break;}
        if(tab[0]==tab[4] && tab[0]==tab[8] && tab[0]=='O'){printf("\n\nLa O ha vinto!!");break;}
        if(tab[2]==tab[4] && tab[2]==tab[6] && tab[2]=='O'){printf("\n\nLa O ha vinto!!");break;}
        }

    }
    return 0;
}

