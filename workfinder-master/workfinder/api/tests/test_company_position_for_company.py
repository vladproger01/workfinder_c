from django.urls import reverse
from rest_framework import status

from .base_company_test import BaseCompanyAPITestCaseView


class TestCompanyPositionForCompany(BaseCompanyAPITestCaseView):
    fixtures = ["fixtures.json"]
    url_name = "company-position-list"
    detail_url_name ="company-position-detail"
    applied_students_url_name = "company-position-applied-students"

    def test_get_list(self):
        response = self.client.get(reverse(self.url_name), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )

    def test_add(self):
        data =  {
        "name": "testname",
        "description": "testdescription",
        "skills": "testskills"
    }
        response = self.client.post(reverse(self.url_name), data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_201_CREATED, response.content
        )

    def test_update(self):
        data = {
        "name": "testname",
        "description": "testdescription",
        "skills": "testskills"
        }
        response = self.client.patch(reverse(self.detail_url_name, kwargs={'pk': 5}), data, format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )

    def test_delete(self):
        response = self.client.delete(reverse(self.detail_url_name, kwargs={'pk': 5}), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_204_NO_CONTENT, response.content
        )

    def test_applied_students(self):
        response = self.client.get(reverse(self.applied_students_url_name, kwargs={'pk': 5}), format="json")
        self.assertEqual(
            response.status_code, status.HTTP_200_OK, response.content
        )