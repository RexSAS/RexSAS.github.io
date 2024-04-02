#include <iostream>
#include <ctime>
#include <cstdlib>
using namespace std;

#define MAX 500

int main(){
	int righe, colonne, i, j, mat[MAX][MAX], pos_minr=0, pos_minc=0, pos_maxr=0, pos_maxc=0, maxcolonne[MAX], mincolonne[MAX], maxrighe[MAX], minrighe[MAX];
	
	do{
		cout<<"Inserisci la dimensione delle righe: ";
		cin>>righe;
		cout<<"Inserisci la dimensione delle colonne: ";
		cin>>colonne;
	}while(righe<1 || righe>MAX || colonne<1 || colonne>MAX);
	
	
	//immetto dati in matrice
	for (i=0; i<righe; i++){
		for(j=0; j<colonne; j++){
			cout<<"Inserisci elemento di riga "<<i+1<<" e colonna "<<j+1<<" :";
			cin>>mat[i][j];
		}
	}
	
	//stampa matrice completa
	for (i=0; i<righe; i++){
		cout<<endl;
		for(j=0; j<colonne; j++){
			cout<<"\t"<<mat[i][j];
		}
	}
	
	//trovo il massimo e il minimo e memorizzo in nuove variabili
	for (i=0; i<righe; i++){
		for(j=0; j<colonne; j++){
			if (mat[i][j]<mat[pos_minr][pos_minc]){	
				pos_minr=i;
				pos_minc=j;
			}else if (mat[i][j]>mat[pos_maxr][pos_maxc]){
					pos_maxr=i;
					pos_maxc=j;
				}
		}
	}
	
	
	//trovo massimo e minimo di colonne
	for (j=0;j<colonne;j++){
	       maxcolonne[j]=0;
	       mincolonne[j]=0;
	    for(i=0;i<righe;i++){
	        if(mat[i][j]>mat[maxcolonne[j]][j])
	            maxcolonne[j]=i;
	        else if
	            (mat[i][j]<mat[mincolonne[j]][j]){
	                mincolonne[j]=i;
	            }
	    }
	}
	   
	 for(j=0; j<colonne; j++)
	cout<<"\n colonna "<<j+1<<"  MAX = "<<mat[maxcolonne[j]][j]<<",  min = "<<mat[mincolonne[j]][j];
	
	cout<<"\nIl valore massimo totale e': "<<mat[pos_maxr][pos_maxc];
	cout<<"\nIl valore minimo totale e': "<<mat[pos_minr][pos_minc];
	
	return 0;
}
