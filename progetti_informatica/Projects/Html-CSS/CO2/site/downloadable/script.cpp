#include <iostream>
#include <fstream>
using namespace std;

int main() {
    int mAh, V;
    cout << "Inserisci i mAh: ";
    cin >> mAh;
    cout << "Inserisci i V: ";
    cin >> V;

    double Wh = mAh * V / 1000;
    double KWh = Wh / 1000;
    double co2 = KWh * 0.4;

    ofstream f("output.txt");
    if (f.is_open()) {
        f << co2 << " Kg";
        f.close();
        cout << "Dati scritti correttamente su output.txt." << endl;
    } else {
        cout << "Impossibile aprire il file di output." << endl;
    }

    return 0;
}
