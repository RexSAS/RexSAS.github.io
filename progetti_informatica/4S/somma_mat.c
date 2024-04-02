#include <stdio.h>
int main (){
	int N, i, j, sdp=0, sdu=0, sdd=0, sds=0;

		printf("Inserisci la dimensione delle righe e colonne: ");
		scanf("%d", &N);
	int  mat[N][N];
	
	for (i=0; i<N; i++){
		for(j=0; j<N; j++){
			printf("Inserisci elemento di riga %d e colonna %d :", i+1, j+1);
			scanf("%d", &mat[i][j]);
		}
	}

	for (i=0; i<N; i++){
		for(j=0; j<N; j++){
			printf("%2d", mat[i][j]);
			if(i==j){
				sdd+=mat[i+1][j];
				sdp+=mat[i][j];
			}
			if(i==j && i<N-1)sdu+=mat[i][j+1];
			
		}
		printf("\n");
	}
	
	for(i=0;i<N;i++){
		for(j=0;j<N;j++){
			if(i==j)sds+=mat[i][N-j-1];
		}
	}
	
	printf("La somma degli elementi nella diagonale principale vale: %d\n\nLa somma degli elementi nella diagonale sopra principale vale: %d\n\nLa somma degli elementi nella diagonale sotto principale vale: %d\n\nLa somma degli elementi nella diagonale secondaria vale: %d",sdp,sdu,sdd,sds);
	
	
	
	
	
	return 0;
}
