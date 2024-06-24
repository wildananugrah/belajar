CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

drop table tbl_mst_role_attribute;
drop table tbl_mst_user_attribute;
drop table tbl_trx_user_role;
drop table tbl_mst_role;
drop table tbl_mst_user;

delete from tbl_mst_role_attribute;
delete from tbl_mst_user_attribute;
delete from tbl_trx_user_role;
delete from tbl_mst_role;
delete from tbl_mst_user;

CREATE TABLE "tbl_mst_user" (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    identifier VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create tbl_mst_role table
CREATE TABLE "tbl_mst_role" (
    role_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tbl_trx_user_role table
CREATE TABLE "tbl_trx_user_role" (
    user_role_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    role_id UUID NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES "tbl_mst_user" (user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES "tbl_mst_role" (role_id) ON DELETE CASCADE
);

-- Create tbl_mst_user_attribute table
CREATE TABLE "tbl_mst_user_attribute" (
    user_attribute_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    module VARCHAR(255) NOT NULL,
    attributes JSONB NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES "tbl_mst_user" (user_id) ON DELETE CASCADE
);

-- Create tbl_mst_role_attribute table
CREATE TABLE "tbl_mst_role_attribute" (
    role_attribute_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID NOT NULL,
    module VARCHAR(255) NOT NULL,
    attributes JSONB NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES "tbl_mst_role" (role_id) ON DELETE CASCADE
);  