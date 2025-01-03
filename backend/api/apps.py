from django.apps import AppConfig
import io
from django.conf import settings
import pickle
import torch
from keras.models import load_model
from .TextPreprocessing import Preprocessing

class CPU_Unpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if module == 'torch.storage' and name == '_load_from_bytes':
            return lambda b: torch.load(io.BytesIO(b), map_location='cpu')
        else: return super().find_class(module, name)

class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"
    MODEL_FILE = "ML/models/AraBrief_classifier"
    TOKENIZER_FILE = "ML/models/AraBrief_tokenizer.pkl"
    SUMMARIZER_FILE = "ML/models/AraBrief_summarizer.pkl"
    with open(TOKENIZER_FILE, 'rb') as f:
        tokenizer = pickle.load(f)
    with open(SUMMARIZER_FILE, 'rb') as f:
        summarizer = CPU_Unpickler(f).load()
    model = load_model(MODEL_FILE)
    preprocessor = Preprocessing()