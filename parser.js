
var _tablename_array_map = { };

function query_parser_entry(query)
{
    query = normalize_query(query);

    query_type = query.split(" ")[0];

    switch (query_type)
    {
        case "select":
        case "create":
            return query_create(query);
        case "update":
        case "insert":
        case "drop":
        case "alter":
        case "delete":
        default:
            return _error_code_dictionary[2];
            /*invalid or non supported query type*/
    }
}

function normalize_query(query)
{
    /* more rules could be added here, viz: removing redundant contigous spaces, line feeds etc */
    normalized_query = remove_contiguous_spaces(query);
    normalized_query = remove_spaces_next_to_special_chars(normalized_query);
    return normalized_query.toLowerCase();
}