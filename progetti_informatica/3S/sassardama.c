#include <stdio.h>

int main(){
	int i,x,y,coord;
	char tab[64]={' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '};
//start----------------------------
//bianchi
	tab[0]='O';tab[1]='O';tab[2]='O';tab[3]='O';tab[4]='O';tab[5]='O';tab[6]='O';tab[7]='O';tab[8]='O';tab[9]='O';tab[10]='O';tab[11]='O';tab[12]='O';tab[13]='O';tab[14]='O';tab[15]='O';
//neri
	tab[48]='0';tab[49]='0';tab[50]='0';tab[51]='0';tab[52]='0';tab[53]='0';tab[54]='0';tab[55]='0';tab[56]='0';tab[57]='0';tab[58]='0';tab[59]='0';tab[60]='0';tab[61]='0';tab[62]='0';tab[63]='0';
//---------------------------------

	for(i=0;;i++){

//Qeen------------------------------------------
		if(tab[0]=='0')tab[0]='Q';
		if(tab[1]=='0')tab[1]='Q';
		if(tab[2]=='0')tab[2]='Q';
		if(tab[3]=='0')tab[3]='Q';
		if(tab[4]=='0')tab[4]='Q';
		if(tab[5]=='0')tab[5]='Q';
		if(tab[6]=='0')tab[6]='Q';
		if(tab[7]=='0')tab[7]='Q';
//----------------------------------------------
//King------------------------------------------
		if(tab[63]=='O')tab[63]='K';
		if(tab[62]=='O')tab[62]='K';
		if(tab[61]=='O')tab[61]='K';
		if(tab[60]=='O')tab[60]='K';
		if(tab[59]=='O')tab[59]='K';
		if(tab[58]=='O')tab[58]='K';
		if(tab[57]=='O')tab[57]='K';
		if(tab[56]=='O')tab[56]='K';
//----------------------------------------------
		printf("La scacchiera:\n  - - - - - - - - - - - - - - - - -\n8 | %c | %c | %c | %c | %c | %c | %c | %c |\n  - - - - - - - - - - - - - - - - -\n7 | %c | %c | %c | %c | %c | %c | %c | %c |\n  - - - - - - - - - - - - - - - - -\n6 | %c | %c | %c | %c | %c | %c | %c | %c |\n  - - - - - - - - - - - - - - - - -\n5 | %c | %c | %c | %c | %c | %c | %c | %c |\n  - - - - - - - - - - - - - - - - -\n4 | %c | %c | %c | %c | %c | %c | %c | %c |\n  - - - - - - - - - - - - - - - - -\n3 | %c | %c | %c | %c | %c | %c | %c | %c |\n  - - - - - - - - - - - - - - - - -\n2 | %c | %c | %c | %c | %c | %c | %c | %c |\n  - - - - - - - - - - - - - - - - -\n1 | %c | %c | %c | %c | %c | %c | %c | %c |\n  - - - - - - - - - - - - - - - - -\n    1   2   3   4   5   6   7   8",tab[0],tab[1],tab[2],tab[3],tab[4],tab[5],tab[6],tab[7],tab[8],tab[9],tab[10],tab[11],tab[12],tab[13],tab[14],tab[15],tab[16],tab[17],tab[18],tab[19],tab[20],tab[21],tab[22],tab[23],tab[24],tab[25],tab[26],tab[27],tab[28],tab[29],tab[30],tab[31],tab[32],tab[33],tab[34],tab[35],tab[36],tab[37],tab[38],tab[39],tab[40],tab[41],tab[42],tab[43],tab[44],tab[45],tab[46],tab[47],tab[48],tab[49],tab[50],tab[51],tab[52],tab[53],tab[54],tab[55],tab[56],tab[57],tab[58],tab[59],tab[60],tab[61],tab[62],tab[63]);
//BIANCHI==========================================================================================================================
		if(i%2==0){
		printf("\n\nE'il turno dei bianchi\n");
		printf("Inserisci le coordinate del pezzo da muovere:\nx:");
		scanf("%d",&x);
		printf("y:");
		scanf("%d",&y);
//Controllo vittoria bianchi-------------------
		if(tab[0]!='O' && tab[1]!='O' && tab[2]!='O' && tab[3]!='O' && tab[4]!='O' && tab[5]!='O' && tab[6]!='O' && tab[7]!='O' && tab[8]!='O' && tab[9]!='O' &&tab[10]!='O' && tab[11]!='O' && tab[12]!='O' && tab[13]!='O' && tab[14]!='O' && tab[15]!='O' && tab[16]!='O' && tab[17]!='O' && tab[18]!='O' && tab[19]!='O' &&tab[20]!='O' && tab[21]!='O' && tab[22]!='O' && tab[23]!='O' && tab[24]!='O' && tab[25]!='O' && tab[26]!='O' && tab[27]!='O' && tab[28]!='O' && tab[29]!='O' &&tab[30]!='O' && tab[31]!='O' && tab[32]!='O' && tab[33]!='O' && tab[34]!='O' && tab[35]!='O' && tab[36]!='O' && tab[37]!='O' && tab[38]!='O' && tab[39]!='O' &&tab[40]!='O' && tab[41]!='O' && tab[42]!='O' && tab[43]!='O' && tab[44]!='O' && tab[45]!='O' && tab[46]!='O' && tab[47]!='O' && tab[48]!='O' && tab[49]!='O' &&tab[50]!='O' && tab[51]!='O' && tab[52]!='O' && tab[53]!='O' && tab[54]!='O' && tab[55]!='O' && tab[56]!='O' && tab[57]!='O' && tab[58]!='O' && tab[59]!='O' && tab[60]!='O' && tab[61]!='O' && tab[62]!='O' && tab[63]!='O'){
			printf("I bianchi hanno VINTO!!!");
			break;
		}
//---------------------------------------------
//Coordinate-----------------------------------
		if(y==1)coord=64-(8-x)-1;
		if(y==2)coord=64-8-(8-x)-1;
		if(y==3)coord=64-8-8-(8-x)-1;
		if(y==4)coord=64-8-8-8-(8-x)-1;
		if(y==5)coord=64-8-8-8-8-(8-x)-1;
		if(y==6)coord=64-8-8-8-8-8-(8-x)-1;
		if(y==7)coord=64-8-8-8-8-8-8-(8-x)-1;	
		if(y==8)coord=64-8-8-8-8-8-8-8-(8-x)-1;
		if(tab[coord]==' '){printf("CASELLA VUOTA!!\n");i--;continue;}
		if(tab[coord]=='O'){printf("IL PEDONE E'AVVERSARIO!!\n");i--;continue;}

//----------------------------------------------	
//Movimento/mangiare gli avversari--------------
		int move;
		if(tab[coord]=='0'){
		if(x==1 || x==8){
		if(x==1){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale destra\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-7]==' ' || tab[coord-7]=='O' && tab[coord-7-8+1]==' '){
			if(tab[coord-7]==' '){
				tab[coord-7]='0';
				tab[coord]=' ';
			}
			if(tab[coord-7]=='O' && tab[coord-7-8+1]==' '){
				tab[coord-7]=' ';
				tab[coord]=' ';
				tab[coord-7-8+1]='0';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move!=1){printf("Inserisci un numero della lista.");i--;continue;}
			
		}
		if(x==8){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale sinistra\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-9]==' ' || tab[coord-9]=='O' && tab[coord-9-8-1]==' '){
			if(tab[coord-9]==' '){
				tab[coord-9]='0';
				tab[coord]=' ';
			}
			if(tab[coord-9]=='O' && tab[coord-9-8-1]==' '){
				tab[coord-9]=' ';
				tab[coord]=' ';
				tab[coord-9-8-1]='0';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move!=1){printf("Inserisci un numero della lista.");i--;continue;}
			
		}	
			
		}//if lati
		else{
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale destra\n2.  diagonale sinistra\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-7]==' ' || tab[coord-7]=='O' && tab[coord-7-8+1]==' '){
			if(tab[coord-7]==' '){
				tab[coord-7]='0';
				tab[coord]=' ';
			}
			if(tab[coord-7]=='O' && tab[coord-7-8+1]==' '){
				tab[coord-7]=' ';
				tab[coord]=' ';
				tab[coord-7-8+1]='0';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move==2){
			if(tab[coord-9]==' ' || tab[coord-9]=='O' && tab[coord-9-8-1]==' '){
			if(tab[coord-9]==' '){
				tab[coord-9]='0';
				tab[coord]=' ';
			}
			if(tab[coord-9]=='O' && tab[coord-9-8-1]==' '){
				tab[coord-9]=' ';
				tab[coord]=' ';
				tab[coord-9-8-1]='0';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1 && move!=2){printf("Inserisci un numero della lista.");i--;continue;}	
		}//else 4 lati
			
		}//if 0
//Qeen---------------------------------------------------------------------------------------------
		if(tab[coord]=='O' || tab[coord]=='K'){printf("Pedone avversario");i--;continue;}
		if(tab[coord]=='Q'){
		if(x!=1 && x!=8){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale destra superiore\n2.  diagonale sinistra superiore\n3.  diagonale destra inferiore\n4.  diagonale sinistra inferiore\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-7]==' ' || tab[coord-7]=='O' && tab[coord-7-8+1]==' ' || tab[coord-7]=='K' && tab[coord-7-8+1]==' '){
			if(tab[coord-7]==' '){
				tab[coord-7]='Q';
				tab[coord]=' ';
			}
			if(tab[coord-7]=='O' && tab[coord-7-8+1]==' ' || tab[coord-7]=='K' && tab[coord-7-8+1]==' '){
				tab[coord-7]=' ';
				tab[coord]=' ';
				tab[coord-7-8+1]='Q';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move==2){
			if(tab[coord-9]==' ' || tab[coord-9]=='O' && tab[coord-9-8-1]==' ' || tab[coord-9]=='K' && tab[coord-9-8-1]==' '){
			if(tab[coord-9]==' '){
				tab[coord-9]='Q';
				tab[coord]=' ';
			}
			if(tab[coord-9]=='O' && tab[coord-9-8-1]==' ' || tab[coord-9]=='K' && tab[coord-9-8-1]==' '){
				tab[coord-9]=' ';
				tab[coord]=' ';
				tab[coord-9-8-1]='0';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move==3){
			if(tab[coord+9]==' ' || tab[coord+9]=='O' && tab[coord+9+8+1]==' ' || tab[coord+9]=='K' && tab[coord+9+8+1]==' '){
			if(tab[coord+9]==' '){
				tab[coord+9]='Q';
				tab[coord]=' ';
			}
			if(tab[coord+9]=='O' && tab[coord+9+8+1]==' ' || tab[coord+9]=='K' && tab[coord+9+8+1]==' '){
				tab[coord+9]=' ';
				tab[coord]=' ';
				tab[coord+9+8+1]='Q';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move==4){
			if(tab[coord+7]==' ' || tab[coord+7]=='O' && tab[coord+7+8-1]==' ' || tab[coord+7]=='K' && tab[coord+7+8-1]==' '){
			if(tab[coord+7]==' '){
				tab[coord+7]='Q';
				tab[coord]=' ';
			}
			if(tab[coord+7]=='O' && tab[coord+7+8-1]==' ' || tab[coord+7]=='K' && tab[coord+7+8-1]==' '){
				tab[coord+7]=' ';
				tab[coord]=' ';
				tab[coord+7+8-1]='Q';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1 && move!=2 && move!=3 && move!=4){printf("Inserisci un numero della lista.");i--;continue;}
		}
		if(x==1 && y!=1 && y!=8){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale destra superiore\n2.  diagonale destra inferiore\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-7]==' ' || tab[coord-7]=='O' && tab[coord-7-8+1]==' ' || tab[coord-7]=='K' && tab[coord-7-8+1]==' '){
			if(tab[coord-7]==' '){
				tab[coord-7]='Q';
				tab[coord]=' ';
			}
			if(tab[coord-7]=='O' && tab[coord-7-8+1]==' ' || tab[coord-7]=='K' && tab[coord-7-8+1]==' '){
				tab[coord-7]=' ';
				tab[coord]=' ';
				tab[coord-7-8+1]='Q';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move==2){
			if(tab[coord+9]==' ' || tab[coord+9]=='O' && tab[coord+9+8+1]==' ' || tab[coord+9]=='K' && tab[coord+9+8+1]==' '){
			if(tab[coord+9]==' '){
				tab[coord+9]='Q';
				tab[coord]=' ';
			}
			if(tab[coord+9]=='O' && tab[coord+9+8+1]==' ' || tab[coord+9]=='K' && tab[coord+9+8+1]==' '){
				tab[coord+9]=' ';
				tab[coord]=' ';
				tab[coord+9+8+1]='Q';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1 && move!=2){printf("Inserisci un numero della lista.");i--;continue;}
		}
		if(x==8 && y!=1 && y!=8){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale sinistra superiore\n2.  diagonale sinistra inferiore\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-9]==' ' || tab[coord-9]=='O' && tab[coord-9-8-1]==' '){
			if(tab[coord-9]==' '){
				tab[coord-9]='Q';
				tab[coord]=' ';
			}
			if(tab[coord-9]=='O' && tab[coord-9-8-1]==' ' || tab[coord-9]=='K' && tab[coord-9-8-1]==' '){
				tab[coord-9]=' ';
				tab[coord]=' ';
				tab[coord-9-8-1]='0';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move==2){
			if(tab[coord+7]==' ' || tab[coord+7]=='O' && tab[coord+7+8-1]==' ' || tab[coord+7]=='K' && tab[coord+7+8-1]==' '){
			if(tab[coord+7]==' '){
				tab[coord+7]='Q';
				tab[coord]=' ';
			}
			if(tab[coord+7]=='O' && tab[coord+7+8-1]==' ' || tab[coord+7]=='K' && tab[coord+7+8-1]==' '){
				tab[coord+7]=' ';
				tab[coord]=' ';
				tab[coord+7+8-1]='Q';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1 && move!=2){printf("Inserisci un numero della lista.");i--;continue;}
		}
		if(x==8 && y==1){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale sinistra \n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-9]==' ' || tab[coord-9]=='O' && tab[coord-9-8-1]==' ' || tab[coord-9]=='K' && tab[coord-9-8-1]==' '){
			if(tab[coord-9]==' '){
				tab[coord-9]='Q';
				tab[coord]=' ';
			}
			if(tab[coord-9]=='O' && tab[coord-9-8-1]==' ' || tab[coord-9]=='K' && tab[coord-9-8-1]==' '){
				tab[coord-9]=' ';
				tab[coord]=' ';
				tab[coord-9-8-1]='0';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1){printf("Inserisci un numero della lista.");i--;continue;}
		}
		if(x==8 && y==8){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale sinistra inferiore\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord+7]==' ' || tab[coord+7]=='O' && tab[coord+7+8-1]==' ' || tab[coord+7]=='K' && tab[coord+7+8-1]==' '){
			if(tab[coord+7]==' '){
				tab[coord+7]='Q';
				tab[coord]=' ';
			}
			if(tab[coord+7]=='O' && tab[coord+7+8-1]==' ' || tab[coord+7]=='K' && tab[coord+7+8-1]==' '){
				tab[coord+7]=' ';
				tab[coord]=' ';
				tab[coord+7+8-1]='Q';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1 && move!=2 && move!=3 && move!=4){printf("Inserisci un numero della lista.");i--;continue;}
		}
		if(x==1 && y==8){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale destra inferiore\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord+9]==' ' || tab[coord+9]=='O' && tab[coord+9+8+1]==' ' || tab[coord+9]=='K' && tab[coord+9+8+1]==' '){
			if(tab[coord+9]==' '){
				tab[coord+9]='Q';
				tab[coord]=' ';
			}
			if(tab[coord+9]=='O' && tab[coord+9+8+1]==' ' || tab[coord+9]=='K' && tab[coord+9+8+1]==' '){
				tab[coord+9]=' ';
				tab[coord]=' ';
				tab[coord+9+8+1]='Q';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1){printf("Inserisci un numero della lista.");i--;continue;}
		}
		if(x==8 && y==1){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale sinistra superiore\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-9]==' ' || tab[coord-9]=='O' && tab[coord-9-8-1]==' ' || tab[coord-9]=='K' && tab[coord-9-8-1]==' '){
			if(tab[coord-9]==' '){
				tab[coord-9]='Q';
				tab[coord]=' ';
			}
			if(tab[coord-9]=='O' && tab[coord-9-8-1]==' ' || tab[coord-9]=='K' && tab[coord-9-8-1]==' '){
				tab[coord-9]=' ';
				tab[coord]=' ';
				tab[coord-9-8-1]='0';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1){printf("Inserisci un numero della lista.");i--;continue;}
		}


		
		}//if Qeen


//fine bianchi----------------------------------
		}
// NERI==========================================================================================================================
		if(i%2!=0){
			printf("\n\nE'il turno dei neri\n");
		printf("Inserisci le coordinate del pezzo da muovere:\nx:");
		scanf("%d",&x);
		printf("y:");
		scanf("%d",&y);
//Controllo vittoria neri----------------------
		if(tab[0]!='0' && tab[1]!='0' && tab[2]!='0' && tab[3]!='0' && tab[4]!='0' && tab[5]!='0' && tab[6]!='0' && tab[7]!='0' && tab[8]!='0' && tab[9]!='0' &&tab[10]!='0' && tab[11]!='0' && tab[12]!='0' && tab[13]!='0' && tab[14]!='0' && tab[15]!='0' && tab[16]!='0' && tab[17]!='0' && tab[18]!='0' && tab[19]!='0' &&tab[20]!='0' && tab[21]!='0' && tab[22]!='0' && tab[23]!='0' && tab[24]!='0' && tab[25]!='0' && tab[26]!='0' && tab[27]!='0' && tab[28]!='0' && tab[29]!='0' &&tab[30]!='0' && tab[31]!='0' && tab[32]!='0' && tab[33]!='0' && tab[34]!='0' && tab[35]!='0' && tab[36]!='0' && tab[37]!='0' && tab[38]!='0' && tab[39]!='0' &&tab[40]!='0' && tab[41]!='0' && tab[42]!='0' && tab[43]!='0' && tab[44]!='0' && tab[45]!='0' && tab[46]!='0' && tab[47]!='0' && tab[48]!='0' && tab[49]!='0' &&tab[50]!='0' && tab[51]!='0' && tab[52]!='0' && tab[53]!='0' && tab[54]!='0' && tab[55]!='0' && tab[56]!='0' && tab[57]!='0' && tab[58]!='0' && tab[59]!='0' && tab[60]!='0' && tab[61]!='0' && tab[62]!='0' && tab[63]!='0'){
			printf("I neri hanno VINTO!!!");
			break;
		}
//---------------------------------------------
//Coordinate-----------------------------------
		if(y==1)coord=64-(8-x)-1;
		if(y==2)coord=64-8-(8-x)-1;
		if(y==3)coord=64-8-8-(8-x)-1;
		if(y==4)coord=64-8-8-8-(8-x)-1;
		if(y==5)coord=64-8-8-8-8-(8-x)-1;
		if(y==6)coord=64-8-8-8-8-8-(8-x)-1;
		if(y==7)coord=64-8-8-8-8-8-8-(8-x)-1;	
		if(y==8)coord=64-8-8-8-8-8-8-8-(8-x)-1;
		if(tab[coord]==' '){printf("CASELLA VUOTA!!\n");i--;continue;}
		if(tab[coord]=='0'){printf("IL PEDONE E'DELL'AVVERSARIO!!'\n");i--;continue;}
//----------------------------------------------	
//Movimento-------------------------------------
		int move;
		if(tab[coord]=='O'){
		if(x==1 || x==8){
		if(x==1){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale destra\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord+9]==' ' || tab[coord+9]=='0' && tab[coord+9+8]==' '){
			if(tab[coord+9]==' '){
				tab[coord+9]='O';
				tab[coord]=' ';
			}
			if(tab[coord+9]=='0' && tab[coord+9+8]==' '){
				tab[coord+9]=' ';
				tab[coord]=' ';
				tab[coord+9+8]='O';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move!=1){printf("Inserisci un numero della lista.");i--;continue;}
			
		}
		if(x==8){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale sinistra\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord+7]==' ' || tab[coord+7]=='0' && tab[coord+7+8]==' '){
			if(tab[coord+7]==' '){
				tab[coord+7]='O';
				tab[coord]=' ';
			}
			if(tab[coord+7]=='0' && tab[coord+7+8]==' '){
				tab[coord+7]=' ';
				tab[coord]=' ';
				tab[coord+7+8]='O';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move!=1){printf("Inserisci un numero della lista.");i--;continue;}
			
		}	
			
		}//if lati
		else{
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale destra\n2.  diagonale sinistra\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord+9]==' ' || tab[coord+9]=='0' && tab[coord+9+8]==' '){
			if(tab[coord+9]==' '){
				tab[coord+9]='O';
				tab[coord]=' ';
			}
			if(tab[coord+9]=='0' && tab[coord+9+8]==' '){
				tab[coord+9]=' ';
				tab[coord]=' ';
				tab[coord+9+8]='O';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move==2){
			if(tab[coord+7]==' ' || tab[coord+7]=='0' && tab[coord+7+8]==' '){
			if(tab[coord+7]==' '){
				tab[coord+7]='O';
				tab[coord]=' ';
			}
			if(tab[coord+7]=='0' && tab[coord+7+8]==' '){
				tab[coord+7]=' ';
				tab[coord]=' ';
				tab[coord+7+8]='O';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1 && move!=2){printf("Inserisci un numero della lista.");i--;continue;}	
		}//else 4 lati
			
		}//if 0
//King---------------------------------------------------------------------------------------------
		if(tab[coord]=='0' || tab[coord]=='Q'){printf("Pedone avversario");i--;continue;}
		if(tab[coord]=='K'){
		if(x!=1 && x!=8){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale destra superiore\n2.  diagonale sinistra superiore\n3.  diagonale destra inferiore\n4.  diagonale sinistra inferiore\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-7]==' ' || tab[coord-7]=='0' && tab[coord-7-8+1]==' ' || tab[coord-7]=='Q' && tab[coord-7-8+1]==' '){
			if(tab[coord-7]==' '){
				tab[coord-7]='K';
				tab[coord]=' ';
			}
			if(tab[coord-7]=='0' && tab[coord-7-8+1]==' ' || tab[coord-7]=='Q' && tab[coord-7-8+1]==' '){
				tab[coord-7]=' ';
				tab[coord]=' ';
				tab[coord-7-8+1]='K';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move==2){
			if(tab[coord-9]==' ' || tab[coord-9]=='0' && tab[coord-9-8-1]==' '|| tab[coord-9]=='Q' && tab[coord-9-8-1]==' '){
			if(tab[coord-9]==' '){
				tab[coord-9]='K';
				tab[coord]=' ';
			}
			if(tab[coord-9]=='0' && tab[coord-9-8-1]==' '|| tab[coord-9]=='Q' && tab[coord-9-8-1]==' '){
				tab[coord-9]=' ';
				tab[coord]=' ';
				tab[coord-9-8-1]='K';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move==3){
			if(tab[coord+9]==' ' || tab[coord+9]=='0' && tab[coord+9+8+1]==' ' || tab[coord+9]=='Q' && tab[coord+9+8+1]==' '){
			if(tab[coord+9]==' '){
				tab[coord+9]='K';
				tab[coord]=' ';
			}
			if(tab[coord+9]=='0' && tab[coord+9+8+1]==' ' || tab[coord+9]=='Q' && tab[coord+9+8+1]==' '){
				tab[coord+9]=' ';
				tab[coord]=' ';
				tab[coord+9+8+1]='0';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move==4){
			if(tab[coord+7]==' ' || tab[coord+7]=='0' && tab[coord+7+8-1]==' ' || tab[coord+7]=='Q' && tab[coord+7+8-1]==' '){
			if(tab[coord+7]==' '){
				tab[coord+7]='K';
				tab[coord]=' ';
			}
			if(tab[coord+7]=='0' && tab[coord+7+8-1]==' ' || tab[coord+7]=='Q' && tab[coord+7+8-1]==' '){
				tab[coord+7]=' ';
				tab[coord]=' ';
				tab[coord+7+8-1]='K';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1 && move!=2 && move!=3 && move!=4){printf("Inserisci un numero della lista.");i--;continue;}
		}
		if(x==1 && y!=1 && y!=8){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale destra superiore\n2.  diagonale destra inferiore\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-7]==' ' || tab[coord-7]=='0' && tab[coord-7-8+1]==' ' || tab[coord-7]=='Q' && tab[coord-7-8+1]==' '){
			if(tab[coord-7]==' '){
				tab[coord-7]='K';
				tab[coord]=' ';
			}
			if(tab[coord-7]=='0' && tab[coord-7-8+1]==' ' || tab[coord-7]=='Q' && tab[coord-7-8+1]==' '){
				tab[coord-7]=' ';
				tab[coord]=' ';
				tab[coord-7-8+1]='K';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
		if(move==2){
			if(tab[coord+9]==' ' || tab[coord+9]=='0' && tab[coord+9+8+1]==' ' || tab[coord+9]=='Q' && tab[coord+9+8+1]==' '){
			if(tab[coord+9]==' '){
				tab[coord+9]='K';
				tab[coord]=' ';
			}
			if(tab[coord+9]=='0' && tab[coord+9+8+1]==' ' || tab[coord+9]=='Q' && tab[coord+9+8+1]==' '){
				tab[coord+9]=' ';
				tab[coord]=' ';
				tab[coord+9+8+1]='K';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1 && move!=2){printf("Inserisci un numero della lista.");i--;continue;}
		}
		if(x==8 && y!=1 && y!=8){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale sinistra superiore\n2.  diagonale sinistra inferiore\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-9]==' ' || tab[coord-9]=='0' && tab[coord-9-8-1]==' ' || tab[coord-9]=='Q' && tab[coord-9-8-1]==' '){
			if(tab[coord-9]==' '){
				tab[coord-9]='K';
				tab[coord]=' ';
			}
			if(tab[coord-9]=='0' && tab[coord-9-8-1]==' ' || tab[coord-9]=='Q' && tab[coord-9-8-1]==' '){
				tab[coord-9]=' ';
				tab[coord]=' ';
				tab[coord-9-8-1]='K';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}

//sasasasasasasasasassaa
		}
		if(move==2){
			if(tab[coord+7]==' ' || tab[coord+7]=='0' && tab[coord+7+8-1]==' '){
			if(tab[coord+7]==' '){
				tab[coord+7]='K';
				tab[coord]=' ';
			}
			if(tab[coord+7]=='0' && tab[coord+7+8-1]==' '){
				tab[coord+7]=' ';
				tab[coord]=' ';
				tab[coord+7+8-1]='K';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1 && move!=2){printf("Inserisci un numero della lista.");i--;continue;}
		}
		if(x==8 && y==1){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale sinistra \n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-9]==' ' || tab[coord-9]=='0' && tab[coord-9-8-1]==' '){
			if(tab[coord-9]==' '){
				tab[coord-9]='K';
				tab[coord]=' ';
			}
			if(tab[coord-9]=='0' && tab[coord-9-8-1]==' '){
				tab[coord-9]=' ';
				tab[coord]=' ';
				tab[coord-9-8-1]='K';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1){printf("Inserisci un numero della lista.");i--;continue;}
		}
		if(x==8 && y==8){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale sinistra inferiore\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord+7]==' ' || tab[coord+7]=='0' && tab[coord+7+8-1]==' '){
			if(tab[coord+7]==' '){
				tab[coord+7]='K';
				tab[coord]=' ';
			}
			if(tab[coord+7]=='0' && tab[coord+7+8-1]==' '){
				tab[coord+7]=' ';
				tab[coord]=' ';
				tab[coord+7+8-1]='K';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1 && move!=2 && move!=3 && move!=4){printf("Inserisci un numero della lista.");i--;continue;}
		}
		if(x==1 && y==8){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale destra inferiore\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord+9]==' ' || tab[coord+9]=='0' && tab[coord+9+8+1]==' '){
			if(tab[coord+9]==' '){
				tab[coord+9]='K';
				tab[coord]=' ';
			}
			if(tab[coord+9]=='0' && tab[coord+9+8+1]==' '){
				tab[coord+9]=' ';
				tab[coord]=' ';
				tab[coord+9+8+1]='K';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1){printf("Inserisci un numero della lista.");i--;continue;}
		}
		if(x==8 && y==1){
		printf("Quale azione vuoi fare? selezionane il numero:\n1.  diagonale sinistra superiore\n");
		scanf("%d",&move);
		if(move==1){
			if(tab[coord-9]==' ' || tab[coord-9]=='0' && tab[coord-9-8-1]==' '){
			if(tab[coord-9]==' '){
				tab[coord-9]='K';
				tab[coord]=' ';
			}
			if(tab[coord-9]=='0' && tab[coord-9-8-1]==' '){
				tab[coord-9]=' ';
				tab[coord]=' ';
				tab[coord-9-8-1]='K';
			}
			}
			else{printf("POSTO PIENO!!");i--;continue;}
		}
			if(move!=1){printf("Inserisci un numero della lista.");i--;continue;}
		}


		
		}//if Qeen
		
		
		}
	}	
	return 0;
}
