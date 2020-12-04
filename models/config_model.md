# Config Model on Abstra Tables

## Example

```javascript
{
    "answer_groups": false,
    "initial_message": {
        "id": 27,
        "event": "options",
        "event_details": {
            "invalid_option_text": "Desculpe não entendi."
        },
        "media_url": null,
        "message": "Ola, como posso te ajudar?",
        "child_messages": [
            {
                "trigger": "fin",
                "description": "Falar com o departamento financeiro"
            },
            {
                "trigger": "eng",
                "description": "Falar com o departamento de engenharia"
            },
            {
                "trigger": "comercial",
                "description": "Falar com o departamento comercial"
            }
        ]
    },
    "messages": [
        {
            "id": 27,
            "event": "options",
            "event_details": {
                "invalid_option_text": "Desculpe não entendi."
            },
            "media_url": null,
            "message": "Ola, como posso te ajudar?",
            "child_messages": [
                {
                    "trigger": "fin",
                    "description": "Falar com o departamento financeiro"
                },
                {
                    "trigger": "eng",
                    "description": "Falar com o departamento de engenharia"
                },
                {
                    "trigger": "comercial",
                    "description": "Falar com o departamento comercial"
                }
            ],
            "trigger": "",
            "parent_message_id": null,
            "parent_message": null
        },
        {
            "id": 28,
            "event": "redirect",
            "event_details": {
                "redirect_to": "FINANCEIRO",
                "availability": "09:00/17:00",
                "unavailable_text": "No momento não temos ninguém para te anteder. Tente novamente dentro do horário comercial."
            },
            "media_url": null,
            "message": "Vou te encaminhar para o setor financeiro, em breve alguém vai te atender.",
            "child_messages": [],
            "trigger": "fin",
            "parent_message_id": 27,
            "parent_message": {
                "parent_message_id": null
            }
        },
        {
            "id": 29,
            "event": "end",
            "event_details": {},
            "media_url": null,
            "message": "O departamento de engenharia atende por um numero especial agora. Entre em contato via (21) 98765-4321.",
            "child_messages": [],
            "trigger": "eng",
            "parent_message_id": 27,
            "parent_message": {
                "parent_message_id": null
            }
        },
        {
            "id": 30,
            "event": "options",
            "event_details": {
                "invalid_option_text": "Tente novamente."
            },
            "media_url": null,
            "message": "Sobre o que deseja falar?",
            "child_messages": [
                {
                    "trigger": "vendas",
                    "description": "Fazer uma venda"
                },
                {
                    "trigger": "compras",
                    "description": "Fazer uma compra"
                },
                {
                    "trigger": "voltar",
                    "description": "Voltar ao menu anterior"
                }
            ],
            "trigger": "comercial",
            "parent_message_id": 27,
            "parent_message": {
                "parent_message_id": null
            }
        },
        {
            "id": 31,
            "event": "redirect",
            "event_details": {
                "redirect_to": "COMERCIAL/VENDAS",
                "availability": "09:00/17:00, sex@09:00/15:00",
                "unavailable_text": "Nesse momento não há ninguém para te atender. Tente voltar dentro do horário comercial."
            },
            "media_url": null,
            "message": "Estou te encaminhando para o setor de vendas, logo logo um de nossos atendentes vai falar com você.",
            "child_messages": [],
            "trigger": "vendas",
            "parent_message_id": 30,
            "parent_message": {
                "parent_message_id": 27
            }
        },
        {
            "id": 32,
            "event": "redirect",
            "event_details": {
                "redirect_to": "COMERCIAL/COMPRAS",
                "availability": "09:00/17:00, qua@09:00/23:59, qui@09:00/11:00",
                "unavailable_text": "Nesse momento não há ninguém para te atender. Tente voltar dentro do horário comercial."
            },
            "media_url": null,
            "message": "Vou te encaminhar para o setor de compras, em breve um atendente vem te atender.",
            "child_messages": [],
            "trigger": "compras",
            "parent_message_id": 30,
            "parent_message": {
                "parent_message_id": 27
            }
        },
        {
            "id": 33,
            "event": "goback",
            "event_details": {},
            "media_url": null,
            "message": "",
            "child_messages": [],
            "trigger": "voltar",
            "parent_message_id": 30,
            "parent_message": {
                "parent_message_id": 27
            }
        }
    ]
}
```
