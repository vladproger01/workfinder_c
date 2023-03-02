from django.urls import reverse
from rest_framework.test import APIClient, APITestCase


class BaseCompanyAPITestCaseView(APITestCase):
    fixtures = ["fixtures.json"]
    login_url_name = "login"
    sign_in_data = {"email": "issoft@gmail.com", "password": "issoftissoft"}
    company_id = 23

    def setUp(self):
        response = self.client.post(
            reverse(self.login_url_name), self.sign_in_data, format="json"
        )

        auth_token = response.data["token"]
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION="Token " + auth_token)
