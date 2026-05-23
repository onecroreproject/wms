from django import template

register = template.Library()


@register.filter
def split(value, delimiter=','):
    """Split a string by delimiter."""
    return value.split(delimiter)


@register.filter
def index(lst, i):
    """Get item at index i from a list."""
    try:
        return lst[int(i)]
    except (IndexError, ValueError, TypeError):
        return ''
