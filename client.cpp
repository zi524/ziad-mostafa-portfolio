#include "client.h"

void client::set_day_numbers()
{
	int d=0;
	cout << "enter your stayed days number";
	cin >> d;
	day_numbers = d;
}

void client::set_money_paid()
{
	int p=0;
	cout << "enter your money paid number";
	cin >> p;
	money_paid = p;
}

void client::set_money_rest()
{
	int r=0;
	cout << "enter your money rest number";
	cin >> r;
	money_rest = r;
}

void client::display()
{
	cout << "WE WISH YOU ARE COMFORTABLE:)"<<endl;
	source::display();

	cout  << "your enjoyed days" << day_numbers << endl << "your money paid is " << money_paid << endl << "your rest money is " << money_rest << endl;
}
