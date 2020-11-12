# Message Models Examples

## DM

### message
```javascript
{
    "_id": "HGZogasHYAXnRsw9r",
    "rid": "Cc5SnCdvpFRMrTD6vpYoBqDLgQsn9obkmm",
    "msg": "hi",
    "ts": {
        "$date": 1603417485445
    },
    "u": {
        "_id": "Cc5SnCdvpFRMrTD6v",
        "username": "felipereyel",
        "name": "Felipe Reyel"
    },
    "_updatedAt": {
        "$date": 1603417485466
    },
    "mentions": [],
    "channels": []
}
```

### messageOptions
```javascript
{
    "roomParticipant": true,
    "roomType": "d"
}
```

## Channel

### message
```javascript
{
    "_id": "sonfKaLGJ3LWxDbuP",
    "rid": "GENERAL",
    "msg": "hi",
    "ts": {
        "$date": 1603417281020
    },
    "u": {
        "_id": "Cc5SnCdvpFRMrTD6v",
        "username": "felipereyel",
        "name": "Felipe Reyel"
    },
    "_updatedAt": {
        "$date": 1603417281043
    },
    "mentions": [],
    "channels": []
}
```

### messageOptions
```javascript
{
    "roomParticipant": true,
    "roomType": "c",
    "roomName": "general"
}
```
