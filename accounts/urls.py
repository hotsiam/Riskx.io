from django.urls import path, include
from . import views

urlpatterns = [
	path('signup', views.signup, name='signup'),
	path('kyc', views.kyc, name='kyc'),
	path('terms', views.terms, name='terms'),
	path('finish', views.finish, name='finish'),
	path('login', views.login, name='login'),
	path('logout', views.logout, name='logout'),
] 

