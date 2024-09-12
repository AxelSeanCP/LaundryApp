Associations

- service has many options
- options belongs to service
- service has many transactions
- member has many transactions
- transaction belongs to member and service

Service model

- name: name of the service, example = "Cuci Setrika"
- unit: unit of measurement for the service, example = "kiloan" (kg)

Option model

- name: name of the option for a service, example = "express"
- price: price of the option for a service, example = 10000 (per unit in service)
