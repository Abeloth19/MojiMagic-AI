from transformers import pipeline
import logging
import re

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
        
       
        self.content_emoji_map = {
          
            "hungry": ["🍕", "🍔", "🍜", "🍎", "🍕"],
            "food": ["🍕", "🍔", "🍜", "🍎", "🍕"],
            "eat": ["🍕", "🍔", "🍜", "🍎", "🍕"],
            "dinner": ["🍕", "🍔", "🍜", "🍎", "🍕"],
            "lunch": ["🍕", "🍔", "🍜", "🍎", "🍕"],
            "breakfast": ["🍕", "🍔", "🍜", "🍎", "🍕"],
            
           
            "dragon": ["🐉", "🔥", "⚡", "💎"],
            "cat": ["🐱", "😺", "🐈", "🐾"],
            "dog": ["🐕", "🐶", "🦮", "🐾"],
            "unicorn": ["🦄", "✨", "🌈", "💫"],
            "panda": ["🐼", "🎋", "🍃", "💚"],
            "lion": ["🦁", "🦁", "🔥", "⚡"],
            "tiger": ["🐯", "🔥", "⚡", "💪"],
            
          
            "fire": ["🔥", "💥", "⚡", "🌋"],
            "water": ["💧", "🌊", "💦", "🌊"],
            "earth": ["🌍", "🌱", "🌿", "💚"],
            "air": ["💨", "☁️", "🌪️", "🕊️"],
            
       
            "sleep": ["😴", "💤", "🌙", "🛏️"],
            "work": ["💼", "💻", "📊", "📈"],
            "study": ["📚", "✏️", "📝", "🎓"],
            "party": ["🎉", "🎊", "🎈", "🎆"],
            "travel": ["✈️", "🚗", "🗺️", "🌍"],
            "music": ["🎵", "🎶", "🎸", "🎤"],
            "sport": ["⚽", "🏃", "💪", "🏆"],
            
           
            "book": ["📚", "📖", "📝", "✏️"],
            "phone": ["📱", "📞", "📲", "💬"],
            "car": ["🚗", "🏎️", "🚙", "🚐"],
            "house": ["🏠", "🏡", "🏘️", "🏚️"],
            "money": ["💰", "💵", "💸", "🤑"],
            "time": ["⏰", "🕐", "⏳", "⌚"]
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
            
    
            content_emojis = self._get_content_emojis(text.lower())
            
            emotion_emojis = ""
            emotion_scores = {}
            
            for emotion_data in top_emotions:
                emotion = emotion_data['label'].lower()
                score = emotion_data['score']
                emotion_scores[emotion] = round(score, 3)
                
                if emotion in self.emotion_emoji_map:
                    emoji_count = 2 if score > 0.3 else 1
                    emojis = self.emotion_emoji_map[emotion][:emoji_count]
                    emotion_emojis += "".join(emojis)
            
        
            combined_emojis = content_emojis + emotion_emojis
            
         
            if not combined_emojis:
                combined_emojis = "🤔💭"
                
            return {
                "emojis": combined_emojis,
                "emotions": emotion_scores
            }
            
        except Exception as e:
            return {
                "emojis": "❓🤖",
                "emotions": {"error": str(e)}
            }
    
    def _get_content_emojis(self, text: str) -> str:
        """Extract content-based emojis from text"""
        emoji_string = ""
        text_words = re.findall(r'\b\w+\b', text.lower())
        
        for word in text_words:
            if word in self.content_emoji_map:
             
                emojis = self.content_emoji_map[word][:2]
                emoji_string += "".join(emojis)
        
        return emoji_string
