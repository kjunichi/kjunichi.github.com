#include <fstream>
#include <iostream>

using namespace std;

	int
main (int argc, char **argv)
{
	string line;
	ifstream fin ("./input.txt");
	while (getline (fin, line))
	{
		cout << line << endl;
	}
	fin.close ();
	fin.open ("data/input.txt");
	while (getline (fin, line))
	{
		cout << line << endl;
	}
	fin.close ();

	return 0;
}
