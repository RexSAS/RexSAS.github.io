#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define N 10
int main(){
	int ar1[10],ar2[10],sum[10],i;
	srand(time(0));
	puts("Array 1:");
	for(i=0;i<10;i++){
		ar1[i]=rand()%100+1;
		printf("%d ",ar1[i]);
	}
	puts("\nArray 2:");
	for(i=0;i<10;i++){
		ar2[i]=rand()%100+1;
		printf("%d ",ar2[i]);
	}
	puts("\nArray somma:");
	for(i=0;i<10;i++){
		sum[i]=ar1[i]+ar2[i];
		printf("%d ",sum[i]);
	}
	
	return 0;
}
