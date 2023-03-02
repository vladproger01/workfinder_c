from django.contrib.auth import authenticate
from django.db import transaction
from django.db.transaction import atomic
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from .models import (Company, CompanyPosition, Factory, FactoryPosition,
                     Student, User)


class FactorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Factory
        fields = ["id", "name", "description"]


class FactoryPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FactoryPosition
        fields = ["id", "name", "description", "students_number", "skills", "factory"]

    def to_representation(self, obj):
        self.fields["factory"] = serializers.CharField(source="factory.name")

        return super().to_representation(obj)


class CompanyPositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyPosition
        fields = ["id", "name", "description", "skills", "company", "status"]

        extra_kwargs = {
            "company": {
                "read_only": True,
            },
        }

    def to_representation(self, obj):
        self.fields["company"] = serializers.CharField(source="company.name")

        return super().to_representation(obj)

    @atomic
    def create(self, validated_data):
        user = self.context["request"].user
        company_position = CompanyPosition.objects.create(
            **validated_data, company=user.get_company
        )
        return company_position


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            "pid",
            "user",
            "name",
            "surname",
            "course",
            "skills",
            "factory_position",
            "average_mark",
        ]

        extra_kwargs = {
            "user": {
                "read_only": True,
            },
            "pid": {
                "read_only": True,
            },
            "factory_position": {
                "read_only": True,
            },
            "average_mark": {
                "read_only": True,
            },
        }

    def validate(self, data):
        instance = getattr(self, "instance", None)
        user = self.context["request"].user
        if instance != user.get_student:
            raise serializers.ValidationError("Недостаточно прав для редактирования ")
        return data

    def to_representation(self, obj):
        self.fields["user"] = serializers.CharField(source="user.email")
        if obj.factory_position:
            self.fields["factory_position"] = serializers.CharField(
                source="factory_position.name"
            )

        return super().to_representation(obj)


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["pid", "user", "name", "description"]

        extra_kwargs = {
            "user": {
                "read_only": True,
            },
            "pid": {
                "read_only": True,
            },
        }

    def validate(self, data):
        instance = getattr(self, "instance", None)
        user = self.context["request"].user
        if instance != user.get_company:
            raise serializers.ValidationError("Недостаточно прав для редактирования ")
        return data

    def to_representation(self, obj):
        self.fields["user"] = serializers.CharField(source="user.email")

        return super().to_representation(obj)


class BaseSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "password", "is_student", "is_company")

        extra_kwargs = {
            "email": {
                "write_only": True,
            },
            "is_company": {
                "write_only": True,
            },
            "is_student": {
                "write_only": True,
            },
            "password": {"write_only": True, "min_length": 8},
        }

    def create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(
                **validated_data, username=validated_data["email"]
            )
            return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(label=_("Email"), write_only=True)
    password = serializers.CharField(
        label=_("Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )
    token = serializers.CharField(label=_("Token"), read_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"), username=email, password=password
            )

            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "created_at",
            "is_superuser",
            "is_student",
            "is_company",
        ]
