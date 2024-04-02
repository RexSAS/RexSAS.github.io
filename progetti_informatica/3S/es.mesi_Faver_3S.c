#include<stdio.h>
main(){
	int N;
	printf("Immetti il numero del mese:\n");
	scanf("%i",N);
	if(N<=12 && N>0){
		if(N==1){
			printf("Gennaio");
		}
		else if(N==2){
			printf("Febbraio");
		}
		else if(N==3){
			printf("Marzo");
		}
		else if(N==4){
			printf("Aprile");
		}
		else if(N==5){
			printf("Maggio");
		}
		else if(N==6){
			printf("Giugno");
		}
		else if(N==7){
			printf("Luglio");
		}
		else if(N==8){
			printf("Agosto");
		}
		else if(N==9){
			printf("Settembre");
		}
		else if(N==10){
			printf("Ottobre");
		}
		else if(N==11){
			printf("Novembre");
		}
		else if(N==12){
			printf("Dicembre");
		}
	}
	else{
		printf("_-_-_-_-_-_-_-_-ERRORE-_-_-_-_-_-_-_-_-_\n\n Il numero deve essere compreso tra 1 e 12.\n");
	}
}
