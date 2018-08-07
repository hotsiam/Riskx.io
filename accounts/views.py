from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth

def signup(request):
    if request. method == 'POST':
        # tHE USER WANTS TO SIGN UP!
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.get(email=request.POST['email'])
                return render(request, 'accounts/signup.html', {'error':'Email already in use.'})
            except User.DoesNotExist:
                user = User.objects.create_user(request.POST['email'], password=request.POST['password1'])
                auth.login(request,user)
                return redirect('home')
        else:
            return render(request, 'accounts/signup.html', {'error':'Passwords must match.'})

    else:
        # User wants to enter info
	    return render(request, 'accounts/signup.html')

def kyc(request):
    # TODO need to route to homepage
    # dont forget to logout
    return render(request, 'accounts/kyc.html')

def terms(request):
    # TODO need to route to homepage
    # dont forget to logout
    return render(request, 'accounts/terms.html')

def finish(request):
    # TODO need to route to homepage
    # dont forget to logout
    return render(request, 'accounts/finish.html')


def login(request):
    if request. method == 'POST':
        user = auth.authenticate(username=request.POST['email'],password=request.POST['password'])
        if user is not None:
            auth.login(request, user)
            return redirect('home')
        else:
            return render(request, 'accounts/login.html',{'error':'username or password is invalid.'})
    else:
	    return render(request, 'accounts/login.html')


def logout(request):
	# TODO need to route to homepage
	# dont forget to logout
	return render(request, 'accounts/signup.html')

