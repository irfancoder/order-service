# order-service

Order service for Setel's assessment.

## Prerequisites

- nodejs (lts)
- docker

## Description

There are 3 services to be aware of:

- order-service     
    - port: 3000 [client], 
    - port: 3003 [microservice]
- payment-service
    - port: 3002
- setel-frontend    
    - port: 3001

Proceed to clone all of the repos in to your local machine.

## Installation

1. `yarn install`
2. `docker-compose up -d`                       - Up mysql & run init sql script
3. `yarn prisma migrate dev`                    - Run migration of tables 
4. `yarn prisma db seed`                        - Seed the `Product` table
5. `yarn start:dev`                             - Run service


irfanismail