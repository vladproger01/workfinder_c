from django.urls import reverse
from rest_framework import status

from .base_student_test import BaseStudentAPITestCaseView


class TestFactory(BaseStudentAPITestCaseView):
    fixtures = ["fixtures.json"]
    url_name = "factory-list"

    def test_get_list(self):
        response = self.client.get(reverse(self.url_name), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
