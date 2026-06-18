#include<stdio.h>
#include"queue.h"
   
int NUM1= 11,NUM2=22,NUM3=33,NUM4=44,NUM5=55;

int main(){
int num;
printf("Enter maximum size of QUEUE");
scanf("%d",&num);
struct queue *queue1;
queue1=createQueue(num);
printf(" \nQUEUE storage=%d\n",queue1);
Enqueue(queue1,&NUM1);
Enqueue(queue1,&NUM2);
Enqueue(queue1,&NUM3);
Enqueue(queue1,&NUM4);
Enqueue(queue1,&NUM5);
Dequeue(queue1);
Dequeue(queue1);
Dequeue(queue1);
Dequeue(queue1);
Dequeue(queue1);
Enqueue(queue1,&NUM3);
Dequeue(queue1);
Dequeue(queue1);
Enqueue(queue1,&NUM1);
Dequeue(queue1);

    return 0;
}