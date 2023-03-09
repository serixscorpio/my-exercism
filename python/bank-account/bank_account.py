"""Bank Account"""


class BankAccount:
    """Bank Account."""

    def __init__(self):
        self.opened = None
        self.balance = 0

    def get_balance(self) -> int:
        """Get account balance in minor currency."""
        if not self.opened:
            raise ValueError("account not open")
        return self.balance

    def open(self):
        """Open account."""
        if self.opened:
            raise ValueError("account already open")
        self.balance = 0
        self.opened = True

    def deposit(self, amount: int):
        """Deposit amount into account."""
        if not self.opened:
            raise ValueError("account not open")
        if amount <= 0:
            raise ValueError("amount must be greater than 0")
        self.balance += amount

    def withdraw(self, amount):
        """Withdraw amount from account."""
        if not self.opened:
            raise ValueError("account not open")
        if amount <= 0:
            raise ValueError("amount must be greater than 0")
        if self.balance < amount:
            raise ValueError("amount must be less than balance")

        self.balance -= amount

    def close(self):
        """Close account."""
        if not self.opened:
            raise ValueError("account not open")
        self.opened = False
