#include <stdio.h>
#include <stdlib.h>

typedef enum stack_check{
R_NOK,
R_OK

}stack_enum;


typedef struct stack_structs{
int stacpointer;
int data[];
}stack_stuct;


int stack_push(stack_stuct*object_to_stack,int pushVALUE){
   int ret;
    if ((object_to_stack==NULL)||(object_to_stack<0))
    {
        printf("THERE IS AN ERROT DUE TO NULL POINTER");
        ret=R_NOK;
    }
    else{
        object_to_stack->stacpointer++;
        object_to_stack->data[object_to_stack->stacpointer]=pushVALUE;
        ret=R_OK;    
        printf("succsses to push(%d)to sp(%d)",pushVALUE,object_to_stack->stacpointer);
    }
    return ret;
}

int stack_intialize(stack_stuct*object_to_stack){
   int ret;
    if (object_to_stack==NULL)
    {
        printf("THERE IS AN ERROT DUE TO NULL POINTER");
        ret=R_NOK;
    }
    else{
        object_to_stack->stacpointer=-1;
        ret=R_OK;    
        printf("succsses to initialize stack");
    }
    return ret;
}

int stack_pop(stack_stuct*object_to_stack){
   int ret,popVALUE;
    if ((object_to_stack==NULL)||(object_to_stack->stacpointer<0))
    {
        printf("THERE IS AN ERROT cannot pop ");
        ret=R_NOK;
    }
    else{
        popVALUE=object_to_stack->data[object_to_stack->stacpointer];
        object_to_stack->data[object_to_stack->stacpointer]=0;
        ret=R_OK;    
        printf("succsses to pop(%d)from sp(%d)",popVALUE,object_to_stack->stacpointer);
        object_to_stack->stacpointer--;    
    }
    return ret;
}