from django.db import models

from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='Pending')  # Pending/Completed
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

