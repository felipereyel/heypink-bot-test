# Pink Message Models Examples

## BOT Joined

### message
```javascript
{
    "id": "y8tohKGT5RMKrdLD3",
    "user": {
        "id": "aALXQRgiLqFRwyu5v",
        "name": "felipe.reyel.pinkapp",
        "room": {
            "id": "9tWmFD9RnH4TpLyw4",
            "type": "c",
            "name": "lucas-panaro_21969350888.pinkapp"
        }
    },
    "text": "customer.bot.pinkapp"
}
```

## OTHER Joined

### message
```javascript
{
    "id": "vjfhKt7dWpHCLoDJP",
    "user": {
        "id": "NRdE2GhuNyKCYD2Eh",
        "name": "panaro.pinkapp",
        "room": {
            "id": "9tWmFD9RnH4TpLyw4",
            "type": "c",
            "name": "lucas-panaro_21969350888.pinkapp"
        }
    },
    "text": "rhuan.pinkapp"
}
```

## OTHER Removed

### message
```javascript
{
    "id": "wnLTNvuegMq4hNzd9",
    "user": {
        "id": "NRdE2GhuNyKCYD2Eh",
        "name": "panaro.pinkapp",
        "room": {
            "id": "9tWmFD9RnH4TpLyw4",
            "type": "c",
            "name": "lucas-panaro_21969350888.pinkapp"
        }
    },
    "text": "rhuan.pinkapp"
}
```

## WhatsApp Message (in a RocketChat channel)

### message
```javascript
{
    "id": "b3LpHdEyWLBakmXfK",
    "user": {
        "id": "uSshWg22TFM6rWF97",
        "fullName": "Cliente",
        "name": "cliente.5521967760556.pinkapp",
        "room": {
            "id": "9tWmFD9RnH4TpLyw4",
            "type": "c",
            "name": "lucas-panaro_21969350888.pinkapp"
        }
    },
    "text": "oi"
}
```

## DM

### message
```javascript
{
    "id": "EEMeKLA8o4Qfw4pjT",
    "user": {
        "id": "aALXQRgiLqFRwyu5v",
        "name": "felipe.reyel.pinkapp",
        "room": {
            "id": "aALXQRgiLqFRwyu5viuTYQqcHQGgMdWWRW",
            "type": "d"
        },
        "fullName": "felipe reyel"
    },
    "text": "BOT-TEST oi"
}
```
