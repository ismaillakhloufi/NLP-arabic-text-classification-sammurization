import nltk # Text libarary
import re # Regex Package
from nltk.corpus import stopwords # Stopwords
from qalsadi.lemmatizer import Lemmatizer


class TextPreprocessing:

    def __init__(self):
        self.arabic_stopwords = set(stopwords.words("arabic"))

    def remove_stop_words(self, text):
        words = nltk.word_tokenize(text)
        filtered_words = [word for word in words if word not in self.arabic_stopwords]
        return " ".join(filtered_words)

    def Arabic_Lemmatizer(self, text):
        lemmer = Lemmatizer()
        tokens = nltk.word_tokenize(text)
        lemmatized_words = [lemmer.lemmatize(word) for word in tokens]
        return " ".join(lemmatized_words)

    def normalizeArabic(self, text):
        text = re.sub("ى", "ي", text)
        text = re.sub("ؤ", "ء", text)
        text = re.sub("ئ", "ء", text)
        text = re.sub("ة", "ه", text)
        text = re.sub("[إأٱآا]", "ا", text)
        text = re.sub("وو", "و", text)
        text = re.sub("ييي", "ي", text)
        text = re.sub("يي", "ي", text)
        text = re.sub("اا", "ا", text)
        return text

    def Removing_non_arabic(self, text):
        return re.sub("[A-Za-z]+", " ", text)

    def Removing_numbers(self, text):
        return re.sub("[0-9]+", " ", text)

    def Removing_punctuations(self, text):
        punctuations = """!"#$%&'()*+,،—-./:;<=>؟?@[\]^_`{|}~–“”«»‘’؛"""
        return re.sub(r"[{}]+".format(re.escape(punctuations)), " ", text)

    def Removing_urls(self, text):
        return re.sub(r'https?://\S+|www\.\S+', "", text)

    def remove_emoji(self, text):
        emoji_pattern = re.compile("["
                                   u"\U0001F600-\U0001F64F"  # emoticons
                                   u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                                   u"\U0001F680-\U0001F6FF"  # transport & map symbols
                                   u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                                   u"\U00002702-\U000027B0"
                                   u"\U000024C2-\U0001F251"
                                   "]+", flags=re.UNICODE)
        return emoji_pattern.sub(r'', text)

    def remove_emoticons(self, text):
        EMOTICONS = [':)', ':D', ':(', ':|', ';)', 'B)', ':@', '8)']
        for emoticon in EMOTICONS:
            text = re.sub(re.escape(emoticon), '', text)
        return text

    def remove_hashtags_and_mentions(self, text):
        text = re.sub(r"@[\w]+", "", text)
        text = re.sub(r"#[\w]+", "", text)
        return text

    def remove_special_characters(self, text):
        text = re.sub(r'<<"([^"]*)">>', r'\1', text)
        text = re.sub(r'"([^"]*)"', r'\1', text)
        return text


class Preprocessing:
    def __init__(self):
        self.text_preprocessor = TextPreprocessing()

    def preprocess_generally(self, text):
        text = self.text_preprocessor.remove_hashtags_and_mentions(text)
        text = self.text_preprocessor.remove_emoticons(text)
        text = self.text_preprocessor.Removing_urls(text)
        text = self.text_preprocessor.remove_emoji(text)
        return text
    
    def preprocess_for_classification(self, text):
        text = self.text_preprocessor.remove_stop_words(text)
        text = self.text_preprocessor.remove_special_characters(text)
        text = self.text_preprocessor.Removing_non_arabic(text)
        text = self.text_preprocessor.Removing_punctuations(text)
        text = self.text_preprocessor.Removing_numbers(text)
        text = self.text_preprocessor.Arabic_Lemmatizer(text)
        text = self.text_preprocessor.normalizeArabic(text)
        return text