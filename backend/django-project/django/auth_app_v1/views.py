from dj_rest_auth.registration.views import RegisterView
from auth_app_v1.serializers import CustomRegisterSerializer

class CustomRegisterView(RegisterView):
    
    serializer_class = CustomRegisterSerializer

    def get_serializer_class(self):
        print("✅ Using CustomRegisterSerializer")
        return self.serializer_class
    
