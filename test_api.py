import requests
import sys

BASE_URL = "http://localhost:8000/api/v1/engine-data"

def test_endpoints():
    """
    Tests the /gaps and /opportunities endpoints of the API.
    """
    print("--- Running API Integration Tests ---")

    # Test A: Gaps Endpoint
    print("\nTesting /gaps endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/gaps?project_id=1")
        if response.status_code == 200:
            gaps = response.json()
            print(f"✅ GAPS: Found {len(gaps)} records.")
            if len(gaps) > 0:
                first_gap = gaps[0]
                print(f"  First Gap - Keyword: '{first_gap.get('missing_keyword')}', Strength: {first_gap.get('gap_strength')}")
        else:
            print(f"❌ GAPS Error: Status Code {response.status_code}, Response: {response.text}")
    except requests.exceptions.ConnectionError:
        print("❌ Is the API Server running? (uvicorn main:app --reload)")
        sys.exit(1)
    except Exception as e:
        print(f"❌ GAPS Unexpected Error: {e}")

    # Test B: Opportunities Endpoint
    print("\nTesting /opportunities endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/opportunities?project_id=1")
        if response.status_code == 200:
            opportunities = response.json()
            print(f"✅ OPPS: Found {len(opportunities)} records.")
            if len(opportunities) > 0:
                first_opp = opportunities[0]
                print(f"  First Opportunity - Keyword: '{first_opp.get('keyword')}', YES Score: {first_opp.get('yes_score')}")
        else:
            print(f"❌ OPPS Error: Status Code {response.status_code}, Response: {response.text}")
    except requests.exceptions.ConnectionError:
        print("❌ Is the API Server running? (uvicorn main:app --reload)")
        sys.exit(1)
    except Exception as e:
        print(f"❌ OPPS Unexpected Error: {e}")

    print("\n--- API Integration Tests Complete ---")

if __name__ == "__main__":
    test_endpoints()
