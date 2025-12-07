import os
import pdfkit
import jinja2
from datetime import datetime

class LegalVault:
    """
    Module C: The Legal Vault (Asset Protection)
    Goal: Generate "Wet Ink" ready documents.
    """
    def __init__(self):
        # Setup Jinja2 Environment
        template_dir = os.path.join(os.getcwd(), 'templates')
        self.env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(template_dir),
            autoescape=jinja2.select_autoescape(['html', 'xml'])
        )

    def render_template(self, template_name, context):
        """App reads templates/ip_deed.html and injects data."""
        try:
            template = self.env.get_template(template_name)
            return template.render(context)
        except Exception as e:
            print(f"Error rendering template {template_name}: {e}")
            return ""

    def generate_pdf(self, template_name, context):
        """Renders PDF to bytes for instant printing."""
        html_content = self.render_template(template_name, context)
        if not html_content:
            return None

        # pdfkit configuration - assuming wkhtmltopdf is in PATH
        # If not, user needs to install it: https://wkhtmltopdf.org/downloads.html
        try:
            pdf_bytes = pdfkit.from_string(html_content, False)
            return pdf_bytes
        except OSError as e:
            print(f"Error generating PDF: {e}")
            print("Ensure wkhtmltopdf is installed and in your PATH.")
            return None
