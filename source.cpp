#include "source.h"


void source::set_name()
{
    string n;
    cout << "enter your name" << endl;
    cin >> n;
    name = n;
}

void source::set_nationality()
{
    string na;
    cout << "enter your nationality" << endl;
    cin>>na;
    nationality = na;
}

void source::set_national_id()
{
    long long f=0;
    cout << "enter your national_id" << endl;
    cin >> f;
    national_id = f;
}

void source::set_telephone_number()
{
    long long t=0;
    cout << "enter your telephone" << endl;
    cin >> t;
    telephone_number = t;
}

void source::display()
{

    cout << "your name is" << name << endl << "your nationality is" << nationality << endl << "your telephone is" << telephone_number << endl << "your national_id is" << national_id << endl;
}
