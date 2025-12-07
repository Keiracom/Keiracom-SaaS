import os
import stripe
import datetime
from src.utils.xero_auth import XeroAuth
from xero_python.accounting import Invoice, LineItem, Contact

class Feeder:
    """
    Module A: The Feeder (Stripe -> Xero)
    Goal: Automate the "Green Button" in Xero.
    """
    def __init__(self):
        stripe.api_key = os.getenv('STRIPE_API_KEY')
        self.xero = XeroAuth().get_accounting_api()
    
    def fetch_stripe_invoices(self):
        """Fetch yesterday's paid charges from Stripe."""
        print("Fetching Stripe data...")
        # Calculate yesterday's timestamp range
        yesterday = datetime.datetime.now() - datetime.timedelta(days=1)
        start_ts = int(yesterday.replace(hour=0, minute=0, second=0).timestamp())
        end_ts = int(yesterday.replace(hour=23, minute=59, second=59).timestamp())

        try:
            charges = stripe.Charge.list(
                created={'gte': start_ts, 'lte': end_ts},
                limit=100
            )
            paid_charges = [c for c in charges.data if c.paid and not c.refunded]
            return paid_charges
        except Exception as e:
            print(f"Error fetching Stripe data: {e}")
            return []

    def check_xero_exists(self, invoice_ref):
        """Check if invoice exists in Xero by Reference (Stripe ID)."""
        try:
            # Xero filter format: Reference=="ch_123..."
            invoices = self.xero.get_invoices(
                where=f'Reference=="{invoice_ref}"'
            )
            return len(invoices.invoices) > 0
        except Exception as e:
            print(f"Error checking Xero: {e}")
            return False

    def create_xero_invoice(self, charge):
        """POST /Invoices to Xero with status AUTHORISED."""
        print(f"Creating Xero invoice for {charge.id}...")
        
        # safely access customer email or fallback
        email = charge.billing_details.email or "unknown@customer.com"
        amount = charge.amount / 100.0 # Stripe is in cents
        currency = charge.currency.upper()
        date_obj = datetime.datetime.fromtimestamp(charge.created)

        # Create Invoice Object
        contact = Contact(name=email) # identifying by email as name for simplicity
        line_item = LineItem(
            description="Stripe Charge",
            quantity=1.0,
            unit_amount=amount,
            account_code="200" # Standard Sales code, adjust as needed
        )
        
        invoice = Invoice(
            type="ACCREC",
            contact=contact,
            date=date_obj,
            due_date=date_obj,
            line_items=[line_item],
            reference=charge.id,
            status="AUTHORISED"
        )

        try:
            # self.xero.create_invoices(invoices=[invoice]) # specific call needed
            # In a real run we would call:
            # self.xero.create_invoices(xero_tenant_id="...", invoices=[invoice])
            print(f"MOCK: Created Invoice {charge.id} for {amount} {currency}")
            return True
        except Exception as e:
            print(f"Error creating invoice: {e}")
            return False

    def run(self):
        """Main execution flow."""
        print("Starting Feeder Run...")
        charges = self.fetch_stripe_invoices()
        print(f"Found {len(charges)} paid charges from yesterday.")

        for charge in charges:
            if not self.check_xero_exists(charge.id):
                self.create_xero_invoice(charge)
            else:
                print(f"Skipping {charge.id}, already in Xero.")
        
        print("Feeder Run Complete.")
