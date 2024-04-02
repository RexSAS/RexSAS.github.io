#include <iostream>
using namespace std;

int main(){
	int i,  num[10], max, min;
	cout<<"inserisci i numeri";
	for(i=0;i<10;i++){
		cin>>num[i];
		if(i==0){
			max = num[i];
			min = num[i];
		}
		if(max<num[i])max = num[i];
		if(min>num[i])min = num[i];
	}
	cout<<"Numero massimo: "<<max<<endl<<"Numero minimo: "<<min;
	return 0;
}
