#include<math.h>
#include<stdio.h>
main()
{
int A,B,C;
printf("inserisci il valore di A:");
scanf("%d",&A);
printf("inserisci il valore di B:");
scanf("%d",&B);
if(B>0)
{
printf("B è un numero positivo \n");
}
else
{
printf("B è un numero negativo \n");
}
if(A%2==0)
{
printf("A è un numero pari \n");
}
else
{
printf("A è un numero dispari \n");
}
C=A+B;
printf("Il valore di A + B è: %d",C);
}

