CREATE FUNCTION get_users(email VARCHAR(255))
RETURNS TABLE(id INTEGER, email VARCHAR(255), created_at DATETIME) AS $$
BEGIN
    RETURN QUERY
    SELECT id, email, created_at FROM tbl_mst_user WHERE email = email;
END;
$$ LANGUAGE plpgsql;
