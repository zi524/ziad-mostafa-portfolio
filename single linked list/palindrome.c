#include<stdio.h>
#include<stdlib.h>
#include"math.h"
/*x=0;
n=0;
count=0;
remaind=0;
reversed=0;*/
static int x,n;
static int count,remaind=0,reversed=0;
struct single
{
    int data;
    struct single*ptr;
};


void insert_from_begin(struct single**ptr,int data){
    struct single* temp;
    temp=(struct single*)malloc(sizeof(struct single));
    if(NULL!=temp)
    {  
    if (*ptr!=NULL)
    {count++;
       temp->data=data;
        temp->ptr=*ptr;
        (*ptr)=temp;
    }
    else
    {
      temp->data=data;
        temp->ptr=NULL;
        (*ptr)=temp;   /* code */
    }}
    else printf("it is NULL\n");
    
} 

void checkPalindrome(struct single*ptr){
    struct single *temp=ptr;
    while(temp!=NULL){
    x=((double)pow(10,count)*(temp->data))+x;
    temp=temp->ptr;
    count--;    
    }
    n=x;
    while (n != 0) {
        remaind = n % 10;
        reversed = reversed * 10 + remaind;
        n /= 10;
    }

    // palindrome if orignal and reversed are equal
    if (x == reversed)
        {
        printf("%d is a palindrome.", x);
        x=0;
        n=0;
        count=0;
        remaind=0;
        reversed=0;
        }
    else{
        printf("%d is not a palindrome.", x);
        x=0;
        n=0;
        count=0;
        remaind=0;
        reversed=0;
}}

void display(struct single*ptr){
    struct single* temp=ptr;
    printf("DATA ->");
    while (temp!=NULL)
    {printf("%d ->",temp->data);
        temp=temp->ptr;
    }
    printf("NULL");
}


int main(){
    struct single* dum1;
    struct single* dum2;
    insert_from_begin(&dum1,1);
    display(dum1);
    printf("\n");
    insert_from_begin(&dum1,2);
    display(dum1);
    printf("\n");
    insert_from_begin(&dum1,3);
    display(dum1);
    printf("\n");
    insert_from_begin(&dum1,2);
    display(dum1);
    printf("\n");
    insert_from_begin(&dum1,1);
    display(dum1);
    printf("\n");
    checkPalindrome(dum1);
    printf("\n");
    insert_from_begin(&dum2,5);
    display(dum2);
    printf("\n");
    insert_from_begin(&dum2,4);
    display(dum2);
    printf("\n");
    insert_from_begin(&dum2,3);
    display(dum2);
    printf("\n");
    insert_from_begin(&dum2,2);
    display(dum2);
    printf("\n");
    insert_from_begin(&dum2,1);
    display(dum2);
    printf("\n");
    checkPalindrome(dum2);
    printf("\n");
    return 0;}