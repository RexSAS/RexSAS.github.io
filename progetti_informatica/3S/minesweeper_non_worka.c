#include <stdio.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 0

int main(){
	
	int i,j,randr,randc,c,r,turn=0,near=0;
	char tab[9][9];
	int bob[9][9]={0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,};
	srand(time(0));
//-------------------------------------------------------------------------	
	for(i=0;i<10;i++){
		randr=rand()%10;
		randc=rand()%10;
		bob[randr][randc]=1;		
	}
	for(i=0;i<9;i++){
		for(j=0;j<9;j++){
			tab[i][j]=' ';
		}
	}
//-------------------------------------------------------------------------
	while(1){
		near=0;
		system("cls");
		puts("MINESWEEPER");
		for(i=0;i<9;i++){
			for(j=0;j<9;j++){
				printf(" %c |",tab[i][j]);
			}
			puts("\n____________________________________");
			puts("");
		}
		printf("definisci:\nrighe: ");
		scanf("%d",&r);
		printf("colonne: ");
		scanf("%d",&c);
		
		
		if(turn==0){
			tab[r-1][c-1]='0';
			turn++;
			continue;
		}		
		else if(bob[r-1][c-1]==1){
			puts("BOMBA");
			break;
		}
		else{
			if(bob[r-1][c-2]==1){
				near++
			}
		}
		
	
		
		
		
		
		
		turn++;
	}






//-------------------------------------------------------------------------
	return 0;
}
