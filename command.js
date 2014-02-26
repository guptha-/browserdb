/**
 * This stores the old outputs. This is to provide an SQLesq output where 
 * outputs from the previous commands are also displayed
 */
var history = "";

/**
 * Gets the command from the prompt
 */
function command_go (form) {
  var cmd = form.commandline.value;
  var output = command_run(cmd);
  form.commandline.focus();
  return false;
}

/**
 * Parses the command from the prompt into individual words
 */
function command_parse (cmd) {
  words = cmd.split(/\s+/);
  
  // Remove leading and trailing blank words.
  while (words.length > 0 && words[0] === "") {
    words = words.slice(1);
  }

  while (words.length > 0 && words[words.length - 1] === "") {
    words = words.slice(0, words.length - 1);
  }

  return words;
}

/**
 * Executes the given command and returns the output
 */
function command_execute (cmd) {
    return command_parse(cmd);
}

/**
 * Gets the command from the prompt, executes the query, and presents the output
 * to the user.
 */
function command_run (cmd) {
  words = command_execute(cmd);

  history = history + words;
  document.getElementById("response").innerHTML = history;
  history = history + "<br>-----------------------------------<br>" ;
  document.getElementById("commandform").reset();
  document.getElementById("commandform").focus();
}
