from django.urls import reverse
from rest_framework import status

from .base_student_test import BaseStudentAPITestCaseView


class TestFactoryPosition(BaseStudentAPITestCaseView):
    fixtures = ["fixtures.json"]
    url_name = "factory-position-list"
    remove_position_url_name = "student-info-remove-factory-position"
    add_position_url_name = "factory-position-add-factory-position"
    get_applied_students_url_name = "factory-position-get-applied-students"

    def test_get_list(self):
        response = self.client.get(reverse(self.url_name), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)

    def test_remove_and_add_factory_position(self):
        response = self.client.post(
            reverse(self.remove_position_url_name), format="json"
        )
        self.assertEqual(
            response.status_code, status.HTTP_204_NO_CONTENT, response.content
        )

        response = self.client.post(
            reverse(self.add_position_url_name, kwargs={"pk": 2}), format="json"
        )
        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED, response.content
        )

    def test_get_applied_students(self):
        response = self.client.get(
            reverse(self.get_applied_students_url_name, kwargs={"pk": 2}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
