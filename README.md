## Cultural Data Ingestor

This program uses Cheerio scripts to ingest do and don't data of six Asian countries from [Cultural Atlas](https://culturalatlas.sbs.com.au/). All raw data has been parsed and written into a single JSON file called countries_culture.json, which will be used to build an API.

### Sample Data - China

![chinese-sample-data](https://user-images.githubusercontent.com/54561518/109869295-4b623800-7c2e-11eb-8324-e459b5b6166c.JPG)

### Run JSDoc

    $ npm run docs

Then run the command `http-server` from the docs directory, and you can visit `http://localhost:8080` to view your documentation page.
