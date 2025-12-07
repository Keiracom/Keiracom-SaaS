import streamlit as st
import datetime
from src.engines.legal import LegalVault

st.set_page_config(page_title="Legal Vault", page_icon="⚖️", layout="wide")

st.markdown("# ⚖️ Legal Vault")
st.write("Generate Compliant Legal Documents")

st.markdown("### Document Generator")

doc_type = st.selectbox(
    "Select Document Template",
    ["IP Assignment Deed", "Contractor Agreement", "Privacy Policy"]
)

# Dynamic Form based on generic needs
with st.form("legal_form"):
    col1, col2 = st.columns(2)
    with col1:
        user_name = st.text_input("Full Name (Assignor/Contractor)", "John Doe")
    with col2:
        trust_name = st.text_input("Company/Trust Name (Assignee/Client)", "My Company Pty Ltd")
    
    date_val = st.date_input("Effective Date", datetime.date.today())
    
    submitted = st.form_submit_button("Generate PDF")

if submitted:
    vault = LegalVault()
    
    # Map friendly names to template files
    template_map = {
        "IP Assignment Deed": "ip_deed.html",
        "Contractor Agreement": "contractor_agreement.html",
        "Privacy Policy": "privacy_policy.html"
    }
    
    template_file = template_map.get(doc_type)
    
    context = {
        "date": date_val.strftime("%d %B %Y"),
        "user_name": user_name,
        "trust_name": trust_name
    }
    
    with st.spinner("Generating Document..."):
        pdf_bytes = vault.generate_pdf(template_file, context)
    
    if pdf_bytes:
        st.success(f"Generated {doc_type} successfully!")
        st.download_button(
            label="Download PDF",
            data=pdf_bytes,
            file_name=f"{doc_type.replace(' ', '_')}_{date_val}.pdf",
            mime="application/pdf"
        )
    else:
        st.error("Failed to generate PDF. Is `wkhtmltopdf` installed?")
