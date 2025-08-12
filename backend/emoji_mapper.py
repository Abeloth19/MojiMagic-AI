from transformers import pipeline
import logging

class EmojiMapper:
    def __init__(self):
        try:
            self.emotion_analyzer = pipeline(
                "text-classification",
                model="cardiffnlp/twitter-roberta-base-emotion",
                return_all_scores=True
            )
        except Exception as e:
            logging.error(f"Failed to load model: {e}")
            self.emotion_analyzer = None
        
        self.emotion_emoji_map = {
            "joy": ["😊", "😄", "🎉", "🥳", "✨"],
            "sadness": ["😢", "😞", "💔", "🥺", "😔"],
            "anger": ["😠", "😡", "💢", "🔥", "😤"],
            "fear": ["😰", "😨", "😱", "🙈", "😬"],
            "surprise": ["😲", "😮", "🤯", "😯", "🎆"],
            "love": ["❤️", "💕", "😍", "🥰", "💖"],
            "optimism": ["😌", "🌟", "💪", "🌈", "⭐"],
            "pessimism": ["😑", "😒", "🙄", "😐", "😕"]
        }

    def text_to_emojis(self, text: str) -> dict:
        if not self.emotion_analyzer:
            return {
                "emojis": "🤖❓",
                "emotions": {"error": "Model not available"}
            }
        
        try:
            emotions = self.emotion_analyzer(text)[0]  # Get first (and only) result
            top_emotions = sorted(emotions, key=lambda x: x['score'], reverse=True)[:2]
            
            emoji_string = ""
            emotion_scores = {}
            
            for emotion_data in top_emotions:
                emotion = emotion_data['label'].lower()
                score = emotion_data['score']
                emotion_scores[emotion] = round(score, 3)
                
                if emotion in self.emotion_emoji_map:
                    emoji_count = 2 if score > 0.3 else 1
                    emojis = self.emotion_emoji_map[emotion][:emoji_count]
                    emoji_string += "".join(emojis)
            
            if not emoji_string:
                emoji_string = "🤔💭"
                
            return {
                "emojis": emoji_string,
                "emotions": emotion_scores
            }
            
        except Exception as e:
            return {
                "emojis": "❓🤖",
                "emotions": {"error": str(e)}
            }
