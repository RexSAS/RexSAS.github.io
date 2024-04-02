#include <stdio.h>
#include <stdbool.h>
#include <string.h>

int main(){
	
	char word[27], choosedWord;
	bool isWin = false, isLose = false, isTrue;
	int i=0,stage = 0,leng, j=0,counter=0;
	
	//INPUT PAROLA
	puts("Scrivi una parola:");
	scanf("%26s",word);
	
	
	leng = strlen(word);
	char guessWord[leng+1];
	
	//RIEMPIMENTO '-' PAROLA NASCOSTA
	for(i=0;i<leng;i++){
		guessWord[i] = '-';
	}
	
	while(!isLose && !isWin){
		system("cls");
		
		//STAMPA PAROLA NASCOSTA
		puts("Parola:");
		for(i=0;i<leng;i++){
			printf("%c",guessWord[i]);
		}
		
		//STAMPA POSSIBILI TABELLE
		switch(stage){
			case 0:
				printf("\n\n______\n|    |\n|    \n|   \n|    \n");
				break;
			case 1:
				printf("\n\n______\n|    |\n|    %c\n|   \n|    \n",2);
				break;
			case 2:
				printf("\n\n______\n|    |\n|    %c\n|    %c\n|    \n",2,219);
				break;
			case 3:
				printf("\n\n______\n|    |\n|    %c\n|   %c%c\n|    \n",2,218,219);
				break;
			case 4:
				printf("\n\n______\n|    |\n|    %c\n|   %c%c%c\n|    \n",2,218,219,191);
				break;
			case 5:
				printf("\n\n______\n|    |\n|    %c\n|   %c%c%c\n|    %c\n",2,218,219,191,217);
				break;
			case 6:
				printf("\n\n______\n|    |\n|    %c\n|   %c%c%c\n|    %c\n",2,218,219,191,193);
				break;
			default:
				puts("error");
				break;
		}
		//INPUT LETTERA
		puts("Scrivi una lettera:");
		scanf(" %c",&choosedWord);
		
		//CONTROLLO LETTERE E VITTORA
		isTrue = false;
		for(i=0;i<leng;i++){
			if(word[i] == choosedWord){
				isTrue = true;
				guessWord[i] = choosedWord;
				counter++;
				if(counter == leng){
					isWin = true;
				}
			}
		}
		//AUMENTO ERRORE
		if(!isTrue){
			stage++;
		}
		//LIMITE PERDITA
		if(stage == 6){
			isLose = true;
		}
	}
	system("cls");
	
	//STAMPE FINALI
	if(isWin){
		puts("\n\nHAI VINTO!\n\nLa parola era:");
		for(i=0;i<leng;i++)printf("%c",word[i]);
	}else{
		puts("\n\nHAI PERSO!\n\nLa parola era:");
		for(i=0;i<leng;i++)printf("%c",word[i]);
	}
	

	return 0;
}
