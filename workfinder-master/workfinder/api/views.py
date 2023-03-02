from django.http import Http404
from django.utils.translation import gettext_lazy as _
from rest_framework import mixins, status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .models import (Company, CompanyPosition, Factory, FactoryPosition,
                     Student, User)
from .permissions import IsCompany, IsStudent
from .serializers import (BaseSignUpSerializer, CompanyPositionSerializer,
                          CompanySerializer, FactoryPositionSerializer,
                          FactorySerializer, LoginSerializer,
                          StudentSerializer, UserSerializer)


class CompanyPositionView(
    GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = CompanyPositionSerializer
    permission_classes = [IsCompany]
    queryset = CompanyPosition.objects.all()

    def get_queryset(self):
        user = self.request.user
        return (
            super(CompanyPositionView, self)
            .get_queryset()
            .filter(company=user.get_company)
        )

    def get_accepted_position_or_404(self, pk):
        try:
            position = CompanyPosition.objects.get(pk=pk)
            if position.status == CompanyPosition.STATUS_CHOICES[1][0]:
                return position
            else:
                raise Http404
        except CompanyPosition.DoesNotExist:
            raise Http404

    @action(
        methods=["GET"],
        detail=False,
        permission_classes=[IsStudent],
    )
    def get_available(self, request, *args, **kwargs):
        positions = CompanyPosition.objects.filter(
            status=CompanyPosition.STATUS_CHOICES[1][0]
        )
        serializer = self.serializer_class(instance=positions, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)

    @action(
        methods=["GET"],
        detail=True,
        permission_classes=[IsStudent],
    )
    def detailed(self, request, pk):
        position = self.get_accepted_position_or_404(pk)
        student = self.request.user.get_student
        is_applied = student in position.students.all()
        serializer = self.serializer_class(instance=position).data
        return Response(
            {"is_applied": is_applied, "position": serializer},
            status=status.HTTP_200_OK,
        )

    @action(
        methods=["POST"],
        detail=True,
        permission_classes=[IsStudent],
    )
    def apply(self, request, pk):
        position = self.get_accepted_position_or_404(pk)
        student = self.request.user.get_student
        position.students.add(student)
        return Response(_("Заявка подана"), status=status.HTTP_200_OK)

    @action(
        methods=["GET"],
        detail=True,
        permission_classes=[IsCompany],
    )
    def applied_students(self, request, pk):
        position = self.get_accepted_position_or_404(pk)
        students = position.students.all()

        serializer = StudentSerializer(instance=students, many=True).data
        return Response(
            serializer,
            status=status.HTTP_200_OK,
        )


class FactoryView(GenericViewSet, mixins.ListModelMixin):
    serializer_class = FactorySerializer
    queryset = Factory.objects.all()
    permission_classes = [IsStudent]


class FactoryPositionView(GenericViewSet, mixins.ListModelMixin):
    serializer_class = FactoryPositionSerializer
    queryset = FactoryPosition.objects.all()
    permission_classes = [IsStudent]

    @action(methods=["POST"], detail=True)
    def add_factory_position(self, request, *args, **kwargs):
        student = self.request.user.get_student
        if student:
            if not student.average_mark:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={_("Отсутствует средний балл")},
                )
            if not student.factory_position:
                position = self.get_object()
                student.factory_position = position
                student.save()
                return Response(
                    status=status.HTTP_201_CREATED,
                    data={_("Позиция успешно добавлена")},
                )
            else:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST, data={_("Уже есть позиция")}
                )
        return Response(
            status=status.HTTP_400_BAD_REQUEST, data={_("Отсутствует студент")}
        )

    @action(methods=["GET"], detail=True)
    def get_applied_students(self, request, *args, **kwargs):
        position = self.get_object()
        students = position.student_set.all().order_by("-average_mark")
        serializer = StudentSerializer(instance=students, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)


class StudentInfoView(
    viewsets.GenericViewSet, mixins.UpdateModelMixin, mixins.RetrieveModelMixin
):
    """Заполнение информации о пользователе"""

    queryset = Student.objects.all()
    permission_classes = [IsStudent]
    serializer_class = StudentSerializer

    @action(methods=["POST"], detail=False)
    def remove_factory_position(self, request, *args, **kwargs):
        student = self.request.user.get_student
        if student:
            if student.factory_position:
                student.factory_position = None
                student.save()
                return Response(
                    status=status.HTTP_204_NO_CONTENT,
                    data={_("Позиция успешно удалена")},
                )
            else:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST, data={_("Отсутствует позиция")}
                )
        return Response(
            status=status.HTTP_400_BAD_REQUEST, data={_("Отсутствует студент")}
        )


class CompanyInfoView(
    viewsets.GenericViewSet, mixins.UpdateModelMixin, mixins.RetrieveModelMixin
):
    """Заполнение информации о компании"""

    queryset = Company.objects.all()
    permission_classes = [IsCompany]
    serializer_class = CompanySerializer


class BaseSignUpView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    """Базовая регистрация пользователя"""

    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = BaseSignUpSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)

        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "Success": "User created successfully",
                "token": token.key,
                "user": UserSerializer(instance=user).data,
                # "is_company": user.has_company,
                # "is_student": user.has_student,
                # "is_superuser": user.is_superuser,
                # "email": user.email,
                "related_id": user.related_id,
            },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class LoginView(ObtainAuthToken):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {"token": token.key, "user": UserSerializer(instance=user).data}
        )
