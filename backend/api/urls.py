from django.urls import path
from .views import *

urlpatterns = [
    path("prediction/", prediction, name="make_prediction"),
    path("prediction/<int:prediction_id>", prediction, name="get_prediction"),
    path("predictions/", predictions, name="get_predictions"),
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
]