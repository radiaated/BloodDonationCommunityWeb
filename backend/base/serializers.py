from rest_framework import serializers
from .models import UserX, BloodRequest
# from django.contrib.auth.models import User

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
    class Meta:
        model = BloodRequest
        fields = ["ba_full_name", "bd_full_name", "blood_asker", "blood_donor", "cancel_status", "donation_status", "id", "requested_blood"]
        depth=1

        