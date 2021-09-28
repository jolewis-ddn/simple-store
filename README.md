<!-- @format -->

# Store and fetch simple JSON structures to/from a Mongo database.

# **WARNINGS - use at your own risk!**

- No password is required to store in the database
- The JSON is not scrubbed at all

## Usage

### Storing

- From the command line:
  - If you have the JSON: `curl "http://server:port/update" -X POST -d @some.json -H "content-type: application/json"`
  - If an app is generating the JSON: `some_app_that_outputs_json | curl "http://server:port/update" -X POST -d @- -H "content-type: application/json"`
- All calls return the ObjectID ("\_id") of the inserted record

### Fetching

- Getting the latest: `http://server:port/latest`
- Getting a specific record: `http://server:port/find/<record_id>`
