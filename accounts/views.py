from django.shortcuts import render, redirect
from accounts.forms import (
    RegistrationForm, 
    EditProfileForm, 
)
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserChangeForm, PasswordChangeForm

def login(request):
    if request. method == 'POST':
        user = auth.authenticate(username=request.POST['email'],password=request.POST['password'])
        if user is not None:
            auth.login(request, user)
            return redirect('/')
    else:
        return render(request, 'accounts/login.html')

def register(request):
    if request.method =='POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')

    else:
        form = RegistrationForm()

        args = {'form': form}
        return render(request, 'accounts/reg_form.html', args)

def view_profile(request):
    args = {'user': request.user}
    return render(request, 'accounts/profile.html', args)

def edit_profile(request):
    if request.method == 'POST':
        form = EditProfileForm(request.POST, instance=request.user)

        if form.is_valid():
            form.save()
            return redirect('/accounts/profile')
    else:
        form = EditProfileForm(instance=request.user)
        args = {'form':form}
        return render(request, 'accounts/edit_profile.html', args)


def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.POST, instance=request.user)

        if form.is_valid():
            form.save()
            return redirect('/accounts/profile')

    else:
        form = PasswordChangeForm()
        
        args = {'form': form}
        return render(request, 'accounts/change_password.html', args)



