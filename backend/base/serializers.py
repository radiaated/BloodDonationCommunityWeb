from rest_framework import serializers
from .models import UserX, BloodRequest
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserXSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='user.id')
    email = serializers.ReadOnlyField(source='user.email')
    first_name = serializers.ReadOnlyField(source='user.first_name')
    class Meta:
        model = UserX
        fields = ["id", "email","first_name", "blood_group", "dob", "category", "phone", "district"]


class BloodRequestSerializer(serializers.ModelSerializer):
    ba_full_name = serializers.ReadOnlyField(source='blood_asker.user.first_name')
    bd_full_name = serializers.ReadOnlyField(source='blood_donor.user.first_name')
    ba_id = serializers.ReadOnlyField(source='blood_asker.user.id')
    bd_id = serializers.ReadOnlyField(source='blood_donor.user.id')
    class Meta:
        model = BloodRequest
        fields = ["ba_full_name", "bd_full_name", "ba_id","bd_id","blood_asker", "blood_donor", "cancel_status", "donation_status", "id", "requested_blood"]
        depth=1


class userSerializerWithToken(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField(read_only = True)
    name = serializers.SerializerMethodField(read_only = True)
    isAdmin = serializers.SerializerMethodField(read_only = True)
    token = serializers.SerializerMethodField(read_only = True)
    
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']
        # fields = ['id', '_id', 'username', 'email', 'isAdmin']
    
    def get__id(self, obj):
        _id = obj.id
        return _id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name