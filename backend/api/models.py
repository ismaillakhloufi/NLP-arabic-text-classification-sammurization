from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=30)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']

    def __str__(self):
        return self.username
    
class Prediction(models.Model):
    prediction_id = models.AutoField(primary_key=True)
    text = models.TextField(null=True)
    predicted_class = models.CharField(max_length=20)
    score = models.DecimalField(max_digits=3, decimal_places=2)
    summary = models.TextField(null=True)
    creation_date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"prediction{self.prediction_id}"