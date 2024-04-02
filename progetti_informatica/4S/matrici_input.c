#include<stdio.h>

int main()
{
    int rig=0,col=0,i,j;
    while(rig<1){
        puts("Definisci il numero di righe:");
        scanf("%d",&rig);
    }
    while(col<1){
        puts("Definisci il numero di colonne:");
        scanf("%d",&col);
    }
    int mat[rig][col];
    for(i=0;i<rig;i++){
        for(j=0;j<col;j++){
            puts("\nInserisci un valore:");
            scanf("%d",&mat[i][j]);
        }
    }
    for(i=0;i<rig;i++){
        for(j=0;j<col;j++){
            printf("%d",mat[i][j]);
        }
        puts("");
    }
    return 0;
}