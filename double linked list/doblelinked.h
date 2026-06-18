#include<stdio.h>
#include<stdlib.h>
 int x;
struct doublelinked
{
    int data;
    struct doublelinked *left;
    struct doublelinked*right;
};

void insert_from_start(struct doublelinked**list_head,int data){
struct doublelinked*temp=NULL;
temp=(struct doublelinked*)malloc(sizeof(struct doublelinked ));
if(temp!=NULL)
{temp->data=data;
if (*list_head==NULL)
{
    temp->right=NULL;
    temp->left=NULL;
    *list_head=temp;
}
else{
    temp->right=*list_head;
    temp->left=NULL; 
    (*list_head)->left=temp;  
    *list_head=temp;
}}
else{
    printf("it is NULL");
}}

void insert_from_end(struct doublelinked*list_head,int data){
    struct doublelinked *check_last=NULL;
    check_last=list_head;
    while(check_last->right!=NULL){
        check_last=check_last->right;
    }
    struct doublelinked*temp=(struct doublelinked*)malloc(sizeof(struct doublelinked));
    temp->left=check_last->right;
    temp->right=NULL;
    temp->data=data;
    check_last->right=temp;
}

void Greater(struct doublelinked*list_head){
    struct doublelinked *temp=NULL;
    temp=list_head;
    while (temp!=NULL)
    {
        if (temp->data>x)
        {
          x= temp->data;
        }
        
        temp=temp->right;
        /* code */
    }
    printf("\nGREATEST DATA=%d\n",x);

    
}


void display_forword(struct doublelinked*list){
    printf("DATA ");
    do
    {printf("-> ");
    printf("%d",list->data);
     list=list->right;   
    }while (list!=NULL);
    printf("-> NULL");

}