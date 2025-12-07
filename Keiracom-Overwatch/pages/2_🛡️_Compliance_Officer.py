import streamlit as st
import sys
import io
from src.engines.feeder import Feeder

st.set_page_config(page_title="Compliance Officer", page_icon="🛡️", layout="wide")

st.markdown("# 🛡️ Compliance Officer")
st.write("Automated Reconciliation and Compliance Checks")

st.markdown("### 🔄 The Feeder (Paddle -> Xero)")
st.caption("Syncs yesterday's paid Paddle transactions to Xero as Authorised Invoices.")

if st.button("Run Feeder Manual Sync"):
    with st.spinner("Running Feeder Logic..."):
        # Capture stdout to display on UI
        old_stdout = sys.stdout
        new_stdout = io.StringIO()
        sys.stdout = new_stdout
        
        try:
            feeder = Feeder()
            feeder.run()
        except Exception as e:
            print(f"CRITICAL ERROR: {e}")
        
        sys.stdout = old_stdout
        output = new_stdout.getvalue()
        
    st.text_area("Execution Log", output, height=300)
    if "Feeder Run Complete" in output:
        st.success("Sync Job Completed.")
