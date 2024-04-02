#include <stdio.h>
int main(){
	int i, j, tab[10][10];
	for(i=0;i<10;i++){
		for(j=0;j<10;j++){
			if(i==0){
				tab[i][j]= j+1;
			}
			else if(j==0){
				tab[i][j]= i+1;
			}
		}
	}
	puts("Tavola Pitagorica:\n");
	for(i=0;i<10;i++){
		for(j=0;j<10;j++){
			if(i>0 && j>0){
				tab[i][j] = tab[0][j]*tab[i][0];
			}
			printf("%3d ",tab[i][j]);
		}
		puts("");
	}
	
	return 0;
}
