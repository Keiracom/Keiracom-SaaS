import os
import json
import sqlite3
from src.utils.xero_auth import XeroAuth
from config import rules

class Auditor:
    """
    Module B: The Auditor (Solvency & Oversight)
    Goal: Prevent you from stealing tax money.
    """
    def __init__(self):
        self.xero = XeroAuth().get_accounting_api()
        self.tax_rate = rules.TAX_RATE
        self.fixed_opex = self._load_fixed_opex()

    def _load_fixed_opex(self):
        """Sum monthly recurring expenses from config."""
        try:
            with open('config/recurring.json', 'r') as f:
                expenses = json.load(f)
                return sum(item['amount'] for item in expenses)
        except Exception:
            return 0.0

    def get_bank_balance(self):
        """
        Fetch Bank_Balance (via Xero API).
        For now, we mock this or look for a specific account.
        """
        try:
            # In a real app, you'd filter by Type='BANK'
            # accounts = self.xero.get_accounts(where='Type=="BANK"')
            # return accounts[0].balance
            
            # MOCK implementation for localhost
            return 25000.00 
        except Exception as e:
            print(f"Error fetching bank balance: {e}")
            return 0.0

    def get_tax_liability(self):
        """
        Fetch Current_Tax_Liability (GST on Sales - GST on Expenses).
        Simplified estimation.
        """
        # MOCK: In reality, query Xero Reports for GST
        total_sales_gst = 2500.00 # $25k sales
        total_expense_gst = 450.00 # $4.5k expenses
        return total_sales_gst - total_expense_gst

    def calculate_safe_to_spend(self):
        """Calculate Safe_To_Spend."""
        balance = self.get_bank_balance()
        tax_liability = self.get_tax_liability()
        
        safe_spend = balance - tax_liability - self.fixed_opex
        return {
            "bank_balance": balance,
            "tax_liability": tax_liability,
            "fixed_opex": self.fixed_opex,
            "safe_to_spend": safe_spend
        }

    def check_solvency(self):
        """The Rule: If Safe_To_Spend < 0, Dashboard turns RED."""
        metrics = self.calculate_safe_to_spend()
        is_solvent = metrics['safe_to_spend'] > 0
        return {
            "is_solvent": is_solvent,
            "metrics": metrics,
            "alert": "SOLVENT" if is_solvent else "INSOLVENT"
        }
