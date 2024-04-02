#include<stdio.h>
#include<math.h>
int main(){
	int bit,nbit,i,dec=0,base;
	printf("definisci la base:");
	scanf("%d",&base);
	printf("definisci il numero di bit:");
	scanf("%d",&nbit);
	for(i=0;i<nbit;i++){
		printf("definisci un bit:");
		scanf("%d",&bit);
		if(bit<0 || bit>=base){
			printf("valore non valido, utilizza numeri di base %d, reinseriscilo\n",base);
			i--;
			continue;
		}
		else{
			bit=bit*pow(base,i);
			dec=dec+bit;
		}
	}
	printf("\n\nIl risultato e' %d",dec);
	return 0;
}
