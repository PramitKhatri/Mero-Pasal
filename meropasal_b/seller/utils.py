# to generate tokens for seller, we have to do it manually since again, Seller is a custom user model.
from rest_framework_simplejwt.tokens import RefreshToken
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }