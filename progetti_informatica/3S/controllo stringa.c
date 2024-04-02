#include <stdio.h>
int main(){
	int i=0,j=0,lang=0;
	char str[31],str2[31];
	
	puts("definisci una stringa");
	scanf("%30s",str);

	puts("definisci la seconda stringa");
	scanf("%30s",str2);
		
	while(str[i]!='\0'){
		i++;
	}

		
	while(str2[j]!='\0'){
		j++;
	}
 
 if(i=j){
  lang=j;
  i=0;
  while(i!=lang){
   if(str[i]==str2[i]){
    i++;
   }
   else{
    puts("le due stringhe sono diverse");
    return 0;
   }
  }
  i=0;
  puts("la frase con gli spazi diventa:");
  while(i!=lang){
  if(str[i]=='_'){
   str[i]=' ';
  }
  printf("%c",str[i]);
  i++;
  }
 }
 else{
 puts("le due stringhe sono diverse");
 }
	
	
	
	
	return 0;
}
