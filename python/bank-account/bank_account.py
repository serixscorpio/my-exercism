"""Bank Account"""
import time
from threading import Lock


class BankAccount:
    """Bank Account."""

    def __init__(self):
        self.opened = False
        self.balance = 0
        self.lock = Lock()

    def get_balance(self) -> int:
        """Get account balance in minor currency."""
        if not self.opened:
            raise ValueError("account not open")
        return self.balance

    def open(self) -> None:
        """Open account."""
        if self.opened:
            raise ValueError("account already open")
        self.balance = 0
        self.opened = True

    def deposit(self, amount: int) -> None:
        """Deposit amount into account."""
        if not self.opened:
            raise ValueError("account not open")
        if amount <= 0:
            raise ValueError("amount must be greater than 0")
        with self.lock:
            local_balance = self.balance
            local_balance += amount
            time.sleep(0.001)
            self.balance = local_balance

    def withdraw(self, amount: int) -> None:
        """Withdraw amount from account."""
        if not self.opened:
            raise ValueError("account not open")
        if amount <= 0:
            raise ValueError("amount must be greater than 0")
        if self.balance < amount:
            raise ValueError("amount must be less than balance")
        with self.lock:
            local_balance = self.balance
            local_balance -= amount
            time.sleep(0.001)
            self.balance = local_balance

    def close(self) -> None:
        """Close account."""
        if not self.opened:
            raise ValueError("account not open")
        self.opened = False
