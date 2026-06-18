#include<stdio.h>
#include<stdlib.h>
enum queue_choose{
R_NOK=0,
R_OK,
R_FULL,
R_EMPTY
};

struct queue
{
    void**qPTP;
    int max_size;
    int elementCount;
    int front ;
    int last;
};

struct queue *createQueue(int maximumSize ){
    struct queue*start ;
start=( struct queue*)malloc(sizeof(struct queue ));
if(NULL== start){
printf("ERROR NULL POINTER\n");
}
else{start->qPTP=(void**)calloc(maximumSize,sizeof(void*));   
start->front=-1;
start->last=-1;
start->elementCount=0;
start->max_size=maximumSize;
}
return start;
}
 
void Enqueue(struct queue* Enqueue,void* value){

if (Enqueue==NULL)
{
    printf("ERROR NULL POINTER\n");
}
else{
    if (Enqueue->elementCount==Enqueue->max_size)
    {
        printf("it is full\n");
       
    }
    else if(Enqueue->front==Enqueue->max_size)
    {
        Enqueue->front=0;
        if (Enqueue->front==-1)
        {
        Enqueue->front=0;
        }
        (Enqueue->elementCount)++;
        printf("it is ENQUEUED COMPLETELY (%d) \n",*(int*)value);
    }
    else if(Enqueue->last==Enqueue->max_size)
    {
        Enqueue->last=0;
        (Enqueue->last)++;
        Enqueue->qPTP[Enqueue->last]=value;
        if (Enqueue->front==-1)
        {
        Enqueue->front=0;
        }
        (Enqueue->elementCount)++;
        printf("it is ENQUEUED COMPLETELY (%d) \n",*(int*)value);
    }
    else{
        if (Enqueue->front==-1)
        {
        Enqueue->front=0;
        }
        (Enqueue->last)++;
        Enqueue->qPTP[Enqueue->last]=value;
        printf("it is ENQUEUED COMPLETELY (%d) \n",*(int*)value);
        (Enqueue->elementCount)++;
    }
}
} 
void Dequeue (struct queue* Dequeue)
{
    if (Dequeue==NULL)
    {
       printf("ERROR NULL POINTER\n");
    }
    else{
    if (Dequeue->elementCount==0)
    {
        printf("it is empty\n");
    }
    else if(Dequeue->elementCount==1)
    {
        printf("it is DEQUEUED COMPLETELY (%d) \n",*(int*)(Dequeue->qPTP[Dequeue->front]));
        Dequeue->front=-1;
        Dequeue->last=-1;
        Dequeue->elementCount=0;
    }
    else if(Dequeue->front==Dequeue->max_size)
    {
        Dequeue->front=0;
        printf("it is DEQUEUED COMPLETELY (%d) \n",*(int*)(Dequeue->qPTP[Dequeue->front]));
        (Dequeue->front)++;  
    }
    else{
        printf("it is DEQUEUED COMPLETELY (%d) \n",*(int*)(Dequeue->qPTP[Dequeue->front]));  
        (Dequeue->front)++;  
        (Dequeue->elementCount)--;
    }}}