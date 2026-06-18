#include<stdio.h>
#include<stdlib.h>
static int count=0;
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

void checkintersection(struct single*ptr1,struct single*ptr2){
    struct single *temp1=ptr1;
    struct single *temp2=ptr2;
    while(temp1!=NULL&&temp2!=NULL){
    for(int i=0;i<count;i++){
        temp2=ptr2;
        for(int j=0;j<count;j++){
            if(temp1->data==temp2->data)
            {
                printf("Intersection found at %d\n",temp1->data);
                break;
            }
            else if(temp2->ptr==NULL)
            {
                break;
            }
            else
            {
                temp2=temp2->ptr;
            }
        }
        temp1=temp1->ptr;
    }
    }
    }

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
    checkintersection(dum1,dum2);
    printf("\n");
    return 0;}