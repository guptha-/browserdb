
/* This file has useful functions for string parsing */

function remove_empty_strings(arr)
{
    var new_arr = [];
    var ind = 0;

    for (var j = 0; j < arr.length; j++)
    {
        if (arr[j] !== "")
        {
            new_arr[ind] = arr[j];
            ind = ind + 1;
        }
    }
    return new_arr;
}

function reverse_string(str)
{
    return (str.split("").reverse().join(""));
}

function remove_contiguous_spaces(str)
{
    var parts = str.split(" ");
    var arr = remove_empty_strings(parts);
    return (arr.join(" "));
}

function remove_spaces_next_to_special_chars(str)
{
    str = str.replace(", ", ",");
    str = str.replace(" ,", ",");

    str = str.replace(" (", "(");
    str = str.replace("( ", "(");

    str = str.replace(" )", ")");
    str = str.replace(") ", ")");

    str = str.replace("' ", "'");
    str = str.replace(" '", "'");

    str = str.replace("\" ", "\"");
    str = str.replace(" \"", "\"");

    str = str.replace("; ", ";");
    str = str.replace(" ;", ";");


    return str;
}

function string_contains(big_string, small_string)
{
    if (big_string.indexOf(small_string) !== -1)
    {
        return true;
    }
    return false;
}