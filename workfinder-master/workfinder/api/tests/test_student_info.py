from django.urls import reverse
from rest_framework import status

from .base_student_test import BaseStudentAPITestCaseView


class TestStudentInfo(BaseStudentAPITestCaseView):
    fixtures = ["fixtures.json"]
    url_name = "student-info-detail"
    remove_position_url_name = "student-info-remove-factory-position"

    def test_get(self):
        response = self.client.get(
            reverse(self.url_name, kwargs={"pk": self.student_id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)

    def test_remove_factory_position(self):
        response = self.client.post(
            reverse(self.remove_position_url_name), format="json"
        )
        self.assertEqual(
            response.status_code, status.HTTP_204_NO_CONTENT, response.content
        )
