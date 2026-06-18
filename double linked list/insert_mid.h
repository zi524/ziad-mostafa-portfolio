#include<stdio.h>
#include<stdlib.h>

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

void insert_in_mid(struct doublelinked**list_head,int data, int number){
    struct doublelinked *temp=NULL;
    struct doublelinked *new_list=NULL;
    new_list=(struct doublelinked *)malloc(sizeof(struct doublelinked ));
    temp=*list_head;
    if (temp!=NULL)
    {while (number!=0)
    {   
    if (number==1)
    {
        number--;
    }
    else{
        temp=temp->right;
        number--;
    }}
    new_list->right=temp->right;
    temp->right=new_list;
    new_list->left = temp ;
    new_list->data=data;
    }
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