#include <iostream>
using namespace std;

int main(){
	int L=0,i,j;
	
	cout<<"definisci il numero dispari di righe maggiore di 0:";
	do{
		cin>>L;
	}while(L>0 && L%2==0);
	
	int W = (L*2)-1,tab[L][W];
	
	for(i=0;i<L;i++){
		for(j=0;j<W;j++){	
			if(i==0){
				if(j==W/2)tab[i][j]=1;
				else tab[i][j]=0;
			}else{
			 	if(j==0)tab[i][j]=tab[i-1][j+1];
			 	if(j==W-1)tab[i][j]=tab[i-1][j-1];
			 	if(j!=0 && j!=W-1)tab[i][j]=tab[i-1][j-1]+tab[i-1][j+1];
			 }		
		}
	}
	
	cout<<endl;
	char blank = 255;
	for(i=0;i<L;i++){
		for(j=0;j<W;j++){
			if(tab[i][j]==0)cout<<"\t"<<blank;
			else cout<<"\t"<<tab[i][j];
		}
		cout<<endl;
	}
	
	
	
	return 0;
}
