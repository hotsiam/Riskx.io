import json
from django.http import QueryDict


class JSONMiddleware(object):
    """
    Process application/json requests data from GET, POST and PATCH requests.
    """
    def process_request(self, request):
        # Check if contant_type is present in the request and if application/json is one of them.
        if request.META.get('CONTENT_TYPE') and 'application/json' in request.META.get('CONTENT_TYPE'):
            # Load the json data
            data = json.loads(request.body)
            # For consistency, we want to return a Django QueryDict and not a plain Dict.
            # The primary difference is that the QueryDict stores every value in a list and is, by default, immutable.
            # The primary issue is making sure that list values are properly inserted into the QueryDict.
            # If we simply do a q_data.update(data), any list values will be wrapped in another list.
            # By iterating through the list and updating for each value, we get the expected result of a single list.
            q_data = QueryDict('', mutable=True)
            for key, value in data.iteritems():
                if isinstance(value, list):
                    # Iterate through the list and update q_data so the list does not get wrapped in another list.
                    for x in value:
                        q_data.update({key: x})
                else:
                    q_data.update({key: value})

            if request.method == 'GET':
                request.GET = q_data

            if request.method == 'POST':
                request.POST = q_data
            
            if request.method == 'PATCH':
                request.POST = q_data

        return None