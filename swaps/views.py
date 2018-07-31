# from django.http import HttpResponse ###
from django.shortcuts import render

def home(request):
	return render(request, 'swaps/home.html')

def signup(request):
	return render(request, 'accounts/signup.html')


def login(request):
	return render(request, 'accounts/login.html')


def logout(request):
	# TODO need to route to homepage
	# dont forget to logout
	return render(request, 'accounts/signup.html')