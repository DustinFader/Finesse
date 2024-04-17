import { serialize, parse } from 'cookie'; // Middleware for cookie options, make sure to run "npm install cookie-parser" so that your package.json has this!

// Kate here - Feel free to move any of this code around to wherever you see fit. Right now it's set up as a bit of a "utility" export, so it can be required and used wherever.



//Cookie setting function here. Takes three params... 
// res = the HTTP response object.
// name = the name of the cookie.
// value = the value to be stored in said cookie!

export function setCookie(res, name, value) {
  const cookieOptions = {
    maxAge: INSERT_HERE, // there's no age at the moment, we can set this to whatever we'd like. By default, I think it lasts for the session... Which is what we want(?)
    httpOnly: true, // This is just so that you can't mess with the cookie using client-side javascript.
    path: '/' // The paths the cookie is available to. This is '/' because it means it'll be accessible by the entire site.
  };

  // Serialize here is a method from the cookie-parser package!
  const cookieValue = serialize(name, value, cookieOptions);
  // This sets the header as the cookie value, or sets the cookie in the browser.
  res.setHeader('Set-Cookie', cookieValue)

};



// This function takes the cookie from the HTTP request.

export function getCookie(req, name) {
  // This parses the 'cookie' header from the request, using cookie-parser's... Parser. 'headers.cookie' is also part of the cookie-parser package; extracts the cookie's key:value pairs.
  const cookies = parse(req.headers.cookie || '');
  // returns the value that corresponds to the referenced cookie's name, will be undefined otherwise.
  return cookies[name]
};



// This should hopefully allow us to work with cookies wherever we need it. 


