from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _


class Factory(models.Model):
    name = models.CharField(_("name"), max_length=255)
    description = models.TextField(_("description"))

    def __str__(self):
        return self.name


class FactoryPosition(models.Model):
    name = models.CharField(_("name"), max_length=255)
    description = models.TextField(_("description"))
    students_number = models.PositiveSmallIntegerField(_(" students number"))
    skills = models.TextField()
    factory = models.ForeignKey(Factory, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(_("username"), max_length=255)
    email = models.EmailField(_("email"), unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(_("staff status"), default=False)
    is_superuser = models.BooleanField(_("superuser status"), default=False)
    is_active = models.BooleanField(_("active status"), default=True)
    is_student = models.BooleanField(default=False)
    is_company = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def has_student(self):
        try:
            student = self.student
            return True
        except ObjectDoesNotExist:
            return False

    @property
    def get_student(self):
        try:
            return self.student
        except ObjectDoesNotExist:
            return False

    @property
    def has_company(self):
        try:
            company = self.company
            return True
        except ObjectDoesNotExist:
            return False

    @property
    def get_company(self):
        try:
            return self.company
        except ObjectDoesNotExist:
            return False

    @property
    def related_id(self):
        try:
            return self.company.pid
        except ObjectDoesNotExist:
            return self.student.pid
        except ObjectDoesNotExist:
            return None


class Student(models.Model):
    pid = models.AutoField(unique=True, primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user.is_student = True
    course = models.PositiveSmallIntegerField(
        _("course"),
        null=True,
        blank=True,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        default=1,
    )
    name = models.CharField(_("name"), max_length=255, default="Default")
    surname = models.CharField(_("surname"), max_length=255)
    skills = models.TextField()
    average_mark = models.FloatField(
        _("average mark"),
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(10)],
    )
    factory_position = models.ForeignKey(
        FactoryPosition, on_delete=models.CASCADE, null=True, blank=True
    )

    def __str__(self):
        return self.user.email


class Company(models.Model):
    pid = models.AutoField(unique=True, primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user.is_company = True
    name = models.CharField(_("name"), max_length=255, default="Unnamed company")
    description = models.TextField(_("description"))

    def __str__(self):
        return self.user.email


class CompanyPosition(models.Model):
    STATUS_CHOICES = (
        (
            "IN PROGRESS",
            "В процессе",
        ),
        (
            "ACCEPTED ADMIN",
            "Принят администратором",
        ),
        (
            "DECLINED ADMIN",
            "Отклонен администратором",
        ),
    )
    name = models.CharField(_("name"), max_length=255)
    description = models.TextField(_("description"))
    skills = models.TextField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, null=True, blank=True)
    status = models.CharField(
        max_length=255, choices=STATUS_CHOICES, default=STATUS_CHOICES[0][0]
    )

    def __str__(self):
        return self.name
