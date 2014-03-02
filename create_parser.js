
/* This file has functions for creating the in-memory table */

function query_create(query)
{
    var right_to_table = query.split("table")[1];
    var table_name = right_to_table.split("(")[0].trim();

    var attributes_with_types_string = right_to_table.substring
            (right_to_table.indexOf("(") + 1, right_to_table.length);
            
    var tmp_rev_string = reverse_string(attributes_with_types_string);
    
    tmp_rev_string = tmp_rev_string.substring(tmp_rev_string.indexOf(")") + 1,
                                               tmp_rev_string.length);

    var final_attributes_with_type_string = reverse_string(tmp_rev_string);
    var attribute_with_type_list = final_attributes_with_type_string.split(",");
    var num_attributes = attribute_with_type_list.length;

    var in_mem_table = new Object();
    in_mem_table.attributes_type_map = {};
    in_mem_table.attribute_tuples_map = {};
    in_mem_table.attribute_canbe_null_map = {};
    in_mem_table.attribute_is_primary_map = {};

    if (!(table_name in _tablename_array_map))
    {
        for (var i = 0; i < num_attributes; i++)
        {
            var attribute = attribute_with_type_list[i];
            add_attribute_to_table(in_mem_table, attribute);
        }
        _tablename_array_map[table_name] = in_mem_table;
        return _error_code_dictionary[0];
    }
    return _error_code_dictionary[1];
}

function add_attribute_to_table(obj, attribute)
{
    var arr = attribute.split(" ");
    var new_arr = remove_empty_strings(arr);

    var name = new_arr[0];
    var type = new_arr[1];
    var can_be_null = true;
    var is_primary = false;

    if (new_arr.length > 2)
    {
        if (string_contains(attribute, "not null"))
        {
            can_be_null = false;
        }

        if (string_contains(attribute, "primary key"))
        {
            is_primary = true;
            can_be_null = false;
        }
    }

    obj.attribute_is_primary_map[name] = is_primary;
    obj.attribute_canbe_null_map[name] = can_be_null;
    obj.attributes_type_map[name] = type;
    obj.attribute_tuples_map[name] = [];
}