//EQUAZIONI DI 2 GRADO
#include <stdio.h>
#include <math.h>
int main(){
	int x1=0,x2=0,a=0,b=0,c=0,del=0;
	int i;
	
	printf("a=");
	scanf("%d",&a);
	printf("b=");
	scanf("%d",&b);
	printf("c=");
	scanf("%d",&c);
	
	del=pow(b,2)-(4*a*c);
	printf("delta= %d",del);
	
	x1=(-b+sqrt(del))/2*a;
	x2=(-b-sqrt(del))/2*a;
	
	printf("\nx1= %d",x1);
	printf("\nx2= %d",x2);
	return 0;
}
