#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>

#define RIGHE 3
#define COLONNE 3

int main(){
	
	//VARIABILI
	char tab[RIGHE][COLONNE],player = 'X', winner;
	int i,j,k,getPos,counter,counterCol,counterRig,counterObl;
	bool isWin = false, isEmpty = true;
	
	//CREAZIONE DELLA TABELLA
	for(i=0;i<RIGHE;i++){
			for(j=0;j<COLONNE;j++){
				tab[i][j] = ' ';
			}
		}
	//LOOP FINO ALLA VITTORA
	while(!isWin){
		//STAMPA A VIDEO LA TABELLA
		printf("Tocca a %c\n",player);
		for(i=0;i<RIGHE;i++){
			for(j=0;j<COLONNE;j++){
				printf(" %c ",tab[i][j]);
				if(j != COLONNE-1){
					printf("|");
				}
			}
			if(i != RIGHE-1){
					puts("\n-----------");
				}
			
		}
		
		//INPUT NUMERO CASELLA
		
		if(!isEmpty){
			puts("\n\nLA CASELLA E'OCCUPATA");
		}
		puts("\nInserisci il numero della casella:");
		scanf("%d",&getPos);
		while(getPos<=0 || getPos>=10){
			puts("numero fuori tabella, reinseriscilo:");
			scanf("%d",&getPos);
		}
		getPos--;
		
		//CONTROLLO CASELLA VUOTA
		
		counter = 0;
		for(i=0;i<RIGHE;i++){
			for(j=0;j<COLONNE;j++){
				if(getPos == counter){
					if(tab[i][j] != ' '){
						isEmpty = false;
						
					}else{
						isEmpty = true;
						tab[i][j] = player;
					}
				}
				counter++;
			}
		}
		
		
		
		//CONTROLLO VITTORIA
		for(k=0;k<3;k++){
			counterCol = 0;
			counterRig = 0;
			counterObl = 0;
			for(i=0;i<RIGHE;i++){
				for(j=0;j<COLONNE;j++){
					if(j == k && tab[i][j] == player){
						counterCol++;
					}if(i == k && tab[i][j] == player){
						counterRig++;
					}if(i == j && tab[i][j] == player){
						counterObl++;
					}if(counterCol == 3 || counterRig == 3 || counterObl == 3){
						winner = player;
						isWin = true;
					}
				}
			}
		}
		//CONTROLLO VITTORIA OBLIQUA
		if(tab[2][0] == player && tab[1][1] == player && tab[0][2] == player){
			winner = player;
			isWin = true;
		}
		
		
		//PULIZIA E CAMBIO PLAYER
		
		system("cls");
		if(isEmpty){
			if(player == 'X'){
				player = 'O';	
			}else{
				player = 'X';
			}	
		}
	}
	puts("");
	for(i=0;i<RIGHE;i++){
			for(j=0;j<COLONNE;j++){
				printf(" %c ",tab[i][j]);
				if(j != COLONNE-1){
					printf("|");
				}
			}
			if(i != RIGHE-1){
					puts("\n-----------");
				}
			
		}
	
	printf("\n\nIl player %c ha vinto!", winner);
	
	
	return 0;
}
