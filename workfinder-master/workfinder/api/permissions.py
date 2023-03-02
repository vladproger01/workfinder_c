from rest_framework.permissions import BasePermission


class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_student if request.user.is_authenticated else False


class IsCompany(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_company if request.user.is_authenticated else False
