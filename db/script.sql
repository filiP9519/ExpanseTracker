create table transaction
(
    stock_name      varchar(255),
    stock_price_atm numeric,
    stock_amount    numeric,
    id              serial
        constraint transaction_id
            primary key
);

alter table transaction
    owner to postgres;


