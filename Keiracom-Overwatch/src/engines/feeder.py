import os
import requests
import datetime
from src.utils.xero_auth import XeroAuth
from xero_python.accounting import Invoice, LineItem, Contact

class Feeder:
    """
    Module A: The Feeder (Paddle -> Xero)
    Goal: Automate the "Green Button" in Xero.
    """
    def __init__(self):
        self.paddle_api_key = os.getenv('PADDLE_API_KEY')
        self.paddle_api_url = "https://api.paddle.com/transactions" # Paddle Billing API
        self.xero = XeroAuth().get_accounting_api()
    
    def fetch_paddle_transactions(self):
        """Fetch yesterday's paid transactions from Paddle."""
        print("Fetching Paddle data...")
        
        # Calculate yesterday's timestamp range for logs/logic, though Paddle API uses ISO strings usually
        yesterday = datetime.datetime.now() - datetime.timedelta(days=1)
        # Paddle filter format example: created_at >= 2023-01-01T00:00:00Z
        # Simplification: just fetch recent 50 and filter in python if needed, or use 'created_at' param
        
        headers = {
            "Authorization": f"Bearer {self.paddle_api_key}",
            "Content-Type": "application/json"
        }
        
        try:
            # Query for completed (paid) transactions
            params = {
                "status": "completed",
                "per_page": 50
            }
            response = requests.get(self.paddle_api_url, headers=headers, params=params)
            
            if response.status_code == 200:
                data = response.json().get('data', [])
                # Filter for yesterday if strictly needed, or just process 'completed' ones
                # For this MVP, we process the returned list
                return data
            else:
                print(f"Paddle API Error: {response.status_code} - {response.text}")
                return []
        except Exception as e:
            print(f"Error fetching Paddle data: {e}")
            return []

    def check_xero_exists(self, invoice_ref):
        """Check if invoice exists in Xero by Reference (Paddle ID)."""
        try:
            # Xero filter format: Reference=="txn_123..."
            invoices = self.xero.get_invoices(
                where=f'Reference=="{invoice_ref}"'
            )
            return len(invoices.invoices) > 0
        except Exception as e:
            print(f"Error checking Xero: {e}")
            return False

    def create_xero_invoice(self, txn):
        """POST /Invoices to Xero with status AUTHORISED."""
        txn_id = txn.get('id')
        print(f"Creating Xero invoice for {txn_id}...")
        
        # safely access customer info
        # Paddle structure varies, assuming 'customer_id' or embedded 'details'
        # For billing API: txn['details']['line_items'] etc.
        # Fallback to a generic approach
        
        currency = txn.get('currency_code', 'USD')
        # Amount is usually in string implementation or cents. Paddle Billing uses 'details.totals.grand_total'
        try:
            amount_str = txn.get('details', {}).get('totals', {}).get('grand_total', '0')
            amount = float(amount_str) / 100.0 if amount_str.isdigit() else float(amount_str) # Check units based on currency
        except:
            amount = 0.0

        customer_email = "unknown@paddle-customer.com" 
        # In real Paddle Billing, you might need to fetch customer details separately if not expanded.

        date_str = txn.get('created_at', datetime.datetime.now().isoformat())
        date_obj = datetime.datetime.fromisoformat(date_str.replace('Z', '+00:00'))

        # Create Invoice Object
        contact = Contact(name="Paddle Customer") # Grouping or fetch email
        line_item = LineItem(
            description="Paddle Transaction",
            quantity=1.0,
            unit_amount=amount,
            account_code="200"
        )
        
        invoice = Invoice(
            type="ACCREC",
            contact=contact,
            date=date_obj,
            due_date=date_obj,
            line_items=[line_item],
            reference=txn_id,
            status="AUTHORISED"
        )

        try:
            # self.xero.create_invoices(invoices=[invoice])
            print(f"MOCK: Created Invoice {txn_id} for {amount} {currency}")
            return True
        except Exception as e:
            print(f"Error creating invoice: {e}")
            return False

    def run(self):
        """Main execution flow."""
        print("Starting Feeder Run (Paddle)...")
        txns = self.fetch_paddle_transactions()
        print(f"Found {len(txns)} paid transactions.")

        for txn in txns:
            txn_id = txn.get('id')
            if not self.check_xero_exists(txn_id):
                self.create_xero_invoice(txn)
            else:
                print(f"Skipping {txn_id}, already in Xero.")
        
        print("Feeder Run Complete.")
