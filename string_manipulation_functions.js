

function remove_empty_strings(arr)
{
	var new_arr = [];
	var ind = 0;

	for(var j = 0; j < arr.length; j++)
	{
	    if(arr[j] !== "")
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