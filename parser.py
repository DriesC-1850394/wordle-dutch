list = []

special_chars = ["'", "-"]

with open("dict.txt", "r+") as file:
    for line in file:
        line = line.strip()

        if len(line) == 5:
            correct = True
            for char in line:
                if char in special_chars:
                    correct = False
                    break

            if correct:
                list.append(line.lower())

print(list)
