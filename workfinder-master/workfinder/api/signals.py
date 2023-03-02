from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Company, Student, User


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if kwargs.get("created", True) and not kwargs.get("raw", False):
        if instance.is_student:
            Student.objects.create(user=instance)
        elif instance.is_company:
            Company.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if kwargs.get("created", True) and not kwargs.get("raw", False):
        if instance.is_student:
            instance.student.save()
        elif instance.is_company:
            instance.company.save()
