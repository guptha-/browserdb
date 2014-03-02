
/* This file has functions for inserting a tuple into an existing table */

function query_insert(query)
{
    var right_to_into = query.split("into")[1];
    var table_name = right_to_into.split("(")[0].trim();

    if (!table_name in _tablename_array_map)
    {
        return _error_code_dictionary[5];
    }

    var attributes_name_string = right_to_into.split("(")[1].split(")")[0];
    var attribute_name_list = attributes_name_string.split(",");

    var right_to_values = query.split("values")[1];
    var attribute_value_string = right_to_values.split("(")[1].split(")")[0];
    var attribute_value_list = attribute_value_string.split(",");

    if (attribute_name_list.length !== attribute_value_list.length)
    {
        return _error_code_dictionary[4];
    }

    var num_attributes = attribute_name_list.length;

    for (var i = 0; i < num_attributes; i++)
    {
        var attr_name = attribute_name_list[i];
        var attr_value = attribute_value_list[i];
        var attr_type = _tablename_array_map[table_name].attributes_type_map[attr_name];

        var is_string_literal = (attr_value[0] === "'" || attr_value[0] === "\"");
        var is_varchar = false;
        var is_variable_name_supplied = false;

        if (!is_string_literal)
        {
            if (typeof window['attr_value'] === "string")
            {
                is_varchar = true;
                is_variable_name_supplied = true;
            }
        }
        else
        {
            is_varchar = true;
        }

        var is_num = typeof parseInt(attr_value) === "number";

        if (!is_num)
        {
            if (typeof window['attr_value'] === "number")
            {
                is_num = true;
                is_variable_name_supplied = true;
            }
        }

        if (attr_type.split("(")[0] === "varchar" && !is_varchar)
        {
            return _error_code_dictionary[6];
        }
        else if (attr_type.split("(")[0] === "int" && !is_num)
        {
            return _error_code_dictionary[6];
        }
        else if (attr_type.split("(").length === 2)
        {
            var char_limit = parseInt(attr_type.split("(")[1].split(")")[0]);
            var apparent_len = 0;
            if (!is_variable_name_supplied)
            {
                apparent_len = attr_value.length;
            }
            else
            {
                apparent_len = window['attr_value'].length;
            }

            if (apparent_len > char_limit)
            {
                return _error_code_dictionary[7];
            }
        }

        if (is_variable_name_supplied)
        {
            _tablename_array_map[table_name].attribute_tuples_map[attr_name].push(window['attr_value']);
        }
        else
        {
            if (is_varchar)
            {
                _tablename_array_map[table_name].attribute_tuples_map[attr_name].push(attr_value);
            }
            else if (is_num)
            {
                _tablename_array_map[table_name].attribute_tuples_map[attr_name].push(parseFloat(attr_value));
            }
        }
    }
    return _error_code_dictionary[8];
}