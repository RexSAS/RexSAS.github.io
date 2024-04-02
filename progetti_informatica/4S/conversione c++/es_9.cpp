#include <iostream>
#include <cmath>
using namespace std;

int main(){
	int N=0;
	
	do{
		cout<<"Inserisci un numero positivo:";
		cin>>N;
	}while(N<0);
	
	float sqr = sqrt(N);
	
	if(pow(sqr,2) == N)cout<<N<<" e' un quadrato perfetto";
	else if(pow(sqr,2) != N)cout<<N<<" non e' un quadrato perfetto";
	
	
	
	return 0;
}
