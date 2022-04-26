from random import randint


class Lottery:
    def __init__(self, numbers_number=5, max_value=49):
        self.numbers_number = numbers_number
        self.max_value = max_value

    def draw_numbers(self):
        return [randint(1, self.max_value) for _ in range(self.numbers_number)]
