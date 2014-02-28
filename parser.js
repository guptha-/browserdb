
var _tablename_array_map = {};

function query_parser_entry(query)
{
    query = normalize_query(query);

	query_type = query.split(" ")[0];
	
	switch(query_type)
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
	return query.toLowerCase();
}

/* region: separate parser functions for each query type */

function query_create(query)
{
    var right_to_table = query.split("table")[1];
	var table_name = right_to_table.split("(")[0];
        
    var attributes_with_types_string = right_to_table.substring(right_to_table.indexOf("(") + 1, right_to_table.length);
    var tmp_rev_string = reverse_string(attributes_with_types_string);
    tmp_rev_string = tmp_rev_string.substring(tmp_rev_string.indexOf(")") + 1, tmp_rev_string.length);
	
    var final_attributes_with_type_string = reverse_string(tmp_rev_string);	
    var attribute_with_type_list = final_attributes_with_type_string.split(",");
	var num_attributes = attribute_with_type_list.length

    var in_mem_table = new Object();
    in_mem_table.attributes_type_map = { };
    in_mem_table.attribute_tuples_map = { };

    if(!(table_name in _tablename_array_map))
    {
       for(var i = 0; i < num_attributes; i++)
       {
    	   var attribute_type = attribute_with_type_list[i];
           var arr = attribute_type.split(" ");
           var new_arr = remove_empty_strings(arr);

 		   var name = new_arr[0];
 		   var type = new_arr[1];

   		   in_mem_table.attributes_type_map[name] = type;    		
   		   in_mem_table.attribute_tuples_map[name] = [];
        }
        _tablename_array_map[table_name] = in_mem_table;
        return _error_code_dictionary[0];
    }
    return _error_code_dictionary[1];
}

function query_select(query)
{
	left_to_from = query.split("from")[0];
	attributes_to_select_string = part1.split("select")[1].replace(" ","");
    attributes_to_select_list = attributes_to_select_string.split(",");
}