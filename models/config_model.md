# Config Model on Abstra Tables

## Example

```javascript
{
    "answer_groups": false,
    "initial_message": {
        "id": 7,
        "event": "options",
        "event_details": {
            "invalid_option_text": "Desculpe não entendi."
        },
        "media_url": null,
        "message": "Hey, bem-vindo a Pink 🙂",
        "child_messages": [
            {
                "trigger": "1",
                "description": "Comercial"
            },
            {
                "trigger": "2",
                "description": "Suporte"
            },
            {
                "trigger": "3",
                "description": "Financeiro"
            },
            {
                "trigger": "4",
                "description": "Outros"
            }
        ]
    },
    "messages": [
        {
            "id": 7,
            "event": "options",
            "event_details": {
                "invalid_option_text": "Desculpe não entendi."
            },
            "media_url": null,
            "message": "Hey, bem-vindo a Pink 🙂",
            "child_messages": [
                {
                    "trigger": "1",
                    "description": "Comercial"
                },
                {
                    "trigger": "2",
                    "description": "Suporte"
                },
                {
                    "trigger": "3",
                    "description": "Financeiro"
                },
                {
                    "trigger": "4",
                    "description": "Outros"
                }
            ],
            "trigger": "",
            "parent_message_id": null,
            "parent_message": null
        },
        {
            "id": 8,
            "event": "redirect",
            "event_details": {
                "redirect_to": "COMERCIAL",
                "availability": "08:00/20:00",
                "unavailable_text": "Nesse momento não há ninguém para te atender. Tente voltar dentro do horário de atendimento, 08h às 20h (Dias úteis)."
            },
            "media_url": null,
            "message": "Legal! Um Pinker já vai falar com você :)\n\nLembrando que nosso horário de atendimento é de 08h às 20h (Dias úteis).",
            "child_messages": [],
            "trigger": "1",
            "parent_message_id": 7,
            "parent_message": {
                "id": 7,
                "message": "Hey, bem-vindo a Pink 🙂",
                "child_messages": [
                    {
                        "trigger": "1",
                        "description": "Comercial"
                    },
                    {
                        "trigger": "2",
                        "description": "Suporte"
                    },
                    {
                        "trigger": "3",
                        "description": "Financeiro"
                    },
                    {
                        "trigger": "4",
                        "description": "Outros"
                    }
                ]
            }
        },
        {
            "id": 9,
            "event": "redirect",
            "event_details": {
                "redirect_to": "SUPORTE",
                "availability": "08:00/20:00",
                "unavailable_text": "Nesse momento não há ninguém para te atender. Tente voltar dentro do horário de atendimento, 08h às 20h (Dias úteis)."
            },
            "media_url": null,
            "message": "Diga o seu nome, empresa e como podemos te ajudar para agilizar seu o atendimento. 😉",
            "child_messages": [],
            "trigger": "2",
            "parent_message_id": 7,
            "parent_message": {
                "id": 7,
                "message": "Hey, bem-vindo a Pink 🙂",
                "child_messages": [
                    {
                        "trigger": "1",
                        "description": "Comercial"
                    },
                    {
                        "trigger": "2",
                        "description": "Suporte"
                    },
                    {
                        "trigger": "3",
                        "description": "Financeiro"
                    },
                    {
                        "trigger": "4",
                        "description": "Outros"
                    }
                ]
            }
        },
        {
            "id": 10,
            "event": "redirect",
            "event_details": {
                "redirect_to": "FINANCEIRO",
                "availability": "08:00/20:00",
                "unavailable_text": "Nesse momento não há ninguém para te atender. Tente voltar dentro do horário de atendimento, 08h às 20h (Dias úteis)."
            },
            "media_url": null,
            "message": "Diga o seu nome, empresa e como podemos te ajudar para agilizar seu o atendimento. 😉",
            "child_messages": [],
            "trigger": "3",
            "parent_message_id": 7,
            "parent_message": {
                "id": 7,
                "message": "Hey, bem-vindo a Pink 🙂",
                "child_messages": [
                    {
                        "trigger": "1",
                        "description": "Comercial"
                    },
                    {
                        "trigger": "2",
                        "description": "Suporte"
                    },
                    {
                        "trigger": "3",
                        "description": "Financeiro"
                    },
                    {
                        "trigger": "4",
                        "description": "Outros"
                    }
                ]
            }
        },
        {
            "id": 11,
            "event": "redirect",
            "event_details": {
                "redirect_to": "GENERAL",
                "availability": "08:00/20:00",
                "unavailable_text": "Nesse momento não há ninguém para te atender. Tente voltar dentro do horário de atendimento, 08h às 20h (Dias úteis)."
            },
            "media_url": null,
            "message": "Legal! Um Pinker já vai falar com você :)\n\nLembrando que nosso horário de atendimento é de 08h às 20h (Dias úteis).",
            "child_messages": [],
            "trigger": "4",
            "parent_message_id": 7,
            "parent_message": {
                "id": 7,
                "message": "Hey, bem-vindo a Pink 🙂",
                "child_messages": [
                    {
                        "trigger": "1",
                        "description": "Comercial"
                    },
                    {
                        "trigger": "2",
                        "description": "Suporte"
                    },
                    {
                        "trigger": "3",
                        "description": "Financeiro"
                    },
                    {
                        "trigger": "4",
                        "description": "Outros"
                    }
                ]
            }
        }
    ]
}
```
