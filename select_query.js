
/* This file has functions for querying an existing table */

function query_select(query)
{
    left_to_from = query.split("from")[0];
    attributes_to_select_string = part1.split("select")[1].replace(" ", "");
    attributes_to_select_list = attributes_to_select_string.split(",");
}