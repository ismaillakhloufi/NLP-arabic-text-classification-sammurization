from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from .apps import ApiConfig as load
from .models import *
from .serializers import *

# --------------------------------------------------------------------------------------------
import numpy as np
from keras.preprocessing.sequence import pad_sequences
id2label = {'0': 'art', '1': 'culture', '2': 'economy', '3': 'medical', '4': 'politic', '5': 'sport', '6': 'technology'}
# --------------------------------------------------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def predictions(request):
    if request.method=='GET':
            try:
                predictions = Prediction.objects.filter(user_id=request.user.user_id)
                serializer = PredictionSerializer(predictions, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Prediction.DoesNotExist:
                return Response({'error': 'Prediction not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST', 'GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def prediction(request, prediction_id=None):
    if request.method == 'GET':
        if prediction_id:
            try:
                prediction = Prediction.objects.get(prediction_id=prediction_id)
                # Check if the request user is the same as the user who created the prediction
                if prediction.user == request.user:
                    serializer = PredictionSerializer(prediction)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    # If the users do not match, return a forbidden response
                    return Response({'error': 'You do not have permission to view this prediction.'}, status=status.HTTP_403_FORBIDDEN)
            except Prediction.DoesNotExist:
                return Response({'error': 'Prediction not found'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method=='POST':
        text = request.data.get('text')
        processed_text = load.preprocessor.preprocess_generally(text)
        text4cls = load.preprocessor.preprocess_for_classification(processed_text)
        text4sum = processed_text
        seq = load.tokenizer.texts_to_sequences([text4cls])  
        input = pad_sequences(seq, maxlen=300)  
        prediction_result = load.model.predict(input) 
        predicted_id = np.argmax(prediction_result, axis=1)[0]
        score = float(np.max(prediction_result, axis=1)[0])
        summary = load.summarizer(text4sum)

        # Create a new Prediction instance and save to the database
        prediction_instance = Prediction(
            text = processed_text,
            predicted_class=id2label[str(predicted_id)],  # Convert predicted ID to your label
            score=score,
            summary = summary,
            user=request.user  # Associate the current authenticated user with the prediction
        )
        prediction_instance.save()

        # serialize the prediction instance to return it in the response
        serialized_prediction = PredictionSerializer(prediction_instance).data

        return Response(serialized_prediction, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        if prediction_id:
            try:
                prediction = Prediction.objects.get(prediction_id=prediction_id)
                # Check if the request user is the same as the user who created the prediction
                if prediction.user == request.user:
                    # Set the user field to None instead of deleting the prediction
                    prediction.user = None
                    prediction.save()  # Don't forget to save the prediction instance after modifying it
                    return Response({'success': 'Prediction user disassociated successfully'}, status=status.HTTP_204_NO_CONTENT)
                else:
                    # If the users do not match, return a forbidden response
                    return Response({'error': 'You do not have permission to modify this prediction.'}, status=status.HTTP_403_FORBIDDEN)
            except Prediction.DoesNotExist:
                return Response({'error': 'Prediction not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Prediction ID is required for deletion'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def user_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=email, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'username': user.username, 'email': user.email}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)