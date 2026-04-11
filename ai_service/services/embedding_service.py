from sentence_transformers import SentenceTransformer, util
import os

# Set environment variable to avoid tokenizers parallelism warning
os.environ["TOKENIZERS_PARALLELISM"] = "false"

class EmbeddingService:
    def __init__(self, model_name="all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)
        self.predefined_sections = ["skills", "experience", "education", "projects", "certifications", "summary"]
        self.section_embeddings = self.model.encode(self.predefined_sections, convert_to_tensor=True)

    def detect_sections(self, text_blocks):
        sections = {key: [] for key in self.predefined_sections}
        current_section = "summary" # Initial assumption
        
        for block in text_blocks:
            text = block["text"]
            # Only run heavy embedding matching on layout-flagged headings
            if block.get("is_heading") and len(text.split()) < 10:
                header_emb = self.model.encode(text, convert_to_tensor=True)
                cos_scores = util.pytorch_cos_sim(header_emb, self.section_embeddings)[0]
                best_match_idx = cos_scores.argmax().item()
                best_score = cos_scores[best_match_idx].item()
                
                # Confidence Threshold -> Stops random text from becoming a heading
                if best_score > 0.55:
                    current_section = self.predefined_sections[best_match_idx]
            
            # Append text to identified bucket
            if current_section in sections:
                sections[current_section].append(text)
                
        # Clean down the dict
        return {k: "\n".join(v) for k, v in sections.items() if v}