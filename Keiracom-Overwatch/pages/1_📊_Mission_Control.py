import streamlit as st
from src.engines.auditor import Auditor

st.set_page_config(page_title="Mission Control", page_icon="📊", layout="wide")

st.markdown("# 📊 Mission Control")
st.write("Financial Overview and Metrics")

try:
    auditor = Auditor()
    status = auditor.check_solvency()
    metrics = status['metrics']

    # KPI Row
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric("Bank Balance", f"${metrics['bank_balance']:,.2f}")
    
    with col2:
        st.metric("Tax Liability (Est)", f"${metrics['tax_liability']:,.2f}")
    
    with col3:
        st.metric("Safe to Spend", f"${metrics['safe_to_spend']:,.2f}")

    st.markdown("---")

    # Solvency Alert
    if status['is_solvent']:
        st.success(f"✅ STATUS: {status['alert']}")
        st.info("You are currently solvent. Dividends may be distributed.")
    else:
        st.error(f"🚨 STATUS: {status['alert']}")
        st.warning("STOP SPENDING. Do not distribute dividends.")

except Exception as e:
    st.error(f"Error loading Auditor: {e}")
