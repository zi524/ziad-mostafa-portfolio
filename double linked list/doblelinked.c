#include"doblelinked.h"
struct doublelinked *dum1=NULL;
int main(){
    insert_from_start(&dum1,33);
    insert_from_start(&dum1,22);
    insert_from_start(&dum1,11);
    insert_from_end(dum1,44);
    insert_from_end(dum1,55);
    insert_from_end(dum1,66);
    insert_from_end(dum1,77);
    display_forword(dum1);
    Greater(dum1);
    insert_from_end(dum1,132);
     display_forword(dum1);
    Greater(dum1);
     return 0;
}