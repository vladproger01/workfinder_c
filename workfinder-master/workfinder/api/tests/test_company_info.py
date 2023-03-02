from django.urls import reverse
from rest_framework import status

from .base_company_test import BaseCompanyAPITestCaseView


class TestCompanyInfo(BaseCompanyAPITestCaseView):
    fixtures = ["fixtures.json"]
    url_name = "company-info-detail"

    def test_get(self):
        response = self.client.get(
            reverse(self.url_name, kwargs={"pk": self.company_id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.content)
