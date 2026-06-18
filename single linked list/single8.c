#include"single8.h"
int main(){
    struct single* dum1;
    insert_from_begin(&dum1,55);
    display(dum1);
    insert_from_begin(&dum1,44);
    display(dum1);
    insert_from_begin(&dum1,33);
    display(dum1);
    insert_from_begin(&dum1,22);
    display(dum1);
    insert_from_begin(&dum1,11);
    return 0;
}