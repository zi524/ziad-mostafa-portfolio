#pragma once
#include "source.h"
class employment :
    public source
{private:
    float salary;
    float work_hours;
    float money_per_hour;
public:
    void set_salary();
    void set_work_hours();
    void set_money_per_hour();
    void display();
};

