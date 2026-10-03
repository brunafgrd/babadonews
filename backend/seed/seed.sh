#!/bin/sh
# Cadastra as notícias iniciais na API, somente se o banco estiver vazio.

API="http://backend:8080/noticias"

echo "Aguardando o backend responder em $API ..."

tentativas=0

until resposta=$(curl -sf "$API"); do

    tentativas=$((tentativas + 1))

    if [ "$tentativas" -ge 100 ]; then
        echo "O backend não respondeu a tempo."
        exit 1
    fi

    sleep 3

done

if [ "$resposta" != "[]" ]; then
    echo "O banco já possui notícias; nada a fazer."
    exit 0
fi

total=0

while IFS= read -r linha || [ -n "$linha" ]; do

    linha=$(printf '%s' "$linha" | tr -d '\r')

    if [ -z "$linha" ]; then
        continue
    fi

    if curl -sf -o /dev/null -X POST "$API" \
        -H "Content-Type: application/json" \
        --data-binary "$linha"; then
        total=$((total + 1))
    else
        echo "Falha ao cadastrar: $linha"
    fi

done < /seed/noticias.jsonl

echo "$total notícias cadastradas."
