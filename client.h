#pragma once
#include "source.h"
#include<iostream>
#include<string>
using namespace std;
class client :
    public source
{
private:int day_numbers;
       int money_paid;
       int money_rest;
public:
    void set_day_numbers();
    void set_money_paid();
    void set_money_rest();
    void display();
};

