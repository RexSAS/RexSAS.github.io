#include <iostream>
using namespace std;

#define N 10

int main(){
	int nums[N], i, ricnum = 1, numsave = 0;
	
	cout<<"Definisci 10 numeri:";
	
	for(i=0;i<N;i++){
		cin>>nums[i];
	}
	
	for(i=0;i<N;i++){
		if(nums[i] == nums[i+1] && nums[i] != nums[i+2] && i<N-1){ 
			
			numsave++;
		}
	}
	
	int save[numsave], ric[numsave], iric = 0, isave = 0;

	for(i=0;i<N;i++){
	 	if(nums[i] == nums[i+1] && nums[i] != nums[i+2] && i<N-1){
			save[isave] = nums[i];
	 		isave++;
	 	}
	}	
	
	for(i=0;i<N;i++){
		if(nums[i] == nums[i+1] && i<N-1){
			ricnum++;
		}
		if(nums[i] == nums[i+1] && nums[i] != nums[i+2] && i<N-1){
			ric[iric]= ricnum;
			iric++;
			ricnum = 1;
		}
	}
	
	
	
	
	
	for(i=0;i<numsave;i++){
		cout<<endl<<"Il numero "<<save[i]<<" e' apparso "<<ric[i]<<" volte nella "<<i+1<<" ricorrenza";

	}
	
	return 0;
}
