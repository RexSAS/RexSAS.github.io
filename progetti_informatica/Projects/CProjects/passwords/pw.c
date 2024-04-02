#include<stdio.h>
#include<stdlib.h>

password(){
	int i,w,n,l,j;
	char a[51]={'a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','k','K','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','x','X','y','Y','z','Z'};
	srand(time(0));
	printf("10 password random:");
	for(j=0;j<10;j++){
		puts("");
		for(i=0;i<8;i++){
			w=rand()%2+1;
			if(w%2==0){
				n=rand()%9+1;
				printf("%d",n);
			}
			else{
				l=rand()%51+1;
				printf("%c",a[l]);
			}
		}
	}
	
}


int main(){
	password();
	return 0;
}
