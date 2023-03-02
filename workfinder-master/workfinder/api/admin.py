from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html

from .models import (Company, CompanyPosition, Factory, FactoryPosition,
                     Student, User)

admin.site.register(Factory)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["email", "is_student", "student_link", "is_company", "company_link"]

    def company_link(self, obj):
        if obj.has_company:
            link = reverse("admin:api_company_change", args=[obj.company.pid])
            name = obj.company.name if obj.company.name else "Unnamed company"
            return format_html('<a href="{}">{}</a>', link, name)

    def student_link(self, obj):
        if obj.has_student:
            link = reverse("admin:api_student_change", args=[obj.student.pid])
            name = (
                obj.student.name + " " + obj.student.surname
                if obj.student.name and obj.student.surname
                else "Unnamed student"
            )
            return format_html('<a href="{}">{}</a>', link, name)


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ["name", "user_link"]

    def user_link(self, obj):
        link = reverse("admin:api_user_change", args=[obj.user.id])
        return format_html('<a href="{}">{}</a>', link, obj.user.email)


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ["name", "surname", "user_link", "course", "average_mark"]
    list_filter = (("average_mark", admin.EmptyFieldListFilter),)

    def user_link(self, obj):
        link = reverse("admin:api_user_change", args=[obj.user.id])
        return format_html('<a href="{}">{}</a>', link, obj.user.email)


@admin.register(FactoryPosition)
class FactoryPositionAdmin(admin.ModelAdmin):
    list_display = ["name", "students_number", "factory_link"]

    def factory_link(self, obj):
        link = reverse("admin:api_factory_change", args=[obj.factory.id])
        return format_html('<a href="{}">{}</a>', link, obj.factory)


@admin.register(CompanyPosition)
class CompanyPositionAdmin(admin.ModelAdmin):
    list_display = ["name", "status", "company_link"]
    list_filter = (("status", admin.AllValuesFieldListFilter),)

    def company_link(self, obj):
        link = reverse("admin:api_company_change", args=[obj.company.pid])
        return format_html('<a href="{}">{}</a>', link, obj.company)
