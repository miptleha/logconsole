# logconsole
Change output of Node.JS console to log4net format

## Usage

```
var console = require('logconsole'); //replaces standart console
console.log('debug message');
console.error('error message');
```

Now messages in console contains timestamp, module name and '!!!ERROR' prefix (if error)

```
18:53:55.428 app - log attached
18:53:55.436 app - debug message
18:53:55.438 app - !!!ERROR error message
```

