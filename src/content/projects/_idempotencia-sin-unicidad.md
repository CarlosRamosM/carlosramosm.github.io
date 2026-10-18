---
title: Idempotencia sin restricciones de unicidad
description: Evitar inserciones duplicadas sin depender de un UNIQUE en la base de datos.
topic: Resiliencia
repo: https://github.com/carlosramosm/proyecto-x
tags: [java, spring-boot]
---

> Proyecto de ejemplo: reemplaza el contenido y el enlace `repo` por los reales.

## Problema

Un consumidor de mensajes puede recibir el mismo evento más de una vez. Sin una restricción de
unicidad en la tabla destino, ¿cómo evitamos insertar duplicados?

## Decisiones de arquitectura

- Registro de claves de idempotencia por evento.
- Verificación y escritura dentro de la misma transacción.

## Diagrama

```mermaid
sequenceDiagram
  participant C as Consumidor
  participant S as Servicio
  participant DB as Base de datos
  C->>S: Evento (id)
  S->>DB: ¿Existe clave de idempotencia?
  alt Ya procesado
    S-->>C: Ignorar
  else Nuevo
    S->>DB: Insertar registro + clave (misma TX)
    S-->>C: OK
  end
```
