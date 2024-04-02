#include <stdio.h>
#define N 10

int main(){
	
	int nums[N], i, ricnum = 1, numsave = 0;
	
	puts("Definisci 10 numeri:");
	
	for(i=0;i<N;i++){
		scanf("%d",&nums[i]);
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
		printf("\nIl numero %d e' apparso %d volte nella %d ricorrenza", save[i], ric[i], i+1);

	}
	
	return 0;
}
