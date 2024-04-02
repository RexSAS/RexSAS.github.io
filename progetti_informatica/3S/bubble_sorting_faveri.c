#include <stdlib.h>
#include <stdio.h>
int main(){
	int i,a,lista[10],st;
	
	//creazione array
	puts("Array iniziale");
	for(i=0;i<10;i++){
		lista[i]=rand()%(50);
		printf("%d ",lista[i]);
	}
	puts("\n");
	//Bubble Sorting
	for(i=10;i>0;i--){
        	for(a=0;a<i;a++){
            		if(lista[a]>lista[a+1]){
              		  st=lista[a+1];
              		  lista[a+1]=lista[a];
              		  lista[a]=st;
            }
        }
	}
	puts("Array ordinato:\n");
	for(i=0;i<10;i++){
	printf("%d ",lista[i]);
	}
	
	
	
	
	return 0;
}