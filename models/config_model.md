# Config Model on Abstra Tables

## Example

```javascript
{
    "answer_groups": false,
    "initial_message": {
        "id": 1,
        "event": "options",
        "event_details": {
            "invalid_option_text": "Tente novamente"
        },
        "media_url": null,
        "message": "Hello World",
        "child_messages": [
            {
                "trigger": "xau",
                "description": "Encerrar interacao"
            },
            {
                "trigger": "eng",
                "description": "Falar com o setor de engenharia"
            },
            {
                "trigger": "piada",
                "description": "Escutar uma piada"
            }
        ]
    },
    "messages": [
        {
            "id": 1,
            "event": "options",
            "event_details": {
                "invalid_option_text": "Tente novamente"
            },
            "media_url": null,
            "message": "Hello World",
            "child_messages": [
                {
                    "trigger": "xau",
                    "description": "Encerrar interacao"
                },
                {
                    "trigger": "eng",
                    "description": "Falar com o setor de engenharia"
                },
                {
                    "trigger": "piada",
                    "description": "Escutar uma piada"
                }
            ],
            "trigger": null,
            "parent_message_id": null
        },
        {
            "id": 2,
            "event": "end",
            "event_details": {},
            "media_url": null,
            "message": "Ate logo 👋",
            "child_messages": [],
            "trigger": "xau",
            "parent_message_id": 1
        },
        {
            "id": 3,
            "event": "redirect",
            "event_details": {
                "redirect_to": [
                    "Jose",
                    "Engenharia"
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
                        "end": "23:30",
                        "start": "09:09"
                    }
                },
                "unavailable_text": "No momento estamos sem ninguem para te anteder. Tente dentro do horario comercial"
            },
            "media_url": null,
            "message": "Estou te encaminhando, em breve alguem vem falar com voce",
            "child_messages": [],
            "trigger": "eng",
            "parent_message_id": 1
        },
        {
            "id": 5,
            "event": "options",
            "event_details": {
                "invalid_option_text": "Desculpa nao entendi"
            },
            "media_url": null,
            "message": "O que o pagodeiro foi fazer na igreja? Foi cantar pá god. Entendeu?",
            "child_messages": [
                {
                    "trigger": "sim",
                    "description": "Saquei, piada genial"
                },
                {
                    "trigger": "nao",
                    "description": "Nao entendi."
                }
            ],
            "trigger": "piada",
            "parent_message_id": 1
        },
        {
            "id": 6,
            "event": "end",
            "event_details": {},
            "media_url": null,
            "message": "Valeu. Depois chama denovo.",
            "child_messages": [],
            "trigger": "sim",
            "parent_message_id": 5
        },
        {
            "id": 7,
            "event": "end",
            "event_details": {},
            "media_url": null,
            "message": "Que pena. Tenta mais tarde denovo que acho que voce entende.",
            "child_messages": [],
            "trigger": "nao",
            "parent_message_id": 5
        }
    ]
}
```
