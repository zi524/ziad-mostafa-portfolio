#pragma once

#include<iostream>
#include<string>
using namespace std;
class source
{
private:
	 string name;
	 string nationality;
	 long long national_id;
	 long long telephone_number;
	
public:
	void set_name();
	void set_nationality();
	void set_national_id();
	void set_telephone_number();
	void display();
};



