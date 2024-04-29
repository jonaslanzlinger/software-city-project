import numpy as np

mean = 425
std_dev = 162.5

numbers = np.random.normal(mean, std_dev, 956)

numbers_clipped = np.clip(numbers, 100, 750)

with open("random_numbers.txt", "w") as file:
    for number in numbers_clipped:
        file.write(f"{number:.2f}\n")

print("956 random numbers have been written to 'random_numbers.txt'")
