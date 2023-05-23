mAh = int(input("Inserisci i mAh: "))
V = int(input("inserisci i V: "))
Wh = mAh * V / 1000
KWh = Wh / 1000
co2 = KWh * 0.4
with open('output.txt', 'w') as f:
    f.write(str(co2)+" Kg")