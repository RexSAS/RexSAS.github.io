#include<stdio.h>
#include<math.h>
main(){
	int A,B,C;
	printf("Inserisci i seguenti lavori: \n");
	printf("Il valore di A: \n");
	scanf("%d",&A);
	printf("Il valore di B: \n");
	scanf("%d",&B);
	printf("Il valore di C: \n");
	scanf("%d",&C);
	
	if(A>0 && B>0 && C>0 && A<B+C && B<A+C && C<A+B && A>B-C && B>A-C && C>A-B){
		if(A==B && A==C && B==C){
			printf("Il triangolo e' equilatero.\n");
		}
		else{
			printf("Il triangolo non e' equilatero.\n");
		}
		if(A==B && A!=C || B==C && A!=B || C==A && B!=C){
			printf("Il triangolo e' isoscele.\n");
		}
		else{
			printf("Il triangolo non e' isoscele.\n");
		}
		if(A!=B && B!=C && A!=C){
			printf("Il triangolo e' scaleno.\n");
		}
		else{
			printf("Il triangolo non e' scaleno.\n");
		}
		if(pow(2,A)==pow(2,B)+pow(2,C) || pow(2,B)==pow(2,A)+pow(2,C) || pow(2,C)==pow(2,B)+pow(2,A)){
			printf("Il triangolo e' rettangolo.\n");
		}
		else{
			printf("Il triangolo non e' rettangolo.\n");
		}
	}
	else{
		printf("_-_-_-_-_-_-_-_-ERRORE-_-_-_-_-_-_-_-_-_\n\nDati non validi\n\nI valori non corrispondono ad un triangolo.\n");
	}
}
