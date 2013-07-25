load("class.js")
load("vendor/expect.js")

describe.depth = 0;
function describe(description, definition) {
  spaces = []; spaces.length = describe.depth*4; spaces = spaces.join(' ');
  print(spaces+description);
  describe.depth++;
  definition();
  describe.depth--;
};

it = context = describe;


