from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from accounts.models import UserProfile

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True, widget=forms.TextInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Enter email...'
        }

    ))
    password1 = forms.CharField(max_length=32, widget=forms.PasswordInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Enter password...'
        }

    ))
    password2 = forms.CharField(max_length=32, widget=forms.PasswordInput(
        attrs={
            'class': 'form-control',
            'placeholder': 'Confirm password...'
        }

    ))

    class Meta:
        password = forms.CharField(widget=forms.PasswordInput)
        model = User
        widgets = {
            'password': forms.PasswordInput(),
        }

    class Meta:
        model = User
        widgets = {
        'username': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter a username...'}),
        'first_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'First name...'}),
        'last_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Last name...'}),
        'email': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your email...'}),
        'password1': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Enter password...'}),
        'password2': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Confirm password...'}),
}
        fields = (
            'username',
            'email',
            'password1',
            'password2'
        )

    def save(self, commit=True):
        user = super(RegistrationForm, self).save(commit=False)
        user.email = self.cleaned_data['email']

        if commit:
            user.save()

        return user

class EditProfileForm(UserChangeForm):

    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name'
            )
        





