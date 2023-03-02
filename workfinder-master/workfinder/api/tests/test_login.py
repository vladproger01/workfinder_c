from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class TestLogin(APITestCase):
    fixtures = ["fixtures.json"]
    url_name = "login"

    def test_student_login(self):
        sign_in_data = {"email": "masha@gmail.com", "password": "issoftissoft"}
        response = self.client.post(reverse(self.url_name), sign_in_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        self.assertNotEqual(response.data["token"], "")

    def test_company_login(self):
        sign_in_data = {"email": "issoft@gmail.com", "password": "issoftissoft"}
        response = self.client.post(reverse(self.url_name), sign_in_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
        self.assertNotEqual(response.data["token"], "")
