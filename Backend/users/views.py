from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from .models import *
import json

#  Register View
@csrf_exempt
def register_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if CustomUser.objects.filter(email=email).exists():
            return JsonResponse({"error": "Email already exists"}, status=400)

        user = CustomUser.objects.create(
            username=username,
            email=email,
            password=make_password(password)
        )
        return JsonResponse({"message": "User registered successfully!"}, status=201)

#  Login View
@csrf_exempt
def login_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        try:
            user_obj = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return JsonResponse({"error": "Invalid email"}, status=400)

        user = authenticate(username=user_obj.username, password=password)

        if user is not None:
            return JsonResponse({"message": "Login successful", "user": user.username})
        else:
            return JsonResponse({"error": "Invalid password"}, status=400)


