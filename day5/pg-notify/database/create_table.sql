CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
drop table tbl_mst_user;
delete from tbl_mst_user;
CREATE TABLE "tbl_mst_user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    identifier VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

create or replace function public.notify_testevent()
  returns trigger
  language plpgsql
as $function$
begin
	PERFORM pg_notify('new_testevent', row_to_json(NEW)::text);
	return null;
end;
$function$

create trigger updated_test_trigger after insert on tbl_mst_user
for each row execute procedure public.notify_testevent();

-- TESTING
insert into tbl_mst_user(identifier, password) values('wildananugrah@gmail.com', 'p@ssw0rd');
delete from tbl_mst_user;

select * from tbl_mst_user;

SELECT pg_notify('new_testevent', '{"message":"Hello, there!"}');

NOTIFY new_testevent, '{"message":"Hello, there!"}';
LISTEN new_testevent;

SELECT * FROM pg_available_extensions where name = 'pg_notify';

SELECT proname, proargtypes, prosrc FROM pg_proc WHERE proname = 'notify_testevent';