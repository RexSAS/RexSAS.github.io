#include <iostream>
using namespace std;

int main(){
	int N, i, j, sdp=0, sdu=0, sdd=0, sds=0;

		cout<<"Inserisci la dimensione delle righe e colonne: ";
		cin>>N;
	int  mat[N][N];
	
	for (i=0; i<N; i++){
		for(j=0; j<N; j++){
			cout<<"Inserisci elemento di riga "<<i+1<<" e colonna "<<j+1<<" :";
			cin>>mat[i][j];
		}
	}

	for (i=0; i<N; i++){
		for(j=0; j<N; j++){
			cout<<"\t"<<mat[i][j];
			if(i==j){
				sdd+=mat[i+1][j];
				sdp+=mat[i][j];
				sds+=mat[i][N-j-1];
				if(i<N-1)sdu+=mat[i][j+1];
			}
			
		}
		cout<<"\n";
	}
	
	
	cout<<"La somma degli elementi nella diagonale principale vale: "<<sdp<<"\n\nLa somma degli elementi nella diagonale sopra principale vale: "<<sdu<<"\n\nLa somma degli elementi nella diagonale sotto principale vale: "<<sdd<<"\n\nLa somma degli elementi nella diagonale secondaria vale: "<<sds;
	
	
	
	
	
	return 0;
}
