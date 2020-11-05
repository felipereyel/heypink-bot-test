# Pink Message Models Examples

## User Joined

### message
```javascript
{
	"_id": "3N9PhrjXtgB3Lti7B",
	"t": "uj",
	"rid": "5f9c33aafb7e2100095eb88a",
	"ts": {
		"$date": 1604072365480
	},
	"msg": "cliente.pinkapp",
	"u": {
		"_id": "JAPCHgNTFDK29tdCc",
		"username": "cliente.pinkapp"
	},
	"groupable": false,
	"_updatedAt": {
		"$date": 1604072367182
	},
	"workspace": "pinkapp"
}
```

## Add Joined

### message
```javascript
{
	"_id": "q7QLfdfa2P2NTBD5D",
	"t": "au",
	"rid": "5f9c33aafb7e2100095eb88a",
	"ts": {
		"$date": 1604072947966
	},
	"msg": "cliente.pinkapp",
	"u": {
		"_id": "RTWofuX4Xa6zA4gHo",
		"username": "felipe.pinkapp"
	},
	"groupable": false,
	"_updatedAt": {
		"$date": 1604072949813
	},
	"workspace": "pinkapp"
}
```

## Remove Joined

### message
```javascript
{
	"_id": "2WMTQA4p4AcSPpxqX",
	"t": "ru",
	"rid": "5f9c33aafb7e2100095eb88a",
	"ts": {
		"$date": 1604072980795
	},
	"msg": "cliente.pinkapp",
	"u": {
		"_id": "RTWofuX4Xa6zA4gHo",
		"username": "felipe.pinkapp"
	},
	"groupable": false,
	"_updatedAt": {
		"$date": 1604072980795
	},
	"workspace": "pinkapp"
}
```

## Private WhatsApp Message (in a RocketChat channel)

### message
```javascript
{
	"_id": "cE2M7HfaRfrtpRZBY",
	"alias": "Felipe Reyel",
	"msg": "Teste",
	"attachments": [],
	"parseUrls": true,
	"groupable": false,
	"avatar": "https://prd-shd-uploads-wpg.s3.us-east-1.amazonaws.com/profile-placeholder.jpg",
	"ts": {
		"$date": 1604492099834
	},
	"u": {
		"_id": "JAPCHgNTFDK29tdCc",
		"username": "cliente.pinkapp",
		"name": "Cliente"
	},
	"rid": "5f9b88f145feb70008d07ead",
	"_updatedAt": {
		"$date": 1604492105486
	},
	"mentions": [],
	"channels": [],
	"workspace": "pinkapp"
}
```

### messageOptions
```javascript
{
	"roomParticipant": true,
	"roomType": "c",
	"roomName": "felipe-reyel_5521987654321"
}
```

## Group WhatsApp Message (in a RocketChat channel)

### message
```javascript
{
    "_id": "t8AwZ8Xr8nHFbdeNA",
    "alias": "Felipe Reyel",
    "msg": "@5521967760556 teste",
    "attachments": [],
    "parseUrls": true,
    "groupable": false,
    "avatar": "https://prd-shd-uploads-wpg.s3.us-east-1.amazonaws.com/profile-placeholder.jpg",
    "ts": {
        "$date": 1604500487767
    },
    "u": {
        "_id": "JAPCHgNTFDK29tdCc",
        "username": "cliente.pinkapp",
        "name": "Cliente"
    },
    "rid": "5f7dfd47747ff9000846667f",
    "_updatedAt": {
        "$date": 1604500493580
    },
    "mentions": [],
    "channels": [],
    "workspace": "pinkapp"
}
```

### messageOptions
```javascript
{
	"roomParticipant": true,
	"roomType": "c",
	"roomName": "canal-de-testes"
}
```
