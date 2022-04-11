list = []

alphabet = "abcdefghijklmnopqrstuvwxyz"

with open("dict.txt", "r+") as file:
    for line in file:
        line = line.strip()

        if len(line) == 5:
            correct = True
            for char in line:
                if not char.lower() in alphabet:
                    correct = False

            if correct:
                list.append(line.lower())

print(list)
