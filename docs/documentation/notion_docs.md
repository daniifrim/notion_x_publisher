# Query Database


```
curl -X POST 'https://api.notion.com/v1/databases/897e5a76ae524b489fdfe71f5945d1af/query' \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H 'Notion-Version: 2022-06-28' \
  -H "Content-Type: application/json" \
--data '{
  "filter": {
    "or": [
      {
        "property": "In stock",
"checkbox": {
"equals": true
}
      },
      {
"property": "Cost of next trip",
"number": {
"greater_than_or_equal_to": 2
}
}
]
},
  "sorts": [
    {
      "property": "Last ordered",
      "direction": "ascending"
    }
  ]
}'
```

# Retrieve a page

curl 'https://api.notion.com/v1/pages/b55c9c91-384d-452b-81db-d1ef79372b75' \
  -H 'Notion-Version: 2022-06-28' \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"''

