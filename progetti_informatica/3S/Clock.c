#include <stdio.h>
#include <time.h>
#include <windows.h>
int main(){

	int SS=0,MM=0,HH=0;
	while(1){
		system("cls");
		sleep(1);
		SS++;
		if(SS=60){
			MM++;
			SS=0;
		}
		if(MM=60){
			HH++;
			MM=0;
		}
		printf("%d:%d:%d",SS,MM,HH);

	}
	return 0;
}
