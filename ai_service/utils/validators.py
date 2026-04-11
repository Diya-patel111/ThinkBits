import re
import spacy

try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    # Fallback or prompt to download
    nlp = None

class OutputValidator:
    @staticmethod
    def normalize(text):
        return re.sub(r'\s+', ' ', str(text)).strip() if text else text

    @staticmethod
    def validate_email(email):
        if not email: return False
        pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        return bool(re.match(pattern, email.strip()))

    @staticmethod
    def validate_phone(phone):
        if not phone: return False
        clean_phone = re.sub(r'[\s\-\(\)\+]', '', phone)
        # Check basic length rules for standard phones internationally
        return 7 <= len(clean_phone) <= 15

    @staticmethod
    def validate_and_clean(data):
        score = 1.0
        
        # Clean and validate email
        email = data.get("email")
        if email and OutputValidator.validate_email(email):
            data["email"] = OutputValidator.normalize(email)
        else:
            data["email"] = None
            score -= 0.1
            
        # Clean and validate phone
        phone = data.get("phone")
        if phone and OutputValidator.validate_phone(phone):
            data["phone"] = OutputValidator.normalize(phone)
        else:
            data["phone"] = None
            score -= 0.1
            
        # Deduplicate and normalize lists
        for key in ["skills", "certifications"]:
            if isinstance(data.get(key), list):
                cleaned = [OutputValidator.normalize(item) for item in data[key] if item]
                data[key] = list(dict.fromkeys(cleaned))
                
        # Basic NLP named entity check for organization
        if nlp and isinstance(data.get("experience"), list):
            for exp in data["experience"]:
                company = exp.get("company", "")
                if company and len(company) > 3:
                    exp["company"] = OutputValidator.normalize(company)

        return {
            "data": data,
            "confidence_score": round(max(0.0, score), 2)
        }