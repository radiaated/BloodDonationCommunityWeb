from cmath import log
from django.shortcuts import render, HttpResponse
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.hashers import make_password


from .models import UserX, BloodRequest
from .serializers import UserXSerializer, BloodRequestSerializer, userSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
from rest_framework_simplejwt.tokens import RefreshToken



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
   
    def validate(self, attrs):
        
        data = super().validate(attrs)
    
        serializers = userSerializerWithToken(self.user).data
        
        for k, v in serializers.items():
            
            data[k] = v
        # userx = UserX.objects.get(user=data["id"])
        
        # data["userx_id"] = userx.id
    
        print('\n\ndata: ', data)
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(["GET"])
def get_users(request):
    userx = UserX.objects.all()
    serializers = UserXSerializer(userx, many=True)

    return Response(serializers.data)

@api_view(["GET"])
def get_user(request, id):
    user = User.objects.get(id=id)
    
    userx = UserX.objects.get(user=user)

    serializers = UserXSerializer(userx)

    return Response(serializers.data)

@permission_classes([IsAuthenticated])
@api_view(["GET", "POST"])
def user_profile(request):
    if request.method == "GET":
        print(request.user)
        user = User.objects.get(id=request.user.id)
        
        userx = UserX.objects.get(user=user)

        serializers = UserXSerializer(userx)

        return Response(serializers.data)
    elif request.method == "POST":
        user = User.objects.get(id=request.user.id)
        user.email = request.data["email"]
        user.first_name = request.data["first_name"]
        user.save()
        userx=UserX.objects.get(user=user)
        userx.blood_group = request.data["blood_group"]
        userx.dob = request.data["dob"]
        userx.district = request.data["district"]
        userx.category = request.data["category"]
        userx.phone = request.data["phone"]
        userx.password = make_password(request.data["password"])
        userx.save()

        userx = UserX.objects.get(user=user)

        serializers = UserXSerializer(userx)
        
        return Response(serializers.data)




@permission_classes([IsAuthenticated])
@api_view(["POST"])
def submit_request(request, id):
    print(request.user.id)
    b_d = User.objects.get(id=id)
    b_d2 = UserX.objects.get(user=b_d)
    b_d3= User.objects.get(id=request.user.id)
    b_d4 = UserX.objects.get(user=b_d3)
    b_r = BloodRequest.objects.create(blood_asker=b_d4, blood_donor=b_d2, requested_blood=b_d2.blood_group)

    serializers = BloodRequestSerializer(b_r)

    return Response(serializers.data)

@api_view(["GET"])
def get_donors(request, type):
    
    if(type == "all"):
        userx = UserX.objects.filter(category="1")
        

        serializers = UserXSerializer(userx, many=True)

        return Response(serializers.data)
    else: 
        userx = UserX.objects.filter(category="1", blood_group=type)
        
        serializers = UserXSerializer(userx, many=True)

        return Response(serializers.data)

@api_view(["POST"])
def register(request):
    print(request.data)


    

    user = User.objects.create(username=request.data["email"], email=request.data["email"], first_name=request.data["fullName"], password= make_password(request.data["password"]))
    if(user):
        user.save()
    userx = UserX.objects.create(user=user, blood_group=request.data["bloodGroup"], dob=request.data["dob"], category=request.data["category"], phone=request.data["phone"], district=request.data["district"])
    
    if userx:
        userx.save()

    serializers = UserXSerializer(userx)

    return Response(serializers.data)


@permission_classes([IsAuthenticated])
@api_view(["GET", "PUT"])
def get_request_by_id(request, id):



    if request.method == "GET":
        print(request.user)
        user = User.objects.get(id=request.user.id)
        print(user)
        userx = UserX.objects.get(user=user)
        print(userx)

        
        if BloodRequest.objects.filter(id=id, blood_asker=userx).exists():
            print("hi")
            req = BloodRequest.objects.filter(id=id, blood_asker=userx)
            # req = BloodRequest.objects.filter(id=id)
            
    
            serializers = BloodRequestSerializer(req,  many=True)
            print(serializers.data)
            return Response(serializers.data[0])

        if BloodRequest.objects.filter(id=id, blood_donor=userx).exists():
            
            req = BloodRequest.objects.filter(id=id, blood_donor=userx)
            
            serializers = BloodRequestSerializer(req, many=True)
        
            return Response(serializers.data[0])
    elif request.method == "PUT":
        print(request.data)
        user = User.objects.get(id=request.user.id)
        userx = UserX.objects.get(user=user)

        br = BloodRequest.objects.get(id=id)
        
        if(request.data["type"] == "donation_status"):
            br.donation_status = True
        elif (request.data["type"] == "cancel_status"):
            br.cancel_status = True


        br.save()
        serializers = BloodRequestSerializer(br)
        
        return Response(serializers.data)

            
            


@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_request_by_user(request):
    print(request.user)
    user = User.objects.get(id=request.user.id)
    userx = UserX.objects.get(user=user)
    print(userx)
    res = []

    if BloodRequest.objects.filter(blood_donor=userx).exists():
        
        req = BloodRequest.objects.filter(blood_donor=userx)
        serializers = BloodRequestSerializer(req, many=True)

        res.append({"type": "req_for_you","data": serializers.data})

    
    if BloodRequest.objects.filter(blood_asker=userx).exists():
        print("hi")
        req = BloodRequest.objects.filter(blood_asker=userx)
      
        serializers = BloodRequestSerializer(req,  many=True)
        res.append({"type": "req_by_you","data": serializers.data})
    
    return Response(res)




   