# IEEE Sri Lanka Inspire National Project Website

View the website: [http://github.ieee.lk/slinspire.lk/](http://github.ieee.lk/slinspire.lk/)


Setup Degree Search datbase:
    For local Enviornment :
        create .env file with key TSV_URL and assign tsv url as a value
        then run:
            npm install dotenv

    For gitub hosting enviornemtn :
        Go to your repo → Settings > Secrets > Actions
        Add a new secret:
            Name: GOOGLE_SHEET_TSV_URL
            Value : {tsv sheet url}

After development completion, for deploing in github pages:
    run:
        npm run deploy