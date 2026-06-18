#include<stdio.h>
#include<stdlib.h>

static int count;
struct single
{
    char* data;
    struct single*ptr;
};


void insert_from_begin(struct single**ptr,char* data){
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

void search (struct single*ptr,char* v){
    
    count=0;
    struct single *temp=ptr;
   while(temp!=NULL){
    count++;
    if(v==(temp->data)){
        printf("its found at node number %d",count);
        break;
    }
    else{
     temp=temp->ptr;
    }
    }
    if(temp==NULL){printf("its not found"); }
   }


void display(struct single*ptr){
    struct single* temp=ptr;
    printf("DATA ->");
    while (temp!=NULL)
    {printf("%s ->",temp->data);
        temp=temp->ptr;
    }
    printf("NULL");
}


int main(){
    struct single* dum1;
    insert_from_begin(&dum1,"55");
    display(dum1);
    printf("\n");
    insert_from_begin(&dum1,"44");
    display(dum1);
    printf("\n");
    insert_from_begin(&dum1,"33");
    display(dum1);
    printf("\n");
    insert_from_begin(&dum1,"22");
    display(dum1);
    printf("\n");
    insert_from_begin(&dum1,"11");
    display(dum1);
    printf("\n");
    search(dum1,"55");
    printf("\n");
    search(dum1,"11");
    printf("\n");
    search(dum1,"33");
    printf("\n");
    search(dum1,"77");
    return 0;}