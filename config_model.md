# Config Model on Abstra Tables

## Example

```javascript
[
    {
        "id": 72,
        "created_at": "2020-10-22T19:51:10.080Z",
        "updated_at": "2020-10-22T19:51:10.080Z",
        "template": "Olá, o que posso fazer por você?",
        "event": "options",
        "unavailable_text": null,
        "redirect_to": null,
        "availability": null,
        "invalid_option_text": "Desculpa, não entendi",
        "media_url": null,
        "parent_id": -1,
        "opt": {}
    },
    {
        "id": 75,
        "created_at": "2020-10-22T20:08:04.165Z",
        "updated_at": "2020-10-22T20:08:04.165Z",
        "template": "O que o pagodeiro foi fazer na igreja? Foi cantar pá god.",
        "event": "options",
        "unavailable_text": null,
        "redirect_to": null,
        "availability": null,
        "invalid_option_text": "Não entendi.",
        "media_url": null,
        "parent_id": 72,
        "opt": {
            "id": 36,
            "created_at": "2020-10-22T20:08:04.165617",
            "updated_at": "2020-10-22T20:08:04.165617",
            "trigger": "piada",
            "parent_message_id": 72,
            "next_message_id": 75
        }
    },
    {
        "id": 92,
        "created_at": "2020-11-09T20:03:11.775Z",
        "updated_at": "2020-11-09T20:03:11.775Z",
        "template": "Default message",
        "event": "redirect",
        "unavailable_text": null,
        "redirect_to": null,
        "availability": null,
        "invalid_option_text": null,
        "media_url": null,
        "parent_id": 72,
        "opt": {
            "id": 45,
            "created_at": "2020-11-09T20:03:11.775778",
            "updated_at": "2020-11-09T20:03:11.775778",
            "trigger": "3",
            "parent_message_id": 72,
            "next_message_id": 92
        }
    },
    {
        "id": 73,
        "created_at": "2020-10-22T19:56:37.259Z",
        "updated_at": "2020-10-22T19:56:37.259Z",
        "template": "Estou te encaminhando para o setor de engenharia.\nEm breve alguém vai falar com você.",
        "event": "redirect",
        "unavailable_text": "No momento não temos ninguém para te atender. Volte em um horário comercial e tente novamente.",
        "redirect_to": [
            "p1",
            "d1"
        ],
        "availability": {
            "dom": {
                "end": "21:09",
                "start": "09:09"
            },
            "qua": {
                "end": "21:09",
                "start": "09:09"
            },
            "qui": {
                "end": "21:09",
                "start": "09:09"
            },
            "sab": {
                "end": "21:09",
                "start": "09:09"
            },
            "seg": {
                "end": "21:09",
                "start": "09:09"
            },
            "sex": {
                "end": "21:09",
                "start": "09:09"
            },
            "ter": {
                "end": "21:09",
                "start": "09:09"
            }
        },
        "invalid_option_text": null,
        "media_url": null,
        "parent_id": 72,
        "opt": {
            "id": 34,
            "created_at": "2020-10-22T19:56:37.25974",
            "updated_at": "2020-10-22T19:56:37.25974",
            "trigger": "engenharia",
            "parent_message_id": 72,
            "next_message_id": 73
        }
    },
    {
        "id": 74,
        "created_at": "2020-10-22T20:04:28.016Z",
        "updated_at": "2020-10-22T20:04:28.016Z",
        "template": "Até logo! Esperamos te ver em breve.",
        "event": "nothing",
        "unavailable_text": null,
        "redirect_to": null,
        "availability": null,
        "invalid_option_text": null,
        "media_url": null,
        "parent_id": 72,
        "opt": {
            "id": 35,
            "created_at": "2020-10-22T20:04:28.016676",
            "updated_at": "2020-10-22T20:04:28.016676",
            "trigger": "tchau",
            "parent_message_id": 72,
            "next_message_id": 74
        }
    },
    {
        "id": 77,
        "created_at": "2020-10-22T20:12:13.950Z",
        "updated_at": "2020-10-22T20:12:13.950Z",
        "template": "Que pena. Depois pergunta denovo que eu te explico.",
        "event": "nothing",
        "unavailable_text": null,
        "redirect_to": null,
        "availability": null,
        "invalid_option_text": null,
        "media_url": null,
        "parent_id": 75,
        "opt": {
            "id": 38,
            "created_at": "2020-10-22T20:12:13.950829",
            "updated_at": "2020-10-22T20:12:13.950829",
            "trigger": "não",
            "parent_message_id": 75,
            "next_message_id": 77
        }
    },
    {
        "id": 76,
        "created_at": "2020-10-22T20:10:57.359Z",
        "updated_at": "2020-10-22T20:10:57.359Z",
        "template": "Que bom! Depois chama denovo.",
        "event": "nothing",
        "unavailable_text": null,
        "redirect_to": null,
        "availability": null,
        "invalid_option_text": null,
        "media_url": null,
        "parent_id": 75,
        "opt": {
            "id": 37,
            "created_at": "2020-10-22T20:10:57.359652",
            "updated_at": "2020-10-22T20:10:57.359652",
            "trigger": "sim",
            "parent_message_id": 75,
            "next_message_id": 76
        }
    }
]
```
