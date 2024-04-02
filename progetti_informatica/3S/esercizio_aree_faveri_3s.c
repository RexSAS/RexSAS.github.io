//Librerie
#include <stdio.h>
#include <math.h>
main(void)
{
//Variabili
int d,aq,ac,at;
//Numero da immettere
printf("Determina il valore di D: \n");
scanf("%d", &d);
//Area quadrato
aq=pow(d,2);
printf("L'area del quadrato con lato D: \n %d \n",aq);
//Arco cerchio
ac=pow(d,2)*M_PI;
printf("L'area del cerchio con raggio D: \n %d\n",ac);
//Arco triangolo
at=sqrt(3)/4*pow(d,2);
printf("L'area del triangolo con lato D: \n %d\n",at);
}
