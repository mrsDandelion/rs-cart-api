create extension if not exists "uuid-ossp";

CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');

create table carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null default uuid_generate_v4(),
	created_at date not null,
	updated_at date not null,
	status cart_status NOT NULL DEFAULT 'OPEN'
);

create table cart_items (
	product_id uuid not null,
	count integer not null
);

alter table cart_items add column cart_id uuid references carts(id);

insert into carts (id, user_id, created_at, updated_at, status) values (uuid_generate_v4(), uuid_generate_v4(), NOW(), NOW(), 'OPEN');
insert into carts (id, user_id, created_at, updated_at, status) values (uuid_generate_v4(), uuid_generate_v4(), NOW(), NOW(), 'ORDERED');

insert into cart_items (cart_id, product_id, count) values ('a9ec416d-fdd9-4d78-815c-51bc1c53f39a', 'f13837a4-d644-47fe-a21f-347ad9f6f595', 3);
insert into cart_items (cart_id, product_id, count) values ('a9ec416d-fdd9-4d78-815c-51bc1c53f39a', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 33);

create table orders (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null default uuid_generate_v4(),
	payment JSON NOT null,
	delivery JSON NOT null,
	comments TEXT NOT null,
	status TEXT NOT NULL DEFAULT 'ORDERED',
	total integer not null DEFAULT 1
);

alter table orders add column cart_id uuid references carts(id);