Associations

- all belong to one organization including users
- service has many options
- options belongs to service
- service has many transactions
- member has many transactions
- transaction belongs to member and service

Organization model

- root account for a laundry organization
- name: name of the organization, example = "Lotus Laundry"

User Model

- user account for a laundry organization

Service model

- name: name of the service, example = "Cuci Setrika"
- unit: unit of measurement for the service, example = "kiloan" (kg)

Option model

- name: name of the option for a service, example = "express"
- price: price of the option for a service, example = 10000 (per unit in service)

Transaction model

- status: server will decide at first but able to be changed
- totalPrice: server will decide
- paymentStatus: server will decide

TransactionOption model

- qty: quantity of laundered clothes (kg or pieces)
