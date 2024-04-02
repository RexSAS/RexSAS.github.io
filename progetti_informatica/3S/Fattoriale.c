#include <stdio.h>

int main(){
	
	
	
	int n,f=1,h,i;
	printf("determina il numero:");
	scanf("%d",&n);
	
//------------------------------------------------	
/*- i=1 perchè non ci deve essere lo 0, quindi per fare n giri deve essere <=*/ 	
	for(i=1;i<=n;i++){
		f=f*i;
	}
	
	
//------------------------------------------------	
	
	
	printf("Il fattoriale è:%d",f);
	
	
	
	return 0;
}
