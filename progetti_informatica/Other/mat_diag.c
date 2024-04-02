#include<stdio.h>

int main()
{
    int rig=0,col=0,i,j,diag=0;
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
            if(i==diag && j==diag){
                mat[i][j]=diag;
                diag++;
            }else{
                mat[i][j]=0;
            }
        }
    }
    for(i=0;i<rig;i++){
        for(j=0;j<col;j++){
            if(mat[i][j]<10){
                printf("%d ",mat[i][j]);
            }
        }
        puts("");
    }
    return 0;
}