#include <iostream>
using namespace std;

int main(){
	int nums[10], i;
	for(i=0 ; i<10 ; i++){
		cout<<"Inserisci 10 valori nella posizione "<<i<<endl;
		cin>>nums[i];
	}
	cout<<endl<<"Lista iniziale:";
	for(i=0 ; i<10 ; i++){
		cout<<nums[i];
	}
	cout<<endl<<"Li1sta invertita:";

	for(i=9 ; i>=0 ; i--){
		cout<<" "<<nums[i];
	}
	return 0;
}
