#include <iostream>
#include <ctime>
#include <cstdlib>
using namespace std;

int main(){
	int nums[10], i, add=0;
	srand(time(0));
	cout<<"Array base:";
	for(i=0;i<10;i++){
		nums[i]=rand()%100+1;
		cout<<" "<<nums[i];
		add+= nums[i];
		if(i==9)cout<<endl<<"La somma degli elementi vale: "<<add;
	}
	
	
	
	
	return 0;
}
