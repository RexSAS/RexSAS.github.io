mAh = int(input("Inserisci i mAh: "))
V = int(input("inserisci i V: "))
Wh = mAh * V / 1000
KWh = Wh / 1000
co2 = KWh * 0.4
with open('output.txt', 'w') as f:
    f.write("Your phone stats:"+"\nmAh: "+str(mAh)+"\nV: "+str(V)+"\nCO2 producted: "+str(co2)+"\n\n\n\nCoded by Andrea Faveri 4S 2022-2023 Liceo L. Ariosto Ferrara")
