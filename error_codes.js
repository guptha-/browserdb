
/* The method below stores the error codes in key value pairs */

function initialize_error_codes()
{
    _error_code_dictionary =
            {
                0: "Table creation successful",
                1: "Table name already exists",
                2: "Unrecognized query type",
                3: "Nested queries not supported by parser",
                4: "No. of attributes not equal to no. of values supplied",
                5: "Table does not exist",
                6: "Type mismatch between attribute and its value supplied",
                7: "Given string exceeds set character limit",
                8: "Tuple successfully inserted into table"
            };
}