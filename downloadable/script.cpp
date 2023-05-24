#include <iostream>
#include <fstream>
using namespace std;

class Phone{
    private:
        float mAh, V;
    public:
        float mAh_value(){
            return mAh;
        }
        float V_value(){
            return V;
        }
        void set_mAh(){
            cout << "Inserisci i mAh: ";
            cin >> mAh;
        }
        void set_V(){
            cout << "Inserisci i V: ";
            cin >> V;
        }
};

int main() {
    Phone phone;
    
    phone.set_mAh();
    phone.set_V();
    
    float Wh = phone.mAh_value() * phone.V_value() / 1000.0;
    float KWh = Wh / 1000.0;
    float co2 = KWh * 0.4;

    ofstream outputFile("output.txt");
    if (outputFile.is_open()) {
        outputFile << "Your phone stats:" << "\nmAh: " << phone.mAh_value() << "\nV: " << phone.V_value() << "\nCO2 producted: "<<co2<<" Kg"<<" \n\n\nCoded by Andrea Faveri 4S 2022-2023 Liceo L. Ariosto Ferrara";
        outputFile.close();
        cout << "Dati scritti su output.txt." << endl;
    } else {
        cout << "Impossibile aprire il file di output." << endl;
    }

    return 0;
}
