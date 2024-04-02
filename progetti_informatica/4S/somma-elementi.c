#include <stdlib.h>
#include <stdio.h>
#include <time.h>
int main(){
	int nums[10], i, add=0;
	srand(time(0));
	puts("Array base:");
	for(i=0;i<10;i++){
		nums[i]=rand()%100+1;
		printf("%d ",nums[i]);
		add+= nums[i];
		if(i==9)printf("\nLa somma degli elementi vale: %d",add);
	}
	
	
	
	
	return 0;
}
