#include "employment.h"

void employment::set_salary()
{
	float s=0;
	cout << "enter your salary " << endl;
	cin >> s;
	 salary=s;
}

void employment::set_work_hours()
{
	float w=0;
	cout << "enter your total work hour per month " << endl;
	cin >> w;
	 work_hours=w;
}

void employment::set_money_per_hour()
{
	float m=0;
	m = salary/work_hours;
	money_per_hour = m;
}

void employment::display()
{
	cout << "HEY OUR MAN :)" << endl;
	source::display();
	cout  << "your salary is " << salary << endl << "your work hours is " << work_hours << endl << "your taken money per one hour  is " << money_per_hour << endl;
}
