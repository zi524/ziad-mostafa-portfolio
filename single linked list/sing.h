#include<stdio.h>
#include<stdlib.h>


struct single
{
    int data;
    struct single*ptr;
};


void insert_from_begin(struct single**ptr,int data){
    struct single* temp;
    temp=(struct single*)calloc(1,sizeof(struct single));
    if(NULL!=temp)
    {  
    if (*ptr!=NULL)
    {
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

void display(struct single*ptr){
    struct single* temp=ptr;
    printf("DATA ->");
    if(temp!=NULL){
    while (temp!=NULL)
    {printf("%d ->",temp->data);
        temp=temp->ptr;
    }}
    else
    printf("NULL");
}