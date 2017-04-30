#include <cstdlib>
#include <cstdio>
#include <iostream>
#include <string>
#include <sstream>
#include <iomanip>
using namespace std;

int DateToNum(const string& s)
{
    if(s == "Mon") return 1;
    if(s == "Tue") return 2;
    if(s == "Wed") return 3;
    if(s == "Thu") return 4;
    if(s == "Fri") return 5;
    if(s == "Sat") return 6;
    if(s == "Sun") return 0;
}

inline int TimeAbs(const int& tm){return tm<0?tm+7*24*60*60:tm;}

int main()
{
    string id, date;
    freopen("id.txt", "r", stdin);
    cin>>id>>date;
    cin.clear();
    freopen((id+".csv").c_str(), "r", stdin);
    freopen((id+".DEG").c_str(), "w", stdout);
    cout<<"01/2002, "<<id<<"\nDEG MIN N/S DEG MIN E/W FEET TIME(MIN)\n";
    string s;
    int start_time = -1;
    int last_time = -1;
    cout<<fixed<<setprecision(2);
    while(cin>>s)
    {
        int num = DateToNum(s);
        cin>>s;
        stringstream ss;
        ss<<s;
        int hr, mn, sc, h = 0;
        char gar;
        ss>>hr>>gar>>mn>>gar>>sc>>s;
        int now_time = (((num*24)+hr)*60+mn)*60 +sc;
        cin>>s;
        if(s == "PM,") now_time += 12*60*60;
        float lat, lon;
        ss.clear();
        cin>>s; ss<<s; ss>>lat>>s;
        ss.clear();
        cin>>s; ss<<s; ss>>lon>>s;
        cin>>s>>s;
        for(int i = 0; i < s.length(); i++) if(s[i] >= '0' && s[i] <= '9') h = 10*h+(s[i]-'0');
        bool printout = 0;
        if(!h) continue;
        if(start_time == -1) start_time = now_time, printout = 1;
        else if(TimeAbs(now_time - last_time) >= 60) printout = 1;
        if(printout)
        {
            last_time = now_time;
            char ns = 'N', ew = 'E';
            if(lat < 0) lat = -lat, ns = 'S';
            if(lon < 0) lon = -lon, ew = 'W';
            cout<<((int)lat) <<", "<< 60*(lat - (int)lat) <<", "<<ns<<", "
                <<((int)lon) <<", "<< 60*(lon - (int)lon) <<", "<<ew<<", "
                <<h<<", "<<TimeAbs(now_time - start_time)/60<<"\n";
        }
    }
    int ind = 1;
    string file_name = id+".DEG";
    freopen("FILELIST.TXT", "r", stdin);
    string tmp;
    cin.clear();
    while(cin>>tmp) if(tmp < file_name) ind++;
    freopen((id+".txt").c_str(), "w", stdout);
    cout<<"2\n2\n"<<ind<<"\n0\n2\nN\n"<<date<<"\n0\n7";
    freopen((id+".log").c_str(), "w", stdout);
    system(("CARI-7.exe < "+id+".txt").c_str());
    fclose(stdin);
    fclose(stdout);
    return 0;
}
