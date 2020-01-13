// fixed field 43 is the expiration date
// var field "z" is the email address
function getQuery(expirationDate) {
  var query =
  {
    "queries": [
      {
        "target": {
          "record": {
            "type": "patron"
          },
          "id": 43
        },
        "expr": {
          "op": "equals",
          "operands": [
            expirationDate,
            ""
          ]
        }
      },
      "and",
      {
        "target": {
          "record": {
            "type": "patron"
          },
          "field": {
            "tag": "z"
          }
        },
        "expr": {
          "op": "has",
          "operands": [
            "@",
            ""
          ]
        }
      }
    ]
  };

  return query;
}