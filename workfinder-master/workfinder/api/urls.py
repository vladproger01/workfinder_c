from django.urls import path
from rest_framework import routers

from .views import (BaseSignUpView, CompanyInfoView, CompanyPositionView,
                    FactoryPositionView, FactoryView, LoginView,
                    StudentInfoView)

router = routers.DefaultRouter()
router.register("student-info", StudentInfoView, basename="student-info")
router.register("company-info", CompanyInfoView, basename="company-info")
router.register("signup", BaseSignUpView, basename="signup")
router.register("factory", FactoryView, basename="factory")
router.register("factory-position", FactoryPositionView, basename="factory-position")
router.register("company-position", CompanyPositionView, basename="company-position")
urlpatterns = router.urls
urlpatterns += [
    path("login/", LoginView.as_view(), name="login"),
]
