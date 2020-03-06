# interview_stats

Demo backend that partners with docassemble to provide reporting stats using a react frontend / node backend.

## Docassemble
http://ec2-18-237-65-232.us-west-2.compute.amazonaws.com/

There is a customised, hosted version of docassemble that will ask basic questions and then generate a pro-forma solicotors letter based on the templates at Monaco Solicitors (Settlement Agreement only at this point)

Within the flow is a hook that calls a node backend to register that an 'interview' has been submitted, does a reverse geocode on the postcode to find a location and then calculates which Monaco office would be the most appropriate to handle it.


## Node backend
The node backend is a simple express based service with a mongodb data store that accepts notifications of submitted interview events and provides a list of all submitted events


## React front end
http://ec2-18-237-65-232.us-west-2.compute.amazonaws.com:8080/
The react frontend does a call to the node service to retrieve a list of all events submitted and then plots them on a map, and provides a list view of the aggregated numbers
