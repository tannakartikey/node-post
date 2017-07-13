while read in; do heroku config:set "$in"; done < .env.production
