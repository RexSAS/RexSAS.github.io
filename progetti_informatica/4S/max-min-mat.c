#include<stdio.h>
#include<stdlib.h>
#include<time.h>


int main(){
	int righe=0,colonne=0;
	while(righe<=0){
		puts("inserisci il numero di righe (numero maggiore di 0):");
		scanf("%d",&righe);
	}
	while(colonne<=0){
		puts("inserisci il numero di colonne (numero maggiore di 0):");
		scanf("%d",&colonne);
	}
	int tab[righe][colonne],max[2] = {0,0},min[2] = {0,0},j,i;
	srand(time(0));
	puts("");
	for(i=0;i<righe;i++){
		for(j=0;j<colonne;j++){
			tab[i][j] = rand()%100;
			printf("%5d ",tab[i][j]);
			if(tab[i][j] > tab[max[0]][max[1]]){
				max[0] = i;
				max[1] = j;
			}
			if(tab[i][j] < tab[min[0]][min[1]]){
				min[0] = i;
				min[1] = j;
			}
		}
		puts("");
	}
	
	
	printf("\n\nIl numero piu' grande vale %d e si trova nella posizione %d-%d\n\nIl numero piu' piccolo vale %d e si tova nella posizione %d-%d",tab[max[0]][max[1]],max[0],max[1],tab[min[0]][min[1]],min[0],min[1]);
	
	
	
	
	
	
	return 0;
}
