#include <stdio.h>

int main() {
    char str[31];
    
    puts("definisci una stringa");
    scanf("%30s",str);
    
    int i=0,voc=0,cons=0;
    while(str[i]!='\0'){
        if(str[i]=='a' || str[i]=='A' || str[i]=='e' || str[i]=='E' || str[i]=='i' || str[i]=='I' || str[i]=='o' || str[i]=='O' || str[i]=='u' || str[i]=='U'){
            voc++;
        }
        else{
            cons++;
        }

        i++;
    }
     
    printf("la stringa e'lunga %d e possiede %d vocali e %d consonanti",i,voc,cons);

    return 0;
}