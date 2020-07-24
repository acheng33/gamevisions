from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Game
from .models import Platform
from .models import User
from .models import Preference

# Register your models here.
admin.site.register(Game)
admin.site.register(Platform)
admin.site.register(User)
admin.site.register(Preference)