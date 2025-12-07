import os
from paddle_python_sdk import Paddle, Environment

# Initialize Paddle Client
# Note: User provided a LIVE key. If testing, we should technically use SANDBOX.
# Assuming LIVE environment based on "pdl_live_" prefix.
PADDLE_API_KEY = os.getenv("PADDLE_API_KEY")

# Determine environment based on key prefix
if PADDLE_API_KEY and PADDLE_API_KEY.startswith("pdl_live_"):
    environment = Environment.PRODUCTION
else:
    environment = Environment.SANDBOX

paddle_client = Paddle(PADDLE_API_KEY, environment=environment)

def get_subscription_status(subscription_id: str):
    """
    Fetches the status of a subscription from Paddle.
    """
    try:
        subscription = paddle_client.subscriptions.get(subscription_id)
        return subscription.status
    except Exception as e:
        print(f"Error fetching subscription {subscription_id}: {e}")
        return None

def generate_checkout_link(user_email: str, price_id: str):
    """
    Generates a checkout link/transaction for a specific user and price.
    Note: For Paddle Billing, we typically initialize checkout on frontend.
    This helper is for server-side initialization if needed.
    """
    # This is a placeholder for server-side transaction creation if we need strict control.
    # Typically we use paddle.js on frontend with the price_id.
    pass
