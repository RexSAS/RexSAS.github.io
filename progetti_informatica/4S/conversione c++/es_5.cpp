#include <iostream>
#include <ctime>
#include <cstdlib>
using namespace std;

#define N 10

int main(){
	int ar1[10],ar2[10],sum[10],i;
	srand(time(0));
	cout<<"Array 1:";
	for(i=0;i<10;i++){
		ar1[i]=rand()%100+1;
		cout<<ar1[i];
	}
	cout<<endl<<"Array 2:";
	for(i=0;i<10;i++){
		ar2[i]=rand()%100+1;
		cout<<ar2[i]<<" ";
	}
	cout<<endl<<"Array somma:";
	for(i=0;i<10;i++){
		sum[i]=ar1[i]+ar2[i];
		cout<<sum[i]<<" ";
	}
	
	return 0;
}
