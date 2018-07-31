from django.shortcuts import render


def signup(request):
	render(request, 'accounts/signup.html')


def login(request):
	render(request, 'accounts/login.html')


def logout(request):
	# TODO need to route to homepage
	# dont forget to logout
	render(request, 'accounts/signup.html')