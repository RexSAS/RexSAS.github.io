#include <iostream>
using namespace std;

bool isPal(int n){
	
	int par[n];
	for(int i=0; i<n; i++) cin>>par[i];
	bool isPal = false;
	int pal = 0;
	for(int i=0; i<n; i++){
		if(par[i] == par[n-i+1]) pal++;
	}
	
	if(pal == n)isPal++;
	
	return isPal;
}

int main(){
	int n;
	cin>>n;
	if(isPal(n))
		cout<<"si";
	else
		cout<<"no";
	
	return 0;
}
