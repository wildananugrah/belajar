CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "tbl_mst_user" (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    identifier VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE "tbl_mst_todo"(
    todo_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL DEFAULT '(un-name)',
    description VARCHAR(255) NOT NULL DEFAULT '(un-described)',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES "tbl_mst_user" (user_id) ON DELETE CASCADE
);