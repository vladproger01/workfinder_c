from django.urls import reverse
from rest_framework import status

from .base_student_test import BaseStudentAPITestCaseView


class TestCompanyPositionForStudent(BaseStudentAPITestCaseView):
    fixtures = ["fixtures.json"]
    url_name = "company-position-list"
    get_available_url_name = "company-position-get-available"
    detailed_url_name ="company-position-detailed"
    apply_url_name = "company-position-apply"

    def test_get_available(self):
        response = self.client.get(reverse(self.get_available_url_name), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )

    def test_detailed(self):
        response = self.client.get(reverse(self.detailed_url_name, kwargs={'pk': 7}), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )

    def test_apply(self):
        response = self.client.post(reverse(self.apply_url_name, kwargs={'pk': 7}), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )