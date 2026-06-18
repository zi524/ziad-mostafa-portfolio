// hotel.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include "source.h"
#include "employment.h"
#include "client.h"
#include<string>
using namespace std;
int main()
{
    
    
    cout << "are you client enter (0) or employment(1) ? "<<endl;
    cout << "please enter your character" << endl;
    int n;
    cin >> n;
    if (n==1)
    {
        employment b;
        b.set_name();
        b.set_nationality();
        b.set_national_id();
        b.set_telephone_number();
        b.set_salary();
        b.set_work_hours();
        b.set_money_per_hour();
        b.display();  

    }
    else
    {   
  
        client b;
        b.set_name();
        b.set_nationality();
        b.set_national_id();
        b.set_telephone_number();
        b.set_day_numbers();
        b.set_money_paid();
        b.set_money_rest();
        b.display();
    }
}

