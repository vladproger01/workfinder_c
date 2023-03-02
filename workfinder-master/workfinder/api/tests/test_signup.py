from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class TestSignUp(APITestCase):
    fixtures = ["fixtures.json"]
    url_name = "signup-list"

    def test_company_sign_up(self):
        sign_up_data = {
            "email": "leverx@gmail.com",
            "password": "leverxleverx",
            "is_student": False,
            "is_company": True,
        }
        response = self.client.post(reverse(self.url_name), sign_up_data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED, response.content
        )

        auth_token = response.data["token"]
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION="Token " + auth_token)

        related_id = response.data["related_id"]

        company_data = {"name": "testcompany", "description": "testdescription"}
        response = self.client.patch(
            reverse("company-info-detail", kwargs={"pk": related_id}),
            company_data,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)

    def test_student_sign_up(self):
        sign_up_data = {
            "email": "alex@gmail.com",
            "password": "alexalex",
            "is_student": True,
            "is_company": False,
        }
        response = self.client.post(reverse(self.url_name), sign_up_data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED, response.content
        )
        auth_token = response.data["token"]
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION="Token " + auth_token)

        related_id = response.data["related_id"]

        student_data = {
            "name": "sasha",
            "surname": "ivanov",
            "course": 3,
            "skills": "python",
        }
        response = self.client.patch(
            reverse("student-info-detail", kwargs={"pk": related_id}),
            student_data,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
