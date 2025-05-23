(function(scope){
    'use strict';
    
    function F(arity, fun, wrapper) {
      wrapper.a = arity;
      wrapper.f = fun;
      return wrapper;
    }
    
    function F2(fun) {
      return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
    }
    function F3(fun) {
      return F(3, fun, function(a) {
        return function(b) { return function(c) { return fun(a, b, c); }; };
      });
    }
    function F4(fun) {
      return F(4, fun, function(a) { return function(b) { return function(c) {
        return function(d) { return fun(a, b, c, d); }; }; };
      });
    }
    function F5(fun) {
      return F(5, fun, function(a) { return function(b) { return function(c) {
        return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
      });
    }
    function F6(fun) {
      return F(6, fun, function(a) { return function(b) { return function(c) {
        return function(d) { return function(e) { return function(f) {
        return fun(a, b, c, d, e, f); }; }; }; }; };
      });
    }
    function F7(fun) {
      return F(7, fun, function(a) { return function(b) { return function(c) {
        return function(d) { return function(e) { return function(f) {
        return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
      });
    }
    function F8(fun) {
      return F(8, fun, function(a) { return function(b) { return function(c) {
        return function(d) { return function(e) { return function(f) {
        return function(g) { return function(h) {
        return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
      });
    }
    function F9(fun) {
      return F(9, fun, function(a) { return function(b) { return function(c) {
        return function(d) { return function(e) { return function(f) {
        return function(g) { return function(h) { return function(i) {
        return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
      });
    }
    
    function A2(fun, a, b) {
      return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
    }
    function A3(fun, a, b, c) {
      return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
    }
    function A4(fun, a, b, c, d) {
      return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
    }
    function A5(fun, a, b, c, d, e) {
      return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
    }
    function A6(fun, a, b, c, d, e, f) {
      return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
    }
    function A7(fun, a, b, c, d, e, f, g) {
      return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
    }
    function A8(fun, a, b, c, d, e, f, g, h) {
      return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
    }
    function A9(fun, a, b, c, d, e, f, g, h, i) {
      return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
    }
    
    console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');
    
    
    var _List_Nil_UNUSED = { $: 0 };
    var _List_Nil = { $: '[]' };
    
    function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
    function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }
    
    
    var _List_cons = F2(_List_Cons);
    
    function _List_fromArray(arr)
    {
        var out = _List_Nil;
        for (var i = arr.length; i--; )
        {
            out = _List_Cons(arr[i], out);
        }
        return out;
    }
    
    function _List_toArray(xs)
    {
        for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
        {
            out.push(xs.a);
        }
        return out;
    }
    
    var _List_map2 = F3(function(f, xs, ys)
    {
        for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
        {
            arr.push(A2(f, xs.a, ys.a));
        }
        return _List_fromArray(arr);
    });
    
    var _List_map3 = F4(function(f, xs, ys, zs)
    {
        for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
        {
            arr.push(A3(f, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    });
    
    var _List_map4 = F5(function(f, ws, xs, ys, zs)
    {
        for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
        {
            arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    });
    
    var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
    {
        for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
        {
            arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    });
    
    var _List_sortBy = F2(function(f, xs)
    {
        return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
            return _Utils_cmp(f(a), f(b));
        }));
    });
    
    var _List_sortWith = F2(function(f, xs)
    {
        return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
            var ord = A2(f, a, b);
            return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
        }));
    });
    
    
    
    // EQUALITY
    
    function _Utils_eq(x, y)
    {
        for (
            var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
            isEqual && (pair = stack.pop());
            isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
            )
        {}
    
        return isEqual;
    }
    
    function _Utils_eqHelp(x, y, depth, stack)
    {
        if (depth > 100)
        {
            stack.push(_Utils_Tuple2(x,y));
            return true;
        }
    
        if (x === y)
        {
            return true;
        }
    
        if (typeof x !== 'object' || x === null || y === null)
        {
            typeof x === 'function' && _Debug_crash(5);
            return false;
        }
    
        /**/
        if (x.$ === 'Set_elm_builtin')
        {
            x = elm$core$Set$toList(x);
            y = elm$core$Set$toList(y);
        }
        if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
        {
            x = elm$core$Dict$toList(x);
            y = elm$core$Dict$toList(y);
        }
        //*/
    
        /**_UNUSED/
        if (x.$ < 0)
        {
            x = elm$core$Dict$toList(x);
            y = elm$core$Dict$toList(y);
        }
        //*/
    
        for (var key in x)
        {
            if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
            {
                return false;
            }
        }
        return true;
    }
    
    var _Utils_equal = F2(_Utils_eq);
    var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });
    
    
    
    // COMPARISONS
    
    // Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
    // the particular integer values assigned to LT, EQ, and GT.
    
    function _Utils_cmp(x, y, ord)
    {
        if (typeof x !== 'object')
        {
            return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
        }
    
        /**/
        if (x instanceof String)
        {
            var a = x.valueOf();
            var b = y.valueOf();
            return a === b ? 0 : a < b ? -1 : 1;
        }
        //*/
    
        /**_UNUSED/
        if (typeof x.$ === 'undefined')
        //*/
        /**/
        if (x.$[0] === '#')
        //*/
        {
            return (ord = _Utils_cmp(x.a, y.a))
                ? ord
                : (ord = _Utils_cmp(x.b, y.b))
                    ? ord
                    : _Utils_cmp(x.c, y.c);
        }
    
        // traverse conses until end of a list or a mismatch
        for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
        return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
    }
    
    var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
    var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
    var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
    var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });
    
    var _Utils_compare = F2(function(x, y)
    {
        var n = _Utils_cmp(x, y);
        return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
    });
    
    
    // COMMON VALUES
    
    var _Utils_Tuple0_UNUSED = 0;
    var _Utils_Tuple0 = { $: '#0' };
    
    function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
    function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }
    
    function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
    function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }
    
    function _Utils_chr_UNUSED(c) { return c; }
    function _Utils_chr(c) { return new String(c); }
    
    
    // RECORDS
    
    function _Utils_update(oldRecord, updatedFields)
    {
        var newRecord = {};
    
        for (var key in oldRecord)
        {
            newRecord[key] = oldRecord[key];
        }
    
        for (var key in updatedFields)
        {
            newRecord[key] = updatedFields[key];
        }
    
        return newRecord;
    }
    
    
    // APPEND
    
    var _Utils_append = F2(_Utils_ap);
    
    function _Utils_ap(xs, ys)
    {
        // append Strings
        if (typeof xs === 'string')
        {
            return xs + ys;
        }
    
        // append Lists
        if (!xs.b)
        {
            return ys;
        }
        var root = _List_Cons(xs.a, ys);
        xs = xs.b
        for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
        {
            curr = curr.b = _List_Cons(xs.a, ys);
        }
        return root;
    }
    
    
    
    var _JsArray_empty = [];
    
    function _JsArray_singleton(value)
    {
        return [value];
    }
    
    function _JsArray_length(array)
    {
        return array.length;
    }
    
    var _JsArray_initialize = F3(function(size, offset, func)
    {
        var result = new Array(size);
    
        for (var i = 0; i < size; i++)
        {
            result[i] = func(offset + i);
        }
    
        return result;
    });
    
    var _JsArray_initializeFromList = F2(function (max, ls)
    {
        var result = new Array(max);
    
        for (var i = 0; i < max && ls.b; i++)
        {
            result[i] = ls.a;
            ls = ls.b;
        }
    
        result.length = i;
        return _Utils_Tuple2(result, ls);
    });
    
    var _JsArray_unsafeGet = F2(function(index, array)
    {
        return array[index];
    });
    
    var _JsArray_unsafeSet = F3(function(index, value, array)
    {
        var length = array.length;
        var result = new Array(length);
    
        for (var i = 0; i < length; i++)
        {
            result[i] = array[i];
        }
    
        result[index] = value;
        return result;
    });
    
    var _JsArray_push = F2(function(value, array)
    {
        var length = array.length;
        var result = new Array(length + 1);
    
        for (var i = 0; i < length; i++)
        {
            result[i] = array[i];
        }
    
        result[length] = value;
        return result;
    });
    
    var _JsArray_foldl = F3(function(func, acc, array)
    {
        var length = array.length;
    
        for (var i = 0; i < length; i++)
        {
            acc = A2(func, array[i], acc);
        }
    
        return acc;
    });
    
    var _JsArray_foldr = F3(function(func, acc, array)
    {
        for (var i = array.length - 1; i >= 0; i--)
        {
            acc = A2(func, array[i], acc);
        }
    
        return acc;
    });
    
    var _JsArray_map = F2(function(func, array)
    {
        var length = array.length;
        var result = new Array(length);
    
        for (var i = 0; i < length; i++)
        {
            result[i] = func(array[i]);
        }
    
        return result;
    });
    
    var _JsArray_indexedMap = F3(function(func, offset, array)
    {
        var length = array.length;
        var result = new Array(length);
    
        for (var i = 0; i < length; i++)
        {
            result[i] = A2(func, offset + i, array[i]);
        }
    
        return result;
    });
    
    var _JsArray_slice = F3(function(from, to, array)
    {
        return array.slice(from, to);
    });
    
    var _JsArray_appendN = F3(function(n, dest, source)
    {
        var destLen = dest.length;
        var itemsToCopy = n - destLen;
    
        if (itemsToCopy > source.length)
        {
            itemsToCopy = source.length;
        }
    
        var size = destLen + itemsToCopy;
        var result = new Array(size);
    
        for (var i = 0; i < destLen; i++)
        {
            result[i] = dest[i];
        }
    
        for (var i = 0; i < itemsToCopy; i++)
        {
            result[i + destLen] = source[i];
        }
    
        return result;
    });
    
    
    
    // LOG
    
    var _Debug_log_UNUSED = F2(function(tag, value)
    {
        return value;
    });
    
    var _Debug_log = F2(function(tag, value)
    {
        console.log(tag + ': ' + _Debug_toString(value));
        return value;
    });
    
    
    // TODOS
    
    function _Debug_todo(moduleName, region)
    {
        return function(message) {
            _Debug_crash(8, moduleName, region, message);
        };
    }
    
    function _Debug_todoCase(moduleName, region, value)
    {
        return function(message) {
            _Debug_crash(9, moduleName, region, value, message);
        };
    }
    
    
    // TO STRING
    
    function _Debug_toString_UNUSED(value)
    {
        return '<internals>';
    }
    
    function _Debug_toString(value)
    {
        return _Debug_toAnsiString(false, value);
    }
    
    function _Debug_toAnsiString(ansi, value)
    {
        if (typeof value === 'function')
        {
            return _Debug_internalColor(ansi, '<function>');
        }
    
        if (typeof value === 'boolean')
        {
            return _Debug_ctorColor(ansi, value ? 'True' : 'False');
        }
    
        if (typeof value === 'number')
        {
            return _Debug_numberColor(ansi, value + '');
        }
    
        if (value instanceof String)
        {
            return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
        }
    
        if (typeof value === 'string')
        {
            return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
        }
    
        if (typeof value === 'object' && '$' in value)
        {
            var tag = value.$;
    
            if (typeof tag === 'number')
            {
                return _Debug_internalColor(ansi, '<internals>');
            }
    
            if (tag[0] === '#')
            {
                var output = [];
                for (var k in value)
                {
                    if (k === '$') continue;
                    output.push(_Debug_toAnsiString(ansi, value[k]));
                }
                return '(' + output.join(',') + ')';
            }
    
            if (tag === 'Set_elm_builtin')
            {
                return _Debug_ctorColor(ansi, 'Set')
                    + _Debug_fadeColor(ansi, '.fromList') + ' '
                    + _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
            }
    
            if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
            {
                return _Debug_ctorColor(ansi, 'Dict')
                    + _Debug_fadeColor(ansi, '.fromList') + ' '
                    + _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
            }
    
            if (tag === 'Array_elm_builtin')
            {
                return _Debug_ctorColor(ansi, 'Array')
                    + _Debug_fadeColor(ansi, '.fromList') + ' '
                    + _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
            }
    
            if (tag === '::' || tag === '[]')
            {
                var output = '[';
    
                value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)
    
                for (; value.b; value = value.b) // WHILE_CONS
                {
                    output += ',' + _Debug_toAnsiString(ansi, value.a);
                }
                return output + ']';
            }
    
            var output = '';
            for (var i in value)
            {
                if (i === '$') continue;
                var str = _Debug_toAnsiString(ansi, value[i]);
                var c0 = str[0];
                var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
                output += ' ' + (parenless ? str : '(' + str + ')');
            }
            return _Debug_ctorColor(ansi, tag) + output;
        }
    
        if (typeof DataView === 'function' && value instanceof DataView)
        {
            return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
        }
    
        if (typeof File === 'function' && value instanceof File)
        {
            return _Debug_internalColor(ansi, '<' + value.name + '>');
        }
    
        if (typeof value === 'object')
        {
            var output = [];
            for (var key in value)
            {
                var field = key[0] === '_' ? key.slice(1) : key;
                output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
            }
            if (output.length === 0)
            {
                return '{}';
            }
            return '{ ' + output.join(', ') + ' }';
        }
    
        return _Debug_internalColor(ansi, '<internals>');
    }
    
    function _Debug_addSlashes(str, isChar)
    {
        var s = str
            .replace(/\\/g, '\\\\')
            .replace(/\n/g, '\\n')
            .replace(/\t/g, '\\t')
            .replace(/\r/g, '\\r')
            .replace(/\v/g, '\\v')
            .replace(/\0/g, '\\0');
    
        if (isChar)
        {
            return s.replace(/\'/g, '\\\'');
        }
        else
        {
            return s.replace(/\"/g, '\\"');
        }
    }
    
    function _Debug_ctorColor(ansi, string)
    {
        return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
    }
    
    function _Debug_numberColor(ansi, string)
    {
        return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
    }
    
    function _Debug_stringColor(ansi, string)
    {
        return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
    }
    
    function _Debug_charColor(ansi, string)
    {
        return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
    }
    
    function _Debug_fadeColor(ansi, string)
    {
        return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
    }
    
    function _Debug_internalColor(ansi, string)
    {
        return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
    }
    
    function _Debug_toHexDigit(n)
    {
        return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
    }
    
    
    // CRASH
    
    
    function _Debug_crash_UNUSED(identifier)
    {
        throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
    }
    
    
    function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
    {
        switch(identifier)
        {
            case 0:
                throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');
    
            case 1:
                throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');
    
            case 2:
                var jsonErrorString = fact1;
                throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);
    
            case 3:
                var portName = fact1;
                throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');
    
            case 4:
                var portName = fact1;
                var problem = fact2;
                throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);
    
            case 5:
                throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');
    
            case 6:
                var moduleName = fact1;
                throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');
    
            case 8:
                var moduleName = fact1;
                var region = fact2;
                var message = fact3;
                throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);
    
            case 9:
                var moduleName = fact1;
                var region = fact2;
                var value = fact3;
                var message = fact4;
                throw new Error(
                    'TODO in module `' + moduleName + '` from the `case` expression '
                    + _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
                    + _Debug_toString(value).replace('\n', '\n    ')
                    + '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
                );
    
            case 10:
                throw new Error('Bug in https://github.com/elm/virtual-dom/issues');
    
            case 11:
                throw new Error('Cannot perform mod 0. Division by zero error.');
        }
    }
    
    function _Debug_regionToString(region)
    {
        if (region.start.line === region.end.line)
        {
            return 'on line ' + region.start.line;
        }
        return 'on lines ' + region.start.line + ' through ' + region.end.line;
    }
    
    
    
    // MATH
    
    var _Basics_add = F2(function(a, b) { return a + b; });
    var _Basics_sub = F2(function(a, b) { return a - b; });
    var _Basics_mul = F2(function(a, b) { return a * b; });
    var _Basics_fdiv = F2(function(a, b) { return a / b; });
    var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
    var _Basics_pow = F2(Math.pow);
    
    var _Basics_remainderBy = F2(function(b, a) { return a % b; });
    
    // https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
    var _Basics_modBy = F2(function(modulus, x)
    {
        var answer = x % modulus;
        return modulus === 0
            ? _Debug_crash(11)
            :
        ((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
            ? answer + modulus
            : answer;
    });
    
    
    // TRIGONOMETRY
    
    var _Basics_pi = Math.PI;
    var _Basics_e = Math.E;
    var _Basics_cos = Math.cos;
    var _Basics_sin = Math.sin;
    var _Basics_tan = Math.tan;
    var _Basics_acos = Math.acos;
    var _Basics_asin = Math.asin;
    var _Basics_atan = Math.atan;
    var _Basics_atan2 = F2(Math.atan2);
    
    
    // MORE MATH
    
    function _Basics_toFloat(x) { return x; }
    function _Basics_truncate(n) { return n | 0; }
    function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }
    
    var _Basics_ceiling = Math.ceil;
    var _Basics_floor = Math.floor;
    var _Basics_round = Math.round;
    var _Basics_sqrt = Math.sqrt;
    var _Basics_log = Math.log;
    var _Basics_isNaN = isNaN;
    
    
    // BOOLEANS
    
    function _Basics_not(bool) { return !bool; }
    var _Basics_and = F2(function(a, b) { return a && b; });
    var _Basics_or  = F2(function(a, b) { return a || b; });
    var _Basics_xor = F2(function(a, b) { return a !== b; });
    
    
    
    function _Char_toCode(char)
    {
        var code = char.charCodeAt(0);
        if (0xD800 <= code && code <= 0xDBFF)
        {
            return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
        }
        return code;
    }
    
    function _Char_fromCode(code)
    {
        return _Utils_chr(
            (code < 0 || 0x10FFFF < code)
                ? '\uFFFD'
                :
            (code <= 0xFFFF)
                ? String.fromCharCode(code)
                :
            (code -= 0x10000,
                String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
            )
        );
    }
    
    function _Char_toUpper(char)
    {
        return _Utils_chr(char.toUpperCase());
    }
    
    function _Char_toLower(char)
    {
        return _Utils_chr(char.toLowerCase());
    }
    
    function _Char_toLocaleUpper(char)
    {
        return _Utils_chr(char.toLocaleUpperCase());
    }
    
    function _Char_toLocaleLower(char)
    {
        return _Utils_chr(char.toLocaleLowerCase());
    }
    
    
    
    var _String_cons = F2(function(chr, str)
    {
        return chr + str;
    });
    
    function _String_uncons(string)
    {
        var word = string.charCodeAt(0);
        return word
            ? elm$core$Maybe$Just(
                0xD800 <= word && word <= 0xDBFF
                    ? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
                    : _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
            )
            : elm$core$Maybe$Nothing;
    }
    
    var _String_append = F2(function(a, b)
    {
        return a + b;
    });
    
    function _String_length(str)
    {
        return str.length;
    }
    
    var _String_map = F2(function(func, string)
    {
        var len = string.length;
        var array = new Array(len);
        var i = 0;
        while (i < len)
        {
            var word = string.charCodeAt(i);
            if (0xD800 <= word && word <= 0xDBFF)
            {
                array[i] = func(_Utils_chr(string[i] + string[i+1]));
                i += 2;
                continue;
            }
            array[i] = func(_Utils_chr(string[i]));
            i++;
        }
        return array.join('');
    });
    
    var _String_filter = F2(function(isGood, str)
    {
        var arr = [];
        var len = str.length;
        var i = 0;
        while (i < len)
        {
            var char = str[i];
            var word = str.charCodeAt(i);
            i++;
            if (0xD800 <= word && word <= 0xDBFF)
            {
                char += str[i];
                i++;
            }
    
            if (isGood(_Utils_chr(char)))
            {
                arr.push(char);
            }
        }
        return arr.join('');
    });
    
    function _String_reverse(str)
    {
        var len = str.length;
        var arr = new Array(len);
        var i = 0;
        while (i < len)
        {
            var word = str.charCodeAt(i);
            if (0xD800 <= word && word <= 0xDBFF)
            {
                arr[len - i] = str[i + 1];
                i++;
                arr[len - i] = str[i - 1];
                i++;
            }
            else
            {
                arr[len - i] = str[i];
                i++;
            }
        }
        return arr.join('');
    }
    
    var _String_foldl = F3(function(func, state, string)
    {
        var len = string.length;
        var i = 0;
        while (i < len)
        {
            var char = string[i];
            var word = string.charCodeAt(i);
            i++;
            if (0xD800 <= word && word <= 0xDBFF)
            {
                char += string[i];
                i++;
            }
            state = A2(func, _Utils_chr(char), state);
        }
        return state;
    });
    
    var _String_foldr = F3(function(func, state, string)
    {
        var i = string.length;
        while (i--)
        {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (0xDC00 <= word && word <= 0xDFFF)
            {
                i--;
                char = string[i] + char;
            }
            state = A2(func, _Utils_chr(char), state);
        }
        return state;
    });
    
    var _String_split = F2(function(sep, str)
    {
        return str.split(sep);
    });
    
    var _String_join = F2(function(sep, strs)
    {
        return strs.join(sep);
    });
    
    var _String_slice = F3(function(start, end, str) {
        return str.slice(start, end);
    });
    
    function _String_trim(str)
    {
        return str.trim();
    }
    
    function _String_trimLeft(str)
    {
        return str.replace(/^\s+/, '');
    }
    
    function _String_trimRight(str)
    {
        return str.replace(/\s+$/, '');
    }
    
    function _String_words(str)
    {
        return _List_fromArray(str.trim().split(/\s+/g));
    }
    
    function _String_lines(str)
    {
        return _List_fromArray(str.split(/\r\n|\r|\n/g));
    }
    
    function _String_toUpper(str)
    {
        return str.toUpperCase();
    }
    
    function _String_toLower(str)
    {
        return str.toLowerCase();
    }
    
    var _String_any = F2(function(isGood, string)
    {
        var i = string.length;
        while (i--)
        {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (0xDC00 <= word && word <= 0xDFFF)
            {
                i--;
                char = string[i] + char;
            }
            if (isGood(_Utils_chr(char)))
            {
                return true;
            }
        }
        return false;
    });
    
    var _String_all = F2(function(isGood, string)
    {
        var i = string.length;
        while (i--)
        {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (0xDC00 <= word && word <= 0xDFFF)
            {
                i--;
                char = string[i] + char;
            }
            if (!isGood(_Utils_chr(char)))
            {
                return false;
            }
        }
        return true;
    });
    
    var _String_contains = F2(function(sub, str)
    {
        return str.indexOf(sub) > -1;
    });
    
    var _String_startsWith = F2(function(sub, str)
    {
        return str.indexOf(sub) === 0;
    });
    
    var _String_endsWith = F2(function(sub, str)
    {
        return str.length >= sub.length &&
            str.lastIndexOf(sub) === str.length - sub.length;
    });
    
    var _String_indexes = F2(function(sub, str)
    {
        var subLen = sub.length;
    
        if (subLen < 1)
        {
            return _List_Nil;
        }
    
        var i = 0;
        var is = [];
    
        while ((i = str.indexOf(sub, i)) > -1)
        {
            is.push(i);
            i = i + subLen;
        }
    
        return _List_fromArray(is);
    });
    
    
    // TO STRING
    
    function _String_fromNumber(number)
    {
        return number + '';
    }
    
    
    // INT CONVERSIONS
    
    function _String_toInt(str)
    {
        var total = 0;
        var code0 = str.charCodeAt(0);
        var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;
    
        for (var i = start; i < str.length; ++i)
        {
            var code = str.charCodeAt(i);
            if (code < 0x30 || 0x39 < code)
            {
                return elm$core$Maybe$Nothing;
            }
            total = 10 * total + code - 0x30;
        }
    
        return i == start
            ? elm$core$Maybe$Nothing
            : elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
    }
    
    
    // FLOAT CONVERSIONS
    
    function _String_toFloat(s)
    {
        // check if it is a hex, octal, or binary number
        if (s.length === 0 || /[\sxbo]/.test(s))
        {
            return elm$core$Maybe$Nothing;
        }
        var n = +s;
        // faster isNaN check
        return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
    }
    
    function _String_fromList(chars)
    {
        return _List_toArray(chars).join('');
    }
    
    
    
    
    /**/
    function _Json_errorToString(error)
    {
        return elm$json$Json$Decode$errorToString(error);
    }
    //*/
    
    
    // CORE DECODERS
    
    function _Json_succeed(msg)
    {
        return {
            $: 0,
            a: msg
        };
    }
    
    function _Json_fail(msg)
    {
        return {
            $: 1,
            a: msg
        };
    }
    
    function _Json_decodePrim(decoder)
    {
        return { $: 2, b: decoder };
    }
    
    var _Json_decodeInt = _Json_decodePrim(function(value) {
        return (typeof value !== 'number')
            ? _Json_expecting('an INT', value)
            :
        (-2147483647 < value && value < 2147483647 && (value | 0) === value)
            ? elm$core$Result$Ok(value)
            :
        (isFinite(value) && !(value % 1))
            ? elm$core$Result$Ok(value)
            : _Json_expecting('an INT', value);
    });
    
    var _Json_decodeBool = _Json_decodePrim(function(value) {
        return (typeof value === 'boolean')
            ? elm$core$Result$Ok(value)
            : _Json_expecting('a BOOL', value);
    });
    
    var _Json_decodeFloat = _Json_decodePrim(function(value) {
        return (typeof value === 'number')
            ? elm$core$Result$Ok(value)
            : _Json_expecting('a FLOAT', value);
    });
    
    var _Json_decodeValue = _Json_decodePrim(function(value) {
        return elm$core$Result$Ok(_Json_wrap(value));
    });
    
    var _Json_decodeString = _Json_decodePrim(function(value) {
        return (typeof value === 'string')
            ? elm$core$Result$Ok(value)
            : (value instanceof String)
                ? elm$core$Result$Ok(value + '')
                : _Json_expecting('a STRING', value);
    });
    
    function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
    function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }
    
    function _Json_decodeNull(value) { return { $: 5, c: value }; }
    
    var _Json_decodeField = F2(function(field, decoder)
    {
        return {
            $: 6,
            d: field,
            b: decoder
        };
    });
    
    var _Json_decodeIndex = F2(function(index, decoder)
    {
        return {
            $: 7,
            e: index,
            b: decoder
        };
    });
    
    function _Json_decodeKeyValuePairs(decoder)
    {
        return {
            $: 8,
            b: decoder
        };
    }
    
    function _Json_mapMany(f, decoders)
    {
        return {
            $: 9,
            f: f,
            g: decoders
        };
    }
    
    var _Json_andThen = F2(function(callback, decoder)
    {
        return {
            $: 10,
            b: decoder,
            h: callback
        };
    });
    
    function _Json_oneOf(decoders)
    {
        return {
            $: 11,
            g: decoders
        };
    }
    
    
    // DECODING OBJECTS
    
    var _Json_map1 = F2(function(f, d1)
    {
        return _Json_mapMany(f, [d1]);
    });
    
    var _Json_map2 = F3(function(f, d1, d2)
    {
        return _Json_mapMany(f, [d1, d2]);
    });
    
    var _Json_map3 = F4(function(f, d1, d2, d3)
    {
        return _Json_mapMany(f, [d1, d2, d3]);
    });
    
    var _Json_map4 = F5(function(f, d1, d2, d3, d4)
    {
        return _Json_mapMany(f, [d1, d2, d3, d4]);
    });
    
    var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
    {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
    });
    
    var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
    {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
    });
    
    var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
    {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
    });
    
    var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
    {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
    });
    
    
    // DECODE
    
    var _Json_runOnString = F2(function(decoder, string)
    {
        try
        {
            var value = JSON.parse(string);
            return _Json_runHelp(decoder, value);
        }
        catch (e)
        {
            return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
        }
    });
    
    var _Json_run = F2(function(decoder, value)
    {
        return _Json_runHelp(decoder, _Json_unwrap(value));
    });
    
    function _Json_runHelp(decoder, value)
    {
        switch (decoder.$)
        {
            case 2:
                return decoder.b(value);
    
            case 5:
                return (value === null)
                    ? elm$core$Result$Ok(decoder.c)
                    : _Json_expecting('null', value);
    
            case 3:
                if (!_Json_isArray(value))
                {
                    return _Json_expecting('a LIST', value);
                }
                return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);
    
            case 4:
                if (!_Json_isArray(value))
                {
                    return _Json_expecting('an ARRAY', value);
                }
                return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);
    
            case 6:
                var field = decoder.d;
                if (typeof value !== 'object' || value === null || !(field in value))
                {
                    return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
                }
                var result = _Json_runHelp(decoder.b, value[field]);
                return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));
    
            case 7:
                var index = decoder.e;
                if (!_Json_isArray(value))
                {
                    return _Json_expecting('an ARRAY', value);
                }
                if (index >= value.length)
                {
                    return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
                }
                var result = _Json_runHelp(decoder.b, value[index]);
                return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));
    
            case 8:
                if (typeof value !== 'object' || value === null || _Json_isArray(value))
                {
                    return _Json_expecting('an OBJECT', value);
                }
    
                var keyValuePairs = _List_Nil;
                // TODO test perf of Object.keys and switch when support is good enough
                for (var key in value)
                {
                    if (value.hasOwnProperty(key))
                    {
                        var result = _Json_runHelp(decoder.b, value[key]);
                        if (!elm$core$Result$isOk(result))
                        {
                            return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
                        }
                        keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
                    }
                }
                return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));
    
            case 9:
                var answer = decoder.f;
                var decoders = decoder.g;
                for (var i = 0; i < decoders.length; i++)
                {
                    var result = _Json_runHelp(decoders[i], value);
                    if (!elm$core$Result$isOk(result))
                    {
                        return result;
                    }
                    answer = answer(result.a);
                }
                return elm$core$Result$Ok(answer);
    
            case 10:
                var result = _Json_runHelp(decoder.b, value);
                return (!elm$core$Result$isOk(result))
                    ? result
                    : _Json_runHelp(decoder.h(result.a), value);
    
            case 11:
                var errors = _List_Nil;
                for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
                {
                    var result = _Json_runHelp(temp.a, value);
                    if (elm$core$Result$isOk(result))
                    {
                        return result;
                    }
                    errors = _List_Cons(result.a, errors);
                }
                return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));
    
            case 1:
                return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));
    
            case 0:
                return elm$core$Result$Ok(decoder.a);
        }
    }
    
    function _Json_runArrayDecoder(decoder, value, toElmValue)
    {
        var len = value.length;
        var array = new Array(len);
        for (var i = 0; i < len; i++)
        {
            var result = _Json_runHelp(decoder, value[i]);
            if (!elm$core$Result$isOk(result))
            {
                return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
            }
            array[i] = result.a;
        }
        return elm$core$Result$Ok(toElmValue(array));
    }
    
    function _Json_isArray(value)
    {
        return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
    }
    
    function _Json_toElmArray(array)
    {
        return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
    }
    
    function _Json_expecting(type, value)
    {
        return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
    }
    
    
    // EQUALITY
    
    function _Json_equality(x, y)
    {
        if (x === y)
        {
            return true;
        }
    
        if (x.$ !== y.$)
        {
            return false;
        }
    
        switch (x.$)
        {
            case 0:
            case 1:
                return x.a === y.a;
    
            case 2:
                return x.b === y.b;
    
            case 5:
                return x.c === y.c;
    
            case 3:
            case 4:
            case 8:
                return _Json_equality(x.b, y.b);
    
            case 6:
                return x.d === y.d && _Json_equality(x.b, y.b);
    
            case 7:
                return x.e === y.e && _Json_equality(x.b, y.b);
    
            case 9:
                return x.f === y.f && _Json_listEquality(x.g, y.g);
    
            case 10:
                return x.h === y.h && _Json_equality(x.b, y.b);
    
            case 11:
                return _Json_listEquality(x.g, y.g);
        }
    }
    
    function _Json_listEquality(aDecoders, bDecoders)
    {
        var len = aDecoders.length;
        if (len !== bDecoders.length)
        {
            return false;
        }
        for (var i = 0; i < len; i++)
        {
            if (!_Json_equality(aDecoders[i], bDecoders[i]))
            {
                return false;
            }
        }
        return true;
    }
    
    
    // ENCODE
    
    var _Json_encode = F2(function(indentLevel, value)
    {
        return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
    });
    
    function _Json_wrap(value) { return { $: 0, a: value }; }
    function _Json_unwrap(value) { return value.a; }
    
    function _Json_wrap_UNUSED(value) { return value; }
    function _Json_unwrap_UNUSED(value) { return value; }
    
    function _Json_emptyArray() { return []; }
    function _Json_emptyObject() { return {}; }
    
    var _Json_addField = F3(function(key, value, object)
    {
        object[key] = _Json_unwrap(value);
        return object;
    });
    
    function _Json_addEntry(func)
    {
        return F2(function(entry, array)
        {
            array.push(_Json_unwrap(func(entry)));
            return array;
        });
    }
    
    var _Json_encodeNull = _Json_wrap(null);
    
    
    
    // TASKS
    
    function _Scheduler_succeed(value)
    {
        return {
            $: 0,
            a: value
        };
    }
    
    function _Scheduler_fail(error)
    {
        return {
            $: 1,
            a: error
        };
    }
    
    function _Scheduler_binding(callback)
    {
        return {
            $: 2,
            b: callback,
            c: null
        };
    }
    
    var _Scheduler_andThen = F2(function(callback, task)
    {
        return {
            $: 3,
            b: callback,
            d: task
        };
    });
    
    var _Scheduler_onError = F2(function(callback, task)
    {
        return {
            $: 4,
            b: callback,
            d: task
        };
    });
    
    function _Scheduler_receive(callback)
    {
        return {
            $: 5,
            b: callback
        };
    }
    
    
    // PROCESSES
    
    var _Scheduler_guid = 0;
    
    function _Scheduler_rawSpawn(task)
    {
        var proc = {
            $: 0,
            e: _Scheduler_guid++,
            f: task,
            g: null,
            h: []
        };
    
        _Scheduler_enqueue(proc);
    
        return proc;
    }
    
    function _Scheduler_spawn(task)
    {
        return _Scheduler_binding(function(callback) {
            callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
        });
    }
    
    function _Scheduler_rawSend(proc, msg)
    {
        proc.h.push(msg);
        _Scheduler_enqueue(proc);
    }
    
    var _Scheduler_send = F2(function(proc, msg)
    {
        return _Scheduler_binding(function(callback) {
            _Scheduler_rawSend(proc, msg);
            callback(_Scheduler_succeed(_Utils_Tuple0));
        });
    });
    
    function _Scheduler_kill(proc)
    {
        return _Scheduler_binding(function(callback) {
            var task = proc.f;
            if (task.$ === 2 && task.c)
            {
                task.c();
            }
    
            proc.f = null;
    
            callback(_Scheduler_succeed(_Utils_Tuple0));
        });
    }
    
    
    /* STEP PROCESSES
    
    type alias Process =
      { $ : tag
      , id : unique_id
      , root : Task
      , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
      , mailbox : [msg]
      }
    
    */
    
    
    var _Scheduler_working = false;
    var _Scheduler_queue = [];
    
    
    function _Scheduler_enqueue(proc)
    {
        _Scheduler_queue.push(proc);
        if (_Scheduler_working)
        {
            return;
        }
        _Scheduler_working = true;
        while (proc = _Scheduler_queue.shift())
        {
            _Scheduler_step(proc);
        }
        _Scheduler_working = false;
    }
    
    
    function _Scheduler_step(proc)
    {
        while (proc.f)
        {
            var rootTag = proc.f.$;
            if (rootTag === 0 || rootTag === 1)
            {
                while (proc.g && proc.g.$ !== rootTag)
                {
                    proc.g = proc.g.i;
                }
                if (!proc.g)
                {
                    return;
                }
                proc.f = proc.g.b(proc.f.a);
                proc.g = proc.g.i;
            }
            else if (rootTag === 2)
            {
                proc.f.c = proc.f.b(function(newRoot) {
                    proc.f = newRoot;
                    _Scheduler_enqueue(proc);
                });
                return;
            }
            else if (rootTag === 5)
            {
                if (proc.h.length === 0)
                {
                    return;
                }
                proc.f = proc.f.b(proc.h.shift());
            }
            else // if (rootTag === 3 || rootTag === 4)
            {
                proc.g = {
                    $: rootTag === 3 ? 0 : 1,
                    b: proc.f.b,
                    i: proc.g
                };
                proc.f = proc.f.d;
            }
        }
    }
    
    
    
    function _Process_sleep(time)
    {
        return _Scheduler_binding(function(callback) {
            var id = setTimeout(function() {
                callback(_Scheduler_succeed(_Utils_Tuple0));
            }, time);
    
            return function() { clearTimeout(id); };
        });
    }
    
    
    
    
    // PROGRAMS
    
    
    var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
    {
        return _Platform_initialize(
            flagDecoder,
            args,
            impl.init,
            impl.update,
            impl.subscriptions,
            function() { return function() {} }
        );
    });
    
    
    
    // INITIALIZE A PROGRAM
    
    
    function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
    {
        var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
        elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
        var managers = {};
        result = init(result.a);
        var model = result.a;
        var stepper = stepperBuilder(sendToApp, model);
        var ports = _Platform_setupEffects(managers, sendToApp);
    
        function sendToApp(msg, viewMetadata)
        {
            result = A2(update, msg, model);
            stepper(model = result.a, viewMetadata);
            _Platform_dispatchEffects(managers, result.b, subscriptions(model));
        }
    
        _Platform_dispatchEffects(managers, result.b, subscriptions(model));
    
        return ports ? { ports: ports } : {};
    }
    
    
    
    // TRACK PRELOADS
    //
    // This is used by code in elm/browser and elm/http
    // to register any HTTP requests that are triggered by init.
    //
    
    
    var _Platform_preload;
    
    
    function _Platform_registerPreload(url)
    {
        _Platform_preload.add(url);
    }
    
    
    
    // EFFECT MANAGERS
    
    
    var _Platform_effectManagers = {};
    
    
    function _Platform_setupEffects(managers, sendToApp)
    {
        var ports;
    
        // setup all necessary effect managers
        for (var key in _Platform_effectManagers)
        {
            var manager = _Platform_effectManagers[key];
    
            if (manager.a)
            {
                ports = ports || {};
                ports[key] = manager.a(key, sendToApp);
            }
    
            managers[key] = _Platform_instantiateManager(manager, sendToApp);
        }
    
        return ports;
    }
    
    
    function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
    {
        return {
            b: init,
            c: onEffects,
            d: onSelfMsg,
            e: cmdMap,
            f: subMap
        };
    }
    
    
    function _Platform_instantiateManager(info, sendToApp)
    {
        var router = {
            g: sendToApp,
            h: undefined
        };
    
        var onEffects = info.c;
        var onSelfMsg = info.d;
        var cmdMap = info.e;
        var subMap = info.f;
    
        function loop(state)
        {
            return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
            {
                var value = msg.a;
    
                if (msg.$ === 0)
                {
                    return A3(onSelfMsg, router, value, state);
                }
    
                return cmdMap && subMap
                    ? A4(onEffects, router, value.i, value.j, state)
                    : A3(onEffects, router, cmdMap ? value.i : value.j, state);
            }));
        }
    
        return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
    }
    
    
    
    // ROUTING
    
    
    var _Platform_sendToApp = F2(function(router, msg)
    {
        return _Scheduler_binding(function(callback)
        {
            router.g(msg);
            callback(_Scheduler_succeed(_Utils_Tuple0));
        });
    });
    
    
    var _Platform_sendToSelf = F2(function(router, msg)
    {
        return A2(_Scheduler_send, router.h, {
            $: 0,
            a: msg
        });
    });
    
    
    
    // BAGS
    
    
    function _Platform_leaf(home)
    {
        return function(value)
        {
            return {
                $: 1,
                k: home,
                l: value
            };
        };
    }
    
    
    function _Platform_batch(list)
    {
        return {
            $: 2,
            m: list
        };
    }
    
    
    var _Platform_map = F2(function(tagger, bag)
    {
        return {
            $: 3,
            n: tagger,
            o: bag
        }
    });
    
    
    
    // PIPE BAGS INTO EFFECT MANAGERS
    
    
    function _Platform_dispatchEffects(managers, cmdBag, subBag)
    {
        var effectsDict = {};
        _Platform_gatherEffects(true, cmdBag, effectsDict, null);
        _Platform_gatherEffects(false, subBag, effectsDict, null);
    
        for (var home in managers)
        {
            _Scheduler_rawSend(managers[home], {
                $: 'fx',
                a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
            });
        }
    }
    
    
    function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
    {
        switch (bag.$)
        {
            case 1:
                var home = bag.k;
                var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
                effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
                return;
    
            case 2:
                for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
                {
                    _Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
                }
                return;
    
            case 3:
                _Platform_gatherEffects(isCmd, bag.o, effectsDict, {
                    p: bag.n,
                    q: taggers
                });
                return;
        }
    }
    
    
    function _Platform_toEffect(isCmd, home, taggers, value)
    {
        function applyTaggers(x)
        {
            for (var temp = taggers; temp; temp = temp.q)
            {
                x = temp.p(x);
            }
            return x;
        }
    
        var map = isCmd
            ? _Platform_effectManagers[home].e
            : _Platform_effectManagers[home].f;
    
        return A2(map, applyTaggers, value)
    }
    
    
    function _Platform_insert(isCmd, newEffect, effects)
    {
        effects = effects || { i: _List_Nil, j: _List_Nil };
    
        isCmd
            ? (effects.i = _List_Cons(newEffect, effects.i))
            : (effects.j = _List_Cons(newEffect, effects.j));
    
        return effects;
    }
    
    
    
    // PORTS
    
    
    function _Platform_checkPortName(name)
    {
        if (_Platform_effectManagers[name])
        {
            _Debug_crash(3, name)
        }
    }
    
    
    
    // OUTGOING PORTS
    
    
    function _Platform_outgoingPort(name, converter)
    {
        _Platform_checkPortName(name);
        _Platform_effectManagers[name] = {
            e: _Platform_outgoingPortMap,
            r: converter,
            a: _Platform_setupOutgoingPort
        };
        return _Platform_leaf(name);
    }
    
    
    var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });
    
    
    function _Platform_setupOutgoingPort(name)
    {
        var subs = [];
        var converter = _Platform_effectManagers[name].r;
    
        // CREATE MANAGER
    
        var init = _Process_sleep(0);
    
        _Platform_effectManagers[name].b = init;
        _Platform_effectManagers[name].c = F3(function(router, cmdList, state)
        {
            for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
            {
                // grab a separate reference to subs in case unsubscribe is called
                var currentSubs = subs;
                var value = _Json_unwrap(converter(cmdList.a));
                for (var i = 0; i < currentSubs.length; i++)
                {
                    currentSubs[i](value);
                }
            }
            return init;
        });
    
        // PUBLIC API
    
        function subscribe(callback)
        {
            subs.push(callback);
        }
    
        function unsubscribe(callback)
        {
            // copy subs into a new array in case unsubscribe is called within a
            // subscribed callback
            subs = subs.slice();
            var index = subs.indexOf(callback);
            if (index >= 0)
            {
                subs.splice(index, 1);
            }
        }
    
        return {
            subscribe: subscribe,
            unsubscribe: unsubscribe
        };
    }
    
    
    
    // INCOMING PORTS
    
    
    function _Platform_incomingPort(name, converter)
    {
        _Platform_checkPortName(name);
        _Platform_effectManagers[name] = {
            f: _Platform_incomingPortMap,
            r: converter,
            a: _Platform_setupIncomingPort
        };
        return _Platform_leaf(name);
    }
    
    
    var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
    {
        return function(value)
        {
            return tagger(finalTagger(value));
        };
    });
    
    
    function _Platform_setupIncomingPort(name, sendToApp)
    {
        var subs = _List_Nil;
        var converter = _Platform_effectManagers[name].r;
    
        // CREATE MANAGER
    
        var init = _Scheduler_succeed(null);
    
        _Platform_effectManagers[name].b = init;
        _Platform_effectManagers[name].c = F3(function(router, subList, state)
        {
            subs = subList;
            return init;
        });
    
        // PUBLIC API
    
        function send(incomingValue)
        {
            var result = A2(_Json_run, converter, _Json_wrap(incomingValue));
    
            elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);
    
            var value = result.a;
            for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
            {
                sendToApp(temp.a(value));
            }
        }
    
        return { send: send };
    }
    
    
    
    // EXPORT ELM MODULES
    //
    // Have DEBUG and PROD versions so that we can (1) give nicer errors in
    // debug mode and (2) not pay for the bits needed for that in prod mode.
    //
    
    
    function _Platform_export_UNUSED(exports)
    {
        scope['Elm']
            ? _Platform_mergeExportsProd(scope['Elm'], exports)
            : scope['Elm'] = exports;
    }
    
    
    function _Platform_mergeExportsProd(obj, exports)
    {
        for (var name in exports)
        {
            (name in obj)
                ? (name == 'init')
                    ? _Debug_crash(6)
                    : _Platform_mergeExportsProd(obj[name], exports[name])
                : (obj[name] = exports[name]);
        }
    }
    
    
    function _Platform_export(exports)
    {
        scope['Elm']
            ? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
            : scope['Elm'] = exports;
    }
    
    
    function _Platform_mergeExportsDebug(moduleName, obj, exports)
    {
        for (var name in exports)
        {
            (name in obj)
                ? (name == 'init')
                    ? _Debug_crash(6, moduleName)
                    : _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
                : (obj[name] = exports[name]);
        }
    }
    
    
    
    var _Bitwise_and = F2(function(a, b)
    {
        return a & b;
    });
    
    var _Bitwise_or = F2(function(a, b)
    {
        return a | b;
    });
    
    var _Bitwise_xor = F2(function(a, b)
    {
        return a ^ b;
    });
    
    function _Bitwise_complement(a)
    {
        return ~a;
    };
    
    var _Bitwise_shiftLeftBy = F2(function(offset, a)
    {
        return a << offset;
    });
    
    var _Bitwise_shiftRightBy = F2(function(offset, a)
    {
        return a >> offset;
    });
    
    var _Bitwise_shiftRightZfBy = F2(function(offset, a)
    {
        return a >>> offset;
    });
    
    
    
    // DECODER
    
    var _File_decoder = _Json_decodePrim(function(value) {
        // NOTE: checks if `File` exists in case this is run on node
        return (typeof File !== 'undefined' && value instanceof File)
            ? elm$core$Result$Ok(value)
            : _Json_expecting('a FILE', value);
    });
    
    
    // METADATA
    
    function _File_name(file) { return file.name; }
    function _File_mime(file) { return file.type; }
    function _File_size(file) { return file.size; }
    
    function _File_lastModified(file)
    {
        return elm$time$Time$millisToPosix(file.lastModified);
    }
    
    
    // DOWNLOAD
    
    var _File_downloadNode;
    
    function _File_getDownloadNode()
    {
        return _File_downloadNode || (_File_downloadNode = document.createElement('a'));
    }
    
    var _File_download = F3(function(name, mime, content)
    {
        return _Scheduler_binding(function(callback)
        {
            var blob = new Blob([content], {type: mime});
    
            // for IE10+
            if (navigator.msSaveOrOpenBlob)
            {
                navigator.msSaveOrOpenBlob(blob, name);
                return;
            }
    
            // for HTML5
            var node = _File_getDownloadNode();
            var objectUrl = URL.createObjectURL(blob);
            node.href = objectUrl;
            node.download = name;
            _File_click(node);
            URL.revokeObjectURL(objectUrl);
        });
    });
    
    function _File_downloadUrl(href)
    {
        return _Scheduler_binding(function(callback)
        {
            var node = _File_getDownloadNode();
            node.href = href;
            node.download = '';
            node.origin === location.origin || (node.target = '_blank');
            _File_click(node);
        });
    }
    
    
    // IE COMPATIBILITY
    
    function _File_makeBytesSafeForInternetExplorer(bytes)
    {
        // only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
        // all other browsers can just run `new Blob([bytes])` directly with no problem
        //
        return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    }
    
    function _File_click(node)
    {
        // only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
        // all other browsers have MouseEvent and do not need this conditional stuff
        //
        if (typeof MouseEvent === 'function')
        {
            node.dispatchEvent(new MouseEvent('click'));
        }
        else
        {
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            document.body.appendChild(node);
            node.dispatchEvent(event);
            document.body.removeChild(node);
        }
    }
    
    
    // UPLOAD
    
    var _File_node;
    
    function _File_uploadOne(mimes)
    {
        return _Scheduler_binding(function(callback)
        {
            _File_node = document.createElement('input');
            _File_node.type = 'file';
            _File_node.accept = A2(elm$core$String$join, ',', mimes);
            _File_node.addEventListener('change', function(event)
            {
                callback(_Scheduler_succeed(event.target.files[0]));
            });
            _File_click(_File_node);
        });
    }
    
    function _File_uploadOneOrMore(mimes)
    {
        return _Scheduler_binding(function(callback)
        {
            _File_node = document.createElement('input');
            _File_node.type = 'file';
            _File_node.multiple = true;
            _File_node.accept = A2(elm$core$String$join, ',', mimes);
            _File_node.addEventListener('change', function(event)
            {
                var elmFiles = _List_fromArray(event.target.files);
                callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
            });
            _File_click(_File_node);
        });
    }
    
    
    // CONTENT
    
    function _File_toString(blob)
    {
        return _Scheduler_binding(function(callback)
        {
            var reader = new FileReader();
            reader.addEventListener('loadend', function() {
                callback(_Scheduler_succeed(reader.result));
            });
            reader.readAsText(blob);
            return function() { reader.abort(); };
        });
    }
    
    function _File_toBytes(blob)
    {
        return _Scheduler_binding(function(callback)
        {
            var reader = new FileReader();
            reader.addEventListener('loadend', function() {
                callback(_Scheduler_succeed(new DataView(reader.result)));
            });
            reader.readAsArrayBuffer(blob);
            return function() { reader.abort(); };
        });
    }
    
    function _File_toUrl(blob)
    {
        return _Scheduler_binding(function(callback)
        {
            var reader = new FileReader();
            reader.addEventListener('loadend', function() {
                callback(_Scheduler_succeed(reader.result));
            });
            reader.readAsDataURL(blob);
            return function() { reader.abort(); };
        });
    }
    
    
    
    
    
    // HELPERS
    
    
    var _VirtualDom_divertHrefToApp;
    
    var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};
    
    
    function _VirtualDom_appendChild(parent, child)
    {
        parent.appendChild(child);
    }
    
    var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
    {
        // NOTE: this function needs _Platform_export available to work
    
        /**_UNUSED/
        var node = args['node'];
        //*/
        /**/
        var node = args && args['node'] ? args['node'] : _Debug_crash(0);
        //*/
    
        node.parentNode.replaceChild(
            _VirtualDom_render(virtualNode, function() {}),
            node
        );
    
        return {};
    });
    
    
    
    // TEXT
    
    
    function _VirtualDom_text(string)
    {
        return {
            $: 0,
            a: string
        };
    }
    
    
    
    // NODE
    
    
    var _VirtualDom_nodeNS = F2(function(namespace, tag)
    {
        return F2(function(factList, kidList)
        {
            for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
            {
                var kid = kidList.a;
                descendantsCount += (kid.b || 0);
                kids.push(kid);
            }
            descendantsCount += kids.length;
    
            return {
                $: 1,
                c: tag,
                d: _VirtualDom_organizeFacts(factList),
                e: kids,
                f: namespace,
                b: descendantsCount
            };
        });
    });
    
    
    var _VirtualDom_node = _VirtualDom_nodeNS(undefined);
    
    
    
    // KEYED NODE
    
    
    var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
    {
        return F2(function(factList, kidList)
        {
            for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
            {
                var kid = kidList.a;
                descendantsCount += (kid.b.b || 0);
                kids.push(kid);
            }
            descendantsCount += kids.length;
    
            return {
                $: 2,
                c: tag,
                d: _VirtualDom_organizeFacts(factList),
                e: kids,
                f: namespace,
                b: descendantsCount
            };
        });
    });
    
    
    var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);
    
    
    
    // CUSTOM
    
    
    function _VirtualDom_custom(factList, model, render, diff)
    {
        return {
            $: 3,
            d: _VirtualDom_organizeFacts(factList),
            g: model,
            h: render,
            i: diff
        };
    }
    
    
    
    // MAP
    
    
    var _VirtualDom_map = F2(function(tagger, node)
    {
        return {
            $: 4,
            j: tagger,
            k: node,
            b: 1 + (node.b || 0)
        };
    });
    
    
    
    // LAZY
    
    
    function _VirtualDom_thunk(refs, thunk)
    {
        return {
            $: 5,
            l: refs,
            m: thunk,
            k: undefined
        };
    }
    
    var _VirtualDom_lazy = F2(function(func, a)
    {
        return _VirtualDom_thunk([func, a], function() {
            return func(a);
        });
    });
    
    var _VirtualDom_lazy2 = F3(function(func, a, b)
    {
        return _VirtualDom_thunk([func, a, b], function() {
            return A2(func, a, b);
        });
    });
    
    var _VirtualDom_lazy3 = F4(function(func, a, b, c)
    {
        return _VirtualDom_thunk([func, a, b, c], function() {
            return A3(func, a, b, c);
        });
    });
    
    var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
    {
        return _VirtualDom_thunk([func, a, b, c, d], function() {
            return A4(func, a, b, c, d);
        });
    });
    
    var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
    {
        return _VirtualDom_thunk([func, a, b, c, d, e], function() {
            return A5(func, a, b, c, d, e);
        });
    });
    
    var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
    {
        return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
            return A6(func, a, b, c, d, e, f);
        });
    });
    
    var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
    {
        return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
            return A7(func, a, b, c, d, e, f, g);
        });
    });
    
    var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
    {
        return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
            return A8(func, a, b, c, d, e, f, g, h);
        });
    });
    
    
    
    // FACTS
    
    
    var _VirtualDom_on = F2(function(key, handler)
    {
        return {
            $: 'a0',
            n: key,
            o: handler
        };
    });
    var _VirtualDom_style = F2(function(key, value)
    {
        return {
            $: 'a1',
            n: key,
            o: value
        };
    });
    var _VirtualDom_property = F2(function(key, value)
    {
        return {
            $: 'a2',
            n: key,
            o: value
        };
    });
    var _VirtualDom_attribute = F2(function(key, value)
    {
        return {
            $: 'a3',
            n: key,
            o: value
        };
    });
    var _VirtualDom_attributeNS = F3(function(namespace, key, value)
    {
        return {
            $: 'a4',
            n: key,
            o: { f: namespace, o: value }
        };
    });
    
    
    
    // XSS ATTACK VECTOR CHECKS
    
    
    function _VirtualDom_noScript(tag)
    {
        return tag == 'script' ? 'p' : tag;
    }
    
    function _VirtualDom_noOnOrFormAction(key)
    {
        return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
    }
    
    function _VirtualDom_noInnerHtmlOrFormAction(key)
    {
        return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
    }
    
    function _VirtualDom_noJavaScriptUri_UNUSED(value)
    {
        return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
    }
    
    function _VirtualDom_noJavaScriptUri(value)
    {
        return /^javascript:/i.test(value.replace(/\s/g,''))
            ? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
            : value;
    }
    
    function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
    {
        return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
    }
    
    function _VirtualDom_noJavaScriptOrHtmlUri(value)
    {
        return /^\s*(javascript:|data:text\/html)/i.test(value)
            ? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
            : value;
    }
    
    
    
    // MAP FACTS
    
    
    var _VirtualDom_mapAttribute = F2(function(func, attr)
    {
        return (attr.$ === 'a0')
            ? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
            : attr;
    });
    
    function _VirtualDom_mapHandler(func, handler)
    {
        var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);
    
        // 0 = Normal
        // 1 = MayStopPropagation
        // 2 = MayPreventDefault
        // 3 = Custom
    
        return {
            $: handler.$,
            a:
                !tag
                    ? A2(elm$json$Json$Decode$map, func, handler.a)
                    :
                A3(elm$json$Json$Decode$map2,
                    tag < 3
                        ? _VirtualDom_mapEventTuple
                        : _VirtualDom_mapEventRecord,
                    elm$json$Json$Decode$succeed(func),
                    handler.a
                )
        };
    }
    
    var _VirtualDom_mapEventTuple = F2(function(func, tuple)
    {
        return _Utils_Tuple2(func(tuple.a), tuple.b);
    });
    
    var _VirtualDom_mapEventRecord = F2(function(func, record)
    {
        return {
            message: func(record.message),
            stopPropagation: record.stopPropagation,
            preventDefault: record.preventDefault
        }
    });
    
    
    
    // ORGANIZE FACTS
    
    
    function _VirtualDom_organizeFacts(factList)
    {
        for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
        {
            var entry = factList.a;
    
            var tag = entry.$;
            var key = entry.n;
            var value = entry.o;
    
            if (tag === 'a2')
            {
                (key === 'className')
                    ? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
                    : facts[key] = _Json_unwrap(value);
    
                continue;
            }
    
            var subFacts = facts[tag] || (facts[tag] = {});
            (tag === 'a3' && key === 'class')
                ? _VirtualDom_addClass(subFacts, key, value)
                : subFacts[key] = value;
        }
    
        return facts;
    }
    
    function _VirtualDom_addClass(object, key, newClass)
    {
        var classes = object[key];
        object[key] = classes ? classes + ' ' + newClass : newClass;
    }
    
    
    
    // RENDER
    
    
    function _VirtualDom_render(vNode, eventNode)
    {
        var tag = vNode.$;
    
        if (tag === 5)
        {
            return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
        }
    
        if (tag === 0)
        {
            return _VirtualDom_doc.createTextNode(vNode.a);
        }
    
        if (tag === 4)
        {
            var subNode = vNode.k;
            var tagger = vNode.j;
    
            while (subNode.$ === 4)
            {
                typeof tagger !== 'object'
                    ? tagger = [tagger, subNode.j]
                    : tagger.push(subNode.j);
    
                subNode = subNode.k;
            }
    
            var subEventRoot = { j: tagger, p: eventNode };
            var domNode = _VirtualDom_render(subNode, subEventRoot);
            domNode.elm_event_node_ref = subEventRoot;
            return domNode;
        }
    
        if (tag === 3)
        {
            var domNode = vNode.h(vNode.g);
            _VirtualDom_applyFacts(domNode, eventNode, vNode.d);
            return domNode;
        }
    
        // at this point `tag` must be 1 or 2
    
        var domNode = vNode.f
            ? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
            : _VirtualDom_doc.createElement(vNode.c);
    
        if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
        {
            domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
        }
    
        _VirtualDom_applyFacts(domNode, eventNode, vNode.d);
    
        for (var kids = vNode.e, i = 0; i < kids.length; i++)
        {
            _VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
        }
    
        return domNode;
    }
    
    
    
    // APPLY FACTS
    
    
    function _VirtualDom_applyFacts(domNode, eventNode, facts)
    {
        for (var key in facts)
        {
            var value = facts[key];
    
            key === 'a1'
                ? _VirtualDom_applyStyles(domNode, value)
                :
            key === 'a0'
                ? _VirtualDom_applyEvents(domNode, eventNode, value)
                :
            key === 'a3'
                ? _VirtualDom_applyAttrs(domNode, value)
                :
            key === 'a4'
                ? _VirtualDom_applyAttrsNS(domNode, value)
                :
            ((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
        }
    }
    
    
    
    // APPLY STYLES
    
    
    function _VirtualDom_applyStyles(domNode, styles)
    {
        var domNodeStyle = domNode.style;
    
        for (var key in styles)
        {
            domNodeStyle[key] = styles[key];
        }
    }
    
    
    
    // APPLY ATTRS
    
    
    function _VirtualDom_applyAttrs(domNode, attrs)
    {
        for (var key in attrs)
        {
            var value = attrs[key];
            typeof value !== 'undefined'
                ? domNode.setAttribute(key, value)
                : domNode.removeAttribute(key);
        }
    }
    
    
    
    // APPLY NAMESPACED ATTRS
    
    
    function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
    {
        for (var key in nsAttrs)
        {
            var pair = nsAttrs[key];
            var namespace = pair.f;
            var value = pair.o;
    
            typeof value !== 'undefined'
                ? domNode.setAttributeNS(namespace, key, value)
                : domNode.removeAttributeNS(namespace, key);
        }
    }
    
    
    
    // APPLY EVENTS
    
    
    function _VirtualDom_applyEvents(domNode, eventNode, events)
    {
        var allCallbacks = domNode.elmFs || (domNode.elmFs = {});
    
        for (var key in events)
        {
            var newHandler = events[key];
            var oldCallback = allCallbacks[key];
    
            if (!newHandler)
            {
                domNode.removeEventListener(key, oldCallback);
                allCallbacks[key] = undefined;
                continue;
            }
    
            if (oldCallback)
            {
                var oldHandler = oldCallback.q;
                if (oldHandler.$ === newHandler.$)
                {
                    oldCallback.q = newHandler;
                    continue;
                }
                domNode.removeEventListener(key, oldCallback);
            }
    
            oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
            domNode.addEventListener(key, oldCallback,
                _VirtualDom_passiveSupported
                && { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
            );
            allCallbacks[key] = oldCallback;
        }
    }
    
    
    
    // PASSIVE EVENTS
    
    
    var _VirtualDom_passiveSupported;
    
    try
    {
        window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
            get: function() { _VirtualDom_passiveSupported = true; }
        }));
    }
    catch(e) {}
    
    
    
    // EVENT HANDLERS
    
    
    function _VirtualDom_makeCallback(eventNode, initialHandler)
    {
        function callback(event)
        {
            var handler = callback.q;
            var result = _Json_runHelp(handler.a, event);
    
            if (!elm$core$Result$isOk(result))
            {
                return;
            }
    
            var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);
    
            // 0 = Normal
            // 1 = MayStopPropagation
            // 2 = MayPreventDefault
            // 3 = Custom
    
            var value = result.a;
            var message = !tag ? value : tag < 3 ? value.a : value.message;
            var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
            var currentEventNode = (
                stopPropagation && event.stopPropagation(),
                (tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
                eventNode
            );
            var tagger;
            var i;
            while (tagger = currentEventNode.j)
            {
                if (typeof tagger == 'function')
                {
                    message = tagger(message);
                }
                else
                {
                    for (var i = tagger.length; i--; )
                    {
                        message = tagger[i](message);
                    }
                }
                currentEventNode = currentEventNode.p;
            }
            currentEventNode(message, stopPropagation); // stopPropagation implies isSync
        }
    
        callback.q = initialHandler;
    
        return callback;
    }
    
    function _VirtualDom_equalEvents(x, y)
    {
        return x.$ == y.$ && _Json_equality(x.a, y.a);
    }
    
    
    
    // DIFF
    
    
    // TODO: Should we do patches like in iOS?
    //
    // type Patch
    //   = At Int Patch
    //   | Batch (List Patch)
    //   | Change ...
    //
    // How could it not be better?
    //
    function _VirtualDom_diff(x, y)
    {
        var patches = [];
        _VirtualDom_diffHelp(x, y, patches, 0);
        return patches;
    }
    
    
    function _VirtualDom_pushPatch(patches, type, index, data)
    {
        var patch = {
            $: type,
            r: index,
            s: data,
            t: undefined,
            u: undefined
        };
        patches.push(patch);
        return patch;
    }
    
    
    function _VirtualDom_diffHelp(x, y, patches, index)
    {
        if (x === y)
        {
            return;
        }
    
        var xType = x.$;
        var yType = y.$;
    
        // Bail if you run into different types of nodes. Implies that the
        // structure has changed significantly and it's not worth a diff.
        if (xType !== yType)
        {
            if (xType === 1 && yType === 2)
            {
                y = _VirtualDom_dekey(y);
                yType = 1;
            }
            else
            {
                _VirtualDom_pushPatch(patches, 0, index, y);
                return;
            }
        }
    
        // Now we know that both nodes are the same $.
        switch (yType)
        {
            case 5:
                var xRefs = x.l;
                var yRefs = y.l;
                var i = xRefs.length;
                var same = i === yRefs.length;
                while (same && i--)
                {
                    same = xRefs[i] === yRefs[i];
                }
                if (same)
                {
                    y.k = x.k;
                    return;
                }
                y.k = y.m();
                var subPatches = [];
                _VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
                subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
                return;
    
            case 4:
                // gather nested taggers
                var xTaggers = x.j;
                var yTaggers = y.j;
                var nesting = false;
    
                var xSubNode = x.k;
                while (xSubNode.$ === 4)
                {
                    nesting = true;
    
                    typeof xTaggers !== 'object'
                        ? xTaggers = [xTaggers, xSubNode.j]
                        : xTaggers.push(xSubNode.j);
    
                    xSubNode = xSubNode.k;
                }
    
                var ySubNode = y.k;
                while (ySubNode.$ === 4)
                {
                    nesting = true;
    
                    typeof yTaggers !== 'object'
                        ? yTaggers = [yTaggers, ySubNode.j]
                        : yTaggers.push(ySubNode.j);
    
                    ySubNode = ySubNode.k;
                }
    
                // Just bail if different numbers of taggers. This implies the
                // structure of the virtual DOM has changed.
                if (nesting && xTaggers.length !== yTaggers.length)
                {
                    _VirtualDom_pushPatch(patches, 0, index, y);
                    return;
                }
    
                // check if taggers are "the same"
                if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
                {
                    _VirtualDom_pushPatch(patches, 2, index, yTaggers);
                }
    
                // diff everything below the taggers
                _VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
                return;
    
            case 0:
                if (x.a !== y.a)
                {
                    _VirtualDom_pushPatch(patches, 3, index, y.a);
                }
                return;
    
            case 1:
                _VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
                return;
    
            case 2:
                _VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
                return;
    
            case 3:
                if (x.h !== y.h)
                {
                    _VirtualDom_pushPatch(patches, 0, index, y);
                    return;
                }
    
                var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
                factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);
    
                var patch = y.i(x.g, y.g);
                patch && _VirtualDom_pushPatch(patches, 5, index, patch);
    
                return;
        }
    }
    
    // assumes the incoming arrays are the same length
    function _VirtualDom_pairwiseRefEqual(as, bs)
    {
        for (var i = 0; i < as.length; i++)
        {
            if (as[i] !== bs[i])
            {
                return false;
            }
        }
    
        return true;
    }
    
    function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
    {
        // Bail if obvious indicators have changed. Implies more serious
        // structural changes such that it's not worth it to diff.
        if (x.c !== y.c || x.f !== y.f)
        {
            _VirtualDom_pushPatch(patches, 0, index, y);
            return;
        }
    
        var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
        factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);
    
        diffKids(x, y, patches, index);
    }
    
    
    
    // DIFF FACTS
    
    
    // TODO Instead of creating a new diff object, it's possible to just test if
    // there *is* a diff. During the actual patch, do the diff again and make the
    // modifications directly. This way, there's no new allocations. Worth it?
    function _VirtualDom_diffFacts(x, y, category)
    {
        var diff;
    
        // look for changes and removals
        for (var xKey in x)
        {
            if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
            {
                var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
                if (subDiff)
                {
                    diff = diff || {};
                    diff[xKey] = subDiff;
                }
                continue;
            }
    
            // remove if not in the new facts
            if (!(xKey in y))
            {
                diff = diff || {};
                diff[xKey] =
                    !category
                        ? (typeof x[xKey] === 'string' ? '' : null)
                        :
                    (category === 'a1')
                        ? ''
                        :
                    (category === 'a0' || category === 'a3')
                        ? undefined
                        :
                    { f: x[xKey].f, o: undefined };
    
                continue;
            }
    
            var xValue = x[xKey];
            var yValue = y[xKey];
    
            // reference equal, so don't worry about it
            if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
                || category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
            {
                continue;
            }
    
            diff = diff || {};
            diff[xKey] = yValue;
        }
    
        // add new stuff
        for (var yKey in y)
        {
            if (!(yKey in x))
            {
                diff = diff || {};
                diff[yKey] = y[yKey];
            }
        }
    
        return diff;
    }
    
    
    
    // DIFF KIDS
    
    
    function _VirtualDom_diffKids(xParent, yParent, patches, index)
    {
        var xKids = xParent.e;
        var yKids = yParent.e;
    
        var xLen = xKids.length;
        var yLen = yKids.length;
    
        // FIGURE OUT IF THERE ARE INSERTS OR REMOVALS
    
        if (xLen > yLen)
        {
            _VirtualDom_pushPatch(patches, 6, index, {
                v: yLen,
                i: xLen - yLen
            });
        }
        else if (xLen < yLen)
        {
            _VirtualDom_pushPatch(patches, 7, index, {
                v: xLen,
                e: yKids
            });
        }
    
        // PAIRWISE DIFF EVERYTHING ELSE
    
        for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
        {
            var xKid = xKids[i];
            _VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
            index += xKid.b || 0;
        }
    }
    
    
    
    // KEYED DIFF
    
    
    function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
    {
        var localPatches = [];
    
        var changes = {}; // Dict String Entry
        var inserts = []; // Array { index : Int, entry : Entry }
        // type Entry = { tag : String, vnode : VNode, index : Int, data : _ }
    
        var xKids = xParent.e;
        var yKids = yParent.e;
        var xLen = xKids.length;
        var yLen = yKids.length;
        var xIndex = 0;
        var yIndex = 0;
    
        var index = rootIndex;
    
        while (xIndex < xLen && yIndex < yLen)
        {
            var x = xKids[xIndex];
            var y = yKids[yIndex];
    
            var xKey = x.a;
            var yKey = y.a;
            var xNode = x.b;
            var yNode = y.b;
    
            var newMatch = undefined;
            var oldMatch = undefined;
    
            // check if keys match
    
            if (xKey === yKey)
            {
                index++;
                _VirtualDom_diffHelp(xNode, yNode, localPatches, index);
                index += xNode.b || 0;
    
                xIndex++;
                yIndex++;
                continue;
            }
    
            // look ahead 1 to detect insertions and removals.
    
            var xNext = xKids[xIndex + 1];
            var yNext = yKids[yIndex + 1];
    
            if (xNext)
            {
                var xNextKey = xNext.a;
                var xNextNode = xNext.b;
                oldMatch = yKey === xNextKey;
            }
    
            if (yNext)
            {
                var yNextKey = yNext.a;
                var yNextNode = yNext.b;
                newMatch = xKey === yNextKey;
            }
    
    
            // swap x and y
            if (newMatch && oldMatch)
            {
                index++;
                _VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
                _VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
                index += xNode.b || 0;
    
                index++;
                _VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
                index += xNextNode.b || 0;
    
                xIndex += 2;
                yIndex += 2;
                continue;
            }
    
            // insert y
            if (newMatch)
            {
                index++;
                _VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
                _VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
                index += xNode.b || 0;
    
                xIndex += 1;
                yIndex += 2;
                continue;
            }
    
            // remove x
            if (oldMatch)
            {
                index++;
                _VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
                index += xNode.b || 0;
    
                index++;
                _VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
                index += xNextNode.b || 0;
    
                xIndex += 2;
                yIndex += 1;
                continue;
            }
    
            // remove x, insert y
            if (xNext && xNextKey === yNextKey)
            {
                index++;
                _VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
                _VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
                index += xNode.b || 0;
    
                index++;
                _VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
                index += xNextNode.b || 0;
    
                xIndex += 2;
                yIndex += 2;
                continue;
            }
    
            break;
        }
    
        // eat up any remaining nodes with removeNode and insertNode
    
        while (xIndex < xLen)
        {
            index++;
            var x = xKids[xIndex];
            var xNode = x.b;
            _VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
            index += xNode.b || 0;
            xIndex++;
        }
    
        while (yIndex < yLen)
        {
            var endInserts = endInserts || [];
            var y = yKids[yIndex];
            _VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
            yIndex++;
        }
    
        if (localPatches.length > 0 || inserts.length > 0 || endInserts)
        {
            _VirtualDom_pushPatch(patches, 8, rootIndex, {
                w: localPatches,
                x: inserts,
                y: endInserts
            });
        }
    }
    
    
    
    // CHANGES FROM KEYED DIFF
    
    
    var _VirtualDom_POSTFIX = '_elmW6BL';
    
    
    function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
    {
        var entry = changes[key];
    
        // never seen this key before
        if (!entry)
        {
            entry = {
                c: 0,
                z: vnode,
                r: yIndex,
                s: undefined
            };
    
            inserts.push({ r: yIndex, A: entry });
            changes[key] = entry;
    
            return;
        }
    
        // this key was removed earlier, a match!
        if (entry.c === 1)
        {
            inserts.push({ r: yIndex, A: entry });
    
            entry.c = 2;
            var subPatches = [];
            _VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
            entry.r = yIndex;
            entry.s.s = {
                w: subPatches,
                A: entry
            };
    
            return;
        }
    
        // this key has already been inserted or moved, a duplicate!
        _VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
    }
    
    
    function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
    {
        var entry = changes[key];
    
        // never seen this key before
        if (!entry)
        {
            var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);
    
            changes[key] = {
                c: 1,
                z: vnode,
                r: index,
                s: patch
            };
    
            return;
        }
    
        // this key was inserted earlier, a match!
        if (entry.c === 0)
        {
            entry.c = 2;
            var subPatches = [];
            _VirtualDom_diffHelp(vnode, entry.z, subPatches, index);
    
            _VirtualDom_pushPatch(localPatches, 9, index, {
                w: subPatches,
                A: entry
            });
    
            return;
        }
    
        // this key has already been removed or moved, a duplicate!
        _VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
    }
    
    
    
    // ADD DOM NODES
    //
    // Each DOM node has an "index" assigned in order of traversal. It is important
    // to minimize our crawl over the actual DOM, so these indexes (along with the
    // descendantsCount of virtual nodes) let us skip touching entire subtrees of
    // the DOM if we know there are no patches there.
    
    
    function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
    {
        _VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
    }
    
    
    // assumes `patches` is non-empty and indexes increase monotonically.
    function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
    {
        var patch = patches[i];
        var index = patch.r;
    
        while (index === low)
        {
            var patchType = patch.$;
    
            if (patchType === 1)
            {
                _VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
            }
            else if (patchType === 8)
            {
                patch.t = domNode;
                patch.u = eventNode;
    
                var subPatches = patch.s.w;
                if (subPatches.length > 0)
                {
                    _VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
                }
            }
            else if (patchType === 9)
            {
                patch.t = domNode;
                patch.u = eventNode;
    
                var data = patch.s;
                if (data)
                {
                    data.A.s = domNode;
                    var subPatches = data.w;
                    if (subPatches.length > 0)
                    {
                        _VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
                    }
                }
            }
            else
            {
                patch.t = domNode;
                patch.u = eventNode;
            }
    
            i++;
    
            if (!(patch = patches[i]) || (index = patch.r) > high)
            {
                return i;
            }
        }
    
        var tag = vNode.$;
    
        if (tag === 4)
        {
            var subNode = vNode.k;
    
            while (subNode.$ === 4)
            {
                subNode = subNode.k;
            }
    
            return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
        }
    
        // tag must be 1 or 2 at this point
    
        var vKids = vNode.e;
        var childNodes = domNode.childNodes;
        for (var j = 0; j < vKids.length; j++)
        {
            low++;
            var vKid = tag === 1 ? vKids[j] : vKids[j].b;
            var nextLow = low + (vKid.b || 0);
            if (low <= index && index <= nextLow)
            {
                i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
                if (!(patch = patches[i]) || (index = patch.r) > high)
                {
                    return i;
                }
            }
            low = nextLow;
        }
        return i;
    }
    
    
    
    // APPLY PATCHES
    
    
    function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
    {
        if (patches.length === 0)
        {
            return rootDomNode;
        }
    
        _VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
        return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
    }
    
    function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
    {
        for (var i = 0; i < patches.length; i++)
        {
            var patch = patches[i];
            var localDomNode = patch.t
            var newNode = _VirtualDom_applyPatch(localDomNode, patch);
            if (localDomNode === rootDomNode)
            {
                rootDomNode = newNode;
            }
        }
        return rootDomNode;
    }
    
    function _VirtualDom_applyPatch(domNode, patch)
    {
        switch (patch.$)
        {
            case 0:
                return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);
    
            case 4:
                _VirtualDom_applyFacts(domNode, patch.u, patch.s);
                return domNode;
    
            case 3:
                domNode.replaceData(0, domNode.length, patch.s);
                return domNode;
    
            case 1:
                return _VirtualDom_applyPatchesHelp(domNode, patch.s);
    
            case 2:
                if (domNode.elm_event_node_ref)
                {
                    domNode.elm_event_node_ref.j = patch.s;
                }
                else
                {
                    domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
                }
                return domNode;
    
            case 6:
                var data = patch.s;
                for (var i = 0; i < data.i; i++)
                {
                    domNode.removeChild(domNode.childNodes[data.v]);
                }
                return domNode;
    
            case 7:
                var data = patch.s;
                var kids = data.e;
                var i = data.v;
                var theEnd = domNode.childNodes[i];
                for (; i < kids.length; i++)
                {
                    domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
                }
                return domNode;
    
            case 9:
                var data = patch.s;
                if (!data)
                {
                    domNode.parentNode.removeChild(domNode);
                    return domNode;
                }
                var entry = data.A;
                if (typeof entry.r !== 'undefined')
                {
                    domNode.parentNode.removeChild(domNode);
                }
                entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
                return domNode;
    
            case 8:
                return _VirtualDom_applyPatchReorder(domNode, patch);
    
            case 5:
                return patch.s(domNode);
    
            default:
                _Debug_crash(10); // 'Ran into an unknown patch!'
        }
    }
    
    
    function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
    {
        var parentNode = domNode.parentNode;
        var newNode = _VirtualDom_render(vNode, eventNode);
    
        if (!newNode.elm_event_node_ref)
        {
            newNode.elm_event_node_ref = domNode.elm_event_node_ref;
        }
    
        if (parentNode && newNode !== domNode)
        {
            parentNode.replaceChild(newNode, domNode);
        }
        return newNode;
    }
    
    
    function _VirtualDom_applyPatchReorder(domNode, patch)
    {
        var data = patch.s;
    
        // remove end inserts
        var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);
    
        // removals
        domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);
    
        // inserts
        var inserts = data.x;
        for (var i = 0; i < inserts.length; i++)
        {
            var insert = inserts[i];
            var entry = insert.A;
            var node = entry.c === 2
                ? entry.s
                : _VirtualDom_render(entry.z, patch.u);
            domNode.insertBefore(node, domNode.childNodes[insert.r]);
        }
    
        // add end inserts
        if (frag)
        {
            _VirtualDom_appendChild(domNode, frag);
        }
    
        return domNode;
    }
    
    
    function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
    {
        if (!endInserts)
        {
            return;
        }
    
        var frag = _VirtualDom_doc.createDocumentFragment();
        for (var i = 0; i < endInserts.length; i++)
        {
            var insert = endInserts[i];
            var entry = insert.A;
            _VirtualDom_appendChild(frag, entry.c === 2
                ? entry.s
                : _VirtualDom_render(entry.z, patch.u)
            );
        }
        return frag;
    }
    
    
    function _VirtualDom_virtualize(node)
    {
        // TEXT NODES
    
        if (node.nodeType === 3)
        {
            return _VirtualDom_text(node.textContent);
        }
    
    
        // WEIRD NODES
    
        if (node.nodeType !== 1)
        {
            return _VirtualDom_text('');
        }
    
    
        // ELEMENT NODES
    
        var attrList = _List_Nil;
        var attrs = node.attributes;
        for (var i = attrs.length; i--; )
        {
            var attr = attrs[i];
            var name = attr.name;
            var value = attr.value;
            attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
        }
    
        var tag = node.tagName.toLowerCase();
        var kidList = _List_Nil;
        var kids = node.childNodes;
    
        for (var i = kids.length; i--; )
        {
            kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
        }
        return A3(_VirtualDom_node, tag, attrList, kidList);
    }
    
    function _VirtualDom_dekey(keyedNode)
    {
        var keyedKids = keyedNode.e;
        var len = keyedKids.length;
        var kids = new Array(len);
        for (var i = 0; i < len; i++)
        {
            kids[i] = keyedKids[i].b;
        }
    
        return {
            $: 1,
            c: keyedNode.c,
            d: keyedNode.d,
            e: kids,
            f: keyedNode.f,
            b: keyedNode.b
        };
    }
    
    
    
    
    // ELEMENT
    
    
    var _Debugger_element;
    
    var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
    {
        return _Platform_initialize(
            flagDecoder,
            args,
            impl.init,
            impl.update,
            impl.subscriptions,
            function(sendToApp, initialModel) {
                var view = impl.view;
                /**_UNUSED/
                var domNode = args['node'];
                //*/
                /**/
                var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
                //*/
                var currNode = _VirtualDom_virtualize(domNode);
    
                return _Browser_makeAnimator(initialModel, function(model)
                {
                    var nextNode = view(model);
                    var patches = _VirtualDom_diff(currNode, nextNode);
                    domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
                    currNode = nextNode;
                });
            }
        );
    });
    
    
    
    // DOCUMENT
    
    
    var _Debugger_document;
    
    var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
    {
        return _Platform_initialize(
            flagDecoder,
            args,
            impl.init,
            impl.update,
            impl.subscriptions,
            function(sendToApp, initialModel) {
                var divertHrefToApp = impl.setup && impl.setup(sendToApp)
                var view = impl.view;
                var title = _VirtualDom_doc.title;
                var bodyNode = _VirtualDom_doc.body;
                var currNode = _VirtualDom_virtualize(bodyNode);
                return _Browser_makeAnimator(initialModel, function(model)
                {
                    _VirtualDom_divertHrefToApp = divertHrefToApp;
                    var doc = view(model);
                    var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
                    var patches = _VirtualDom_diff(currNode, nextNode);
                    bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
                    currNode = nextNode;
                    _VirtualDom_divertHrefToApp = 0;
                    (title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
                });
            }
        );
    });
    
    
    
    // ANIMATION
    
    
    var _Browser_cancelAnimationFrame =
        typeof cancelAnimationFrame !== 'undefined'
            ? cancelAnimationFrame
            : function(id) { clearTimeout(id); };
    
    var _Browser_requestAnimationFrame =
        typeof requestAnimationFrame !== 'undefined'
            ? requestAnimationFrame
            : function(callback) { return setTimeout(callback, 1000 / 60); };
    
    
    function _Browser_makeAnimator(model, draw)
    {
        draw(model);
    
        var state = 0;
    
        function updateIfNeeded()
        {
            state = state === 1
                ? 0
                : ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
        }
    
        return function(nextModel, isSync)
        {
            model = nextModel;
    
            isSync
                ? ( draw(model),
                    state === 2 && (state = 1)
                    )
                : ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
                    state = 2
                    );
        };
    }
    
    
    
    // APPLICATION
    
    
    function _Browser_application(impl)
    {
        var onUrlChange = impl.onUrlChange;
        var onUrlRequest = impl.onUrlRequest;
        var key = function() { key.a(onUrlChange(_Browser_getUrl())); };
    
        return _Browser_document({
            setup: function(sendToApp)
            {
                key.a = sendToApp;
                _Browser_window.addEventListener('popstate', key);
                _Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);
    
                return F2(function(domNode, event)
                {
                    if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
                    {
                        event.preventDefault();
                        var href = domNode.href;
                        var curr = _Browser_getUrl();
                        var next = elm$url$Url$fromString(href).a;
                        sendToApp(onUrlRequest(
                            (next
                                && curr.protocol === next.protocol
                                && curr.host === next.host
                                && curr.port_.a === next.port_.a
                            )
                                ? elm$browser$Browser$Internal(next)
                                : elm$browser$Browser$External(href)
                        ));
                    }
                });
            },
            init: function(flags)
            {
                return A3(impl.init, flags, _Browser_getUrl(), key);
            },
            view: impl.view,
            update: impl.update,
            subscriptions: impl.subscriptions
        });
    }
    
    function _Browser_getUrl()
    {
        return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
    }
    
    var _Browser_go = F2(function(key, n)
    {
        return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
            n && history.go(n);
            key();
        }));
    });
    
    var _Browser_pushUrl = F2(function(key, url)
    {
        return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
            history.pushState({}, '', url);
            key();
        }));
    });
    
    var _Browser_replaceUrl = F2(function(key, url)
    {
        return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
            history.replaceState({}, '', url);
            key();
        }));
    });
    
    
    
    // GLOBAL EVENTS
    
    
    var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
    var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
    var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;
    
    var _Browser_on = F3(function(node, eventName, sendToSelf)
    {
        return _Scheduler_spawn(_Scheduler_binding(function(callback)
        {
            function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
            node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
            return function() { node.removeEventListener(eventName, handler); };
        }));
    });
    
    var _Browser_decodeEvent = F2(function(decoder, event)
    {
        var result = _Json_runHelp(decoder, event);
        return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
    });
    
    
    
    // PAGE VISIBILITY
    
    
    function _Browser_visibilityInfo()
    {
        return (typeof _VirtualDom_doc.hidden !== 'undefined')
            ? { hidden: 'hidden', change: 'visibilitychange' }
            :
        (typeof _VirtualDom_doc.mozHidden !== 'undefined')
            ? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
            :
        (typeof _VirtualDom_doc.msHidden !== 'undefined')
            ? { hidden: 'msHidden', change: 'msvisibilitychange' }
            :
        (typeof _VirtualDom_doc.webkitHidden !== 'undefined')
            ? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
            : { hidden: 'hidden', change: 'visibilitychange' };
    }
    
    
    
    // ANIMATION FRAMES
    
    
    function _Browser_rAF()
    {
        return _Scheduler_binding(function(callback)
        {
            var id = _Browser_requestAnimationFrame(function() {
                callback(_Scheduler_succeed(Date.now()));
            });
    
            return function() {
                _Browser_cancelAnimationFrame(id);
            };
        });
    }
    
    
    function _Browser_now()
    {
        return _Scheduler_binding(function(callback)
        {
            callback(_Scheduler_succeed(Date.now()));
        });
    }
    
    
    
    // DOM STUFF
    
    
    function _Browser_withNode(id, doStuff)
    {
        return _Scheduler_binding(function(callback)
        {
            _Browser_requestAnimationFrame(function() {
                var node = document.getElementById(id);
                callback(node
                    ? _Scheduler_succeed(doStuff(node))
                    : _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
                );
            });
        });
    }
    
    
    function _Browser_withWindow(doStuff)
    {
        return _Scheduler_binding(function(callback)
        {
            _Browser_requestAnimationFrame(function() {
                callback(_Scheduler_succeed(doStuff()));
            });
        });
    }
    
    
    // FOCUS and BLUR
    
    
    var _Browser_call = F2(function(functionName, id)
    {
        return _Browser_withNode(id, function(node) {
            node[functionName]();
            return _Utils_Tuple0;
        });
    });
    
    
    
    // WINDOW VIEWPORT
    
    
    function _Browser_getViewport()
    {
        return {
            scene: _Browser_getScene(),
            viewport: {
                x: _Browser_window.pageXOffset,
                y: _Browser_window.pageYOffset,
                width: _Browser_doc.documentElement.clientWidth,
                height: _Browser_doc.documentElement.clientHeight
            }
        };
    }
    
    function _Browser_getScene()
    {
        var body = _Browser_doc.body;
        var elem = _Browser_doc.documentElement;
        return {
            width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
            height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
        };
    }
    
    var _Browser_setViewport = F2(function(x, y)
    {
        return _Browser_withWindow(function()
        {
            _Browser_window.scroll(x, y);
            return _Utils_Tuple0;
        });
    });
    
    
    
    // ELEMENT VIEWPORT
    
    
    function _Browser_getViewportOf(id)
    {
        return _Browser_withNode(id, function(node)
        {
            return {
                scene: {
                    width: node.scrollWidth,
                    height: node.scrollHeight
                },
                viewport: {
                    x: node.scrollLeft,
                    y: node.scrollTop,
                    width: node.clientWidth,
                    height: node.clientHeight
                }
            };
        });
    }
    
    
    var _Browser_setViewportOf = F3(function(id, x, y)
    {
        return _Browser_withNode(id, function(node)
        {
            node.scrollLeft = x;
            node.scrollTop = y;
            return _Utils_Tuple0;
        });
    });
    
    
    
    // ELEMENT
    
    
    function _Browser_getElement(id)
    {
        return _Browser_withNode(id, function(node)
        {
            var rect = node.getBoundingClientRect();
            var x = _Browser_window.pageXOffset;
            var y = _Browser_window.pageYOffset;
            return {
                scene: _Browser_getScene(),
                viewport: {
                    x: x,
                    y: y,
                    width: _Browser_doc.documentElement.clientWidth,
                    height: _Browser_doc.documentElement.clientHeight
                },
                element: {
                    x: x + rect.left,
                    y: y + rect.top,
                    width: rect.width,
                    height: rect.height
                }
            };
        });
    }
    
    
    
    // LOAD and RELOAD
    
    
    function _Browser_reload(skipCache)
    {
        return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
        {
            _VirtualDom_doc.location.reload(skipCache);
        }));
    }
    
    function _Browser_load(url)
    {
        return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
        {
            try
            {
                _Browser_window.location = url;
            }
            catch(err)
            {
                // Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
                // Other browsers reload the page, so let's be consistent about that.
                _VirtualDom_doc.location.reload(false);
            }
        }));
    }
    var author$project$Tree$Core$Empty = function (a) {
        return {$: 'Empty', a: a};
    };
    var author$project$Tree$Core$End = {$: 'End'};
    var author$project$Tree$Core$Start = function (a) {
        return {$: 'Start', a: a};
    };
    var author$project$Tree$State$PostConditionNode = {$: 'PostConditionNode'};
    var author$project$Tree$State$PreConditionNode = {$: 'PreConditionNode'};
    var elm$core$Basics$True = {$: 'True'};
    var elm$core$Maybe$Nothing = {$: 'Nothing'};
    var author$project$Tree$State$init = {
        currentId: 10,
        flowchartName: '',
        highlightedBox: elm$core$Maybe$Nothing,
        postcondition: {content: '', nodeType: author$project$Tree$State$PostConditionNode, visible: false},
        precondition: {content: '', nodeType: author$project$Tree$State$PreConditionNode, visible: false},
        tree: {
            basicTree: author$project$Tree$Core$Start(
                {
                    basicTree: author$project$Tree$Core$Empty(
                        {basicTree: author$project$Tree$Core$End, id: 1}),
                    id: 2
                }),
            id: 0
        }
    };
    var elm$core$Basics$False = {$: 'False'};
    var elm$core$Result$isOk = function (result) {
        if (result.$ === 'Ok') {
            return true;
        } else {
            return false;
        }
    };
    var elm$core$Basics$EQ = {$: 'EQ'};
    var elm$core$Basics$GT = {$: 'GT'};
    var elm$core$Basics$LT = {$: 'LT'};
    var elm$core$Dict$foldr = F3(
        function (func, acc, t) {
            foldr:
            while (true) {
                if (t.$ === 'RBEmpty_elm_builtin') {
                    return acc;
                } else {
                    var key = t.b;
                    var value = t.c;
                    var left = t.d;
                    var right = t.e;
                    var $temp$func = func,
                        $temp$acc = A3(
                        func,
                        key,
                        value,
                        A3(elm$core$Dict$foldr, func, acc, right)),
                        $temp$t = left;
                    func = $temp$func;
                    acc = $temp$acc;
                    t = $temp$t;
                    continue foldr;
                }
            }
        });
    var elm$core$List$cons = _List_cons;
    var elm$core$Dict$toList = function (dict) {
        return A3(
            elm$core$Dict$foldr,
            F3(
                function (key, value, list) {
                    return A2(
                        elm$core$List$cons,
                        _Utils_Tuple2(key, value),
                        list);
                }),
            _List_Nil,
            dict);
    };
    var elm$core$Dict$keys = function (dict) {
        return A3(
            elm$core$Dict$foldr,
            F3(
                function (key, value, keyList) {
                    return A2(elm$core$List$cons, key, keyList);
                }),
            _List_Nil,
            dict);
    };
    var elm$core$Set$toList = function (_n0) {
        var dict = _n0.a;
        return elm$core$Dict$keys(dict);
    };
    var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
    var elm$core$Array$foldr = F3(
        function (func, baseCase, _n0) {
            var tree = _n0.c;
            var tail = _n0.d;
            var helper = F2(
                function (node, acc) {
                    if (node.$ === 'SubTree') {
                        var subTree = node.a;
                        return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
                    } else {
                        var values = node.a;
                        return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
                    }
                });
            return A3(
                elm$core$Elm$JsArray$foldr,
                helper,
                A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
                tree);
        });
    var elm$core$Array$toList = function (array) {
        return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
    };
    var elm$core$Array$branchFactor = 32;
    var elm$core$Array$Array_elm_builtin = F4(
        function (a, b, c, d) {
            return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
        });
    var elm$core$Basics$ceiling = _Basics_ceiling;
    var elm$core$Basics$fdiv = _Basics_fdiv;
    var elm$core$Basics$logBase = F2(
        function (base, number) {
            return _Basics_log(number) / _Basics_log(base);
        });
    var elm$core$Basics$toFloat = _Basics_toFloat;
    var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
        A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
    var elm$core$Elm$JsArray$empty = _JsArray_empty;
    var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
    var elm$core$Array$Leaf = function (a) {
        return {$: 'Leaf', a: a};
    };
    var elm$core$Array$SubTree = function (a) {
        return {$: 'SubTree', a: a};
    };
    var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
    var elm$core$List$foldl = F3(
        function (func, acc, list) {
            foldl:
            while (true) {
                if (!list.b) {
                    return acc;
                } else {
                    var x = list.a;
                    var xs = list.b;
                    var $temp$func = func,
                        $temp$acc = A2(func, x, acc),
                        $temp$list = xs;
                    func = $temp$func;
                    acc = $temp$acc;
                    list = $temp$list;
                    continue foldl;
                }
            }
        });
    var elm$core$List$reverse = function (list) {
        return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
    };
    var elm$core$Array$compressNodes = F2(
        function (nodes, acc) {
            compressNodes:
            while (true) {
                var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
                var node = _n0.a;
                var remainingNodes = _n0.b;
                var newAcc = A2(
                    elm$core$List$cons,
                    elm$core$Array$SubTree(node),
                    acc);
                if (!remainingNodes.b) {
                    return elm$core$List$reverse(newAcc);
                } else {
                    var $temp$nodes = remainingNodes,
                        $temp$acc = newAcc;
                    nodes = $temp$nodes;
                    acc = $temp$acc;
                    continue compressNodes;
                }
            }
        });
    var elm$core$Basics$apR = F2(
        function (x, f) {
            return f(x);
        });
    var elm$core$Basics$eq = _Utils_equal;
    var elm$core$Tuple$first = function (_n0) {
        var x = _n0.a;
        return x;
    };
    var elm$core$Array$treeFromBuilder = F2(
        function (nodeList, nodeListSize) {
            treeFromBuilder:
            while (true) {
                var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
                if (newNodeSize === 1) {
                    return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
                } else {
                    var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
                        $temp$nodeListSize = newNodeSize;
                    nodeList = $temp$nodeList;
                    nodeListSize = $temp$nodeListSize;
                    continue treeFromBuilder;
                }
            }
        });
    var elm$core$Basics$add = _Basics_add;
    var elm$core$Basics$apL = F2(
        function (f, x) {
            return f(x);
        });
    var elm$core$Basics$floor = _Basics_floor;
    var elm$core$Basics$gt = _Utils_gt;
    var elm$core$Basics$max = F2(
        function (x, y) {
            return (_Utils_cmp(x, y) > 0) ? x : y;
        });
    var elm$core$Basics$mul = _Basics_mul;
    var elm$core$Basics$sub = _Basics_sub;
    var elm$core$Elm$JsArray$length = _JsArray_length;
    var elm$core$Array$builderToArray = F2(
        function (reverseNodeList, builder) {
            if (!builder.nodeListSize) {
                return A4(
                    elm$core$Array$Array_elm_builtin,
                    elm$core$Elm$JsArray$length(builder.tail),
                    elm$core$Array$shiftStep,
                    elm$core$Elm$JsArray$empty,
                    builder.tail);
            } else {
                var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
                var depth = elm$core$Basics$floor(
                    A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
                var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
                var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
                return A4(
                    elm$core$Array$Array_elm_builtin,
                    elm$core$Elm$JsArray$length(builder.tail) + treeLen,
                    A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
                    tree,
                    builder.tail);
            }
        });
    var elm$core$Basics$idiv = _Basics_idiv;
    var elm$core$Basics$lt = _Utils_lt;
    var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
    var elm$core$Array$initializeHelp = F5(
        function (fn, fromIndex, len, nodeList, tail) {
            initializeHelp:
            while (true) {
                if (fromIndex < 0) {
                    return A2(
                        elm$core$Array$builderToArray,
                        false,
                        {nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
                } else {
                    var leaf = elm$core$Array$Leaf(
                        A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
                    var $temp$fn = fn,
                        $temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
                        $temp$len = len,
                        $temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
                        $temp$tail = tail;
                    fn = $temp$fn;
                    fromIndex = $temp$fromIndex;
                    len = $temp$len;
                    nodeList = $temp$nodeList;
                    tail = $temp$tail;
                    continue initializeHelp;
                }
            }
        });
    var elm$core$Basics$le = _Utils_le;
    var elm$core$Basics$remainderBy = _Basics_remainderBy;
    var elm$core$Array$initialize = F2(
        function (len, fn) {
            if (len <= 0) {
                return elm$core$Array$empty;
            } else {
                var tailLen = len % elm$core$Array$branchFactor;
                var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
                var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
                return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
            }
        });
    var elm$core$Maybe$Just = function (a) {
        return {$: 'Just', a: a};
    };
    var elm$core$Result$Err = function (a) {
        return {$: 'Err', a: a};
    };
    var elm$core$Result$Ok = function (a) {
        return {$: 'Ok', a: a};
    };
    var elm$json$Json$Decode$Failure = F2(
        function (a, b) {
            return {$: 'Failure', a: a, b: b};
        });
    var elm$json$Json$Decode$Field = F2(
        function (a, b) {
            return {$: 'Field', a: a, b: b};
        });
    var elm$json$Json$Decode$Index = F2(
        function (a, b) {
            return {$: 'Index', a: a, b: b};
        });
    var elm$json$Json$Decode$OneOf = function (a) {
        return {$: 'OneOf', a: a};
    };
    var elm$core$Basics$and = _Basics_and;
    var elm$core$Basics$append = _Utils_append;
    var elm$core$Basics$or = _Basics_or;
    var elm$core$Char$toCode = _Char_toCode;
    var elm$core$Char$isLower = function (_char) {
        var code = elm$core$Char$toCode(_char);
        return (97 <= code) && (code <= 122);
    };
    var elm$core$Char$isUpper = function (_char) {
        var code = elm$core$Char$toCode(_char);
        return (code <= 90) && (65 <= code);
    };
    var elm$core$Char$isAlpha = function (_char) {
        return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
    };
    var elm$core$Char$isDigit = function (_char) {
        var code = elm$core$Char$toCode(_char);
        return (code <= 57) && (48 <= code);
    };
    var elm$core$Char$isAlphaNum = function (_char) {
        return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
    };
    var elm$core$List$length = function (xs) {
        return A3(
            elm$core$List$foldl,
            F2(
                function (_n0, i) {
                    return i + 1;
                }),
            0,
            xs);
    };
    var elm$core$List$map2 = _List_map2;
    var elm$core$List$rangeHelp = F3(
        function (lo, hi, list) {
            rangeHelp:
            while (true) {
                if (_Utils_cmp(lo, hi) < 1) {
                    var $temp$lo = lo,
                        $temp$hi = hi - 1,
                        $temp$list = A2(elm$core$List$cons, hi, list);
                    lo = $temp$lo;
                    hi = $temp$hi;
                    list = $temp$list;
                    continue rangeHelp;
                } else {
                    return list;
                }
            }
        });
    var elm$core$List$range = F2(
        function (lo, hi) {
            return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
        });
    var elm$core$List$indexedMap = F2(
        function (f, xs) {
            return A3(
                elm$core$List$map2,
                f,
                A2(
                    elm$core$List$range,
                    0,
                    elm$core$List$length(xs) - 1),
                xs);
        });
    var elm$core$String$all = _String_all;
    var elm$core$String$fromInt = _String_fromNumber;
    var elm$core$String$join = F2(
        function (sep, chunks) {
            return A2(
                _String_join,
                sep,
                _List_toArray(chunks));
        });
    var elm$core$String$uncons = _String_uncons;
    var elm$core$String$split = F2(
        function (sep, string) {
            return _List_fromArray(
                A2(_String_split, sep, string));
        });
    var elm$json$Json$Decode$indent = function (str) {
        return A2(
            elm$core$String$join,
            '\n    ',
            A2(elm$core$String$split, '\n', str));
    };
    var elm$json$Json$Encode$encode = _Json_encode;
    var elm$json$Json$Decode$errorOneOf = F2(
        function (i, error) {
            return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
                elm$json$Json$Decode$errorToString(error))));
        });
    var elm$json$Json$Decode$errorToString = function (error) {
        return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
    };
    var elm$json$Json$Decode$errorToStringHelp = F2(
        function (error, context) {
            errorToStringHelp:
            while (true) {
                switch (error.$) {
                    case 'Field':
                        var f = error.a;
                        var err = error.b;
                        var isSimple = function () {
                            var _n1 = elm$core$String$uncons(f);
                            if (_n1.$ === 'Nothing') {
                                return false;
                            } else {
                                var _n2 = _n1.a;
                                var _char = _n2.a;
                                var rest = _n2.b;
                                return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
                            }
                        }();
                        var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
                        var $temp$error = err,
                            $temp$context = A2(elm$core$List$cons, fieldName, context);
                        error = $temp$error;
                        context = $temp$context;
                        continue errorToStringHelp;
                    case 'Index':
                        var i = error.a;
                        var err = error.b;
                        var indexName = '[' + (elm$core$String$fromInt(i) + ']');
                        var $temp$error = err,
                            $temp$context = A2(elm$core$List$cons, indexName, context);
                        error = $temp$error;
                        context = $temp$context;
                        continue errorToStringHelp;
                    case 'OneOf':
                        var errors = error.a;
                        if (!errors.b) {
                            return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
                                if (!context.b) {
                                    return '!';
                                } else {
                                    return ' at json' + A2(
                                        elm$core$String$join,
                                        '',
                                        elm$core$List$reverse(context));
                                }
                            }();
                        } else {
                            if (!errors.b.b) {
                                var err = errors.a;
                                var $temp$error = err,
                                    $temp$context = context;
                                error = $temp$error;
                                context = $temp$context;
                                continue errorToStringHelp;
                            } else {
                                var starter = function () {
                                    if (!context.b) {
                                        return 'Json.Decode.oneOf';
                                    } else {
                                        return 'The Json.Decode.oneOf at json' + A2(
                                            elm$core$String$join,
                                            '',
                                            elm$core$List$reverse(context));
                                    }
                                }();
                                var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
                                    elm$core$List$length(errors)) + ' ways:'));
                                return A2(
                                    elm$core$String$join,
                                    '\n\n',
                                    A2(
                                        elm$core$List$cons,
                                        introduction,
                                        A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
                            }
                        }
                    default:
                        var msg = error.a;
                        var json = error.b;
                        var introduction = function () {
                            if (!context.b) {
                                return 'Problem with the given value:\n\n';
                            } else {
                                return 'Problem with the value at json' + (A2(
                                    elm$core$String$join,
                                    '',
                                    elm$core$List$reverse(context)) + ':\n\n    ');
                            }
                        }();
                        return introduction + (elm$json$Json$Decode$indent(
                            A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
                }
            }
        });
    var elm$core$Platform$Cmd$batch = _Platform_batch;
    var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
    var author$project$Main$init = function (_n0) {
        return _Utils_Tuple2(
            {state: author$project$Tree$State$init},
            elm$core$Platform$Cmd$none);
    };
    var elm$core$Platform$Sub$batch = _Platform_batch;
    var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
    var author$project$Main$subscriptions = function (model) {
        return elm$core$Platform$Sub$none;
    };
    var author$project$Main$Save = function (a) {
        return {$: 'Save', a: a};
    };
    var author$project$Main$Tree = function (a) {
        return {$: 'Tree', a: a};
    };
    var elm$json$Json$Encode$string = _Json_wrap;
    var author$project$Ports$downloadToast = _Platform_outgoingPort('downloadToast', elm$json$Json$Encode$string);
    var author$project$Save$UploadLoaded = function (a) {
        return {$: 'UploadLoaded', a: a};
    };
    var author$project$Save$UploadRead = function (a) {
        return {$: 'UploadRead', a: a};
    };
    var author$project$Save$EasterEgg = F2(
        function (easterEgg, model) {
            return {easterEgg: easterEgg, model: model};
        });
    var author$project$Tree$State$FlowchartNameNode = {$: 'FlowchartNameNode'};
    var author$project$Tree$State$ForEachNode = {$: 'ForEachNode'};
    var author$project$Tree$State$IfNode = {$: 'IfNode'};
    var author$project$Tree$State$StatementNode = {$: 'StatementNode'};
    var author$project$Tree$State$WhileNode = {$: 'WhileNode'};
    var elm$json$Json$Decode$andThen = _Json_andThen;
    var elm$json$Json$Decode$fail = _Json_fail;
    var elm$json$Json$Decode$string = _Json_decodeString;
    var elm$json$Json$Decode$succeed = _Json_succeed;
    var author$project$Save$nodeTypeDecoder = A2(
        elm$json$Json$Decode$andThen,
        function (string) {
            switch (string) {
                case 'StatementNode':
                    return elm$json$Json$Decode$succeed(author$project$Tree$State$StatementNode);
                case 'IfNode':
                    return elm$json$Json$Decode$succeed(author$project$Tree$State$IfNode);
                case 'WhileNode':
                    return elm$json$Json$Decode$succeed(author$project$Tree$State$WhileNode);
                case 'ForEachNode':
                    return elm$json$Json$Decode$succeed(author$project$Tree$State$ForEachNode);
                case 'PreConditionNode':
                    return elm$json$Json$Decode$succeed(author$project$Tree$State$PreConditionNode);
                case 'PostConditionNode':
                    return elm$json$Json$Decode$succeed(author$project$Tree$State$PostConditionNode);
                case 'FlowchartNameNode':
                    return elm$json$Json$Decode$succeed(author$project$Tree$State$FlowchartNameNode);
                default:
                    return elm$json$Json$Decode$fail('Invalid NodeType');
            }
        },
        elm$json$Json$Decode$string);
    var author$project$Tree$State$Condition = F3(
        function (nodeType, content, visible) {
            return {content: content, nodeType: nodeType, visible: visible};
        });
    var elm$json$Json$Decode$field = _Json_decodeField;
    var elm$json$Json$Decode$map3 = _Json_map3;
    var author$project$Save$conditionDecoder = A4(
        elm$json$Json$Decode$map3,
        author$project$Tree$State$Condition,
        A2(elm$json$Json$Decode$field, 'nodeType', author$project$Save$nodeTypeDecoder),
        A2(elm$json$Json$Decode$field, 'content', elm$json$Json$Decode$string),
        A2(
            elm$json$Json$Decode$field,
            'visible',
            elm$json$Json$Decode$succeed(true)));
    var author$project$Tree$Core$ForEach = F3(
        function (a, b, c) {
            return {$: 'ForEach', a: a, b: b, c: c};
        });
    var author$project$Tree$Core$If = F4(
        function (a, b, c, d) {
            return {$: 'If', a: a, b: b, c: c, d: d};
        });
    var author$project$Tree$Core$Statement = F2(
        function (a, b) {
            return {$: 'Statement', a: a, b: b};
        });
    var author$project$Tree$Core$Tree = F2(
        function (id, basicTree) {
            return {basicTree: basicTree, id: id};
        });
    var author$project$Tree$Core$Void = {$: 'Void'};
    var author$project$Tree$Core$While = F3(
        function (a, b, c) {
            return {$: 'While', a: a, b: b, c: c};
        });
    var elm$core$Debug$log = _Debug_log;
    var elm$json$Json$Decode$int = _Json_decodeInt;
    var elm$json$Json$Decode$lazy = function (thunk) {
        return A2(
            elm$json$Json$Decode$andThen,
            thunk,
            elm$json$Json$Decode$succeed(_Utils_Tuple0));
    };
    var elm$json$Json$Decode$map = _Json_map1;
    var elm$json$Json$Decode$map2 = _Json_map2;
    var elm$json$Json$Decode$map4 = _Json_map4;
    var author$project$Save$basicTreeDecoder = function (_n1) {
        var basicTreeInfo = function (tag) {
            var _n2 = A2(elm$core$Debug$log, 'Now decoding: ', tag);
            switch (_n2) {
                case 'Start':
                    return A2(
                        elm$json$Json$Decode$map,
                        author$project$Tree$Core$Start,
                        A2(
                            elm$json$Json$Decode$field,
                            'child',
                            elm$json$Json$Decode$lazy(author$project$Save$treeDecoder)));
                case 'End':
                    return elm$json$Json$Decode$succeed(author$project$Tree$Core$End);
                case 'Empty':
                    return A2(
                        elm$json$Json$Decode$map,
                        author$project$Tree$Core$Empty,
                        A2(
                            elm$json$Json$Decode$field,
                            'child',
                            elm$json$Json$Decode$lazy(author$project$Save$treeDecoder)));
                case 'Void':
                    return elm$json$Json$Decode$succeed(author$project$Tree$Core$Void);
                case 'Statement':
                    return A3(
                        elm$json$Json$Decode$map2,
                        author$project$Tree$Core$Statement,
                        A2(elm$json$Json$Decode$field, 'content', elm$json$Json$Decode$string),
                        A2(
                            elm$json$Json$Decode$field,
                            'child',
                            elm$json$Json$Decode$lazy(author$project$Save$treeDecoder)));
                case 'If':
                    return A5(
                        elm$json$Json$Decode$map4,
                        author$project$Tree$Core$If,
                        A2(elm$json$Json$Decode$field, 'content', elm$json$Json$Decode$string),
                        A2(
                            elm$json$Json$Decode$field,
                            'child1',
                            elm$json$Json$Decode$lazy(author$project$Save$treeDecoder)),
                        A2(
                            elm$json$Json$Decode$field,
                            'child2',
                            elm$json$Json$Decode$lazy(author$project$Save$treeDecoder)),
                        A2(
                            elm$json$Json$Decode$field,
                            'child3',
                            elm$json$Json$Decode$lazy(author$project$Save$treeDecoder)));
                case 'While':
                    return A4(
                        elm$json$Json$Decode$map3,
                        author$project$Tree$Core$While,
                        A2(elm$json$Json$Decode$field, 'content', elm$json$Json$Decode$string),
                        A2(
                            elm$json$Json$Decode$field,
                            'child1',
                            elm$json$Json$Decode$lazy(author$project$Save$treeDecoder)),
                        A2(
                            elm$json$Json$Decode$field,
                            'child2',
                            elm$json$Json$Decode$lazy(author$project$Save$treeDecoder)));
                case 'ForEach':
                    return A4(
                        elm$json$Json$Decode$map3,
                        author$project$Tree$Core$ForEach,
                        A2(elm$json$Json$Decode$field, 'content', elm$json$Json$Decode$string),
                        A2(
                            elm$json$Json$Decode$field,
                            'child1',
                            elm$json$Json$Decode$lazy(author$project$Save$treeDecoder)),
                        A2(
                            elm$json$Json$Decode$field,
                            'child2',
                            elm$json$Json$Decode$lazy(author$project$Save$treeDecoder)));
                default:
                    var a = _n2;
                    return elm$json$Json$Decode$fail('Unknown basicTree: ' + a);
            }
        };
        return A2(
            elm$json$Json$Decode$andThen,
            basicTreeInfo,
            A2(elm$json$Json$Decode$field, 'basicTreeType', elm$json$Json$Decode$string));
    };
    var author$project$Save$treeDecoder = function (_n0) {
        return A3(
            elm$json$Json$Decode$map2,
            author$project$Tree$Core$Tree,
            A2(elm$json$Json$Decode$field, 'id', elm$json$Json$Decode$int),
            A2(
                elm$json$Json$Decode$field,
                'basicTree',
                elm$json$Json$Decode$lazy(author$project$Save$basicTreeDecoder)));
    };
    var author$project$Tree$State$Model = F6(
        function (flowchartName, tree, currentId, highlightedBox, precondition, postcondition) {
            return {currentId: currentId, flowchartName: flowchartName, highlightedBox: highlightedBox, postcondition: postcondition, precondition: precondition, tree: tree};
        });
    var elm$json$Json$Decode$map6 = _Json_map6;
    var author$project$Save$modelDecoder = A7(
        elm$json$Json$Decode$map6,
        author$project$Tree$State$Model,
        A2(elm$json$Json$Decode$field, 'flowchartName', elm$json$Json$Decode$string),
        A2(
            elm$json$Json$Decode$field,
            'tree',
            elm$json$Json$Decode$lazy(author$project$Save$treeDecoder)),
        A2(elm$json$Json$Decode$field, 'currentId', elm$json$Json$Decode$int),
        A2(
            elm$json$Json$Decode$field,
            'highlightedBox',
            elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)),
        A2(elm$json$Json$Decode$field, 'precondition', author$project$Save$conditionDecoder),
        A2(elm$json$Json$Decode$field, 'postcondition', author$project$Save$conditionDecoder));
    var author$project$Save$easterEggDecoder = A3(
        elm$json$Json$Decode$map2,
        author$project$Save$EasterEgg,
        A2(elm$json$Json$Decode$field, '_Easter_Egg', elm$json$Json$Decode$string),
        A2(elm$json$Json$Decode$field, 'model', author$project$Save$modelDecoder));
    var elm$core$Debug$toString = _Debug_toString;
    var elm$json$Json$Decode$decodeString = _Json_runOnString;
    var author$project$Save$fromJson = function (json) {
        var decodedResult = A2(elm$json$Json$Decode$decodeString, author$project$Save$easterEggDecoder, json);
        if (decodedResult.$ === 'Ok') {
            var wrapper = decodedResult.a;
            return elm$core$Maybe$Just(
                A2(elm$core$Debug$log, 'Decoded model without problems', wrapper.model));
        } else {
            var wrapper = decodedResult.a;
            return A2(
                elm$core$Debug$log,
                'Some decoding went wrong: ' + elm$core$Debug$toString(wrapper),
                elm$core$Maybe$Nothing);
        }
    };
    var author$project$Save$encodeNodeType = function (nodeType) {
        switch (nodeType.$) {
            case 'StatementNode':
                return elm$json$Json$Encode$string('StatementNode');
            case 'IfNode':
                return elm$json$Json$Encode$string('IfNode');
            case 'WhileNode':
                return elm$json$Json$Encode$string('WhileNode');
            case 'ForEachNode':
                return elm$json$Json$Encode$string('ForEachNode');
            case 'PreConditionNode':
                return elm$json$Json$Encode$string('PreConditionNode');
            case 'PostConditionNode':
                return elm$json$Json$Encode$string('PostConditionNode');
            default:
                return elm$json$Json$Encode$string('FlowchartNameNode');
        }
    };
    var elm$json$Json$Encode$bool = _Json_wrap;
    var elm$json$Json$Encode$object = function (pairs) {
        return _Json_wrap(
            A3(
                elm$core$List$foldl,
                F2(
                    function (_n0, obj) {
                        var k = _n0.a;
                        var v = _n0.b;
                        return A3(_Json_addField, k, v, obj);
                    }),
                _Json_emptyObject(_Utils_Tuple0),
                pairs));
    };
    var author$project$Save$encodeCondition = function (condition) {
        return elm$json$Json$Encode$object(
            _List_fromArray(
                [
                    _Utils_Tuple2(
                    'nodeType',
                    author$project$Save$encodeNodeType(condition.nodeType)),
                    _Utils_Tuple2(
                    'content',
                    elm$json$Json$Encode$string(condition.content)),
                    _Utils_Tuple2(
                    'visible',
                    elm$json$Json$Encode$bool(condition.visible))
                ]));
    };
    var elm$json$Json$Encode$int = _Json_wrap;
    var author$project$Save$encodeBasicTree = function (basicTree) {
        var basicTreeCase = function () {
            switch (basicTree.$) {
                case 'Start':
                    var child = basicTree.a;
                    return _List_fromArray(
                        [
                            _Utils_Tuple2(
                            'basicTreeType',
                            elm$json$Json$Encode$string('Start')),
                            _Utils_Tuple2(
                            'child',
                            author$project$Save$encodeTree(child))
                        ]);
                case 'End':
                    return _List_fromArray(
                        [
                            _Utils_Tuple2(
                            'basicTreeType',
                            elm$json$Json$Encode$string('End'))
                        ]);
                case 'Empty':
                    var child = basicTree.a;
                    return _List_fromArray(
                        [
                            _Utils_Tuple2(
                            'basicTreeType',
                            elm$json$Json$Encode$string('Empty')),
                            _Utils_Tuple2(
                            'child',
                            author$project$Save$encodeTree(child))
                        ]);
                case 'Void':
                    return _List_fromArray(
                        [
                            _Utils_Tuple2(
                            'basicTreeType',
                            elm$json$Json$Encode$string('Void'))
                        ]);
                case 'Statement':
                    var content = basicTree.a;
                    var child = basicTree.b;
                    return _List_fromArray(
                        [
                            _Utils_Tuple2(
                            'basicTreeType',
                            elm$json$Json$Encode$string('Statement')),
                            _Utils_Tuple2(
                            'content',
                            elm$json$Json$Encode$string(content)),
                            _Utils_Tuple2(
                            'child',
                            author$project$Save$encodeTree(child))
                        ]);
                case 'If':
                    var content = basicTree.a;
                    var child1 = basicTree.b;
                    var child2 = basicTree.c;
                    var child3 = basicTree.d;
                    return _List_fromArray(
                        [
                            _Utils_Tuple2(
                            'basicTreeType',
                            elm$json$Json$Encode$string('If')),
                            _Utils_Tuple2(
                            'content',
                            elm$json$Json$Encode$string(content)),
                            _Utils_Tuple2(
                            'child1',
                            author$project$Save$encodeTree(child1)),
                            _Utils_Tuple2(
                            'child2',
                            author$project$Save$encodeTree(child2)),
                            _Utils_Tuple2(
                            'child3',
                            author$project$Save$encodeTree(child3))
                        ]);
                case 'While':
                    var content = basicTree.a;
                    var child1 = basicTree.b;
                    var child2 = basicTree.c;
                    return _List_fromArray(
                        [
                            _Utils_Tuple2(
                            'basicTreeType',
                            elm$json$Json$Encode$string('While')),
                            _Utils_Tuple2(
                            'content',
                            elm$json$Json$Encode$string(content)),
                            _Utils_Tuple2(
                            'child1',
                            author$project$Save$encodeTree(child1)),
                            _Utils_Tuple2(
                            'child2',
                            author$project$Save$encodeTree(child2))
                        ]);
                default:
                    var content = basicTree.a;
                    var child1 = basicTree.b;
                    var child2 = basicTree.c;
                    return _List_fromArray(
                        [
                            _Utils_Tuple2(
                            'basicTreeType',
                            elm$json$Json$Encode$string('ForEach')),
                            _Utils_Tuple2(
                            'content',
                            elm$json$Json$Encode$string(content)),
                            _Utils_Tuple2(
                            'child1',
                            author$project$Save$encodeTree(child1)),
                            _Utils_Tuple2(
                            'child2',
                            author$project$Save$encodeTree(child2))
                        ]);
            }
        }();
        return elm$json$Json$Encode$object(basicTreeCase);
    };
    var author$project$Save$encodeTree = function (tree) {
        return elm$json$Json$Encode$object(
            _List_fromArray(
                [
                    _Utils_Tuple2(
                    'id',
                    elm$json$Json$Encode$int(tree.id)),
                    _Utils_Tuple2(
                    'basicTree',
                    author$project$Save$encodeBasicTree(tree.basicTree))
                ]));
    };
    var author$project$Save$encodeModel = function (model) {
        return elm$json$Json$Encode$object(
            _List_fromArray(
                [
                    _Utils_Tuple2(
                    'flowchartName',
                    elm$json$Json$Encode$string(model.flowchartName)),
                    _Utils_Tuple2(
                    'tree',
                    author$project$Save$encodeTree(model.tree)),
                    _Utils_Tuple2(
                    'currentId',
                    elm$json$Json$Encode$int(model.currentId)),
                    _Utils_Tuple2(
                    'highlightedBox',
                    elm$json$Json$Encode$string('Nothing')),
                    _Utils_Tuple2(
                    'precondition',
                    author$project$Save$encodeCondition(model.precondition)),
                    _Utils_Tuple2(
                    'postcondition',
                    author$project$Save$encodeCondition(model.postcondition))
                ]));
    };
    var author$project$Save$encodeEasterEgg = function (model) {
        return elm$json$Json$Encode$object(
            _List_fromArray(
                [
                    _Utils_Tuple2(
                    '_Easter_Egg',
                    elm$json$Json$Encode$string('Well done! You\'ve opened the file in a texteditor! This is a JSON-file and it is used a lot throughout the internet to represent data. The best part is, is that it is quite humanreadable too! You can even edit the values right now and see how they\'ve changed when you reupload the file. Don\'t forget to brag about your findings and have a nice day!')),
                    _Utils_Tuple2(
                    'model',
                    author$project$Save$encodeModel(model))
                ]));
    };
    var author$project$Save$toJson = function (model) {
        return A2(
            elm$json$Json$Encode$encode,
            4,
            author$project$Save$encodeEasterEgg(model));
    };
    var elm$core$String$concat = function (strings) {
        return A2(elm$core$String$join, '', strings);
    };
    var elm$core$Bitwise$and = _Bitwise_and;
    var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
    var elm$core$String$repeatHelp = F3(
        function (n, chunk, result) {
            return (n <= 0) ? result : A3(
                elm$core$String$repeatHelp,
                n >> 1,
                _Utils_ap(chunk, chunk),
                (!(n & 1)) ? result : _Utils_ap(result, chunk));
        });
    var elm$core$String$repeat = F2(
        function (n, chunk) {
            return A3(elm$core$String$repeatHelp, n, chunk, '');
        });
    var elm$core$String$replace = F3(
        function (before, after, string) {
            return A2(
                elm$core$String$join,
                after,
                A2(elm$core$String$split, before, string));
        });
    var author$project$Tree$Core$treeToPython = F2(
        function (indent, tree) {
            treeToCode:
            while (true) {
                var indentation = A2(elm$core$String$repeat, indent, '  ');
                var _n0 = tree.basicTree;
                switch (_n0.$) {
                    case 'Start':
                        var child = _n0.a;
                        var $temp$indent = indent,
                            $temp$tree = child;
                        indent = $temp$indent;
                        tree = $temp$tree;
                        continue treeToCode;
                    case 'End':
                        return '';
                    case 'Empty':
                        var child = _n0.a;
                        var $temp$indent = indent,
                            $temp$tree = child;
                        indent = $temp$indent;
                        tree = $temp$tree;
                        continue treeToCode;
                    case 'Void':
                        return '';
                    case 'Statement':
                        var content = _n0.a;
                        var child = _n0.b;
                        return elm$core$String$concat(
                            _List_fromArray(
                                [
                                    indentation,
                                    '# ',
                                    A3(elm$core$String$replace, '\n', '\n'+indentation+'# ', content) ,
                                    // '\n',
                                    indentation,
                                    '\n',
                                    A2(author$project$Tree$Core$treeToPython, indent, child)
                                ]));
                    case 'If':
                        var content = _n0.a;
                        var child1 = _n0.b;
                        var child2 = _n0.c;
                        var child3 = _n0.d;
                        return elm$core$String$concat(
                            _List_fromArray(
                                [
                                    indentation,
                                    'if ',
                                    A3(elm$core$String$replace, '\n', '_', content),
                                    ':\n',
                                    A2(author$project$Tree$Core$treeToPython, indent + 1, child2),
                                    indentation,...(child1.basicTree.$ != 'Empty'?[
                                        'else:\n',
                                        A2(author$project$Tree$Core$treeToPython, indent + 1, child1)
                                    ]:[]),
                                    indentation,
                                    '\n',
                                    A2(author$project$Tree$Core$treeToPython, indent, child3)
                                ]));
                    case 'While':
                        var content = _n0.a;
                        var child1 = _n0.b;
                        var child2 = _n0.c;
                        return elm$core$String$concat(
                            _List_fromArray(
                                [
                                    indentation,
                                    'while ' + A3(elm$core$String$replace, '\n', '_', content),
                                    ':\n',
                                    A2(author$project$Tree$Core$treeToPython, indent + 1, child1),
                                    // indentation,
                                    // '\n',
                                    A2(author$project$Tree$Core$treeToPython, indent, child2)
                                ]));
                    default:
                        var content = _n0.a;
                        var child1 = _n0.b;
                        var child2 = _n0.c;
                        return elm$core$String$concat(
                            _List_fromArray(
                                [
                                    indentation,
                                    'for ' + A3(elm$core$String$replace, '\n', '_', content),
                                    ':\n',
                                    A2(author$project$Tree$Core$treeToPython, indent + 1, child1),
                                    indentation,
                                    '\n',
                                    A2(author$project$Tree$Core$treeToPython, indent, child2)
                                ]));
                }
            }
        });
    var author$project$Tree$State$conditionToJava = function (condition) {
        return A3(elm$core$String$replace, '\n', '\n *       ', condition.content);
    };
    var elm$core$List$foldrHelper = F4(
        function (fn, acc, ctr, ls) {
            if (!ls.b) {
                return acc;
            } else {
                var a = ls.a;
                var r1 = ls.b;
                if (!r1.b) {
                    return A2(fn, a, acc);
                } else {
                    var b = r1.a;
                    var r2 = r1.b;
                    if (!r2.b) {
                        return A2(
                            fn,
                            a,
                            A2(fn, b, acc));
                    } else {
                        var c = r2.a;
                        var r3 = r2.b;
                        if (!r3.b) {
                            return A2(
                                fn,
                                a,
                                A2(
                                    fn,
                                    b,
                                    A2(fn, c, acc)));
                        } else {
                            var d = r3.a;
                            var r4 = r3.b;
                            var res = (ctr > 500) ? A3(
                                elm$core$List$foldl,
                                fn,
                                acc,
                                elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
                            return A2(
                                fn,
                                a,
                                A2(
                                    fn,
                                    b,
                                    A2(
                                        fn,
                                        c,
                                        A2(fn, d, res))));
                        }
                    }
                }
            }
        });
    var elm$core$List$foldr = F3(
        function (fn, acc, ls) {
            return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
        });
    var elm$core$List$intersperse = F2(
        function (sep, xs) {
            if (!xs.b) {
                return _List_Nil;
            } else {
                var hd = xs.a;
                var tl = xs.b;
                var step = F2(
                    function (x, rest) {
                        return A2(
                            elm$core$List$cons,
                            sep,
                            A2(elm$core$List$cons, x, rest));
                    });
                var spersed = A3(elm$core$List$foldr, step, _List_Nil, tl);
                return A2(elm$core$List$cons, hd, spersed);
            }
        });
    var author$project$Tree$State$modelToJava = function (model) {
        return A3(
            elm$core$String$replace,
            '<',
            '&lt;',
            elm$core$String$concat(
                A2(
                    elm$core$List$intersperse,
                    '\n',
                    A3(elm$core$String$replace, ' ', '_', model.flowchartName)?
                        _List_fromArray(
                        [
                            'def ' + (A3(elm$core$String$replace, ' ', '_', model.flowchartName) +((A3(elm$core$String$replace, ' ', '_', model.flowchartName)).includes("(")? "":"()") + ':'),
                            ...(author$project$Tree$State$conditionToJava(model.precondition) || author$project$Tree$State$conditionToJava(model.postcondition)? [
                            '  """',
                            author$project$Tree$State$conditionToJava(model.precondition) ? '  Initial:' + author$project$Tree$State$conditionToJava(model.precondition) : '',
                            author$project$Tree$State$conditionToJava(model.postcondition)? '  Final:' + author$project$Tree$State$conditionToJava(model.postcondition): '',
                            '  """']:[]),
                            A2(author$project$Tree$Core$treeToPython, 1, model.tree) + ''
                        ]) : _List_fromArray([A2(author$project$Tree$Core$treeToPython, 0, model.tree) + '']))));
    };
    var elm$core$Basics$identity = function (x) {
        return x;
    };
    var elm$core$Task$Perform = function (a) {
        return {$: 'Perform', a: a};
    };
    var elm$core$Task$succeed = _Scheduler_succeed;
    var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
    var elm$core$List$map = F2(
        function (f, xs) {
            return A3(
                elm$core$List$foldr,
                F2(
                    function (x, acc) {
                        return A2(
                            elm$core$List$cons,
                            f(x),
                            acc);
                    }),
                _List_Nil,
                xs);
        });
    var elm$core$Task$andThen = _Scheduler_andThen;
    var elm$core$Task$map = F2(
        function (func, taskA) {
            return A2(
                elm$core$Task$andThen,
                function (a) {
                    return elm$core$Task$succeed(
                        func(a));
                },
                taskA);
        });
    var elm$core$Task$map2 = F3(
        function (func, taskA, taskB) {
            return A2(
                elm$core$Task$andThen,
                function (a) {
                    return A2(
                        elm$core$Task$andThen,
                        function (b) {
                            return elm$core$Task$succeed(
                                A2(func, a, b));
                        },
                        taskB);
                },
                taskA);
        });
    var elm$core$Task$sequence = function (tasks) {
        return A3(
            elm$core$List$foldr,
            elm$core$Task$map2(elm$core$List$cons),
            elm$core$Task$succeed(_List_Nil),
            tasks);
    };
    var elm$core$Platform$sendToApp = _Platform_sendToApp;
    var elm$core$Task$spawnCmd = F2(
        function (router, _n0) {
            var task = _n0.a;
            return _Scheduler_spawn(
                A2(
                    elm$core$Task$andThen,
                    elm$core$Platform$sendToApp(router),
                    task));
        });
    var elm$core$Task$onEffects = F3(
        function (router, commands, state) {
            return A2(
                elm$core$Task$map,
                function (_n0) {
                    return _Utils_Tuple0;
                },
                elm$core$Task$sequence(
                    A2(
                        elm$core$List$map,
                        elm$core$Task$spawnCmd(router),
                        commands)));
        });
    var elm$core$Task$onSelfMsg = F3(
        function (_n0, _n1, _n2) {
            return elm$core$Task$succeed(_Utils_Tuple0);
        });
    var elm$core$Task$cmdMap = F2(
        function (tagger, _n0) {
            var task = _n0.a;
            return elm$core$Task$Perform(
                A2(elm$core$Task$map, tagger, task));
        });
    _Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
    var elm$core$Task$command = _Platform_leaf('Task');
    var elm$core$Task$perform = F2(
        function (toMessage, task) {
            return elm$core$Task$command(
                elm$core$Task$Perform(
                    A2(elm$core$Task$map, toMessage, task)));
        });
    var elm$time$Time$Posix = function (a) {
        return {$: 'Posix', a: a};
    };
    var elm$time$Time$millisToPosix = elm$time$Time$Posix;
    var elm$file$File$toString = _File_toString;
    var elm$core$Basics$never = function (_n0) {
        never:
        while (true) {
            var nvr = _n0.a;
            var $temp$_n0 = nvr;
            _n0 = $temp$_n0;
            continue never;
        }
    };
    var elm$file$File$Download$string = F3(
        function (name, mime, content) {
            return A2(
                elm$core$Task$perform,
                elm$core$Basics$never,
                A3(_File_download, name, mime, content));
        });
    var elm$file$File$Select$file = F2(
        function (mimes, toMsg) {
            return A2(
                elm$core$Task$perform,
                toMsg,
                _File_uploadOne(mimes));
        });
    var author$project$Save$update = F2(
        function (msg, model) {
            switch (msg.$) {
                case 'GenerateJavaComments':
                    return _Utils_Tuple2(
                        model,
                        author$project$Ports$downloadToast(
                            author$project$Tree$State$modelToJava(model)));
                case 'DownloadJson':
                    return _Utils_Tuple2(
                        model,
                        A3(
                            elm$file$File$Download$string,
                            model.flowchartName + '.flow',
                            'application/flow',
                            author$project$Save$toJson(model)));
                case 'UploadRequested':
                    return _Utils_Tuple2(
                        model,
                        A2(
                            elm$file$File$Select$file,
                            _List_fromArray(
                                ['application/flow']),
                            author$project$Save$UploadLoaded));
                case 'UploadLoaded':
                    var file = msg.a;
                    return _Utils_Tuple2(
                        model,
                        A2(
                            elm$core$Task$perform,
                            author$project$Save$UploadRead,
                            elm$file$File$toString(file)));
                default:
                    var string = msg.a;
                    var updateModel = function (oldModel) {
                        var _n1 = author$project$Save$fromJson(string);
                        if (_n1.$ === 'Just') {
                            var newModel = _n1.a;
                            return newModel;
                        } else {
                            return oldModel;
                        }
                    };
                    return _Utils_Tuple2(
                        updateModel(model),
                        elm$core$Platform$Cmd$none);
            }
        });
    var author$project$Tree$State$BlurResult = function (a) {
        return {$: 'BlurResult', a: a};
    };
    var author$project$Tree$Core$continueRecursion = F2(
        function (_function, node) {
            var helper = function () {
                var _n0 = node.basicTree;
                switch (_n0.$) {
                    case 'Start':
                        var child = _n0.a;
                        return author$project$Tree$Core$Start(
                            _function(child));
                    case 'End':
                        return author$project$Tree$Core$End;
                    case 'Empty':
                        var child = _n0.a;
                        return author$project$Tree$Core$Empty(
                            _function(child));
                    case 'Void':
                        return author$project$Tree$Core$Void;
                    case 'Statement':
                        var content = _n0.a;
                        var child = _n0.b;
                        return A2(
                            author$project$Tree$Core$Statement,
                            content,
                            _function(child));
                    case 'If':
                        var content = _n0.a;
                        var child1 = _n0.b;
                        var child2 = _n0.c;
                        var child3 = _n0.d;
                        return A4(
                            author$project$Tree$Core$If,
                            content,
                            _function(child1),
                            _function(child2),
                            _function(child3));
                    case 'While':
                        var content = _n0.a;
                        var child1 = _n0.b;
                        var child2 = _n0.c;
                        return A3(
                            author$project$Tree$Core$While,
                            content,
                            _function(child1),
                            _function(child2));
                    default:
                        var content = _n0.a;
                        var child1 = _n0.b;
                        var child2 = _n0.c;
                        return A3(
                            author$project$Tree$Core$ForEach,
                            content,
                            _function(child1),
                            _function(child2));
                }
            }();
            return _Utils_update(
                node,
                {basicTree: helper});
        });
    var elm$core$Basics$negate = function (n) {
        return -n;
    };
    var author$project$Tree$State$delete = function (currentNode) {
        var _n0 = currentNode.basicTree;
        switch (_n0.$) {
            case 'Start':
                var child = _n0.a;
                return A2(
                    elm$core$Debug$log,
                    'Tried to delete Start. Id: ' + (elm$core$String$fromInt(currentNode.id) + ' instead doing nothing.'),
                    {
                        basicTree: author$project$Tree$Core$Start(child),
                        id: -2
                    });
            case 'End':
                return A2(
                    elm$core$Debug$log,
                    'Tried to delete End. Id: ' + (elm$core$String$fromInt(currentNode.id) + ' instead doing nothing.'),
                    {basicTree: author$project$Tree$Core$End, id: -3});
            case 'Empty':
                var child = _n0.a;
                return child;
            case 'Void':
                return A2(
                    elm$core$Debug$log,
                    'Tried to delete Void. Id: ' + (elm$core$String$fromInt(currentNode.id) + ' instead doing nothing.'),
                    {basicTree: author$project$Tree$Core$Void, id: -4});
            case 'Statement':
                var content = _n0.a;
                var child = _n0.b;
                return child;
            case 'If':
                var content = _n0.a;
                var child1 = _n0.b;
                var child2 = _n0.c;
                var child3 = _n0.d;
                return child3;
            case 'While':
                var content = _n0.a;
                var child1 = _n0.b;
                var child2 = _n0.c;
                return child2;
            default:
                var content = _n0.a;
                var child1 = _n0.b;
                var child2 = _n0.c;
                return child2;
        }
    };
    var author$project$Tree$State$newAbove = F2(
        function (currentId, node) {
            var _n0 = node.basicTree;
            switch (_n0.$) {
                case 'Start':
                    var child = _n0.a;
                    return A2(
                        elm$core$Debug$log,
                        'Tried to add an element before Start. Id: ' + (elm$core$String$fromInt(node.id) + ' instead doing nothing.'),
                        {
                            basicTree: author$project$Tree$Core$Start(child),
                            id: -2
                        });
                case 'Void':
                    return A2(
                        elm$core$Debug$log,
                        'Tried to add an element before Void. Id: ' + (elm$core$String$fromInt(node.id) + ' instead doing nothing.'),
                        {basicTree: author$project$Tree$Core$Void, id: -3});
                default:
                    return {
                        basicTree: author$project$Tree$Core$Empty(node),
                        id: currentId
                    };
            }
        });
    var author$project$Tree$State$newBelow = F2(
        function (currentId, currentNode) {
            var _n0 = currentNode.basicTree;
            switch (_n0.$) {
                case 'Start':
                    var child = _n0.a;
                    return author$project$Tree$Core$Start(
                        {
                            basicTree: author$project$Tree$Core$Empty(child),
                            id: currentId
                        });
                case 'End':
                    return A2(
                        elm$core$Debug$log,
                        'Tried to add an element below End. Id: ' + (elm$core$String$fromInt(currentNode.id) + ' instead doing nothing.'),
                        author$project$Tree$Core$End);
                case 'Empty':
                    var child = _n0.a;
                    return author$project$Tree$Core$Empty(
                        {
                            basicTree: author$project$Tree$Core$Empty(child),
                            id: currentId
                        });
                case 'Void':
                    return A2(
                        elm$core$Debug$log,
                        'Tried to add an element below Void. Id: ' + (elm$core$String$fromInt(currentNode.id) + ' instead doing nothing.'),
                        author$project$Tree$Core$Void);
                case 'Statement':
                    var content = _n0.a;
                    var child = _n0.b;
                    return A2(
                        author$project$Tree$Core$Statement,
                        content,
                        {
                            basicTree: author$project$Tree$Core$Empty(child),
                            id: currentId
                        });
                case 'If':
                    var content = _n0.a;
                    var leftChild = _n0.b;
                    var rightChild = _n0.c;
                    var belowChild = _n0.d;
                    return A4(
                        author$project$Tree$Core$If,
                        content,
                        leftChild,
                        rightChild,
                        {
                            basicTree: author$project$Tree$Core$Empty(belowChild),
                            id: currentId
                        });
                case 'While':
                    var content = _n0.a;
                    var innerChild = _n0.b;
                    var belowChild = _n0.c;
                    return A3(
                        author$project$Tree$Core$While,
                        content,
                        innerChild,
                        {
                            basicTree: author$project$Tree$Core$Empty(belowChild),
                            id: currentId
                        });
                default:
                    var content = _n0.a;
                    var innerChild = _n0.b;
                    var belowChild = _n0.c;
                    return A3(
                        author$project$Tree$Core$ForEach,
                        content,
                        innerChild,
                        {
                            basicTree: author$project$Tree$Core$Empty(belowChild),
                            id: currentId
                        });
            }
        });
    var author$project$Tree$State$newFalse = F2(
        function (currentId, currentNode) {
            var _n0 = currentNode.basicTree;
            if (_n0.$ === 'If') {
                var content = _n0.a;
                var child1 = _n0.b;
                var child2 = _n0.c;
                var child3 = _n0.d;
                return A4(
                    author$project$Tree$Core$If,
                    content,
                    {
                        basicTree: author$project$Tree$Core$Empty(child1),
                        id: currentId
                    },
                    child2,
                    child3);
            } else {
                var a = _n0;
                return A2(
                    elm$core$Debug$log,
                    'Tried to give a newFalse child to: ' + (elm$core$Debug$toString(a) + (' with Id: ' + (elm$core$String$fromInt(currentNode.id) + ' instead using: '))),
                    author$project$Tree$Core$Void);
            }
        });
    var author$project$Tree$State$newTrue = F2(
        function (currentId, currentNode) {
            var _n0 = currentNode.basicTree;
            switch (_n0.$) {
                case 'If':
                    var content = _n0.a;
                    var child1 = _n0.b;
                    var child2 = _n0.c;
                    var child3 = _n0.d;
                    return A4(
                        author$project$Tree$Core$If,
                        content,
                        child1,
                        {
                            basicTree: author$project$Tree$Core$Empty(child2),
                            id: currentId
                        },
                        child3);
                case 'While':
                    var content = _n0.a;
                    var child1 = _n0.b;
                    var child2 = _n0.c;
                    return A3(
                        author$project$Tree$Core$While,
                        content,
                        {
                            basicTree: author$project$Tree$Core$Empty(child1),
                            id: currentId
                        },
                        child2);
                case 'ForEach':
                    var content = _n0.a;
                    var child1 = _n0.b;
                    var child2 = _n0.c;
                    return A3(
                        author$project$Tree$Core$ForEach,
                        content,
                        {
                            basicTree: author$project$Tree$Core$Empty(child1),
                            id: currentId
                        },
                        child2);
                default:
                    var a = _n0;
                    return A2(
                        elm$core$Debug$log,
                        'Tried to give a newTrue child to: ' + (elm$core$Debug$toString(a) + (' with Id: ' + (elm$core$String$fromInt(currentNode.id) + ' instead using: '))),
                        author$project$Tree$Core$Void);
            }
        });
    var author$project$Tree$State$changeTree = F4(
        function (currentId, operation, idToFind, node) {
            var onTheRightNode = function (currentNode) {
                switch (operation.$) {
                    case 'NewAbove':
                        return A2(author$project$Tree$State$newAbove, currentId, currentNode);
                    case 'NewBelow':
                        return _Utils_update(
                            node,
                            {
                                basicTree: A2(author$project$Tree$State$newBelow, currentId, currentNode)
                            });
                    case 'NewTrue':
                        return _Utils_update(
                            node,
                            {
                                basicTree: A2(author$project$Tree$State$newTrue, currentId, currentNode)
                            });
                    case 'NewFalse':
                        return _Utils_update(
                            node,
                            {
                                basicTree: A2(author$project$Tree$State$newFalse, currentId, currentNode)
                            });
                    default:
                        return author$project$Tree$State$delete(currentNode);
                }
            };
            return _Utils_eq(node.id, idToFind) ? onTheRightNode(node) : A2(
                author$project$Tree$Core$continueRecursion,
                A3(author$project$Tree$State$changeTree, currentId, operation, idToFind),
                node);
        });
    var author$project$Tree$State$dehighlightBox = F2(
        function (oldId, currentId) {
            if (currentId.$ === 'Just') {
                var id = currentId.a;
                return _Utils_eq(oldId, id) ? elm$core$Maybe$Nothing : A2(
                    elm$core$Debug$log,
                    '!!!Dehighlighted box ' + (elm$core$String$fromInt(oldId) + (' while the highlightedBox was ' + elm$core$String$fromInt(id))),
                    elm$core$Maybe$Nothing);
            } else {
                return A2(
                    elm$core$Debug$log,
                    '!!!Dehighlighted box ' + (elm$core$String$fromInt(oldId) + ' while nothing was highlighted'),
                    elm$core$Maybe$Nothing);
            }
        });
    var author$project$Tree$State$fillEmpty = F4(
        function (currentId, newNodeType, idToFind, node) {
            var onTheRightEmptyNode = function (child) {
                switch (newNodeType.$) {
                    case 'StatementNode':
                        return A2(author$project$Tree$Core$Statement, '', child);
                    case 'IfNode':
                        return A4(
                            author$project$Tree$Core$If,
                            '',
                            {
                                basicTree: author$project$Tree$Core$Empty(
                                    {basicTree: author$project$Tree$Core$Void, id: currentId + 1}),
                                id: currentId
                            },
                            {
                                basicTree: author$project$Tree$Core$Empty(
                                    {basicTree: author$project$Tree$Core$Void, id: currentId + 3}),
                                id: currentId + 2
                            },
                            child);
                    case 'WhileNode':
                        return A3(
                            author$project$Tree$Core$While,
                            '',
                            {
                                basicTree: author$project$Tree$Core$Empty(
                                    {basicTree: author$project$Tree$Core$Void, id: currentId + 1}),
                                id: currentId
                            },
                            child);
                    case 'ForEachNode':
                        return A3(
                            author$project$Tree$Core$ForEach,
                            '',
                            {
                                basicTree: author$project$Tree$Core$Empty(
                                    {basicTree: author$project$Tree$Core$Void, id: currentId + 1}),
                                id: currentId
                            },
                            child);
                    default:
                        return A2(elm$core$Debug$log, 'Tried to instantiate a Precondition, Postcondition or FlowchartName in function \'fillEmpty\'. Instantiated Void instead', author$project$Tree$Core$Void);
                }
            };
            var helper = function (currentNode) {
                if (currentNode.$ === 'Empty') {
                    var child = currentNode.a;
                    return onTheRightEmptyNode(child);
                } else {
                    var a = currentNode;
                    return A2(
                        elm$core$Debug$log,
                        'Inserting something on non-Empty node ' + (elm$core$Debug$toString(a) + (' with id: ' + (elm$core$String$fromInt(node.id) + ' instead doing nothing.'))),
                        currentNode);
                }
            };
            return _Utils_eq(node.id, idToFind) ? _Utils_update(
                node,
                {
                    basicTree: helper(node.basicTree)
                }) : A2(
                author$project$Tree$Core$continueRecursion,
                A3(author$project$Tree$State$fillEmpty, currentId, newNodeType, idToFind),
                node);
        });
    var author$project$Tree$State$highlightBox = F2(
        function (newId, currentId) {
            if (currentId.$ === 'Just') {
                var id = currentId.a;
                return _Utils_eq(newId, id) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(newId);
            } else {
                return elm$core$Maybe$Just(newId);
            }
        });
    var author$project$Tree$State$setVisibleContent = F2(
        function (bool, condition) {
            return _Utils_update(
                condition,
                {visible: bool});
        });
    var author$project$Tree$State$setConditionContent = F2(
        function (newContent, condition) {
            return _Utils_update(
                condition,
                {content: newContent});
        });
    var author$project$Tree$State$updateContent = F3(
        function (newContent, idToFind, model) {
            var helper = function (node) {
                var _n0 = node.basicTree;
                switch (_n0.$) {
                    case 'Statement':
                        var content = _n0.a;
                        var child = _n0.b;
                        return A2(author$project$Tree$Core$Statement, newContent, child);
                    case 'If':
                        var content = _n0.a;
                        var child1 = _n0.b;
                        var child2 = _n0.c;
                        var child3 = _n0.d;
                        return A4(author$project$Tree$Core$If, newContent, child1, child2, child3);
                    case 'While':
                        var content = _n0.a;
                        var child1 = _n0.b;
                        var child2 = _n0.c;
                        return A3(author$project$Tree$Core$While, newContent, child1, child2);
                    case 'ForEach':
                        var content = _n0.a;
                        var child1 = _n0.b;
                        var child2 = _n0.c;
                        return A3(author$project$Tree$Core$ForEach, newContent, child1, child2);
                    default:
                        var a = _n0;
                        return A2(
                            elm$core$Debug$log,
                            'Tried to update content of non-content node' + (elm$core$Debug$toString(a) + (' With Id: ' + (elm$core$String$fromInt(node.id) + ' instead doing nothing.'))),
                            author$project$Tree$Core$Void);
                }
            };
            var treeRecursion = function (node) {
                return _Utils_eq(node.id, idToFind) ? {
                    basicTree: helper(node),
                    id: node.id
                } : A2(author$project$Tree$Core$continueRecursion, treeRecursion, node);
            };
            return (idToFind === 3) ? _Utils_update(
                model,
                {flowchartName: newContent}) : ((idToFind === 4) ? _Utils_update(
                model,
                {
                    precondition: A2(author$project$Tree$State$setConditionContent, newContent, model.precondition)
                }) : ((idToFind === 5) ? _Utils_update(
                model,
                {
                    postcondition: A2(author$project$Tree$State$setConditionContent, newContent, model.postcondition)
                }) : _Utils_update(
                model,
                {
                    tree: treeRecursion(model.tree)
                })));
        });
    var elm$browser$Browser$External = function (a) {
        return {$: 'External', a: a};
    };
    var elm$browser$Browser$Internal = function (a) {
        return {$: 'Internal', a: a};
    };
    var elm$browser$Browser$Dom$NotFound = function (a) {
        return {$: 'NotFound', a: a};
    };
    var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
        switch (handler.$) {
            case 'Normal':
                return 0;
            case 'MayStopPropagation':
                return 1;
            case 'MayPreventDefault':
                return 2;
            default:
                return 3;
        }
    };
    var elm$core$String$length = _String_length;
    var elm$core$String$slice = _String_slice;
    var elm$core$String$dropLeft = F2(
        function (n, string) {
            return (n < 1) ? string : A3(
                elm$core$String$slice,
                n,
                elm$core$String$length(string),
                string);
        });
    var elm$core$String$startsWith = _String_startsWith;
    var elm$url$Url$Http = {$: 'Http'};
    var elm$url$Url$Https = {$: 'Https'};
    var elm$core$String$indexes = _String_indexes;
    var elm$core$String$isEmpty = function (string) {
        return string === '';
    };
    var elm$core$String$left = F2(
        function (n, string) {
            return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
        });
    var elm$core$String$contains = _String_contains;
    var elm$core$String$toInt = _String_toInt;
    var elm$url$Url$Url = F6(
        function (protocol, host, port_, path, query, fragment) {
            return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
        });
    var elm$url$Url$chompBeforePath = F5(
        function (protocol, path, params, frag, str) {
            if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
                return elm$core$Maybe$Nothing;
            } else {
                var _n0 = A2(elm$core$String$indexes, ':', str);
                if (!_n0.b) {
                    return elm$core$Maybe$Just(
                        A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
                } else {
                    if (!_n0.b.b) {
                        var i = _n0.a;
                        var _n1 = elm$core$String$toInt(
                            A2(elm$core$String$dropLeft, i + 1, str));
                        if (_n1.$ === 'Nothing') {
                            return elm$core$Maybe$Nothing;
                        } else {
                            var port_ = _n1;
                            return elm$core$Maybe$Just(
                                A6(
                                    elm$url$Url$Url,
                                    protocol,
                                    A2(elm$core$String$left, i, str),
                                    port_,
                                    path,
                                    params,
                                    frag));
                        }
                    } else {
                        return elm$core$Maybe$Nothing;
                    }
                }
            }
        });
    var elm$url$Url$chompBeforeQuery = F4(
        function (protocol, params, frag, str) {
            if (elm$core$String$isEmpty(str)) {
                return elm$core$Maybe$Nothing;
            } else {
                var _n0 = A2(elm$core$String$indexes, '/', str);
                if (!_n0.b) {
                    return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
                } else {
                    var i = _n0.a;
                    return A5(
                        elm$url$Url$chompBeforePath,
                        protocol,
                        A2(elm$core$String$dropLeft, i, str),
                        params,
                        frag,
                        A2(elm$core$String$left, i, str));
                }
            }
        });
    var elm$url$Url$chompBeforeFragment = F3(
        function (protocol, frag, str) {
            if (elm$core$String$isEmpty(str)) {
                return elm$core$Maybe$Nothing;
            } else {
                var _n0 = A2(elm$core$String$indexes, '?', str);
                if (!_n0.b) {
                    return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
                } else {
                    var i = _n0.a;
                    return A4(
                        elm$url$Url$chompBeforeQuery,
                        protocol,
                        elm$core$Maybe$Just(
                            A2(elm$core$String$dropLeft, i + 1, str)),
                        frag,
                        A2(elm$core$String$left, i, str));
                }
            }
        });
    var elm$url$Url$chompAfterProtocol = F2(
        function (protocol, str) {
            if (elm$core$String$isEmpty(str)) {
                return elm$core$Maybe$Nothing;
            } else {
                var _n0 = A2(elm$core$String$indexes, '#', str);
                if (!_n0.b) {
                    return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
                } else {
                    var i = _n0.a;
                    return A3(
                        elm$url$Url$chompBeforeFragment,
                        protocol,
                        elm$core$Maybe$Just(
                            A2(elm$core$String$dropLeft, i + 1, str)),
                        A2(elm$core$String$left, i, str));
                }
            }
        });
    var elm$url$Url$fromString = function (str) {
        return A2(elm$core$String$startsWith, 'http://', str) ? A2(
            elm$url$Url$chompAfterProtocol,
            elm$url$Url$Http,
            A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
            elm$url$Url$chompAfterProtocol,
            elm$url$Url$Https,
            A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
    };
    var elm$browser$Browser$Dom$blur = _Browser_call('blur');
    var elm$core$Basics$composeL = F3(
        function (g, f, x) {
            return g(
                f(x));
        });
    var elm$core$Task$onError = _Scheduler_onError;
    var elm$core$Task$attempt = F2(
        function (resultToMessage, task) {
            return elm$core$Task$command(
                elm$core$Task$Perform(
                    A2(
                        elm$core$Task$onError,
                        A2(
                            elm$core$Basics$composeL,
                            A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
                            elm$core$Result$Err),
                        A2(
                            elm$core$Task$andThen,
                            A2(
                                elm$core$Basics$composeL,
                                A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
                                elm$core$Result$Ok),
                            task))));
        });
    var author$project$Tree$State$update = F2(
        function (msg, model) {
            switch (msg.$) {
                case 'UpdateName':
                    var newName = msg.a;
                    return _Utils_Tuple2(
                        _Utils_update(
                            model,
                            {flowchartName: newName}),
                        elm$core$Platform$Cmd$none);
                case 'UpdateContent':
                    var idToFind = msg.a;
                    var newContent = msg.b;
                    return _Utils_Tuple2(
                        A3(author$project$Tree$State$updateContent, newContent, idToFind, model),
                        elm$core$Platform$Cmd$none);
                case 'FillEmpty':
                    var newNodeType = msg.a;
                    var idToFind = msg.b;
                    return _Utils_Tuple2(
                        _Utils_update(
                            model,
                            {
                                currentId: model.currentId + 10,
                                tree: A4(author$project$Tree$State$fillEmpty, model.currentId, newNodeType, idToFind, model.tree)
                            }),
                        elm$core$Platform$Cmd$none);
                case 'ChangeTree':
                    var operation = msg.a;
                    var id = msg.b;
                    return _Utils_Tuple2(
                        _Utils_update(
                            model,
                            {
                                currentId: model.currentId + 10,
                                tree: A4(author$project$Tree$State$changeTree, model.currentId, operation, id, model.tree)
                            }),
                        elm$core$Platform$Cmd$none);
                case 'HighlightBox':
                    var idHitbox = msg.a;
                    return _Utils_Tuple2(
                        _Utils_update(
                            model,
                            {
                                highlightedBox: A2(author$project$Tree$State$highlightBox, idHitbox, model.highlightedBox)
                            }),
                        elm$core$Platform$Cmd$none);
                case 'DehighlightBox':
                    var idHitbox = msg.a;
                    return _Utils_Tuple2(
                        _Utils_update(
                            model,
                            {
                                highlightedBox: A2(author$project$Tree$State$dehighlightBox, idHitbox, model.highlightedBox)
                            }),
                        elm$core$Platform$Cmd$none);
                case 'KeyDown':
                    var domId = msg.a;
                    var key = msg.b;
                    return (key === 13) ? _Utils_Tuple2(
                        model,
                        A2(
                            elm$core$Task$attempt,
                            author$project$Tree$State$BlurResult,
                            elm$browser$Browser$Dom$blur(domId))) : _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
                case 'BlurResult':
                    var result = msg.a;
                    if (result.$ === 'Ok') {
                        return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
                    } else {
                        return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
                    }
                case 'ConditionHide':
                    var nodeType = msg.a;
                    switch (nodeType.$) {
                        case 'PreConditionNode':
                            return _Utils_Tuple2(
                                _Utils_update(
                                    model,
                                    {
                                        precondition: A2(author$project$Tree$State$setVisibleContent, false, model.precondition)
                                    }),
                                elm$core$Platform$Cmd$none);
                        case 'PostConditionNode':
                            return _Utils_Tuple2(
                                _Utils_update(
                                    model,
                                    {
                                        postcondition: A2(author$project$Tree$State$setVisibleContent, false, model.postcondition)
                                    }),
                                elm$core$Platform$Cmd$none);
                        default:
                            return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
                    }
                default:
                    var nodeType = msg.a;
                    switch (nodeType.$) {
                        case 'PreConditionNode':
                            return _Utils_Tuple2(
                                _Utils_update(
                                    model,
                                    {
                                        precondition: A2(author$project$Tree$State$setVisibleContent, true, model.precondition)
                                    }),
                                elm$core$Platform$Cmd$none);
                        case 'PostConditionNode':
                            return _Utils_Tuple2(
                                _Utils_update(
                                    model,
                                    {
                                        postcondition: A2(author$project$Tree$State$setVisibleContent, true, model.postcondition)
                                    }),
                                elm$core$Platform$Cmd$none);
                        default:
                            return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
                    }
            }
        });
    var elm$core$Platform$Cmd$map = _Platform_map;
    var author$project$Main$update = F2(
        function (msg, model) {
            if (msg.$ === 'Tree') {
                var treeMsg = msg.a;
                var _n1 = A2(author$project$Tree$State$update, treeMsg, model.state);
                var treeModel = _n1.a;
                var treeCmd = _n1.b;
                return _Utils_Tuple2(
                    _Utils_update(
                        model,
                        {state: treeModel}),
                    A2(elm$core$Platform$Cmd$map, author$project$Main$Tree, treeCmd));
            } else {
                var saveMsg = msg.a;
                var _n2 = A2(author$project$Save$update, saveMsg, model.state);
                var saveModel = _n2.a;
                var saveCmd = _n2.b;
                return _Utils_Tuple2(
                    _Utils_update(
                        model,
                        {state: saveModel}),
                    A2(elm$core$Platform$Cmd$map, author$project$Main$Save, saveCmd));
            }
        });
    var author$project$Save$GenerateJavaComments = {$: 'GenerateJavaComments'};
    var rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
        function (a, b, c) {
            return {$: 'Node', a: a, b: b, c: c};
        });
    var rtfeldman$elm_css$VirtualDom$Styled$node = rtfeldman$elm_css$VirtualDom$Styled$Node;
    var rtfeldman$elm_css$Html$Styled$node = rtfeldman$elm_css$VirtualDom$Styled$node;
    var rtfeldman$elm_css$Html$Styled$button = rtfeldman$elm_css$Html$Styled$node('button');
    var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
    var rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
        return {$: 'Unstyled', a: a};
    };
    var rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
        return rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
            elm$virtual_dom$VirtualDom$text(str));
    };
    var rtfeldman$elm_css$Html$Styled$text = rtfeldman$elm_css$VirtualDom$Styled$text;
    var elm$virtual_dom$VirtualDom$Normal = function (a) {
        return {$: 'Normal', a: a};
    };
    var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
    var rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
        function (a, b, c) {
            return {$: 'Attribute', a: a, b: b, c: c};
        });
    var rtfeldman$elm_css$VirtualDom$Styled$on = F2(
        function (eventName, handler) {
            return A3(
                rtfeldman$elm_css$VirtualDom$Styled$Attribute,
                A2(elm$virtual_dom$VirtualDom$on, eventName, handler),
                _List_Nil,
                '');
        });
    var rtfeldman$elm_css$Html$Styled$Events$on = F2(
        function (event, decoder) {
            return A2(
                rtfeldman$elm_css$VirtualDom$Styled$on,
                event,
                elm$virtual_dom$VirtualDom$Normal(decoder));
        });
    var rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
        return A2(
            rtfeldman$elm_css$Html$Styled$Events$on,
            'click',
            elm$json$Json$Decode$succeed(msg));
    };
    var author$project$Save$copyJavaCommentsButton = A2(
        rtfeldman$elm_css$Html$Styled$button,
        _List_fromArray(
            [
                rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Save$GenerateJavaComments)
            ]),
        _List_fromArray(
            [
                rtfeldman$elm_css$Html$Styled$text('Converteer naar Python commentaar')
            ]));
    var author$project$Save$DownloadJson = {$: 'DownloadJson'};
    var author$project$Save$downloadButton = function (model) {
        return A2(
            rtfeldman$elm_css$Html$Styled$button,
            _List_fromArray(
                [
                    rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Save$DownloadJson)
                ]),
            _List_fromArray(
                [
                    rtfeldman$elm_css$Html$Styled$text('Download')
                ]));
    };
    var rtfeldman$elm_css$Css$Structure$Compatible = {$: 'Compatible'};
    var rtfeldman$elm_css$Css$block = {display: rtfeldman$elm_css$Css$Structure$Compatible, value: 'block'};
    var rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
        return {$: 'AppendProperty', a: a};
    };
    var rtfeldman$elm_css$Css$property = F2(
        function (key, value) {
            return rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
        });
    var rtfeldman$elm_css$Css$prop1 = F2(
        function (key, arg) {
            return A2(rtfeldman$elm_css$Css$property, key, arg.value);
        });
    var rtfeldman$elm_css$Css$center = rtfeldman$elm_css$Css$prop1('center');
    var rtfeldman$elm_css$Css$display = rtfeldman$elm_css$Css$prop1('display');
    var elm$core$List$head = function (list) {
        if (list.b) {
            var x = list.a;
            var xs = list.b;
            return elm$core$Maybe$Just(x);
        } else {
            return elm$core$Maybe$Nothing;
        }
    };
    var elm$core$Maybe$withDefault = F2(
        function (_default, maybe) {
            if (maybe.$ === 'Just') {
                var value = maybe.a;
                return value;
            } else {
                return _default;
            }
        });
    var rtfeldman$elm_css$Css$Internal$property = F2(
        function (key, value) {
            return rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
        });
    var rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
        return {$: 'ApplyStyles', a: a};
    };
    var rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
        function (functionName, desiredKey, style) {
            getOverloadedProperty:
            while (true) {
                switch (style.$) {
                    case 'AppendProperty':
                        var str = style.a;
                        var key = A2(
                            elm$core$Maybe$withDefault,
                            '',
                            elm$core$List$head(
                                A2(elm$core$String$split, ':', str)));
                        return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
                    case 'ExtendSelector':
                        var selector = style.a;
                        return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
                    case 'NestSnippet':
                        var combinator = style.a;
                        return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
                    case 'WithPseudoElement':
                        var pseudoElement = style.a;
                        return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
                    case 'WithMedia':
                        return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
                    case 'WithKeyframes':
                        return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-keyframes'));
                    default:
                        if (!style.a.b) {
                            return A2(rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-empty-Style'));
                        } else {
                            if (!style.a.b.b) {
                                var _n1 = style.a;
                                var only = _n1.a;
                                var $temp$functionName = functionName,
                                    $temp$desiredKey = desiredKey,
                                    $temp$style = only;
                                functionName = $temp$functionName;
                                desiredKey = $temp$desiredKey;
                                style = $temp$style;
                                continue getOverloadedProperty;
                            } else {
                                var _n2 = style.a;
                                var first = _n2.a;
                                var rest = _n2.b;
                                var $temp$functionName = functionName,
                                    $temp$desiredKey = desiredKey,
                                    $temp$style = rtfeldman$elm_css$Css$Preprocess$ApplyStyles(rest);
                                functionName = $temp$functionName;
                                desiredKey = $temp$desiredKey;
                                style = $temp$style;
                                continue getOverloadedProperty;
                            }
                        }
                }
            }
        });
    var rtfeldman$elm_css$Css$Internal$IncompatibleUnits = {$: 'IncompatibleUnits'};
    var elm$core$String$fromFloat = _String_fromNumber;
    var rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
        function (units, unitLabel, numericValue) {
            return {
                absoluteLength: rtfeldman$elm_css$Css$Structure$Compatible,
                calc: rtfeldman$elm_css$Css$Structure$Compatible,
                flexBasis: rtfeldman$elm_css$Css$Structure$Compatible,
                fontSize: rtfeldman$elm_css$Css$Structure$Compatible,
                length: rtfeldman$elm_css$Css$Structure$Compatible,
                lengthOrAuto: rtfeldman$elm_css$Css$Structure$Compatible,
                lengthOrAutoOrCoverOrContain: rtfeldman$elm_css$Css$Structure$Compatible,
                lengthOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible,
                lengthOrNone: rtfeldman$elm_css$Css$Structure$Compatible,
                lengthOrNoneOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible,
                lengthOrNumber: rtfeldman$elm_css$Css$Structure$Compatible,
                lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible,
                numericValue: numericValue,
                textIndent: rtfeldman$elm_css$Css$Structure$Compatible,
                unitLabel: unitLabel,
                units: units,
                value: _Utils_ap(
                    elm$core$String$fromFloat(numericValue),
                    unitLabel)
            };
        });
    var rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$Internal$IncompatibleUnits, '', 0);
    var rtfeldman$elm_css$Css$float = function (fn) {
        return A3(
            rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
            'float',
            'float',
            fn(rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
    };
    var rtfeldman$elm_css$Css$left = rtfeldman$elm_css$Css$prop1('left');
    var rtfeldman$elm_css$Css$prop2 = F3(
        function (key, argA, argB) {
            return A2(
                rtfeldman$elm_css$Css$property,
                key,
                A2(
                    elm$core$String$join,
                    ' ',
                    _List_fromArray(
                        [argA.value, argB.value])));
        });
    var rtfeldman$elm_css$Css$padding2 = rtfeldman$elm_css$Css$prop2('padding');
    var rtfeldman$elm_css$Css$PxUnits = {$: 'PxUnits'};
    var rtfeldman$elm_css$Css$px = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$PxUnits, 'px');
    var rtfeldman$elm_css$Css$textAlign = function (fn) {
        return A3(
            rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
            'textAlign',
            'text-align',
            fn(rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
    };
    var elm$virtual_dom$VirtualDom$property = F2(
        function (key, value) {
            return A2(
                _VirtualDom_property,
                _VirtualDom_noInnerHtmlOrFormAction(key),
                _VirtualDom_noJavaScriptOrHtmlUri(value));
        });
    var Skinney$murmur3$Murmur3$HashData = F4(
        function (shift, seed, hash, charsProcessed) {
            return {charsProcessed: charsProcessed, hash: hash, seed: seed, shift: shift};
        });
    var Skinney$murmur3$Murmur3$c1 = 3432918353;
    var Skinney$murmur3$Murmur3$c2 = 461845907;
    var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
    var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
    var Skinney$murmur3$Murmur3$multiplyBy = F2(
        function (b, a) {
            return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
        });
    var elm$core$Bitwise$or = _Bitwise_or;
    var Skinney$murmur3$Murmur3$rotlBy = F2(
        function (b, a) {
            return (a << b) | (a >>> (32 - b));
        });
    var elm$core$Basics$neq = _Utils_notEqual;
    var elm$core$Bitwise$xor = _Bitwise_xor;
    var Skinney$murmur3$Murmur3$finalize = function (data) {
        var acc = data.hash ? (data.seed ^ A2(
            Skinney$murmur3$Murmur3$multiplyBy,
            Skinney$murmur3$Murmur3$c2,
            A2(
                Skinney$murmur3$Murmur3$rotlBy,
                15,
                A2(Skinney$murmur3$Murmur3$multiplyBy, Skinney$murmur3$Murmur3$c1, data.hash)))) : data.seed;
        var h0 = acc ^ data.charsProcessed;
        var h1 = A2(Skinney$murmur3$Murmur3$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
        var h2 = A2(Skinney$murmur3$Murmur3$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
        return (h2 ^ (h2 >>> 16)) >>> 0;
    };
    var Skinney$murmur3$Murmur3$mix = F2(
        function (h1, k1) {
            return A2(
                Skinney$murmur3$Murmur3$multiplyBy,
                5,
                A2(
                    Skinney$murmur3$Murmur3$rotlBy,
                    13,
                    h1 ^ A2(
                        Skinney$murmur3$Murmur3$multiplyBy,
                        Skinney$murmur3$Murmur3$c2,
                        A2(
                            Skinney$murmur3$Murmur3$rotlBy,
                            15,
                            A2(Skinney$murmur3$Murmur3$multiplyBy, Skinney$murmur3$Murmur3$c1, k1))))) + 3864292196;
        });
    var Skinney$murmur3$Murmur3$hashFold = F2(
        function (c, data) {
            var res = data.hash | ((255 & elm$core$Char$toCode(c)) << data.shift);
            var _n0 = data.shift;
            if (_n0 === 24) {
                return {
                    charsProcessed: data.charsProcessed + 1,
                    hash: 0,
                    seed: A2(Skinney$murmur3$Murmur3$mix, data.seed, res),
                    shift: 0
                };
            } else {
                return {charsProcessed: data.charsProcessed + 1, hash: res, seed: data.seed, shift: data.shift + 8};
            }
        });
    var elm$core$String$foldl = _String_foldl;
    var Skinney$murmur3$Murmur3$hashString = F2(
        function (seed, str) {
            return Skinney$murmur3$Murmur3$finalize(
                A3(
                    elm$core$String$foldl,
                    Skinney$murmur3$Murmur3$hashFold,
                    A4(Skinney$murmur3$Murmur3$HashData, 0, seed, 0, 0),
                    str));
        });
    var elm$core$List$isEmpty = function (xs) {
        if (!xs.b) {
            return true;
        } else {
            return false;
        }
    };
    var elm$core$List$singleton = function (value) {
        return _List_fromArray(
            [value]);
    };
    var elm$core$String$cons = _String_cons;
    var rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
        return {charset: elm$core$Maybe$Nothing, imports: _List_Nil, namespaces: _List_Nil, snippets: snippets};
    };
    var elm$core$List$append = F2(
        function (xs, ys) {
            if (!ys.b) {
                return xs;
            } else {
                return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
            }
        });
    var elm$core$List$concat = function (lists) {
        return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
    };
    var elm$core$List$concatMap = F2(
        function (f, list) {
            return elm$core$List$concat(
                A2(elm$core$List$map, f, list));
        });
    var rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_n0) {
        var declarations = _n0.a;
        return declarations;
    };
    var elm$core$List$tail = function (list) {
        if (list.b) {
            var x = list.a;
            var xs = list.b;
            return elm$core$Maybe$Just(xs);
        } else {
            return elm$core$Maybe$Nothing;
        }
    };
    var elm$core$List$takeReverse = F3(
        function (n, list, kept) {
            takeReverse:
            while (true) {
                if (n <= 0) {
                    return kept;
                } else {
                    if (!list.b) {
                        return kept;
                    } else {
                        var x = list.a;
                        var xs = list.b;
                        var $temp$n = n - 1,
                            $temp$list = xs,
                            $temp$kept = A2(elm$core$List$cons, x, kept);
                        n = $temp$n;
                        list = $temp$list;
                        kept = $temp$kept;
                        continue takeReverse;
                    }
                }
            }
        });
    var elm$core$List$takeTailRec = F2(
        function (n, list) {
            return elm$core$List$reverse(
                A3(elm$core$List$takeReverse, n, list, _List_Nil));
        });
    var elm$core$List$takeFast = F3(
        function (ctr, n, list) {
            if (n <= 0) {
                return _List_Nil;
            } else {
                var _n0 = _Utils_Tuple2(n, list);
                _n0$1:
                while (true) {
                    _n0$5:
                    while (true) {
                        if (!_n0.b.b) {
                            return list;
                        } else {
                            if (_n0.b.b.b) {
                                switch (_n0.a) {
                                    case 1:
                                        break _n0$1;
                                    case 2:
                                        var _n2 = _n0.b;
                                        var x = _n2.a;
                                        var _n3 = _n2.b;
                                        var y = _n3.a;
                                        return _List_fromArray(
                                            [x, y]);
                                    case 3:
                                        if (_n0.b.b.b.b) {
                                            var _n4 = _n0.b;
                                            var x = _n4.a;
                                            var _n5 = _n4.b;
                                            var y = _n5.a;
                                            var _n6 = _n5.b;
                                            var z = _n6.a;
                                            return _List_fromArray(
                                                [x, y, z]);
                                        } else {
                                            break _n0$5;
                                        }
                                    default:
                                        if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
                                            var _n7 = _n0.b;
                                            var x = _n7.a;
                                            var _n8 = _n7.b;
                                            var y = _n8.a;
                                            var _n9 = _n8.b;
                                            var z = _n9.a;
                                            var _n10 = _n9.b;
                                            var w = _n10.a;
                                            var tl = _n10.b;
                                            return (ctr > 1000) ? A2(
                                                elm$core$List$cons,
                                                x,
                                                A2(
                                                    elm$core$List$cons,
                                                    y,
                                                    A2(
                                                        elm$core$List$cons,
                                                        z,
                                                        A2(
                                                            elm$core$List$cons,
                                                            w,
                                                            A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
                                                elm$core$List$cons,
                                                x,
                                                A2(
                                                    elm$core$List$cons,
                                                    y,
                                                    A2(
                                                        elm$core$List$cons,
                                                        z,
                                                        A2(
                                                            elm$core$List$cons,
                                                            w,
                                                            A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
                                        } else {
                                            break _n0$5;
                                        }
                                }
                            } else {
                                if (_n0.a === 1) {
                                    break _n0$1;
                                } else {
                                    break _n0$5;
                                }
                            }
                        }
                    }
                    return list;
                }
                var _n1 = _n0.b;
                var x = _n1.a;
                return _List_fromArray(
                    [x]);
            }
        });
    var elm$core$List$take = F2(
        function (n, list) {
            return A3(elm$core$List$takeFast, 0, n, list);
        });
    var elm$core$Maybe$map = F2(
        function (f, maybe) {
            if (maybe.$ === 'Just') {
                var value = maybe.a;
                return elm$core$Maybe$Just(
                    f(value));
            } else {
                return elm$core$Maybe$Nothing;
            }
        });
    var rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
        collectSelectors:
        while (true) {
            if (!declarations.b) {
                return _List_Nil;
            } else {
                if (declarations.a.$ === 'StyleBlockDeclaration') {
                    var _n1 = declarations.a.a;
                    var firstSelector = _n1.a;
                    var otherSelectors = _n1.b;
                    var rest = declarations.b;
                    return _Utils_ap(
                        A2(elm$core$List$cons, firstSelector, otherSelectors),
                        rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
                } else {
                    var rest = declarations.b;
                    var $temp$declarations = rest;
                    declarations = $temp$declarations;
                    continue collectSelectors;
                }
            }
        }
    };
    var rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
        last:
        while (true) {
            if (!list.b) {
                return elm$core$Maybe$Nothing;
            } else {
                if (!list.b.b) {
                    var singleton = list.a;
                    return elm$core$Maybe$Just(singleton);
                } else {
                    var rest = list.b;
                    var $temp$list = rest;
                    list = $temp$list;
                    continue last;
                }
            }
        }
    };
    var rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
        lastDeclaration:
        while (true) {
            if (!declarations.b) {
                return elm$core$Maybe$Nothing;
            } else {
                if (!declarations.b.b) {
                    var x = declarations.a;
                    return elm$core$Maybe$Just(
                        _List_fromArray(
                            [x]));
                } else {
                    var xs = declarations.b;
                    var $temp$declarations = xs;
                    declarations = $temp$declarations;
                    continue lastDeclaration;
                }
            }
        }
    };
    var rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
        oneOf:
        while (true) {
            if (!maybes.b) {
                return elm$core$Maybe$Nothing;
            } else {
                var maybe = maybes.a;
                var rest = maybes.b;
                if (maybe.$ === 'Nothing') {
                    var $temp$maybes = rest;
                    maybes = $temp$maybes;
                    continue oneOf;
                } else {
                    return maybe;
                }
            }
        }
    };
    var rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
        return {$: 'FontFeatureValues', a: a};
    };
    var rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
        var expandTuples = function (tuplesToExpand) {
            if (!tuplesToExpand.b) {
                return _List_Nil;
            } else {
                var properties = tuplesToExpand.a;
                var rest = tuplesToExpand.b;
                return A2(
                    elm$core$List$cons,
                    properties,
                    expandTuples(rest));
            }
        };
        var newTuples = expandTuples(tuples);
        return _List_fromArray(
            [
                rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
            ]);
    };
    var rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
        function (a, b, c, d, e) {
            return {$: 'DocumentRule', a: a, b: b, c: c, d: d, e: e};
        });
    var rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
        function (str1, str2, str3, str4, declaration) {
            if (declaration.$ === 'StyleBlockDeclaration') {
                var structureStyleBlock = declaration.a;
                return A5(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
            } else {
                return declaration;
            }
        });
    var rtfeldman$elm_css$Css$Structure$MediaRule = F2(
        function (a, b) {
            return {$: 'MediaRule', a: a, b: b};
        });
    var rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
        function (a, b) {
            return {$: 'SupportsRule', a: a, b: b};
        });
    var rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
        function (mediaQueries, declaration) {
            switch (declaration.$) {
                case 'StyleBlockDeclaration':
                    var structureStyleBlock = declaration.a;
                    return A2(
                        rtfeldman$elm_css$Css$Structure$MediaRule,
                        mediaQueries,
                        _List_fromArray(
                            [structureStyleBlock]));
                case 'MediaRule':
                    var newMediaQueries = declaration.a;
                    var structureStyleBlocks = declaration.b;
                    return A2(
                        rtfeldman$elm_css$Css$Structure$MediaRule,
                        _Utils_ap(mediaQueries, newMediaQueries),
                        structureStyleBlocks);
                case 'SupportsRule':
                    var str = declaration.a;
                    var declarations = declaration.b;
                    return A2(
                        rtfeldman$elm_css$Css$Structure$SupportsRule,
                        str,
                        A2(
                            elm$core$List$map,
                            rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
                            declarations));
                case 'DocumentRule':
                    var str1 = declaration.a;
                    var str2 = declaration.b;
                    var str3 = declaration.c;
                    var str4 = declaration.d;
                    var structureStyleBlock = declaration.e;
                    return A5(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
                case 'PageRule':
                    return declaration;
                case 'FontFace':
                    return declaration;
                case 'Keyframes':
                    return declaration;
                case 'Viewport':
                    return declaration;
                case 'CounterStyle':
                    return declaration;
                default:
                    return declaration;
            }
        });
    var rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
        return {$: 'CounterStyle', a: a};
    };
    var rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
        return {$: 'FontFace', a: a};
    };
    var rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
        return {$: 'Keyframes', a: a};
    };
    var rtfeldman$elm_css$Css$Structure$PageRule = F2(
        function (a, b) {
            return {$: 'PageRule', a: a, b: b};
        });
    var rtfeldman$elm_css$Css$Structure$Selector = F3(
        function (a, b, c) {
            return {$: 'Selector', a: a, b: b, c: c};
        });
    var rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
        function (a, b, c) {
            return {$: 'StyleBlock', a: a, b: b, c: c};
        });
    var rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
        return {$: 'StyleBlockDeclaration', a: a};
    };
    var rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
        return {$: 'Viewport', a: a};
    };
    var rtfeldman$elm_css$Css$Structure$mapLast = F2(
        function (update, list) {
            if (!list.b) {
                return list;
            } else {
                if (!list.b.b) {
                    var only = list.a;
                    return _List_fromArray(
                        [
                            update(only)
                        ]);
                } else {
                    var first = list.a;
                    var rest = list.b;
                    return A2(
                        elm$core$List$cons,
                        first,
                        A2(rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
                }
            }
        });
    var rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
        function (property, _n0) {
            var firstSelector = _n0.a;
            var otherSelectors = _n0.b;
            var properties = _n0.c;
            return A3(
                rtfeldman$elm_css$Css$Structure$StyleBlock,
                firstSelector,
                otherSelectors,
                _Utils_ap(
                    properties,
                    _List_fromArray(
                        [property])));
        });
    var rtfeldman$elm_css$Css$Structure$appendProperty = F2(
        function (property, declarations) {
            if (!declarations.b) {
                return declarations;
            } else {
                if (!declarations.b.b) {
                    switch (declarations.a.$) {
                        case 'StyleBlockDeclaration':
                            var styleBlock = declarations.a.a;
                            return _List_fromArray(
                                [
                                    rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
                                    A2(rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
                                ]);
                        case 'MediaRule':
                            var _n1 = declarations.a;
                            var mediaQueries = _n1.a;
                            var styleBlocks = _n1.b;
                            return _List_fromArray(
                                [
                                    A2(
                                    rtfeldman$elm_css$Css$Structure$MediaRule,
                                    mediaQueries,
                                    A2(
                                        rtfeldman$elm_css$Css$Structure$mapLast,
                                        rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
                                        styleBlocks))
                                ]);
                        default:
                            return declarations;
                    }
                } else {
                    var first = declarations.a;
                    var rest = declarations.b;
                    return A2(
                        elm$core$List$cons,
                        first,
                        A2(rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
                }
            }
        });
    var rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
        function (f, styleBlock) {
            if (!styleBlock.b.b) {
                var only = styleBlock.a;
                var properties = styleBlock.c;
                return _List_fromArray(
                    [
                        A3(rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
                        A3(
                        rtfeldman$elm_css$Css$Structure$StyleBlock,
                        f(only),
                        _List_Nil,
                        _List_Nil)
                    ]);
            } else {
                var first = styleBlock.a;
                var rest = styleBlock.b;
                var properties = styleBlock.c;
                var newRest = A2(elm$core$List$map, f, rest);
                var newFirst = f(first);
                return _List_fromArray(
                    [
                        A3(rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
                        A3(rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
                    ]);
            }
        });
    var rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
        function (pseudo, _n0) {
            var sequence = _n0.a;
            var selectors = _n0.b;
            return A3(
                rtfeldman$elm_css$Css$Structure$Selector,
                sequence,
                selectors,
                elm$core$Maybe$Just(pseudo));
        });
    var rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
        function (pseudo, styleBlock) {
            return A2(
                rtfeldman$elm_css$Css$Structure$appendToLastSelector,
                rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
                styleBlock);
        });
    var rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
        function (a, b) {
            return {$: 'CustomSelector', a: a, b: b};
        });
    var rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
        function (a, b) {
            return {$: 'TypeSelectorSequence', a: a, b: b};
        });
    var rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
        return {$: 'UniversalSelectorSequence', a: a};
    };
    var rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
        function (selector, sequence) {
            switch (sequence.$) {
                case 'TypeSelectorSequence':
                    var typeSelector = sequence.a;
                    var list = sequence.b;
                    return A2(
                        rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
                        typeSelector,
                        _Utils_ap(
                            list,
                            _List_fromArray(
                                [selector])));
                case 'UniversalSelectorSequence':
                    var list = sequence.a;
                    return rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
                        _Utils_ap(
                            list,
                            _List_fromArray(
                                [selector])));
                default:
                    var str = sequence.a;
                    var list = sequence.b;
                    return A2(
                        rtfeldman$elm_css$Css$Structure$CustomSelector,
                        str,
                        _Utils_ap(
                            list,
                            _List_fromArray(
                                [selector])));
            }
        });
    var rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
        function (selector, list) {
            if (!list.b) {
                return _List_Nil;
            } else {
                if (!list.b.b) {
                    var _n1 = list.a;
                    var combinator = _n1.a;
                    var sequence = _n1.b;
                    return _List_fromArray(
                        [
                            _Utils_Tuple2(
                            combinator,
                            A2(rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
                        ]);
                } else {
                    var first = list.a;
                    var rest = list.b;
                    return A2(
                        elm$core$List$cons,
                        first,
                        A2(rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
                }
            }
        });
    var rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
        function (repeatableSimpleSelector, selector) {
            if (!selector.b.b) {
                var sequence = selector.a;
                var pseudoElement = selector.c;
                return A3(
                    rtfeldman$elm_css$Css$Structure$Selector,
                    A2(rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
                    _List_Nil,
                    pseudoElement);
            } else {
                var firstSelector = selector.a;
                var tuples = selector.b;
                var pseudoElement = selector.c;
                return A3(
                    rtfeldman$elm_css$Css$Structure$Selector,
                    firstSelector,
                    A2(rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
                    pseudoElement);
            }
        });
    var rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
        function (selector, styleBlock) {
            return A2(
                rtfeldman$elm_css$Css$Structure$appendToLastSelector,
                rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
                styleBlock);
        });
    var rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
        function (update, declarations) {
            _n0$12:
            while (true) {
                if (!declarations.b) {
                    return declarations;
                } else {
                    if (!declarations.b.b) {
                        switch (declarations.a.$) {
                            case 'StyleBlockDeclaration':
                                var styleBlock = declarations.a.a;
                                return A2(
                                    elm$core$List$map,
                                    rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
                                    update(styleBlock));
                            case 'MediaRule':
                                if (declarations.a.b.b) {
                                    if (!declarations.a.b.b.b) {
                                        var _n1 = declarations.a;
                                        var mediaQueries = _n1.a;
                                        var _n2 = _n1.b;
                                        var styleBlock = _n2.a;
                                        return _List_fromArray(
                                            [
                                                A2(
                                                rtfeldman$elm_css$Css$Structure$MediaRule,
                                                mediaQueries,
                                                update(styleBlock))
                                            ]);
                                    } else {
                                        var _n3 = declarations.a;
                                        var mediaQueries = _n3.a;
                                        var _n4 = _n3.b;
                                        var first = _n4.a;
                                        var rest = _n4.b;
                                        var _n5 = A2(
                                            rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
                                            update,
                                            _List_fromArray(
                                                [
                                                    A2(rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
                                                ]));
                                        if ((_n5.b && (_n5.a.$ === 'MediaRule')) && (!_n5.b.b)) {
                                            var _n6 = _n5.a;
                                            var newMediaQueries = _n6.a;
                                            var newStyleBlocks = _n6.b;
                                            return _List_fromArray(
                                                [
                                                    A2(
                                                    rtfeldman$elm_css$Css$Structure$MediaRule,
                                                    newMediaQueries,
                                                    A2(elm$core$List$cons, first, newStyleBlocks))
                                                ]);
                                        } else {
                                            var newDeclarations = _n5;
                                            return newDeclarations;
                                        }
                                    }
                                } else {
                                    break _n0$12;
                                }
                            case 'SupportsRule':
                                var _n7 = declarations.a;
                                var str = _n7.a;
                                var nestedDeclarations = _n7.b;
                                return _List_fromArray(
                                    [
                                        A2(
                                        rtfeldman$elm_css$Css$Structure$SupportsRule,
                                        str,
                                        A2(rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
                                    ]);
                            case 'DocumentRule':
                                var _n8 = declarations.a;
                                var str1 = _n8.a;
                                var str2 = _n8.b;
                                var str3 = _n8.c;
                                var str4 = _n8.d;
                                var styleBlock = _n8.e;
                                return A2(
                                    elm$core$List$map,
                                    A4(rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
                                    update(styleBlock));
                            case 'PageRule':
                                var _n9 = declarations.a;
                                return declarations;
                            case 'FontFace':
                                return declarations;
                            case 'Keyframes':
                                return declarations;
                            case 'Viewport':
                                return declarations;
                            case 'CounterStyle':
                                return declarations;
                            default:
                                return declarations;
                        }
                    } else {
                        break _n0$12;
                    }
                }
            }
            var first = declarations.a;
            var rest = declarations.b;
            return A2(
                elm$core$List$cons,
                first,
                A2(rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
        });
    var rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
        function (mediaQueries, declaration) {
            if (declaration.$ === 'StyleBlockDeclaration') {
                var styleBlock = declaration.a;
                return A2(
                    rtfeldman$elm_css$Css$Structure$MediaRule,
                    mediaQueries,
                    _List_fromArray(
                        [styleBlock]));
            } else {
                return declaration;
            }
        });
    var rtfeldman$elm_css$Hash$murmurSeed = 15739;
    var elm$core$String$fromList = _String_fromList;
    var elm$core$Basics$modBy = _Basics_modBy;
    var rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
        unsafeToDigit:
        while (true) {
            switch (num) {
                case 0:
                    return _Utils_chr('0');
                case 1:
                    return _Utils_chr('1');
                case 2:
                    return _Utils_chr('2');
                case 3:
                    return _Utils_chr('3');
                case 4:
                    return _Utils_chr('4');
                case 5:
                    return _Utils_chr('5');
                case 6:
                    return _Utils_chr('6');
                case 7:
                    return _Utils_chr('7');
                case 8:
                    return _Utils_chr('8');
                case 9:
                    return _Utils_chr('9');
                case 10:
                    return _Utils_chr('a');
                case 11:
                    return _Utils_chr('b');
                case 12:
                    return _Utils_chr('c');
                case 13:
                    return _Utils_chr('d');
                case 14:
                    return _Utils_chr('e');
                case 15:
                    return _Utils_chr('f');
                default:
                    var $temp$num = num;
                    num = $temp$num;
                    continue unsafeToDigit;
            }
        }
    };
    var rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
        function (digits, num) {
            unsafePositiveToDigits:
            while (true) {
                if (num < 16) {
                    return A2(
                        elm$core$List$cons,
                        rtfeldman$elm_hex$Hex$unsafeToDigit(num),
                        digits);
                } else {
                    var $temp$digits = A2(
                        elm$core$List$cons,
                        rtfeldman$elm_hex$Hex$unsafeToDigit(
                            A2(elm$core$Basics$modBy, 16, num)),
                        digits),
                        $temp$num = (num / 16) | 0;
                    digits = $temp$digits;
                    num = $temp$num;
                    continue unsafePositiveToDigits;
                }
            }
        });
    var rtfeldman$elm_hex$Hex$toString = function (num) {
        return elm$core$String$fromList(
            (num < 0) ? A2(
                elm$core$List$cons,
                _Utils_chr('-'),
                A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2(rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
    };
    var rtfeldman$elm_css$Hash$fromString = function (str) {
        return A2(
            elm$core$String$cons,
            _Utils_chr('_'),
            rtfeldman$elm_hex$Hex$toString(
                A2(Skinney$murmur3$Murmur3$hashString, rtfeldman$elm_css$Hash$murmurSeed, str)));
    };
    var rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
        function (nestedStyles, rest, f, declarations) {
            var withoutParent = function (decls) {
                return A2(
                    elm$core$Maybe$withDefault,
                    _List_Nil,
                    elm$core$List$tail(decls));
            };
            var nextResult = A2(
                rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
                rest,
                A2(
                    elm$core$Maybe$withDefault,
                    _List_Nil,
                    rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
            var newDeclarations = function () {
                var _n14 = _Utils_Tuple2(
                    elm$core$List$head(nextResult),
                    rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
                if ((_n14.a.$ === 'Just') && (_n14.b.$ === 'Just')) {
                    var nextResultParent = _n14.a.a;
                    var originalParent = _n14.b.a;
                    return _Utils_ap(
                        A2(
                            elm$core$List$take,
                            elm$core$List$length(declarations) - 1,
                            declarations),
                        _List_fromArray(
                            [
                                (!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
                            ]));
                } else {
                    return declarations;
                }
            }();
            var insertStylesToNestedDecl = function (lastDecl) {
                return elm$core$List$concat(
                    A2(
                        rtfeldman$elm_css$Css$Structure$mapLast,
                        rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
                        A2(
                            elm$core$List$map,
                            elm$core$List$singleton,
                            A2(rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
            };
            var initialResult = A2(
                elm$core$Maybe$withDefault,
                _List_Nil,
                A2(
                    elm$core$Maybe$map,
                    insertStylesToNestedDecl,
                    rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
            return _Utils_ap(
                newDeclarations,
                _Utils_ap(
                    withoutParent(initialResult),
                    withoutParent(nextResult)));
        });
    var rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
        function (styles, declarations) {
            if (!styles.b) {
                return declarations;
            } else {
                switch (styles.a.$) {
                    case 'AppendProperty':
                        var property = styles.a.a;
                        var rest = styles.b;
                        return A2(
                            rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
                            rest,
                            A2(rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
                    case 'ExtendSelector':
                        var _n4 = styles.a;
                        var selector = _n4.a;
                        var nestedStyles = _n4.b;
                        var rest = styles.b;
                        return A4(
                            rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
                            nestedStyles,
                            rest,
                            rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
                            declarations);
                    case 'NestSnippet':
                        var _n5 = styles.a;
                        var selectorCombinator = _n5.a;
                        var snippets = _n5.b;
                        var rest = styles.b;
                        var chain = F2(
                            function (_n9, _n10) {
                                var originalSequence = _n9.a;
                                var originalTuples = _n9.b;
                                var originalPseudoElement = _n9.c;
                                var newSequence = _n10.a;
                                var newTuples = _n10.b;
                                var newPseudoElement = _n10.c;
                                return A3(
                                    rtfeldman$elm_css$Css$Structure$Selector,
                                    originalSequence,
                                    _Utils_ap(
                                        originalTuples,
                                        A2(
                                            elm$core$List$cons,
                                            _Utils_Tuple2(selectorCombinator, newSequence),
                                            newTuples)),
                                    rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
                                        _List_fromArray(
                                            [newPseudoElement, originalPseudoElement])));
                            });
                        var expandDeclaration = function (declaration) {
                            switch (declaration.$) {
                                case 'StyleBlockDeclaration':
                                    var _n7 = declaration.a;
                                    var firstSelector = _n7.a;
                                    var otherSelectors = _n7.b;
                                    var nestedStyles = _n7.c;
                                    var newSelectors = A2(
                                        elm$core$List$concatMap,
                                        function (originalSelector) {
                                            return A2(
                                                elm$core$List$map,
                                                chain(originalSelector),
                                                A2(elm$core$List$cons, firstSelector, otherSelectors));
                                        },
                                        rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
                                    var newDeclarations = function () {
                                        if (!newSelectors.b) {
                                            return _List_Nil;
                                        } else {
                                            var first = newSelectors.a;
                                            var remainder = newSelectors.b;
                                            return _List_fromArray(
                                                [
                                                    rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
                                                    A3(rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
                                                ]);
                                        }
                                    }();
                                    return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
                                case 'MediaRule':
                                    var mediaQueries = declaration.a;
                                    var styleBlocks = declaration.b;
                                    return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
                                case 'SupportsRule':
                                    var str = declaration.a;
                                    var otherSnippets = declaration.b;
                                    return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
                                case 'DocumentRule':
                                    var str1 = declaration.a;
                                    var str2 = declaration.b;
                                    var str3 = declaration.c;
                                    var str4 = declaration.d;
                                    var styleBlock = declaration.e;
                                    return A2(
                                        elm$core$List$map,
                                        A4(rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
                                        rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
                                case 'PageRule':
                                    var str = declaration.a;
                                    var properties = declaration.b;
                                    return _List_fromArray(
                                        [
                                            A2(rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
                                        ]);
                                case 'FontFace':
                                    var properties = declaration.a;
                                    return _List_fromArray(
                                        [
                                            rtfeldman$elm_css$Css$Structure$FontFace(properties)
                                        ]);
                                case 'Viewport':
                                    var properties = declaration.a;
                                    return _List_fromArray(
                                        [
                                            rtfeldman$elm_css$Css$Structure$Viewport(properties)
                                        ]);
                                case 'CounterStyle':
                                    var properties = declaration.a;
                                    return _List_fromArray(
                                        [
                                            rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
                                        ]);
                                default:
                                    var tuples = declaration.a;
                                    return rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
                            }
                        };
                        return elm$core$List$concat(
                            _Utils_ap(
                                _List_fromArray(
                                    [
                                        A2(rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
                                    ]),
                                A2(
                                    elm$core$List$map,
                                    expandDeclaration,
                                    A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
                    case 'WithPseudoElement':
                        var _n11 = styles.a;
                        var pseudoElement = _n11.a;
                        var nestedStyles = _n11.b;
                        var rest = styles.b;
                        return A4(
                            rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
                            nestedStyles,
                            rest,
                            rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
                            declarations);
                    case 'WithKeyframes':
                        var str = styles.a.a;
                        var rest = styles.b;
                        var name = rtfeldman$elm_css$Hash$fromString(str);
                        var newProperty = 'animation-name:' + name;
                        var newDeclarations = A2(
                            rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
                            rest,
                            A2(rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
                        return A2(
                            elm$core$List$append,
                            newDeclarations,
                            _List_fromArray(
                                [
                                    rtfeldman$elm_css$Css$Structure$Keyframes(
                                    {declaration: str, name: name})
                                ]));
                    case 'WithMedia':
                        var _n12 = styles.a;
                        var mediaQueries = _n12.a;
                        var nestedStyles = _n12.b;
                        var rest = styles.b;
                        var extraDeclarations = function () {
                            var _n13 = rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
                            if (!_n13.b) {
                                return _List_Nil;
                            } else {
                                var firstSelector = _n13.a;
                                var otherSelectors = _n13.b;
                                return A2(
                                    elm$core$List$map,
                                    rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
                                    A2(
                                        rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
                                        nestedStyles,
                                        elm$core$List$singleton(
                                            rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
                                                A3(rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
                            }
                        }();
                        return _Utils_ap(
                            A2(rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
                            extraDeclarations);
                    default:
                        var otherStyles = styles.a.a;
                        var rest = styles.b;
                        return A2(
                            rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
                            _Utils_ap(otherStyles, rest),
                            declarations);
                }
            }
        });
    var rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_n2) {
        var firstSelector = _n2.a;
        var otherSelectors = _n2.b;
        var styles = _n2.c;
        return A2(
            rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
            styles,
            _List_fromArray(
                [
                    rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
                    A3(rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
                ]));
    };
    var rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
        if (!snippetDeclarations.b) {
            return _List_Nil;
        } else {
            var first = snippetDeclarations.a;
            var rest = snippetDeclarations.b;
            return _Utils_ap(
                rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
                rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
        }
    };
    var rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
        function (mediaQueries, styleBlocks) {
            var handleStyleBlock = function (styleBlock) {
                return A2(
                    elm$core$List$map,
                    rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
                    rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
            };
            return A2(elm$core$List$concatMap, handleStyleBlock, styleBlocks);
        });
    var rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
        function (str, snippets) {
            var declarations = rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
                A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
            return _List_fromArray(
                [
                    A2(rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
                ]);
        });
    var rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
        switch (snippetDeclaration.$) {
            case 'StyleBlockDeclaration':
                var styleBlock = snippetDeclaration.a;
                return rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
            case 'MediaRule':
                var mediaQueries = snippetDeclaration.a;
                var styleBlocks = snippetDeclaration.b;
                return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
            case 'SupportsRule':
                var str = snippetDeclaration.a;
                var snippets = snippetDeclaration.b;
                return A2(rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
            case 'DocumentRule':
                var str1 = snippetDeclaration.a;
                var str2 = snippetDeclaration.b;
                var str3 = snippetDeclaration.c;
                var str4 = snippetDeclaration.d;
                var styleBlock = snippetDeclaration.e;
                return A2(
                    elm$core$List$map,
                    A4(rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
                    rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
            case 'PageRule':
                var str = snippetDeclaration.a;
                var properties = snippetDeclaration.b;
                return _List_fromArray(
                    [
                        A2(rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
                    ]);
            case 'FontFace':
                var properties = snippetDeclaration.a;
                return _List_fromArray(
                    [
                        rtfeldman$elm_css$Css$Structure$FontFace(properties)
                    ]);
            case 'Viewport':
                var properties = snippetDeclaration.a;
                return _List_fromArray(
                    [
                        rtfeldman$elm_css$Css$Structure$Viewport(properties)
                    ]);
            case 'CounterStyle':
                var properties = snippetDeclaration.a;
                return _List_fromArray(
                    [
                        rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
                    ]);
            default:
                var tuples = snippetDeclaration.a;
                return rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
        }
    };
    var rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_n0) {
        var charset = _n0.charset;
        var imports = _n0.imports;
        var namespaces = _n0.namespaces;
        var snippets = _n0.snippets;
        var declarations = rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
            A2(elm$core$List$concatMap, rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
        return {charset: charset, declarations: declarations, imports: imports, namespaces: namespaces};
    };
    var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
    var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
    var elm$core$Dict$Black = {$: 'Black'};
    var elm$core$Dict$RBNode_elm_builtin = F5(
        function (a, b, c, d, e) {
            return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
        });
    var elm$core$Basics$compare = _Utils_compare;
    var elm$core$Dict$Red = {$: 'Red'};
    var elm$core$Dict$balance = F5(
        function (color, key, value, left, right) {
            if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
                var _n1 = right.a;
                var rK = right.b;
                var rV = right.c;
                var rLeft = right.d;
                var rRight = right.e;
                if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
                    var _n3 = left.a;
                    var lK = left.b;
                    var lV = left.c;
                    var lLeft = left.d;
                    var lRight = left.e;
                    return A5(
                        elm$core$Dict$RBNode_elm_builtin,
                        elm$core$Dict$Red,
                        key,
                        value,
                        A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
                        A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
                } else {
                    return A5(
                        elm$core$Dict$RBNode_elm_builtin,
                        color,
                        rK,
                        rV,
                        A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
                        rRight);
                }
            } else {
                if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
                    var _n5 = left.a;
                    var lK = left.b;
                    var lV = left.c;
                    var _n6 = left.d;
                    var _n7 = _n6.a;
                    var llK = _n6.b;
                    var llV = _n6.c;
                    var llLeft = _n6.d;
                    var llRight = _n6.e;
                    var lRight = left.e;
                    return A5(
                        elm$core$Dict$RBNode_elm_builtin,
                        elm$core$Dict$Red,
                        lK,
                        lV,
                        A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
                        A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
                } else {
                    return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
                }
            }
        });
    var elm$core$Dict$insertHelp = F3(
        function (key, value, dict) {
            if (dict.$ === 'RBEmpty_elm_builtin') {
                return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
            } else {
                var nColor = dict.a;
                var nKey = dict.b;
                var nValue = dict.c;
                var nLeft = dict.d;
                var nRight = dict.e;
                var _n1 = A2(elm$core$Basics$compare, key, nKey);
                switch (_n1.$) {
                    case 'LT':
                        return A5(
                            elm$core$Dict$balance,
                            nColor,
                            nKey,
                            nValue,
                            A3(elm$core$Dict$insertHelp, key, value, nLeft),
                            nRight);
                    case 'EQ':
                        return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
                    default:
                        return A5(
                            elm$core$Dict$balance,
                            nColor,
                            nKey,
                            nValue,
                            nLeft,
                            A3(elm$core$Dict$insertHelp, key, value, nRight));
                }
            }
        });
    var elm$core$Dict$insert = F3(
        function (key, value, dict) {
            var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
            if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
                var _n1 = _n0.a;
                var k = _n0.b;
                var v = _n0.c;
                var l = _n0.d;
                var r = _n0.e;
                return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
            } else {
                var x = _n0;
                return x;
            }
        });
    var elm$core$Basics$not = _Basics_not;
    var elm$core$List$any = F2(
        function (isOkay, list) {
            any:
            while (true) {
                if (!list.b) {
                    return false;
                } else {
                    var x = list.a;
                    var xs = list.b;
                    if (isOkay(x)) {
                        return true;
                    } else {
                        var $temp$isOkay = isOkay,
                            $temp$list = xs;
                        isOkay = $temp$isOkay;
                        list = $temp$list;
                        continue any;
                    }
                }
            }
        });
    var elm$core$List$all = F2(
        function (isOkay, list) {
            return !A2(
                elm$core$List$any,
                A2(elm$core$Basics$composeL, elm$core$Basics$not, isOkay),
                list);
        });
    var rtfeldman$elm_css$Css$Structure$compactHelp = F2(
        function (declaration, _n0) {
            var keyframesByName = _n0.a;
            var declarations = _n0.b;
            switch (declaration.$) {
                case 'StyleBlockDeclaration':
                    var _n2 = declaration.a;
                    var properties = _n2.c;
                    return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
                        keyframesByName,
                        A2(elm$core$List$cons, declaration, declarations));
                case 'MediaRule':
                    var styleBlocks = declaration.b;
                    return A2(
                        elm$core$List$all,
                        function (_n3) {
                            var properties = _n3.c;
                            return elm$core$List$isEmpty(properties);
                        },
                        styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
                        keyframesByName,
                        A2(elm$core$List$cons, declaration, declarations));
                case 'SupportsRule':
                    var otherDeclarations = declaration.b;
                    return elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
                        keyframesByName,
                        A2(elm$core$List$cons, declaration, declarations));
                case 'DocumentRule':
                    return _Utils_Tuple2(
                        keyframesByName,
                        A2(elm$core$List$cons, declaration, declarations));
                case 'PageRule':
                    var properties = declaration.b;
                    return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
                        keyframesByName,
                        A2(elm$core$List$cons, declaration, declarations));
                case 'FontFace':
                    var properties = declaration.a;
                    return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
                        keyframesByName,
                        A2(elm$core$List$cons, declaration, declarations));
                case 'Keyframes':
                    var record = declaration.a;
                    return elm$core$String$isEmpty(record.declaration) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
                        A3(elm$core$Dict$insert, record.name, record.declaration, keyframesByName),
                        declarations);
                case 'Viewport':
                    var properties = declaration.a;
                    return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
                        keyframesByName,
                        A2(elm$core$List$cons, declaration, declarations));
                case 'CounterStyle':
                    var properties = declaration.a;
                    return elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
                        keyframesByName,
                        A2(elm$core$List$cons, declaration, declarations));
                default:
                    var tuples = declaration.a;
                    return A2(
                        elm$core$List$all,
                        function (_n4) {
                            var properties = _n4.b;
                            return elm$core$List$isEmpty(properties);
                        },
                        tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
                        keyframesByName,
                        A2(elm$core$List$cons, declaration, declarations));
            }
        });
    var rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
        function (keyframesByName, compactedDeclarations) {
            return A2(
                elm$core$List$append,
                A2(
                    elm$core$List$map,
                    function (_n0) {
                        var name = _n0.a;
                        var decl = _n0.b;
                        return rtfeldman$elm_css$Css$Structure$Keyframes(
                            {declaration: decl, name: name});
                    },
                    elm$core$Dict$toList(keyframesByName)),
                compactedDeclarations);
        });
    var rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_n0) {
        var charset = _n0.charset;
        var imports = _n0.imports;
        var namespaces = _n0.namespaces;
        var declarations = _n0.declarations;
        var _n1 = A3(
            elm$core$List$foldr,
            rtfeldman$elm_css$Css$Structure$compactHelp,
            _Utils_Tuple2(elm$core$Dict$empty, _List_Nil),
            declarations);
        var keyframesByName = _n1.a;
        var compactedDeclarations = _n1.b;
        var finalDeclarations = A2(rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
        return {charset: charset, declarations: finalDeclarations, imports: imports, namespaces: namespaces};
    };
    var elm$core$List$filter = F2(
        function (isGood, list) {
            return A3(
                elm$core$List$foldr,
                F2(
                    function (x, xs) {
                        return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
                    }),
                _List_Nil,
                list);
        });
    var rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
        return A2(
            elm$core$Maybe$withDefault,
            '',
            A2(
                elm$core$Maybe$map,
                function (str) {
                    return '@charset \"' + (str + '\"');
                },
                charset));
    };
    var rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
        return '(' + (expression.feature + (A2(
            elm$core$Maybe$withDefault,
            '',
            A2(
                elm$core$Maybe$map,
                elm$core$Basics$append(': '),
                expression.value)) + ')'));
    };
    var rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
        switch (mediaType.$) {
            case 'Print':
                return 'print';
            case 'Screen':
                return 'screen';
            default:
                return 'speech';
        }
    };
    var rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
        var prefixWith = F3(
            function (str, mediaType, expressions) {
                return str + (' ' + A2(
                    elm$core$String$join,
                    ' and ',
                    A2(
                        elm$core$List$cons,
                        rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
                        A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
            });
        switch (mediaQuery.$) {
            case 'AllQuery':
                var expressions = mediaQuery.a;
                return A2(
                    elm$core$String$join,
                    ' and ',
                    A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions));
            case 'OnlyQuery':
                var mediaType = mediaQuery.a;
                var expressions = mediaQuery.b;
                return A3(prefixWith, 'only', mediaType, expressions);
            case 'NotQuery':
                var mediaType = mediaQuery.a;
                var expressions = mediaQuery.b;
                return A3(prefixWith, 'not', mediaType, expressions);
            default:
                var str = mediaQuery.a;
                return str;
        }
    };
    var rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
        function (name, mediaQuery) {
            return '@import \"' + (name + (rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
        });
    var rtfeldman$elm_css$Css$Structure$Output$importToString = function (_n0) {
        var name = _n0.a;
        var mediaQueries = _n0.b;
        return A2(
            elm$core$String$join,
            '\n',
            A2(
                elm$core$List$map,
                rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
                mediaQueries));
    };
    var rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_n0) {
        var prefix = _n0.a;
        var str = _n0.b;
        return '@namespace ' + (prefix + ('\"' + (str + '\"')));
    };
    var rtfeldman$elm_css$Css$Structure$Output$spaceIndent = '    ';
    var rtfeldman$elm_css$Css$Structure$Output$indent = function (str) {
        return _Utils_ap(rtfeldman$elm_css$Css$Structure$Output$spaceIndent, str);
    };
    var rtfeldman$elm_css$Css$Structure$Output$noIndent = '';
    var rtfeldman$elm_css$Css$Structure$Output$emitProperty = function (str) {
        return str + ';';
    };
    var rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
        return A2(
            elm$core$String$join,
            '\n',
            A2(
                elm$core$List$map,
                A2(elm$core$Basics$composeL, rtfeldman$elm_css$Css$Structure$Output$indent, rtfeldman$elm_css$Css$Structure$Output$emitProperty),
                properties));
    };
    var elm$core$String$append = _String_append;
    var rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_n0) {
        var str = _n0.a;
        return '::' + str;
    };
    var rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
        switch (combinator.$) {
            case 'AdjacentSibling':
                return '+';
            case 'GeneralSibling':
                return '~';
            case 'Child':
                return '>';
            default:
                return '';
        }
    };
    var rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
        switch (repeatableSimpleSelector.$) {
            case 'ClassSelector':
                var str = repeatableSimpleSelector.a;
                return '.' + str;
            case 'IdSelector':
                var str = repeatableSimpleSelector.a;
                return '#' + str;
            case 'PseudoClassSelector':
                var str = repeatableSimpleSelector.a;
                return ':' + str;
            default:
                var str = repeatableSimpleSelector.a;
                return '[' + (str + ']');
        }
    };
    var rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
        switch (simpleSelectorSequence.$) {
            case 'TypeSelectorSequence':
                var str = simpleSelectorSequence.a.a;
                var repeatableSimpleSelectors = simpleSelectorSequence.b;
                return A2(
                    elm$core$String$join,
                    '',
                    A2(
                        elm$core$List$cons,
                        str,
                        A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
            case 'UniversalSelectorSequence':
                var repeatableSimpleSelectors = simpleSelectorSequence.a;
                return elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A2(
                    elm$core$String$join,
                    '',
                    A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors));
            default:
                var str = simpleSelectorSequence.a;
                var repeatableSimpleSelectors = simpleSelectorSequence.b;
                return A2(
                    elm$core$String$join,
                    '',
                    A2(
                        elm$core$List$cons,
                        str,
                        A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
        }
    };
    var rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_n0) {
        var combinator = _n0.a;
        var sequence = _n0.b;
        return A2(
            elm$core$String$join,
            ' ',
            _List_fromArray(
                [
                    rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator),
                    rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence)
                ]));
    };
    var rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_n0) {
        var simpleSelectorSequence = _n0.a;
        var chain = _n0.b;
        var pseudoElement = _n0.c;
        var segments = A2(
            elm$core$List$cons,
            rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
            A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
        var pseudoElementsString = A2(
            elm$core$String$join,
            '',
            _List_fromArray(
                [
                    A2(
                    elm$core$Maybe$withDefault,
                    '',
                    A2(elm$core$Maybe$map, rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement))
                ]));
        return A2(
            elm$core$String$append,
            A2(
                elm$core$String$join,
                ' ',
                A2(
                    elm$core$List$filter,
                    A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$String$isEmpty),
                    segments)),
            pseudoElementsString);
    };
    var rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = F2(
        function (indentLevel, _n0) {
            var firstSelector = _n0.a;
            var otherSelectors = _n0.b;
            var properties = _n0.c;
            var selectorStr = A2(
                elm$core$String$join,
                ', ',
                A2(
                    elm$core$List$map,
                    rtfeldman$elm_css$Css$Structure$Output$selectorToString,
                    A2(elm$core$List$cons, firstSelector, otherSelectors)));
            return A2(
                elm$core$String$join,
                '',
                _List_fromArray(
                    [
                        selectorStr,
                        ' {\n',
                        indentLevel,
                        rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties),
                        '\n',
                        indentLevel,
                        '}'
                    ]));
        });
    var rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
        switch (decl.$) {
            case 'StyleBlockDeclaration':
                var styleBlock = decl.a;
                return A2(rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, rtfeldman$elm_css$Css$Structure$Output$noIndent, styleBlock);
            case 'MediaRule':
                var mediaQueries = decl.a;
                var styleBlocks = decl.b;
                var query = A2(
                    elm$core$String$join,
                    ',\n',
                    A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, mediaQueries));
                var blocks = A2(
                    elm$core$String$join,
                    '\n\n',
                    A2(
                        elm$core$List$map,
                        A2(
                            elm$core$Basics$composeL,
                            rtfeldman$elm_css$Css$Structure$Output$indent,
                            rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock(rtfeldman$elm_css$Css$Structure$Output$spaceIndent)),
                        styleBlocks));
                return '@media ' + (query + (' {\n' + (blocks + '\n}')));
            case 'SupportsRule':
                return 'TODO';
            case 'DocumentRule':
                return 'TODO';
            case 'PageRule':
                return 'TODO';
            case 'FontFace':
                return 'TODO';
            case 'Keyframes':
                var name = decl.a.name;
                var declaration = decl.a.declaration;
                return '@keyframes ' + (name + (' {\n' + (declaration + '\n}')));
            case 'Viewport':
                return 'TODO';
            case 'CounterStyle':
                return 'TODO';
            default:
                return 'TODO';
        }
    };
    var rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_n0) {
        var charset = _n0.charset;
        var imports = _n0.imports;
        var namespaces = _n0.namespaces;
        var declarations = _n0.declarations;
        return A2(
            elm$core$String$join,
            '\n\n',
            A2(
                elm$core$List$filter,
                A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$String$isEmpty),
                _List_fromArray(
                    [
                        rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset),
                        A2(
                        elm$core$String$join,
                        '\n',
                        A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$importToString, imports)),
                        A2(
                        elm$core$String$join,
                        '\n',
                        A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$namespaceToString, namespaces)),
                        A2(
                        elm$core$String$join,
                        '\n\n',
                        A2(elm$core$List$map, rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, declarations))
                    ])));
    };
    var rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp = function (sheet) {
        return rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
            rtfeldman$elm_css$Css$Structure$compactStylesheet(
                rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
    };
    var rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (styles) {
        return A2(
            elm$core$String$join,
            '\n\n',
            A2(elm$core$List$map, rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp, styles));
    };
    var rtfeldman$elm_css$Css$Preprocess$Snippet = function (a) {
        return {$: 'Snippet', a: a};
    };
    var rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
        function (a, b, c) {
            return {$: 'StyleBlock', a: a, b: b, c: c};
        });
    var rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
        return {$: 'StyleBlockDeclaration', a: a};
    };
    var rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
        function (styles, sequence) {
            var selector = A3(rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, elm$core$Maybe$Nothing);
            return rtfeldman$elm_css$Css$Preprocess$Snippet(
                _List_fromArray(
                    [
                        rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
                        A3(rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
                    ]));
        });
    var rtfeldman$elm_css$VirtualDom$Styled$murmurSeed = 15739;
    var rtfeldman$elm_css$VirtualDom$Styled$getClassname = function (styles) {
        return elm$core$List$isEmpty(styles) ? 'unstyled' : A2(
            elm$core$String$cons,
            _Utils_chr('_'),
            rtfeldman$elm_hex$Hex$toString(
                A2(
                    Skinney$murmur3$Murmur3$hashString,
                    rtfeldman$elm_css$VirtualDom$Styled$murmurSeed,
                    rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
                        elm$core$List$singleton(
                            rtfeldman$elm_css$Css$Preprocess$stylesheet(
                                elm$core$List$singleton(
                                    A2(
                                        rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
                                        styles,
                                        rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(_List_Nil)))))))));
    };
    var rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
        var classname = rtfeldman$elm_css$VirtualDom$Styled$getClassname(styles);
        var classProperty = A2(
            elm$virtual_dom$VirtualDom$property,
            'className',
            elm$json$Json$Encode$string(classname));
        return A3(rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, styles, classname);
    };
    var rtfeldman$elm_css$Html$Styled$Attributes$css = rtfeldman$elm_css$Html$Styled$Internal$css;
    var author$project$Save$listItemStyle = _List_fromArray(
        [
            rtfeldman$elm_css$Html$Styled$Attributes$css(
            _List_fromArray(
                [
                    rtfeldman$elm_css$Css$float(rtfeldman$elm_css$Css$left),
                    rtfeldman$elm_css$Css$display(rtfeldman$elm_css$Css$block),
                    rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$center),
                    A2(
                    rtfeldman$elm_css$Css$padding2,
                    rtfeldman$elm_css$Css$px(14),
                    rtfeldman$elm_css$Css$px(16))
                ]))
        ]);
    var rtfeldman$elm_css$Css$backgroundColor = function (c) {
        return A2(rtfeldman$elm_css$Css$property, 'background-color', c.value);
    };
    var rtfeldman$elm_css$Css$bottom = rtfeldman$elm_css$Css$prop1('bottom');
    var rtfeldman$elm_css$Css$fixed = {backgroundAttachment: rtfeldman$elm_css$Css$Structure$Compatible, position: rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: rtfeldman$elm_css$Css$Structure$Compatible, value: 'fixed'};
    var rtfeldman$elm_css$Css$height = rtfeldman$elm_css$Css$prop1('height');
    var rtfeldman$elm_css$Css$hidden = {borderStyle: rtfeldman$elm_css$Css$Structure$Compatible, overflow: rtfeldman$elm_css$Css$Structure$Compatible, value: 'hidden', visibility: rtfeldman$elm_css$Css$Structure$Compatible};
    var rtfeldman$elm_css$Css$UnitlessInteger = {$: 'UnitlessInteger'};
    var rtfeldman$elm_css$Css$int = function (val) {
        return {
            fontWeight: rtfeldman$elm_css$Css$Structure$Compatible,
            intOrAuto: rtfeldman$elm_css$Css$Structure$Compatible,
            lengthOrNumber: rtfeldman$elm_css$Css$Structure$Compatible,
            lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible,
            number: rtfeldman$elm_css$Css$Structure$Compatible,
            numberOrInfinite: rtfeldman$elm_css$Css$Structure$Compatible,
            numericValue: val,
            unitLabel: '',
            units: rtfeldman$elm_css$Css$UnitlessInteger,
            value: elm$core$String$fromInt(val)
        };
    };
    var rtfeldman$elm_css$Css$margin = rtfeldman$elm_css$Css$prop1('margin');
    var rtfeldman$elm_css$Css$overflow = rtfeldman$elm_css$Css$prop1('overflow');
    var rtfeldman$elm_css$Css$padding = rtfeldman$elm_css$Css$prop1('padding');
    var rtfeldman$elm_css$Css$PercentageUnits = {$: 'PercentageUnits'};
    var rtfeldman$elm_css$Css$pct = A2(rtfeldman$elm_css$Css$Internal$lengthConverter, rtfeldman$elm_css$Css$PercentageUnits, '%');
    var rtfeldman$elm_css$Css$position = rtfeldman$elm_css$Css$prop1('position');
    var rtfeldman$elm_css$Css$cssFunction = F2(
        function (funcName, args) {
            return funcName + ('(' + (A2(elm$core$String$join, ', ', args) + ')'));
        });
    var rtfeldman$elm_css$Css$rgb = F3(
        function (r, g, b) {
            return {
                alpha: 1,
                blue: b,
                color: rtfeldman$elm_css$Css$Structure$Compatible,
                green: g,
                red: r,
                value: A2(
                    rtfeldman$elm_css$Css$cssFunction,
                    'rgb',
                    A2(
                        elm$core$List$map,
                        elm$core$String$fromInt,
                        _List_fromArray(
                            [r, g, b])))
            };
        });
    var rtfeldman$elm_css$Css$width = rtfeldman$elm_css$Css$prop1('width');
    var rtfeldman$elm_css$Css$zIndex = rtfeldman$elm_css$Css$prop1('z-index');
    var author$project$Save$unorderdListStyle = _List_fromArray(
        [
            rtfeldman$elm_css$Html$Styled$Attributes$css(
            _List_fromArray(
                [
                    rtfeldman$elm_css$Css$margin(
                    rtfeldman$elm_css$Css$px(0)),
                    rtfeldman$elm_css$Css$padding(
                    rtfeldman$elm_css$Css$px(0)),
                    rtfeldman$elm_css$Css$overflow(rtfeldman$elm_css$Css$hidden),
                    rtfeldman$elm_css$Css$zIndex(
                    rtfeldman$elm_css$Css$int(10)),
                    rtfeldman$elm_css$Css$backgroundColor(
                    A3(rtfeldman$elm_css$Css$rgb, 240, 240, 240)),
                    rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$fixed),
                    rtfeldman$elm_css$Css$left(
                    rtfeldman$elm_css$Css$px(0)),
                    rtfeldman$elm_css$Css$bottom(
                    rtfeldman$elm_css$Css$px(0)),
                    rtfeldman$elm_css$Css$height(
                    rtfeldman$elm_css$Css$px(50)),
                    rtfeldman$elm_css$Css$width(
                    rtfeldman$elm_css$Css$pct(100))
                ]))
        ]);
    var author$project$Save$UploadRequested = {$: 'UploadRequested'};
    var author$project$Save$uploadButton = A2(
        rtfeldman$elm_css$Html$Styled$button,
        _List_fromArray(
            [
                rtfeldman$elm_css$Html$Styled$Events$onClick(author$project$Save$UploadRequested)
            ]),
        _List_fromArray(
            [
                rtfeldman$elm_css$Html$Styled$text('Upload')
            ]));
    var rtfeldman$elm_css$Html$Styled$li = rtfeldman$elm_css$Html$Styled$node('li');
    var rtfeldman$elm_css$Html$Styled$ul = rtfeldman$elm_css$Html$Styled$node('ul');
    var author$project$Save$view = function (model) {
        return A2(
            rtfeldman$elm_css$Html$Styled$ul,
            author$project$Save$unorderdListStyle,
            _List_fromArray(
                [
                    A2(
                    rtfeldman$elm_css$Html$Styled$li,
                    author$project$Save$listItemStyle,
                    _List_fromArray(
                        [author$project$Save$copyJavaCommentsButton])),
                    A2(
                    rtfeldman$elm_css$Html$Styled$li,
                    author$project$Save$listItemStyle,
                    _List_fromArray(
                        [
                            author$project$Save$downloadButton(model)
                        ])),
                    A2(
                    rtfeldman$elm_css$Html$Styled$li,
                    author$project$Save$listItemStyle,
                    _List_fromArray(
                        [author$project$Save$uploadButton]))
                ]));
    };
    var author$project$Tree$Draw$unit = 10;
    var avh4$elm_color$Color$RgbaSpace = F4(
        function (a, b, c, d) {
            return {$: 'RgbaSpace', a: a, b: b, c: c, d: d};
        });
    var avh4$elm_color$Color$white = A4(avh4$elm_color$Color$RgbaSpace, 255 / 255, 255 / 255, 255 / 255, 1.0);
    var elm$core$Basics$pi = _Basics_pi;
    var avh4$elm_color$Color$black = A4(avh4$elm_color$Color$RgbaSpace, 0 / 255, 0 / 255, 0 / 255, 1.0);
    var timjs$elm_collage$Collage$Flat = {$: 'Flat'};
    var timjs$elm_collage$Collage$Sharp = {$: 'Sharp'};
    var timjs$elm_collage$Collage$thin = 2.0;
    var timjs$elm_collage$Collage$Core$Uniform = function (a) {
        return {$: 'Uniform', a: a};
    };
    var timjs$elm_collage$Collage$uniform = timjs$elm_collage$Collage$Core$Uniform;
    var timjs$elm_collage$Collage$defaultLineStyle = {
        cap: timjs$elm_collage$Collage$Flat,
        dashPattern: _List_Nil,
        dashPhase: 0,
        fill: timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$black),
        join: timjs$elm_collage$Collage$Sharp,
        thickness: timjs$elm_collage$Collage$thin
    };
    var timjs$elm_collage$Collage$broken = F3(
        function (dashes, thickness, fill) {
            return _Utils_update(
                timjs$elm_collage$Collage$defaultLineStyle,
                {dashPattern: dashes, fill: fill, thickness: thickness});
        });
    var timjs$elm_collage$Collage$solid = timjs$elm_collage$Collage$broken(_List_Nil);
    var timjs$elm_collage$Collage$Core$Transparent = {$: 'Transparent'};
    var timjs$elm_collage$Collage$transparent = timjs$elm_collage$Collage$Core$Transparent;
    var timjs$elm_collage$Collage$invisible = A2(timjs$elm_collage$Collage$solid, 0, timjs$elm_collage$Collage$transparent);
    var timjs$elm_collage$Collage$Core$Shape = F2(
        function (a, b) {
            return {$: 'Shape', a: a, b: b};
        });
    var timjs$elm_collage$Collage$Core$collage = function (basic) {
        return {
            basic: basic,
            handlers: _List_Nil,
            name: elm$core$Maybe$Nothing,
            opacity: 1,
            rotation: 0,
            scale: _Utils_Tuple2(1, 1),
            shift: _Utils_Tuple2(0, 0)
        };
    };
    var timjs$elm_collage$Collage$styled = function (style) {
        return A2(
            elm$core$Basics$composeL,
            timjs$elm_collage$Collage$Core$collage,
            timjs$elm_collage$Collage$Core$Shape(style));
    };
    var timjs$elm_collage$Collage$filled = function (fill) {
        return timjs$elm_collage$Collage$styled(
            _Utils_Tuple2(fill, timjs$elm_collage$Collage$invisible));
    };
    var timjs$elm_collage$Collage$Core$Rectangle = F3(
        function (a, b, c) {
            return {$: 'Rectangle', a: a, b: b, c: c};
        });
    var timjs$elm_collage$Collage$roundedRectangle = timjs$elm_collage$Collage$Core$Rectangle;
    var timjs$elm_collage$Collage$rectangle = F2(
        function (w, h) {
            return A3(timjs$elm_collage$Collage$roundedRectangle, w, h, 0);
        });
    var timjs$elm_collage$Collage$rotate = F2(
        function (t, collage) {
            return _Utils_update(
                collage,
                {rotation: collage.rotation + t});
        });
    var timjs$elm_collage$Collage$scaleXY = F2(
        function (_n0, collage) {
            var sx = _n0.a;
            var sy = _n0.b;
            var _n1 = collage.scale;
            var sx0 = _n1.a;
            var sy0 = _n1.b;
            return _Utils_update(
                collage,
                {
                    scale: _Utils_Tuple2(sx0 * sx, sy0 * sy)
                });
        });
    var timjs$elm_collage$Collage$scale = F2(
        function (s, collage) {
            return A2(
                timjs$elm_collage$Collage$scaleXY,
                _Utils_Tuple2(s, s),
                collage);
        });
    var timjs$elm_collage$Collage$Core$Group = function (a) {
        return {$: 'Group', a: a};
    };
    var timjs$elm_collage$Collage$group = A2(elm$core$Basics$composeL, timjs$elm_collage$Collage$Core$collage, timjs$elm_collage$Collage$Core$Group);
    var timjs$elm_collage$Collage$Layout$stack = timjs$elm_collage$Collage$group;
    var author$project$Tree$Draw$whitePlus = function () {
        var _n0 = _Utils_Tuple2(author$project$Tree$Draw$unit * 3, author$project$Tree$Draw$unit * 10);
        var w = _n0.a;
        var h = _n0.b;
        var whiteRectangle = A2(
            timjs$elm_collage$Collage$filled,
            timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$white),
            A2(timjs$elm_collage$Collage$rectangle, w, h));
        return A2(
            timjs$elm_collage$Collage$scale,
            0.1,
            timjs$elm_collage$Collage$Layout$stack(
                _List_fromArray(
                    [
                        whiteRectangle,
                        A2(timjs$elm_collage$Collage$rotate, elm$core$Basics$pi / 2, whiteRectangle)
                    ])));
    }();
    var avh4$elm_color$Color$red = A4(avh4$elm_color$Color$RgbaSpace, 204 / 255, 0 / 255, 0 / 255, 1.0);
    var timjs$elm_collage$Collage$Core$Circle = function (a) {
        return {$: 'Circle', a: a};
    };
    var timjs$elm_collage$Collage$circle = timjs$elm_collage$Collage$Core$Circle;
    var elm$core$Basics$composeR = F3(
        function (f, g, x) {
            return g(
                f(x));
        });
    var elm$core$List$maximum = function (list) {
        if (list.b) {
            var x = list.a;
            var xs = list.b;
            return elm$core$Maybe$Just(
                A3(elm$core$List$foldl, elm$core$Basics$max, x, xs));
        } else {
            return elm$core$Maybe$Nothing;
        }
    };
    var elm$core$Basics$min = F2(
        function (x, y) {
            return (_Utils_cmp(x, y) < 0) ? x : y;
        });
    var elm$core$List$minimum = function (list) {
        if (list.b) {
            var x = list.a;
            var xs = list.b;
            return elm$core$Maybe$Just(
                A3(elm$core$List$foldl, elm$core$Basics$min, x, xs));
        } else {
            return elm$core$Maybe$Nothing;
        }
    };
    var elm$core$List$unzip = function (pairs) {
        var step = F2(
            function (_n0, _n1) {
                var x = _n0.a;
                var y = _n0.b;
                var xs = _n1.a;
                var ys = _n1.b;
                return _Utils_Tuple2(
                    A2(elm$core$List$cons, x, xs),
                    A2(elm$core$List$cons, y, ys));
            });
        return A3(
            elm$core$List$foldr,
            step,
            _Utils_Tuple2(_List_Nil, _List_Nil),
            pairs);
    };
    var timjs$elm_collage$Collage$Core$Path = F2(
        function (a, b) {
            return {$: 'Path', a: a, b: b};
        });
    var elm$core$Basics$cos = _Basics_cos;
    var elm$core$Basics$sin = _Basics_sin;
    var timjs$elm_collage$Collage$Core$apply = function (_n0) {
        var shift = _n0.shift;
        var scale = _n0.scale;
        var rotation = _n0.rotation;
        var rotated = function (_n5) {
            var x = _n5.a;
            var y = _n5.b;
            var s = elm$core$Basics$sin(rotation);
            var c = elm$core$Basics$cos(rotation);
            return _Utils_Tuple2((c * x) - (s * y), (s * x) + (c * y));
        };
        var _n1 = scale;
        var sx = _n1.a;
        var sy = _n1.b;
        var scaled = function (_n4) {
            var x = _n4.a;
            var y = _n4.b;
            return _Utils_Tuple2(sx * x, sy * y);
        };
        var _n2 = shift;
        var dx = _n2.a;
        var dy = _n2.b;
        var shifted = function (_n3) {
            var x = _n3.a;
            var y = _n3.b;
            return _Utils_Tuple2(x + dx, y + dy);
        };
        return A2(
            elm$core$Basics$composeL,
            A2(elm$core$Basics$composeL, shifted, scaled),
            rotated);
    };
    var timjs$elm_collage$Collage$Layout$handlePoints = function (thickness) {
        var thicken = function (_n0) {
            var x = _n0.a;
            var y = _n0.b;
            var t = thickness / 2;
            return _Utils_Tuple2(
                (x < 0) ? (x - t) : (x + t),
                (y < 0) ? (y - t) : (y + t));
        };
        return elm$core$List$map(thicken);
    };
    var timjs$elm_collage$Collage$Layout$handleBox = F2(
        function (thickness, _n0) {
            var w = _n0.a;
            var h = _n0.b;
            var y = h / 2;
            var x = w / 2;
            return A2(
                timjs$elm_collage$Collage$Layout$handlePoints,
                thickness,
                _List_fromArray(
                    [
                        _Utils_Tuple2(-x, -y),
                        _Utils_Tuple2(x, -y),
                        _Utils_Tuple2(x, y),
                        _Utils_Tuple2(-x, y)
                    ]));
        });
    var timjs$elm_collage$Collage$Layout$unpack = function (_n0) {
        var toTop = _n0.toTop;
        var toBottom = _n0.toBottom;
        var toRight = _n0.toRight;
        var toLeft = _n0.toLeft;
        return _List_fromArray(
            [
                _Utils_Tuple2(-toLeft, -toBottom),
                _Utils_Tuple2(toRight, -toBottom),
                _Utils_Tuple2(toRight, toTop),
                _Utils_Tuple2(-toLeft, toTop)
            ]);
    };
    var timjs$elm_collage$Collage$Layout$distances = function (col) {
        var points = timjs$elm_collage$Collage$Layout$handleBasic(col.basic);
        var _n8 = elm$core$List$unzip(
            A2(
                elm$core$List$map,
                timjs$elm_collage$Collage$Core$apply(col),
                points));
        var xs = _n8.a;
        var ys = _n8.b;
        return {
            toBottom: -A2(
                elm$core$Maybe$withDefault,
                0,
                elm$core$List$minimum(ys)),
            toLeft: -A2(
                elm$core$Maybe$withDefault,
                0,
                elm$core$List$minimum(xs)),
            toRight: A2(
                elm$core$Maybe$withDefault,
                0,
                elm$core$List$maximum(xs)),
            toTop: A2(
                elm$core$Maybe$withDefault,
                0,
                elm$core$List$maximum(ys))
        };
    };
    var timjs$elm_collage$Collage$Layout$handleBasic = function (basic) {
        handleBasic:
        while (true) {
            switch (basic.$) {
                case 'Shape':
                    switch (basic.b.$) {
                        case 'Circle':
                            var _n1 = basic.a;
                            var thickness = _n1.b.thickness;
                            var r = basic.b.a;
                            var d = 2 * r;
                            return A2(
                                timjs$elm_collage$Collage$Layout$handleBox,
                                thickness,
                                _Utils_Tuple2(d, d));
                        case 'Ellipse':
                            var _n2 = basic.a;
                            var thickness = _n2.b.thickness;
                            var _n3 = basic.b;
                            var rx = _n3.a;
                            var ry = _n3.b;
                            return A2(
                                timjs$elm_collage$Collage$Layout$handleBox,
                                thickness,
                                _Utils_Tuple2(2 * rx, 2 * ry));
                        case 'Rectangle':
                            var _n4 = basic.a;
                            var thickness = _n4.b.thickness;
                            var _n5 = basic.b;
                            var w = _n5.a;
                            var h = _n5.b;
                            return A2(
                                timjs$elm_collage$Collage$Layout$handleBox,
                                thickness,
                                _Utils_Tuple2(w, h));
                        case 'Polygon':
                            var _n6 = basic.a;
                            var thickness = _n6.b.thickness;
                            var ps = basic.b.a;
                            return A2(timjs$elm_collage$Collage$Layout$handlePoints, thickness, ps);
                        default:
                            var _n7 = basic.a;
                            var line = _n7.b;
                            var path = basic.b.a;
                            var $temp$basic = A2(timjs$elm_collage$Collage$Core$Path, line, path);
                            basic = $temp$basic;
                            continue handleBasic;
                    }
                case 'Path':
                    var thickness = basic.a.thickness;
                    var cap = basic.a.cap;
                    var ps = basic.b.a;
                    return A2(
                        timjs$elm_collage$Collage$Layout$handlePoints,
                        _Utils_eq(cap, timjs$elm_collage$Collage$Flat) ? 0 : thickness,
                        ps);
                case 'Text':
                    var dims = basic.a;
                    return A2(timjs$elm_collage$Collage$Layout$handleBox, 0, dims);
                case 'Image':
                    var dims = basic.a;
                    return A2(timjs$elm_collage$Collage$Layout$handleBox, 0, dims);
                case 'Html':
                    var dims = basic.a;
                    return A2(timjs$elm_collage$Collage$Layout$handleBox, 0, dims);
                case 'Group':
                    var cols = basic.a;
                    return A2(
                        timjs$elm_collage$Collage$Layout$handlePoints,
                        0,
                        elm$core$List$concat(
                            A2(
                                elm$core$List$map,
                                A2(elm$core$Basics$composeR, timjs$elm_collage$Collage$Layout$distances, timjs$elm_collage$Collage$Layout$unpack),
                                cols)));
                default:
                    var back = basic.b;
                    return A2(
                        timjs$elm_collage$Collage$Layout$handlePoints,
                        0,
                        timjs$elm_collage$Collage$Layout$unpack(
                            timjs$elm_collage$Collage$Layout$distances(back)));
            }
        }
    };
    var timjs$elm_collage$Collage$Layout$width = function (col) {
        var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
        var toLeft = _n0.toLeft;
        var toRight = _n0.toRight;
        return toLeft + toRight;
    };
    var author$project$Tree$Draw$deleteBox = timjs$elm_collage$Collage$Layout$stack(
        _List_fromArray(
            [
                A2(timjs$elm_collage$Collage$rotate, elm$core$Basics$pi / 4, author$project$Tree$Draw$whitePlus),
                A2(
                timjs$elm_collage$Collage$filled,
                timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$red),
                timjs$elm_collage$Collage$circle(
                    (timjs$elm_collage$Collage$Layout$width(author$project$Tree$Draw$whitePlus) / 2) + 3))
            ]));
    var author$project$Tree$State$UpdateName = function (a) {
        return {$: 'UpdateName', a: a};
    };
    var avh4$elm_color$Color$scaleFrom255 = function (c) {
        return c / 255;
    };
    var avh4$elm_color$Color$rgb255 = F3(
        function (r, g, b) {
            return A4(
                avh4$elm_color$Color$RgbaSpace,
                avh4$elm_color$Color$scaleFrom255(r),
                avh4$elm_color$Color$scaleFrom255(g),
                avh4$elm_color$Color$scaleFrom255(b),
                1.0);
        });
    var rtfeldman$elm_css$Css$borderColor = function (c) {
        return A2(rtfeldman$elm_css$Css$property, 'border-color', c.value);
    };
    var rtfeldman$elm_css$Css$stringsToValue = function (list) {
        return elm$core$List$isEmpty(list) ? {value: 'none'} : {
            value: A2(
                elm$core$String$join,
                ', ',
                A2(
                    elm$core$List$map,
                    function (s) {
                        return s;
                    },
                    list))
        };
    };
    var rtfeldman$elm_css$Css$fontFamilies = A2(
        elm$core$Basics$composeL,
        rtfeldman$elm_css$Css$prop1('font-family'),
        rtfeldman$elm_css$Css$stringsToValue);
    var rtfeldman$elm_css$Css$rgba = F4(
        function (r, g, b, alpha) {
            return {
                alpha: alpha,
                blue: b,
                color: rtfeldman$elm_css$Css$Structure$Compatible,
                green: g,
                red: r,
                value: A2(
                    rtfeldman$elm_css$Css$cssFunction,
                    'rgba',
                    _Utils_ap(
                        A2(
                            elm$core$List$map,
                            elm$core$String$fromInt,
                            _List_fromArray(
                                [r, g, b])),
                        _List_fromArray(
                            [
                                elm$core$String$fromFloat(alpha)
                            ])))
            };
        });
    var rtfeldman$elm_css$Html$Styled$input = rtfeldman$elm_css$Html$Styled$node('input');
    var elm$virtual_dom$VirtualDom$node = function (tag) {
        return _VirtualDom_node(
            _VirtualDom_noScript(tag));
    };
    var elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
        return _VirtualDom_keyedNode(
            _VirtualDom_noScript(tag));
    };
    var elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
        function (namespace, tag) {
            return A2(
                _VirtualDom_keyedNodeNS,
                namespace,
                _VirtualDom_noScript(tag));
        });
    var elm$virtual_dom$VirtualDom$nodeNS = function (tag) {
        return _VirtualDom_nodeNS(
            _VirtualDom_noScript(tag));
    };
    var rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
        function (_n0, styles) {
            var newStyles = _n0.b;
            var classname = _n0.c;
            return elm$core$List$isEmpty(newStyles) ? styles : A3(elm$core$Dict$insert, classname, newStyles, styles);
        });
    var rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = function (_n0) {
        var val = _n0.a;
        return val;
    };
    var rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
        function (_n6, _n7) {
            var key = _n6.a;
            var html = _n6.b;
            var pairs = _n7.a;
            var styles = _n7.b;
            switch (html.$) {
                case 'Unstyled':
                    var vdom = html.a;
                    return _Utils_Tuple2(
                        A2(
                            elm$core$List$cons,
                            _Utils_Tuple2(key, vdom),
                            pairs),
                        styles);
                case 'Node':
                    var elemType = html.a;
                    var properties = html.b;
                    var children = html.c;
                    var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
                    var _n9 = A3(
                        elm$core$List$foldl,
                        rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
                        _Utils_Tuple2(_List_Nil, combinedStyles),
                        children);
                    var childNodes = _n9.a;
                    var finalStyles = _n9.b;
                    var vdom = A3(
                        elm$virtual_dom$VirtualDom$node,
                        elemType,
                        A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
                        elm$core$List$reverse(childNodes));
                    return _Utils_Tuple2(
                        A2(
                            elm$core$List$cons,
                            _Utils_Tuple2(key, vdom),
                            pairs),
                        finalStyles);
                case 'NodeNS':
                    var ns = html.a;
                    var elemType = html.b;
                    var properties = html.c;
                    var children = html.d;
                    var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
                    var _n10 = A3(
                        elm$core$List$foldl,
                        rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
                        _Utils_Tuple2(_List_Nil, combinedStyles),
                        children);
                    var childNodes = _n10.a;
                    var finalStyles = _n10.b;
                    var vdom = A4(
                        elm$virtual_dom$VirtualDom$nodeNS,
                        ns,
                        elemType,
                        A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
                        elm$core$List$reverse(childNodes));
                    return _Utils_Tuple2(
                        A2(
                            elm$core$List$cons,
                            _Utils_Tuple2(key, vdom),
                            pairs),
                        finalStyles);
                case 'KeyedNode':
                    var elemType = html.a;
                    var properties = html.b;
                    var children = html.c;
                    var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
                    var _n11 = A3(
                        elm$core$List$foldl,
                        rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
                        _Utils_Tuple2(_List_Nil, combinedStyles),
                        children);
                    var childNodes = _n11.a;
                    var finalStyles = _n11.b;
                    var vdom = A3(
                        elm$virtual_dom$VirtualDom$keyedNode,
                        elemType,
                        A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
                        elm$core$List$reverse(childNodes));
                    return _Utils_Tuple2(
                        A2(
                            elm$core$List$cons,
                            _Utils_Tuple2(key, vdom),
                            pairs),
                        finalStyles);
                default:
                    var ns = html.a;
                    var elemType = html.b;
                    var properties = html.c;
                    var children = html.d;
                    var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
                    var _n12 = A3(
                        elm$core$List$foldl,
                        rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
                        _Utils_Tuple2(_List_Nil, combinedStyles),
                        children);
                    var childNodes = _n12.a;
                    var finalStyles = _n12.b;
                    var vdom = A4(
                        elm$virtual_dom$VirtualDom$keyedNodeNS,
                        ns,
                        elemType,
                        A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
                        elm$core$List$reverse(childNodes));
                    return _Utils_Tuple2(
                        A2(
                            elm$core$List$cons,
                            _Utils_Tuple2(key, vdom),
                            pairs),
                        finalStyles);
            }
        });
    var rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
        function (html, _n0) {
            var nodes = _n0.a;
            var styles = _n0.b;
            switch (html.$) {
                case 'Unstyled':
                    var vdomNode = html.a;
                    return _Utils_Tuple2(
                        A2(elm$core$List$cons, vdomNode, nodes),
                        styles);
                case 'Node':
                    var elemType = html.a;
                    var properties = html.b;
                    var children = html.c;
                    var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
                    var _n2 = A3(
                        elm$core$List$foldl,
                        rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
                        _Utils_Tuple2(_List_Nil, combinedStyles),
                        children);
                    var childNodes = _n2.a;
                    var finalStyles = _n2.b;
                    var vdomNode = A3(
                        elm$virtual_dom$VirtualDom$node,
                        elemType,
                        A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
                        elm$core$List$reverse(childNodes));
                    return _Utils_Tuple2(
                        A2(elm$core$List$cons, vdomNode, nodes),
                        finalStyles);
                case 'NodeNS':
                    var ns = html.a;
                    var elemType = html.b;
                    var properties = html.c;
                    var children = html.d;
                    var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
                    var _n3 = A3(
                        elm$core$List$foldl,
                        rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
                        _Utils_Tuple2(_List_Nil, combinedStyles),
                        children);
                    var childNodes = _n3.a;
                    var finalStyles = _n3.b;
                    var vdomNode = A4(
                        elm$virtual_dom$VirtualDom$nodeNS,
                        ns,
                        elemType,
                        A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
                        elm$core$List$reverse(childNodes));
                    return _Utils_Tuple2(
                        A2(elm$core$List$cons, vdomNode, nodes),
                        finalStyles);
                case 'KeyedNode':
                    var elemType = html.a;
                    var properties = html.b;
                    var children = html.c;
                    var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
                    var _n4 = A3(
                        elm$core$List$foldl,
                        rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
                        _Utils_Tuple2(_List_Nil, combinedStyles),
                        children);
                    var childNodes = _n4.a;
                    var finalStyles = _n4.b;
                    var vdomNode = A3(
                        elm$virtual_dom$VirtualDom$keyedNode,
                        elemType,
                        A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
                        elm$core$List$reverse(childNodes));
                    return _Utils_Tuple2(
                        A2(elm$core$List$cons, vdomNode, nodes),
                        finalStyles);
                default:
                    var ns = html.a;
                    var elemType = html.b;
                    var properties = html.c;
                    var children = html.d;
                    var combinedStyles = A3(elm$core$List$foldl, rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
                    var _n5 = A3(
                        elm$core$List$foldl,
                        rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
                        _Utils_Tuple2(_List_Nil, combinedStyles),
                        children);
                    var childNodes = _n5.a;
                    var finalStyles = _n5.b;
                    var vdomNode = A4(
                        elm$virtual_dom$VirtualDom$keyedNodeNS,
                        ns,
                        elemType,
                        A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
                        elm$core$List$reverse(childNodes));
                    return _Utils_Tuple2(
                        A2(elm$core$List$cons, vdomNode, nodes),
                        finalStyles);
            }
        });
    var elm$core$Dict$singleton = F2(
        function (key, value) {
            return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
        });
    var rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp = F2(
        function (candidate, properties) {
            stylesFromPropertiesHelp:
            while (true) {
                if (!properties.b) {
                    return candidate;
                } else {
                    var _n1 = properties.a;
                    var styles = _n1.b;
                    var classname = _n1.c;
                    var rest = properties.b;
                    if (elm$core$String$isEmpty(classname)) {
                        var $temp$candidate = candidate,
                            $temp$properties = rest;
                        candidate = $temp$candidate;
                        properties = $temp$properties;
                        continue stylesFromPropertiesHelp;
                    } else {
                        var $temp$candidate = elm$core$Maybe$Just(
                            _Utils_Tuple2(classname, styles)),
                            $temp$properties = rest;
                        candidate = $temp$candidate;
                        properties = $temp$properties;
                        continue stylesFromPropertiesHelp;
                    }
                }
            }
        });
    var rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties = function (properties) {
        var _n0 = A2(rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp, elm$core$Maybe$Nothing, properties);
        if (_n0.$ === 'Nothing') {
            return elm$core$Dict$empty;
        } else {
            var _n1 = _n0.a;
            var classname = _n1.a;
            var styles = _n1.b;
            return A2(elm$core$Dict$singleton, classname, styles);
        }
    };
    var rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
        return {$: 'ClassSelector', a: a};
    };
    var rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair = function (_n0) {
        var classname = _n0.a;
        var styles = _n0.b;
        return A2(
            rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
            styles,
            rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
                _List_fromArray(
                    [
                        rtfeldman$elm_css$Css$Structure$ClassSelector(classname)
                    ])));
    };
    var rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
        return rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
            elm$core$List$singleton(
                rtfeldman$elm_css$Css$Preprocess$stylesheet(
                    A2(
                        elm$core$List$map,
                        rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair,
                        elm$core$Dict$toList(dict)))));
    };
    var rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = function (styles) {
        return A3(
            elm$virtual_dom$VirtualDom$node,
            'style',
            _List_Nil,
            elm$core$List$singleton(
                elm$virtual_dom$VirtualDom$text(
                    rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(styles))));
    };
    var rtfeldman$elm_css$VirtualDom$Styled$unstyle = F3(
        function (elemType, properties, children) {
            var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
            var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
            var _n0 = A3(
                elm$core$List$foldl,
                rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
                _Utils_Tuple2(_List_Nil, initialStyles),
                children);
            var childNodes = _n0.a;
            var styles = _n0.b;
            var styleNode = rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
            return A3(
                elm$virtual_dom$VirtualDom$node,
                elemType,
                unstyledProperties,
                A2(
                    elm$core$List$cons,
                    styleNode,
                    elm$core$List$reverse(childNodes)));
        });
    var rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
        function (key, pairs) {
            containsKey:
            while (true) {
                if (!pairs.b) {
                    return false;
                } else {
                    var _n1 = pairs.a;
                    var str = _n1.a;
                    var rest = pairs.b;
                    if (_Utils_eq(key, str)) {
                        return true;
                    } else {
                        var $temp$key = key,
                            $temp$pairs = rest;
                        key = $temp$key;
                        pairs = $temp$pairs;
                        continue containsKey;
                    }
                }
            }
        });
    var rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
        function (_default, pairs) {
            getUnusedKey:
            while (true) {
                if (!pairs.b) {
                    return _default;
                } else {
                    var _n1 = pairs.a;
                    var firstKey = _n1.a;
                    var rest = pairs.b;
                    var newKey = '_' + firstKey;
                    if (A2(rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
                        var $temp$default = newKey,
                            $temp$pairs = rest;
                        _default = $temp$default;
                        pairs = $temp$pairs;
                        continue getUnusedKey;
                    } else {
                        return newKey;
                    }
                }
            }
        });
    var rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F2(
        function (allStyles, keyedChildNodes) {
            var styleNodeKey = A2(rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
            var finalNode = rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(allStyles);
            return _Utils_Tuple2(styleNodeKey, finalNode);
        });
    var rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F3(
        function (elemType, properties, keyedChildren) {
            var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
            var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
            var _n0 = A3(
                elm$core$List$foldl,
                rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
                _Utils_Tuple2(_List_Nil, initialStyles),
                keyedChildren);
            var keyedChildNodes = _n0.a;
            var styles = _n0.b;
            var keyedStyleNode = A2(rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
            return A3(
                elm$virtual_dom$VirtualDom$keyedNode,
                elemType,
                unstyledProperties,
                A2(
                    elm$core$List$cons,
                    keyedStyleNode,
                    elm$core$List$reverse(keyedChildNodes)));
        });
    var rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F4(
        function (ns, elemType, properties, keyedChildren) {
            var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
            var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
            var _n0 = A3(
                elm$core$List$foldl,
                rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
                _Utils_Tuple2(_List_Nil, initialStyles),
                keyedChildren);
            var keyedChildNodes = _n0.a;
            var styles = _n0.b;
            var keyedStyleNode = A2(rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
            return A4(
                elm$virtual_dom$VirtualDom$keyedNodeNS,
                ns,
                elemType,
                unstyledProperties,
                A2(
                    elm$core$List$cons,
                    keyedStyleNode,
                    elm$core$List$reverse(keyedChildNodes)));
        });
    var rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F4(
        function (ns, elemType, properties, children) {
            var unstyledProperties = A2(elm$core$List$map, rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
            var initialStyles = rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
            var _n0 = A3(
                elm$core$List$foldl,
                rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
                _Utils_Tuple2(_List_Nil, initialStyles),
                children);
            var childNodes = _n0.a;
            var styles = _n0.b;
            var styleNode = rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
            return A4(
                elm$virtual_dom$VirtualDom$nodeNS,
                ns,
                elemType,
                unstyledProperties,
                A2(
                    elm$core$List$cons,
                    styleNode,
                    elm$core$List$reverse(childNodes)));
        });
    var rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
        switch (vdom.$) {
            case 'Unstyled':
                var plainNode = vdom.a;
                return plainNode;
            case 'Node':
                var elemType = vdom.a;
                var properties = vdom.b;
                var children = vdom.c;
                return A3(rtfeldman$elm_css$VirtualDom$Styled$unstyle, elemType, properties, children);
            case 'NodeNS':
                var ns = vdom.a;
                var elemType = vdom.b;
                var properties = vdom.c;
                var children = vdom.d;
                return A4(rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, ns, elemType, properties, children);
            case 'KeyedNode':
                var elemType = vdom.a;
                var properties = vdom.b;
                var children = vdom.c;
                return A3(rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, elemType, properties, children);
            default:
                var ns = vdom.a;
                var elemType = vdom.b;
                var properties = vdom.c;
                var children = vdom.d;
                return A4(rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, ns, elemType, properties, children);
        }
    };
    var rtfeldman$elm_css$Html$Styled$toUnstyled = rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
    var rtfeldman$elm_css$VirtualDom$Styled$property = F2(
        function (key, value) {
            return A3(
                rtfeldman$elm_css$VirtualDom$Styled$Attribute,
                A2(elm$virtual_dom$VirtualDom$property, key, value),
                _List_Nil,
                '');
        });
    var rtfeldman$elm_css$Html$Styled$Attributes$boolProperty = F2(
        function (key, bool) {
            return A2(
                rtfeldman$elm_css$VirtualDom$Styled$property,
                key,
                elm$json$Json$Encode$bool(bool));
        });
    var rtfeldman$elm_css$Html$Styled$Attributes$autofocus = rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('autofocus');
    var elm$virtual_dom$VirtualDom$attribute = F2(
        function (key, value) {
            return A2(
                _VirtualDom_attribute,
                _VirtualDom_noOnOrFormAction(key),
                _VirtualDom_noJavaScriptOrHtmlUri(value));
        });
    var rtfeldman$elm_css$VirtualDom$Styled$attribute = F2(
        function (key, value) {
            return A3(
                rtfeldman$elm_css$VirtualDom$Styled$Attribute,
                A2(elm$virtual_dom$VirtualDom$attribute, key, value),
                _List_Nil,
                '');
        });
    var rtfeldman$elm_css$Html$Styled$Attributes$maxlength = function (n) {
        return A2(
            rtfeldman$elm_css$VirtualDom$Styled$attribute,
            'maxlength',
            elm$core$String$fromInt(n));
    };
    var rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
        function (key, string) {
            return A2(
                rtfeldman$elm_css$VirtualDom$Styled$property,
                key,
                elm$json$Json$Encode$string(string));
        });
    var rtfeldman$elm_css$Html$Styled$Attributes$placeholder = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('placeholder');
    var rtfeldman$elm_css$Html$Styled$Attributes$value = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('value');
    var rtfeldman$elm_css$Html$Styled$Events$alwaysStop = function (x) {
        return _Utils_Tuple2(x, true);
    };
    var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
        return {$: 'MayStopPropagation', a: a};
    };
    var rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn = F2(
        function (event, decoder) {
            return A2(
                rtfeldman$elm_css$VirtualDom$Styled$on,
                event,
                elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
        });
    var elm$json$Json$Decode$at = F2(
        function (fields, decoder) {
            return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
        });
    var rtfeldman$elm_css$Html$Styled$Events$targetValue = A2(
        elm$json$Json$Decode$at,
        _List_fromArray(
            ['target', 'value']),
        elm$json$Json$Decode$string);
    var rtfeldman$elm_css$Html$Styled$Events$onInput = function (tagger) {
        return A2(
            rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
            'input',
            A2(
                elm$json$Json$Decode$map,
                rtfeldman$elm_css$Html$Styled$Events$alwaysStop,
                A2(elm$json$Json$Decode$map, tagger, rtfeldman$elm_css$Html$Styled$Events$targetValue)));
    };
    var timjs$elm_collage$Collage$Core$Html = F2(
        function (a, b) {
            return {$: 'Html', a: a, b: b};
        });
    var timjs$elm_collage$Collage$html = function (dims) {
        return A2(
            elm$core$Basics$composeL,
            timjs$elm_collage$Collage$Core$collage,
            timjs$elm_collage$Collage$Core$Html(dims));
    };
    var timjs$elm_collage$Collage$Layout$name = F2(
        function (string, col) {
            return _Utils_update(
                col,
                {
                    name: elm$core$Maybe$Just(string)
                });
        });
    var author$project$Tree$Draw$flowchartNameBox = function (flowchartName) {
        var htmlInputField = A2(
            rtfeldman$elm_css$Html$Styled$input,
            _List_fromArray(
                [
                    rtfeldman$elm_css$Html$Styled$Attributes$autofocus(true),
                    rtfeldman$elm_css$Html$Styled$Attributes$placeholder('Stroomdiagram naam'),
                    rtfeldman$elm_css$Html$Styled$Attributes$value(flowchartName),
                    rtfeldman$elm_css$Html$Styled$Attributes$maxlength(20),
                    rtfeldman$elm_css$Html$Styled$Events$onInput(author$project$Tree$State$UpdateName),
                    rtfeldman$elm_css$Html$Styled$Attributes$css(
                    _List_fromArray(
                        [
                            rtfeldman$elm_css$Css$width(
                            rtfeldman$elm_css$Css$pct(100)),
                            rtfeldman$elm_css$Css$fontFamilies(
                            _List_fromArray(
                                ['monaco', 'monofur', 'monospace'])),
                            rtfeldman$elm_css$Css$backgroundColor(
                            A4(rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0)),
                            rtfeldman$elm_css$Css$borderColor(
                            A4(rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0)),
                            rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$center)
                        ]))
                ]),
            _List_Nil);
        var _n0 = _Utils_Tuple2(author$project$Tree$Draw$unit * 16, author$project$Tree$Draw$unit * 2);
        var w = _n0.a;
        var h = _n0.b;
        var flowchartNameBoxShape = A2(
            timjs$elm_collage$Collage$styled,
            _Utils_Tuple2(
                timjs$elm_collage$Collage$uniform(
                    A3(avh4$elm_color$Color$rgb255, 180, 230, 255)),
                A2(
                    timjs$elm_collage$Collage$solid,
                    timjs$elm_collage$Collage$thin,
                    timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$black))),
            A2(timjs$elm_collage$Collage$rectangle, w + (2 * author$project$Tree$Draw$unit), 4 * author$project$Tree$Draw$unit));
        var htmlBox = A2(
            timjs$elm_collage$Collage$html,
            _Utils_Tuple2(w, h),
            rtfeldman$elm_css$Html$Styled$toUnstyled(htmlInputField));
        return A2(
            timjs$elm_collage$Collage$Layout$name,
            'flowchartNameBox',
            timjs$elm_collage$Collage$Layout$stack(
                _List_fromArray(
                    [htmlBox, flowchartNameBoxShape])));
    };
    var timjs$elm_collage$Collage$Layout$spacer = F2(
        function (w, h) {
            return A2(
                timjs$elm_collage$Collage$styled,
                _Utils_Tuple2(timjs$elm_collage$Collage$transparent, timjs$elm_collage$Collage$invisible),
                A2(timjs$elm_collage$Collage$rectangle, w, h));
        });
    var author$project$Tree$Draw$gap = A2(timjs$elm_collage$Collage$Layout$spacer, author$project$Tree$Draw$unit, author$project$Tree$Draw$unit);
    var timjs$elm_collage$Collage$shift = F2(
        function (_n0, collage) {
            var dx = _n0.a;
            var dy = _n0.b;
            var _n1 = collage.shift;
            var x = _n1.a;
            var y = _n1.b;
            return _Utils_update(
                collage,
                {
                    shift: _Utils_Tuple2(x + dx, y + dy)
                });
        });
    var timjs$elm_collage$Collage$Core$Subcollage = F2(
        function (a, b) {
            return {$: 'Subcollage', a: a, b: b};
        });
    var timjs$elm_collage$Collage$Layout$impose = F2(
        function (front, back) {
            return timjs$elm_collage$Collage$Core$collage(
                A2(timjs$elm_collage$Collage$Core$Subcollage, front, back));
        });
    var author$project$Tree$Draw$imposeAt = F3(
        function (anchor, fore, back) {
            return A2(
                timjs$elm_collage$Collage$Layout$impose,
                A2(
                    timjs$elm_collage$Collage$shift,
                    anchor(back),
                    fore),
                back);
        });
    var author$project$Tree$State$UpdateContent = F2(
        function (a, b) {
            return {$: 'UpdateContent', a: a, b: b};
        });
    var elm$core$String$foldr = _String_foldr;
    var elm$core$String$toList = function (string) {
        return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
    };
    var rtfeldman$elm_css$Css$auto = {alignItemsOrAuto: rtfeldman$elm_css$Css$Structure$Compatible, cursor: rtfeldman$elm_css$Css$Structure$Compatible, flexBasis: rtfeldman$elm_css$Css$Structure$Compatible, intOrAuto: rtfeldman$elm_css$Css$Structure$Compatible, justifyContentOrAuto: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible, overflow: rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: rtfeldman$elm_css$Css$Structure$Compatible, textRendering: rtfeldman$elm_css$Css$Structure$Compatible, touchAction: rtfeldman$elm_css$Css$Structure$Compatible, value: 'auto'};
    var rtfeldman$elm_css$Css$none = {backgroundImage: rtfeldman$elm_css$Css$Structure$Compatible, blockAxisOverflow: rtfeldman$elm_css$Css$Structure$Compatible, borderStyle: rtfeldman$elm_css$Css$Structure$Compatible, cursor: rtfeldman$elm_css$Css$Structure$Compatible, display: rtfeldman$elm_css$Css$Structure$Compatible, hoverCapability: rtfeldman$elm_css$Css$Structure$Compatible, inlineAxisOverflow: rtfeldman$elm_css$Css$Structure$Compatible, keyframes: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: rtfeldman$elm_css$Css$Structure$Compatible, listStyleType: rtfeldman$elm_css$Css$Structure$Compatible, listStyleTypeOrPositionOrImage: rtfeldman$elm_css$Css$Structure$Compatible, none: rtfeldman$elm_css$Css$Structure$Compatible, outline: rtfeldman$elm_css$Css$Structure$Compatible, pointerDevice: rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: rtfeldman$elm_css$Css$Structure$Compatible, resize: rtfeldman$elm_css$Css$Structure$Compatible, scriptingSupport: rtfeldman$elm_css$Css$Structure$Compatible, textDecorationLine: rtfeldman$elm_css$Css$Structure$Compatible, textTransform: rtfeldman$elm_css$Css$Structure$Compatible, touchAction: rtfeldman$elm_css$Css$Structure$Compatible, transform: rtfeldman$elm_css$Css$Structure$Compatible, updateFrequency: rtfeldman$elm_css$Css$Structure$Compatible, value: 'none'};
    var rtfeldman$elm_css$Css$resize = rtfeldman$elm_css$Css$prop1('resize');
    var rtfeldman$elm_css$Html$Styled$textarea = rtfeldman$elm_css$Html$Styled$node('textarea');
    var rtfeldman$elm_css$Html$Styled$Attributes$cols = function (n) {
        return A2(
            rtfeldman$elm_css$VirtualDom$Styled$attribute,
            'cols',
            elm$core$String$fromInt(n));
    };
    var rtfeldman$elm_css$Html$Styled$Attributes$rows = function (n) {
        return A2(
            rtfeldman$elm_css$VirtualDom$Styled$attribute,
            'rows',
            elm$core$String$fromInt(n));
    };
    var rtfeldman$elm_css$Html$Styled$Attributes$wrap = rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('wrap');
    var author$project$Tree$Draw$multilineEditableTextBox = F6(
        function (id, nodeType, content, minBoxWidth, minBoxHeight, maxBoxWidth) {
            var characterWidth = function (c) {
                switch (c.valueOf()) {
                    case '\t':
                        return 4;
                    case '\n':
                        return 0;
                    default:
                        return 1;
                }
            };
            var boxDimensions = function (s) {
                if (!s.b) {
                    return _Utils_Tuple3(1, 1, 1);
                } else {
                    if (!s.b.b) {
                        var c = s.a;
                        return _Utils_eq(
                            c,
                            _Utils_chr('\n')) ? _Utils_Tuple3(1, 1, 2) : _Utils_Tuple3(
                            characterWidth(c) + 1,
                            characterWidth(c) + 1,
                            1);
                    } else {
                        var c = s.a;
                        var cs = s.b;
                        var _n1 = boxDimensions(cs);
                        var cws = _n1.a;
                        var mws = _n1.b;
                        var hs = _n1.c;
                        return _Utils_eq(
                            c,
                            _Utils_chr('\n')) ? _Utils_Tuple3(1, mws, hs + 1) : ((_Utils_cmp(
                            cws + characterWidth(c),
                            maxBoxWidth) > 0) ? _Utils_Tuple3(
                            characterWidth(c),
                            mws,
                            hs + 1) : _Utils_Tuple3(
                            cws + characterWidth(c),
                            A2(
                                elm$core$Basics$max,
                                cws + characterWidth(c),
                                mws),
                            hs));
                    }
                }
            };
            var _n2 = function () {
                switch (nodeType.$) {
                    case 'StatementNode':
                        return _Utils_Tuple2(
                            'Statement',
                            rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$left));
                    case 'IfNode':
                        return _Utils_Tuple2(
                            'If',
                            rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$center));
                    case 'WhileNode':
                        return _Utils_Tuple2(
                            'While',
                            rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$center));
                    case 'ForEachNode':
                        return _Utils_Tuple2(
                            'ForEach',
                            rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$center));
                    case 'PreConditionNode':
                        return _Utils_Tuple2(
                            'Precondition',
                            rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$left));
                    case 'PostConditionNode':
                        return _Utils_Tuple2(
                            'Postcondition',
                            rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$left));
                    default:
                        return _Utils_Tuple2(
                            'Algorithm name',
                            rtfeldman$elm_css$Css$textAlign(rtfeldman$elm_css$Css$center));
                }
            }();
            var placeholderLabel = _n2.a;
            var textAligning = _n2.b;
            var _n4 = boxDimensions(
                elm$core$List$reverse(
                    elm$core$String$toList(content)));
            var wc = _n4.b;
            var hc = _n4.c;
            var _n5 = _Utils_Tuple2(
                A2(elm$core$Basics$max, minBoxWidth, wc),
                A2(elm$core$Basics$max, minBoxHeight, hc));
            var w = _n5.a;
            var h = _n5.b;
            var htmlTextArea = A2(
                rtfeldman$elm_css$Html$Styled$textarea,
                _List_fromArray(
                    [
                        rtfeldman$elm_css$Html$Styled$Attributes$wrap('hard'),
                        rtfeldman$elm_css$Html$Styled$Attributes$cols(w),
                        rtfeldman$elm_css$Html$Styled$Attributes$rows(h),
                        rtfeldman$elm_css$Html$Styled$Attributes$css(
                        _List_fromArray(
                            [
                                rtfeldman$elm_css$Css$overflow(rtfeldman$elm_css$Css$auto),
                                rtfeldman$elm_css$Css$resize(rtfeldman$elm_css$Css$none),
                                rtfeldman$elm_css$Css$fontFamilies(
                                _List_fromArray(
                                    ['monaco', 'monofur', 'monospace'])),
                                rtfeldman$elm_css$Css$backgroundColor(
                                A4(rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0)),
                                rtfeldman$elm_css$Css$borderColor(
                                A4(rtfeldman$elm_css$Css$rgba, 0, 0, 0, 0)),
                                textAligning
                            ])),
                        rtfeldman$elm_css$Html$Styled$Attributes$placeholder(placeholderLabel),
                        rtfeldman$elm_css$Html$Styled$Attributes$value(content),
                        rtfeldman$elm_css$Html$Styled$Events$onInput(
                        author$project$Tree$State$UpdateContent(id))
                    ]),
                _List_Nil);
            return _Utils_Tuple3(htmlTextArea, w, h);
        });
    var timjs$elm_collage$Collage$Core$Polygon = function (a) {
        return {$: 'Polygon', a: a};
    };
    var timjs$elm_collage$Collage$polygon = timjs$elm_collage$Collage$Core$Polygon;
    var timjs$elm_collage$Collage$Core$Text = F2(
        function (a, b) {
            return {$: 'Text', a: a, b: b};
        });
    var timjs$elm_collage$Collage$Text$height = function (_n0) {
        var sty = _n0.a;
        return sty.size;
    };
    var timjs$elm_collage$Collage$Text$width = function (text) {
        var sty = text.a;
        var str = text.b;
        return (timjs$elm_collage$Collage$Text$height(text) / 2) * elm$core$String$length(str);
    };
    var timjs$elm_collage$Collage$rendered = function (text) {
        return timjs$elm_collage$Collage$Core$collage(
            A2(
                timjs$elm_collage$Collage$Core$Text,
                _Utils_Tuple2(
                    timjs$elm_collage$Collage$Text$width(text),
                    timjs$elm_collage$Collage$Text$height(text)),
                text));
    };
    var timjs$elm_collage$Collage$opposite = function (_n0) {
        var x = _n0.a;
        var y = _n0.b;
        return _Utils_Tuple2(-x, -y);
    };
    var timjs$elm_collage$Collage$Layout$align = F2(
        function (anchor, col) {
            return A2(
                timjs$elm_collage$Collage$shift,
                timjs$elm_collage$Collage$opposite(
                    anchor(col)),
                col);
        });
    var timjs$elm_collage$Collage$Layout$topLeft = function (col) {
        var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
        var toLeft = _n0.toLeft;
        var toTop = _n0.toTop;
        return _Utils_Tuple2(-toLeft, toTop);
    };
    var timjs$elm_collage$Collage$Layout$topRight = function (col) {
        var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
        var toRight = _n0.toRight;
        var toTop = _n0.toTop;
        return _Utils_Tuple2(toRight, toTop);
    };
    var timjs$elm_collage$Collage$Text$SemiBold = {$: 'SemiBold'};
    var timjs$elm_collage$Collage$Core$Chunk = F2(
        function (a, b) {
            return {$: 'Chunk', a: a, b: b};
        });
    var timjs$elm_collage$Collage$Text$None = {$: 'None'};
    var timjs$elm_collage$Collage$Text$Regular = {$: 'Regular'};
    var timjs$elm_collage$Collage$Text$Sansserif = {$: 'Sansserif'};
    var timjs$elm_collage$Collage$Text$Upright = {$: 'Upright'};
    var timjs$elm_collage$Collage$Text$normal = 16;
    var timjs$elm_collage$Collage$Text$defaultStyle = {color: avh4$elm_color$Color$black, line: timjs$elm_collage$Collage$Text$None, shape: timjs$elm_collage$Collage$Text$Upright, size: timjs$elm_collage$Collage$Text$normal, typeface: timjs$elm_collage$Collage$Text$Sansserif, weight: timjs$elm_collage$Collage$Text$Regular};
    var timjs$elm_collage$Collage$Text$fromString = timjs$elm_collage$Collage$Core$Chunk(timjs$elm_collage$Collage$Text$defaultStyle);
    var timjs$elm_collage$Collage$Text$weight = F2(
        function (newweight, _n0) {
            var sty = _n0.a;
            var str = _n0.b;
            return A2(
                timjs$elm_collage$Collage$Core$Chunk,
                _Utils_update(
                    sty,
                    {weight: newweight}),
                str);
        });
    var author$project$Tree$Draw$noteBox = F2(
        function (id, label) {
            var nodeType = (id === 4) ? author$project$Tree$State$PreConditionNode : ((id === 5) ? author$project$Tree$State$PostConditionNode : A2(elm$core$Debug$log, 'Tried to create non pre- or postcondition notebox. Using postcondition instead ', author$project$Tree$State$PostConditionNode));
            var conditionType = (id === 4) ? 'Precondition' : 'Postcondition';
            var title = A2(
                timjs$elm_collage$Collage$Layout$align,
                timjs$elm_collage$Collage$Layout$topRight,
                timjs$elm_collage$Collage$rendered(
                    A2(
                        timjs$elm_collage$Collage$Text$weight,
                        timjs$elm_collage$Collage$Text$SemiBold,
                        timjs$elm_collage$Collage$Text$fromString(conditionType))));
            var _n0 = _Utils_Tuple2(30, 4);
            var minW = _n0.a;
            var minH = _n0.b;
            var _n1 = A6(author$project$Tree$Draw$multilineEditableTextBox, id, nodeType, label, minW, minH, minW);
            var htmlTextArea = _n1.a;
            var wta = _n1.b;
            var hta = _n1.c;
            var _n2 = _Utils_Tuple2(
                A2(elm$core$Basics$max, minW, wta) * 5,
                (A2(elm$core$Basics$max, minH, hta) * 7.8) + 15);
            var w = _n2.a;
            var h = _n2.b;
            var text = A2(
                timjs$elm_collage$Collage$Layout$align,
                timjs$elm_collage$Collage$Layout$topLeft,
                A2(
                    timjs$elm_collage$Collage$html,
                    _Utils_Tuple2(w * 2, h * 2),
                    rtfeldman$elm_css$Html$Styled$toUnstyled(htmlTextArea)));
            var shape = A2(
                timjs$elm_collage$Collage$Layout$impose,
                text,
                A2(
                    timjs$elm_collage$Collage$shift,
                    _Utils_Tuple2(-author$project$Tree$Draw$unit, author$project$Tree$Draw$unit * 2.5),
                    A2(
                        timjs$elm_collage$Collage$Layout$align,
                        timjs$elm_collage$Collage$Layout$topLeft,
                        A2(
                            timjs$elm_collage$Collage$Layout$impose,
                            title,
                            A2(
                                timjs$elm_collage$Collage$shift,
                                _Utils_Tuple2(author$project$Tree$Draw$unit, author$project$Tree$Draw$unit),
                                A2(
                                    timjs$elm_collage$Collage$Layout$align,
                                    timjs$elm_collage$Collage$Layout$topRight,
                                    A2(
                                        timjs$elm_collage$Collage$styled,
                                        _Utils_Tuple2(
                                            timjs$elm_collage$Collage$uniform(
                                                A3(avh4$elm_color$Color$rgb255, 220, 237, 248)),
                                            A2(
                                                timjs$elm_collage$Collage$solid,
                                                timjs$elm_collage$Collage$thin,
                                                timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$black))),
                                        timjs$elm_collage$Collage$polygon(
                                            _List_fromArray(
                                                [
                                                    _Utils_Tuple2(w, h),
                                                    _Utils_Tuple2(w, -h),
                                                    _Utils_Tuple2(-w, -h),
                                                    _Utils_Tuple2(-w, h - (author$project$Tree$Draw$unit * 2)),
                                                    _Utils_Tuple2((-w) + (author$project$Tree$Draw$unit * 8), h)
                                                ])))))))));
            return A2(timjs$elm_collage$Collage$Layout$name, conditionType, shape);
        });
    var author$project$Tree$Draw$stackTwo = F2(
        function (front, back) {
            return timjs$elm_collage$Collage$Layout$stack(
                _List_fromArray(
                    [front, back]));
        });
    var author$project$Tree$State$ConditionHide = function (a) {
        return {$: 'ConditionHide', a: a};
    };
    var elm$core$Basics$round = _Basics_round;
    var timjs$elm_collage$Collage$dash = function (thickness) {
        var d = elm$core$Basics$round(thickness);
        return A2(
            timjs$elm_collage$Collage$broken,
            _List_fromArray(
                [
                    _Utils_Tuple2(d * 5, d * 2)
                ]),
            thickness);
    };
    var timjs$elm_collage$Collage$verythin = 1.0;
    var timjs$elm_collage$Collage$Events$on = F3(
        function (event, decoder, collage) {
            return _Utils_update(
                collage,
                {
                    handlers: A2(
                        elm$core$List$cons,
                        _Utils_Tuple2(event, decoder),
                        collage.handlers)
                });
        });
    var timjs$elm_collage$Collage$Events$simpleOn = function (event) {
        return A2(
            elm$core$Basics$composeL,
            timjs$elm_collage$Collage$Events$on(event),
            elm$json$Json$Decode$succeed);
    };
    var timjs$elm_collage$Collage$Events$onClick = timjs$elm_collage$Collage$Events$simpleOn('click');
    var timjs$elm_collage$Collage$Layout$at = F3(
        function (anchor, fore, back) {
            return timjs$elm_collage$Collage$Layout$stack(
                _List_fromArray(
                    [
                        A2(
                        timjs$elm_collage$Collage$shift,
                        anchor(back),
                        fore),
                        back
                    ]));
        });
    var timjs$elm_collage$Collage$Layout$base = function (col) {
        var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
        var toTop = _n0.toTop;
        var toBottom = _n0.toBottom;
        var toLeft = _n0.toLeft;
        var toRight = _n0.toRight;
        var tx = (toRight - toLeft) / 2;
        var ty = (toTop - toBottom) / 2;
        return _Utils_Tuple2(tx, ty);
    };
    var timjs$elm_collage$Collage$Layout$bottomLeft = function (col) {
        var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
        var toLeft = _n0.toLeft;
        var toBottom = _n0.toBottom;
        return _Utils_Tuple2(-toLeft, -toBottom);
    };
    var timjs$elm_collage$Collage$Core$Polyline = function (a) {
        return {$: 'Polyline', a: a};
    };
    var timjs$elm_collage$Collage$path = timjs$elm_collage$Collage$Core$Polyline;
    var timjs$elm_collage$Collage$traced = F2(
        function (linestyle, p) {
            return timjs$elm_collage$Collage$Core$collage(
                A2(timjs$elm_collage$Collage$Core$Path, linestyle, p));
        });
    var timjs$elm_collage$Helpers$foldrLazy = F3(
        function (f, acc, list) {
            if (!list.b) {
                return acc;
            } else {
                var x = list.a;
                var xs = list.b;
                return A2(
                    f,
                    x,
                    function (_n1) {
                        return A3(timjs$elm_collage$Helpers$foldrLazy, f, acc, xs);
                    });
            }
        });
    var timjs$elm_collage$Helpers$orLazy = F2(
        function (ma, fmb) {
            if (ma.$ === 'Nothing') {
                return fmb(_Utils_Tuple0);
            } else {
                return ma;
            }
        });
    var timjs$elm_collage$Collage$Layout$locate = F3(
        function (string, anchor, _this) {
            var recurse = function (col) {
                var match = A2(
                    elm$core$Maybe$withDefault,
                    false,
                    A2(
                        elm$core$Maybe$map,
                        elm$core$Basics$eq(string),
                        col.name));
                var firstOf = A2(
                    timjs$elm_collage$Helpers$foldrLazy,
                    A2(elm$core$Basics$composeL, timjs$elm_collage$Helpers$orLazy, recurse),
                    elm$core$Maybe$Nothing);
                return match ? elm$core$Maybe$Just(
                    anchor(col)) : A2(
                    elm$core$Maybe$map,
                    timjs$elm_collage$Collage$Core$apply(col),
                    function () {
                        var _n0 = col.basic;
                        switch (_n0.$) {
                            case 'Group':
                                var cols = _n0.a;
                                return firstOf(cols);
                            case 'Subcollage':
                                var fore = _n0.a;
                                var back = _n0.b;
                                return firstOf(
                                    _List_fromArray(
                                        [fore, back]));
                            default:
                                return elm$core$Maybe$Nothing;
                        }
                    }());
            };
            return recurse(_this);
        });
    var timjs$elm_collage$Helpers$foldrValues = F2(
        function (item, list) {
            if (item.$ === 'Nothing') {
                return list;
            } else {
                var v = item.a;
                return A2(elm$core$List$cons, v, list);
            }
        });
    var timjs$elm_collage$Helpers$values = A2(elm$core$List$foldr, timjs$elm_collage$Helpers$foldrValues, _List_Nil);
    var timjs$elm_collage$Collage$Layout$connect = F3(
        function (locations, line, col) {
            var positions = timjs$elm_collage$Helpers$values(
                A2(
                    elm$core$List$map,
                    function (_n0) {
                        var n = _n0.a;
                        var a = _n0.b;
                        return A3(timjs$elm_collage$Collage$Layout$locate, n, a, col);
                    },
                    locations));
            return A2(
                timjs$elm_collage$Collage$Layout$impose,
                A2(
                    timjs$elm_collage$Collage$traced,
                    line,
                    timjs$elm_collage$Collage$path(positions)),
                col);
        });
    var timjs$elm_collage$Collage$Layout$left = function (col) {
        var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
        var toLeft = _n0.toLeft;
        return _Utils_Tuple2(-toLeft, 0);
    };
    var timjs$elm_collage$Collage$Layout$right = function (col) {
        var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
        var toRight = _n0.toRight;
        return _Utils_Tuple2(toRight, 0);
    };
    var timjs$elm_collage$Collage$Layout$top = function (col) {
        var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
        var toTop = _n0.toTop;
        return _Utils_Tuple2(0, toTop);
    };
    var author$project$Tree$Draw$addConditions = F2(
        function (model, tree) {
            var correctionCoordinates = function (name) {
                var _n0 = A3(timjs$elm_collage$Collage$Layout$locate, name, timjs$elm_collage$Collage$Layout$base, tree);
                if (_n0.$ === 'Just') {
                    var _n1 = _n0.a;
                    var x = _n1.a;
                    var y = _n1.b;
                    return _Utils_Tuple2(-x, -y);
                } else {
                    return A2(
                        elm$core$Debug$log,
                        'Coordinate not found ' + name,
                        _Utils_Tuple2(0, 0));
                }
            };
            var addPrecondition = F2(
                function (visible, col) {
                    return visible ? A3(
                        timjs$elm_collage$Collage$Layout$connect,
                        _List_fromArray(
                            [
                                _Utils_Tuple2('Start', timjs$elm_collage$Collage$Layout$right),
                                _Utils_Tuple2('Precondition', timjs$elm_collage$Collage$Layout$left)
                            ]),
                        A2(
                            timjs$elm_collage$Collage$dash,
                            timjs$elm_collage$Collage$verythin,
                            timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$black)),
                        A2(
                            author$project$Tree$Draw$stackTwo,
                            A2(
                                timjs$elm_collage$Collage$Layout$align,
                                timjs$elm_collage$Collage$Layout$left,
                                A3(
                                    author$project$Tree$Draw$imposeAt,
                                    timjs$elm_collage$Collage$Layout$topRight,
                                    A2(
                                        timjs$elm_collage$Collage$Events$onClick,
                                        author$project$Tree$State$ConditionHide(author$project$Tree$State$PreConditionNode),
                                        author$project$Tree$Draw$deleteBox),
                                    A2(author$project$Tree$Draw$noteBox, 4, model.precondition.content))),
                            col)) : col;
                });
            var addPostcondition = F2(
                function (visible, col) {
                    return visible ? A3(
                        timjs$elm_collage$Collage$Layout$connect,
                        _List_fromArray(
                            [
                                _Utils_Tuple2('Einde', timjs$elm_collage$Collage$Layout$right),
                                _Utils_Tuple2('Postcondition', timjs$elm_collage$Collage$Layout$left)
                            ]),
                        A2(
                            timjs$elm_collage$Collage$dash,
                            timjs$elm_collage$Collage$verythin,
                            timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$black)),
                        A2(
                            author$project$Tree$Draw$stackTwo,
                            A3(
                                author$project$Tree$Draw$imposeAt,
                                timjs$elm_collage$Collage$Layout$topRight,
                                A2(
                                    timjs$elm_collage$Collage$Events$onClick,
                                    author$project$Tree$State$ConditionHide(author$project$Tree$State$PostConditionNode),
                                    author$project$Tree$Draw$deleteBox),
                                A2(
                                    timjs$elm_collage$Collage$shift,
                                    _Utils_Tuple2(0, (-3) * author$project$Tree$Draw$unit),
                                    A2(
                                        timjs$elm_collage$Collage$Layout$align,
                                        timjs$elm_collage$Collage$Layout$bottomLeft,
                                        A2(author$project$Tree$Draw$noteBox, 5, model.postcondition.content)))),
                            A2(
                                timjs$elm_collage$Collage$shift,
                                _Utils_Tuple2(0, 2.6 * author$project$Tree$Draw$unit),
                                A2(
                                    timjs$elm_collage$Collage$shift,
                                    correctionCoordinates('Einde'),
                                    col)))) : col;
                });
            return A3(
                timjs$elm_collage$Collage$Layout$at,
                timjs$elm_collage$Collage$Layout$top,
                author$project$Tree$Draw$gap,
                A3(
                    timjs$elm_collage$Collage$Layout$at,
                    timjs$elm_collage$Collage$Layout$right,
                    author$project$Tree$Draw$gap,
                    A3(
                        timjs$elm_collage$Collage$Layout$at,
                        timjs$elm_collage$Collage$Layout$right,
                        author$project$Tree$Draw$gap,
                        A2(
                            addPostcondition,
                            model.postcondition.visible,
                            A2(
                                addPrecondition,
                                model.precondition.visible,
                                A2(
                                    timjs$elm_collage$Collage$Layout$align,
                                    timjs$elm_collage$Collage$Layout$right,
                                    A3(
                                        timjs$elm_collage$Collage$Layout$connect,
                                        _List_fromArray(
                                            [
                                                _Utils_Tuple2('Start', timjs$elm_collage$Collage$Layout$left),
                                                _Utils_Tuple2('flowchartNameBox', timjs$elm_collage$Collage$Layout$right)
                                            ]),
                                        A2(
                                            timjs$elm_collage$Collage$dash,
                                            timjs$elm_collage$Collage$verythin,
                                            timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$black)),
                                        A2(
                                            author$project$Tree$Draw$stackTwo,
                                            A2(
                                                timjs$elm_collage$Collage$Layout$align,
                                                timjs$elm_collage$Collage$Layout$right,
                                                author$project$Tree$Draw$flowchartNameBox(model.flowchartName)),
                                            A2(
                                                timjs$elm_collage$Collage$shift,
                                                _Utils_Tuple2(6.5 * author$project$Tree$Draw$unit, (-2.6) * author$project$Tree$Draw$unit),
                                                tree)))))))));
        });
    var elm$core$Basics$sqrt = _Basics_sqrt;
    var timjs$elm_collage$Collage$triangle = function (b) {
        var x = b / 2;
        var y = (elm$core$Basics$sqrt(3) / 2) * x;
        return timjs$elm_collage$Collage$polygon(
            _List_fromArray(
                [
                    _Utils_Tuple2(-x, -y),
                    _Utils_Tuple2(x, -y),
                    _Utils_Tuple2(0, y)
                ]));
    };
    var author$project$Tree$Draw$arrowTriangle = A2(
        timjs$elm_collage$Collage$rotate,
        elm$core$Basics$pi,
        A3(
            elm$core$Basics$apL,
            timjs$elm_collage$Collage$filled,
            timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$black),
            timjs$elm_collage$Collage$triangle(15)));
    var timjs$elm_collage$Collage$line = function (l) {
        return timjs$elm_collage$Collage$path(
            _List_fromArray(
                [
                    _Utils_Tuple2((-l) / 2, 0),
                    _Utils_Tuple2(l / 2, 0)
                ]));
    };
    var timjs$elm_collage$Collage$Layout$bottom = function (col) {
        var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
        var toBottom = _n0.toBottom;
        return _Utils_Tuple2(0, -toBottom);
    };
    var author$project$Tree$Draw$arrow = function (length) {
        return A3(
            author$project$Tree$Draw$imposeAt,
            timjs$elm_collage$Collage$Layout$bottom,
            A2(timjs$elm_collage$Collage$Layout$align, timjs$elm_collage$Collage$Layout$bottom, author$project$Tree$Draw$arrowTriangle),
            A2(
                timjs$elm_collage$Collage$rotate,
                elm$core$Basics$pi / 2,
                A2(
                    timjs$elm_collage$Collage$traced,
                    timjs$elm_collage$Collage$defaultLineStyle,
                    timjs$elm_collage$Collage$line(
                        A2(elm$core$Basics$max, length, author$project$Tree$Draw$unit * 3)))));
    };
    var elm$core$Basics$degrees = function (angleInDegrees) {
        return (angleInDegrees * elm$core$Basics$pi) / 180;
    };
    var author$project$Tree$Draw$addBottomArrow = F3(
        function (reqLength, child, collage) {
            var length = A2(elm$core$Basics$max, reqLength, author$project$Tree$Draw$unit * 3);
            if (child.$ === 'Void') {
                return timjs$elm_collage$Collage$Layout$stack(
                    _List_fromArray(
                        [
                            A2(timjs$elm_collage$Collage$Layout$align, timjs$elm_collage$Collage$Layout$bottom, collage),
                            A2(
                            timjs$elm_collage$Collage$Layout$align,
                            timjs$elm_collage$Collage$Layout$top,
                            A2(
                                timjs$elm_collage$Collage$rotate,
                                elm$core$Basics$degrees(90),
                                A2(
                                    timjs$elm_collage$Collage$traced,
                                    timjs$elm_collage$Collage$defaultLineStyle,
                                    timjs$elm_collage$Collage$line(length))))
                        ]));
            } else {
                return timjs$elm_collage$Collage$Layout$stack(
                    _List_fromArray(
                        [
                            A2(timjs$elm_collage$Collage$Layout$align, timjs$elm_collage$Collage$Layout$bottom, collage),
                            A2(
                            timjs$elm_collage$Collage$Layout$align,
                            timjs$elm_collage$Collage$Layout$top,
                            author$project$Tree$Draw$arrow(length))
                        ]));
            }
        });
    var avh4$elm_color$Color$blue = A4(avh4$elm_color$Color$RgbaSpace, 52 / 255, 101 / 255, 164 / 255, 1.0);
    var author$project$Tree$Draw$plusBox = timjs$elm_collage$Collage$Layout$stack(
        _List_fromArray(
            [
                author$project$Tree$Draw$whitePlus,
                A2(
                timjs$elm_collage$Collage$filled,
                timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$blue),
                timjs$elm_collage$Collage$circle(
                    (timjs$elm_collage$Collage$Layout$width(author$project$Tree$Draw$whitePlus) / 2) + 3))
            ]));
    var author$project$Tree$State$ChangeTree = F2(
        function (a, b) {
            return {$: 'ChangeTree', a: a, b: b};
        });
    var author$project$Tree$State$ConditionShow = function (a) {
        return {$: 'ConditionShow', a: a};
    };
    var author$project$Tree$State$Delete = {$: 'Delete'};
    var author$project$Tree$State$NewAbove = {$: 'NewAbove'};
    var author$project$Tree$State$NewBelow = {$: 'NewBelow'};
    var author$project$Tree$State$NewFalse = {$: 'NewFalse'};
    var author$project$Tree$State$NewTrue = {$: 'NewTrue'};
    var author$project$Tree$Draw$addHighlightOverlay = F2(
        function (node, nodeBox) {
            var newBelowButton = function (shape) {
                return A3(
                    author$project$Tree$Draw$imposeAt,
                    timjs$elm_collage$Collage$Layout$bottom,
                    A2(
                        timjs$elm_collage$Collage$Events$onClick,
                        A2(author$project$Tree$State$ChangeTree, author$project$Tree$State$NewBelow, node.id),
                        author$project$Tree$Draw$plusBox),
                    shape);
            };
            var newAboveButton = function (shape) {
                return A3(
                    author$project$Tree$Draw$imposeAt,
                    timjs$elm_collage$Collage$Layout$top,
                    A2(
                        timjs$elm_collage$Collage$Events$onClick,
                        A2(author$project$Tree$State$ChangeTree, author$project$Tree$State$NewAbove, node.id),
                        author$project$Tree$Draw$plusBox),
                    shape);
            };
            var deleteButton = function (shape) {
                return A3(
                    author$project$Tree$Draw$imposeAt,
                    timjs$elm_collage$Collage$Layout$topRight,
                    A2(
                        timjs$elm_collage$Collage$Events$onClick,
                        A2(author$project$Tree$State$ChangeTree, author$project$Tree$State$Delete, node.id),
                        author$project$Tree$Draw$deleteBox),
                    shape);
            };
            var _n0 = node.basicTree;
            switch (_n0.$) {
                case 'Start':
                    return A3(
                        author$project$Tree$Draw$imposeAt,
                        timjs$elm_collage$Collage$Layout$right,
                        A2(
                            timjs$elm_collage$Collage$Events$onClick,
                            author$project$Tree$State$ConditionShow(author$project$Tree$State$PreConditionNode),
                            author$project$Tree$Draw$plusBox),
                        newBelowButton(nodeBox));
                case 'End':
                    return A3(
                        author$project$Tree$Draw$imposeAt,
                        timjs$elm_collage$Collage$Layout$right,
                        A2(
                            timjs$elm_collage$Collage$Events$onClick,
                            author$project$Tree$State$ConditionShow(author$project$Tree$State$PostConditionNode),
                            author$project$Tree$Draw$plusBox),
                        newAboveButton(nodeBox));
                case 'If':
                    return deleteButton(
                        A3(
                            author$project$Tree$Draw$imposeAt,
                            timjs$elm_collage$Collage$Layout$left,
                            A2(
                                timjs$elm_collage$Collage$Events$onClick,
                                A2(author$project$Tree$State$ChangeTree, author$project$Tree$State$NewFalse, node.id),
                                author$project$Tree$Draw$plusBox),
                            A3(
                                author$project$Tree$Draw$imposeAt,
                                timjs$elm_collage$Collage$Layout$right,
                                A2(
                                    timjs$elm_collage$Collage$Events$onClick,
                                    A2(author$project$Tree$State$ChangeTree, author$project$Tree$State$NewTrue, node.id),
                                    author$project$Tree$Draw$plusBox),
                                newAboveButton(nodeBox))));
                case 'While':
                    return deleteButton(
                        A3(
                            author$project$Tree$Draw$imposeAt,
                            timjs$elm_collage$Collage$Layout$bottom,
                            A2(
                                timjs$elm_collage$Collage$Events$onClick,
                                A2(author$project$Tree$State$ChangeTree, author$project$Tree$State$NewTrue, node.id),
                                author$project$Tree$Draw$plusBox),
                            newAboveButton(nodeBox)));
                case 'ForEach':
                    return deleteButton(
                        A3(
                            author$project$Tree$Draw$imposeAt,
                            timjs$elm_collage$Collage$Layout$bottom,
                            A2(
                                timjs$elm_collage$Collage$Events$onClick,
                                A2(author$project$Tree$State$ChangeTree, author$project$Tree$State$NewTrue, node.id),
                                author$project$Tree$Draw$plusBox),
                            newAboveButton(nodeBox)));
                default:
                    return deleteButton(
                        newBelowButton(
                            newAboveButton(nodeBox)));
            }
        });
    var author$project$Tree$Draw$imposePrime = F2(
        function (front, back) {
            return timjs$elm_collage$Collage$Layout$stack(
                _List_fromArray(
                    [
                        front,
                        A2(timjs$elm_collage$Collage$Layout$impose, back, front)
                    ]));
        });
    var author$project$Tree$State$DehighlightBox = function (a) {
        return {$: 'DehighlightBox', a: a};
    };
    var author$project$Tree$State$HighlightBox = function (a) {
        return {$: 'HighlightBox', a: a};
    };
    var avh4$elm_color$Color$rgba = F4(
        function (r, g, b, a) {
            return A4(avh4$elm_color$Color$RgbaSpace, r, g, b, a);
        });
    var elm$core$Basics$always = F2(
        function (a, _n0) {
            return a;
        });
    var elm$json$Json$Decode$float = _Json_decodeFloat;
    var timjs$elm_collage$Collage$Events$mouseOn = F2(
        function (event, msg) {
            return A2(
                timjs$elm_collage$Collage$Events$on,
                event,
                A2(
                    elm$json$Json$Decode$map,
                    msg,
                    A3(
                        elm$json$Json$Decode$map2,
                        F2(
                            function (x, y) {
                                return _Utils_Tuple2(x, y);
                            }),
                        A2(elm$json$Json$Decode$field, 'clientX', elm$json$Json$Decode$float),
                        A2(elm$json$Json$Decode$field, 'clientY', elm$json$Json$Decode$float))));
        });
    var timjs$elm_collage$Collage$Events$onMouseEnter = timjs$elm_collage$Collage$Events$mouseOn('mouseenter');
    var timjs$elm_collage$Collage$Events$onMouseLeave = timjs$elm_collage$Collage$Events$mouseOn('mouseleave');
    var timjs$elm_collage$Collage$Layout$height = function (col) {
        var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
        var toTop = _n0.toTop;
        var toBottom = _n0.toBottom;
        return toTop + toBottom;
    };
    var author$project$Tree$Draw$addHitbox = F3(
        function (highlightedBox, id, nodeBox) {
            var trigger = function (box) {
                return A2(
                    timjs$elm_collage$Collage$Events$onMouseLeave,
                    elm$core$Basics$always(
                        author$project$Tree$State$DehighlightBox(id)),
                    function () {
                        if (highlightedBox.$ === 'Just') {
                            var highlightId = highlightedBox.a;
                            return _Utils_eq(id, highlightId) ? elm$core$Basics$identity : timjs$elm_collage$Collage$Events$onMouseEnter(
                                elm$core$Basics$always(
                                    author$project$Tree$State$HighlightBox(id)));
                        } else {
                            return timjs$elm_collage$Collage$Events$onMouseEnter(
                                elm$core$Basics$always(
                                    author$project$Tree$State$HighlightBox(id)));
                        }
                    }()(box));
            };
            var _n0 = _Utils_Tuple2(
                timjs$elm_collage$Collage$Layout$width(nodeBox),
                timjs$elm_collage$Collage$Layout$height(nodeBox));
            var w = _n0.a;
            var h = _n0.b;
            var hitbox = A2(
                timjs$elm_collage$Collage$filled,
                timjs$elm_collage$Collage$uniform(
                    A4(avh4$elm_color$Color$rgba, 0, 0, 0, 0)),
                A2(timjs$elm_collage$Collage$rectangle, w + (author$project$Tree$Draw$unit * 2), h + (author$project$Tree$Draw$unit * 2)));
            return A2(
                author$project$Tree$Draw$imposePrime,
                trigger(nodeBox),
                trigger(hitbox));
        });
    var author$project$Tree$Draw$addOverlayMenu = F3(
        function (highlightedBox, node, nodeBox) {
            return function () {
                if (highlightedBox.$ === 'Just') {
                    var highlightId = highlightedBox.a;
                    return _Utils_eq(node.id, highlightId) ? author$project$Tree$Draw$addHighlightOverlay(node) : elm$core$Basics$identity;
                } else {
                    return elm$core$Basics$identity;
                }
            }()(
                A3(author$project$Tree$Draw$addHitbox, highlightedBox, node.id, nodeBox));
        });
    var author$project$Tree$Draw$addSeparateBelowPlus = F3(
        function (model, node, nodeBox) {
            var addButton = function (id) {
                return A2(
                    author$project$Tree$Draw$imposeAt,
                    timjs$elm_collage$Collage$Layout$bottom,
                    A2(
                        timjs$elm_collage$Collage$Events$onClick,
                        A2(author$project$Tree$State$ChangeTree, author$project$Tree$State$NewBelow, node.id),
                        author$project$Tree$Draw$plusBox));
            };
            return function () {
                var _n0 = model.highlightedBox;
                if (_n0.$ === 'Just') {
                    var highlightId = _n0.a;
                    return _Utils_eq(node.id, highlightId) ? addButton(node.id) : elm$core$Basics$identity;
                } else {
                    return elm$core$Basics$identity;
                }
            }()(
                A3(author$project$Tree$Draw$addHitbox, model.highlightedBox, node.id, nodeBox));
        });
    var timjs$elm_collage$Collage$Layout$center = timjs$elm_collage$Collage$Layout$align(timjs$elm_collage$Collage$Layout$base);
    var author$project$Tree$Draw$ifBoxShape = F2(
        function (w, h) {
            var points = _List_fromArray(
                [
                    _Utils_Tuple2(0, h),
                    _Utils_Tuple2(-(author$project$Tree$Draw$unit * 2), 0),
                    _Utils_Tuple2(0, -h),
                    _Utils_Tuple2(w, -h),
                    _Utils_Tuple2(w + (author$project$Tree$Draw$unit * 2), 0),
                    _Utils_Tuple2(w, h)
                ]);
            return timjs$elm_collage$Collage$Layout$center(
                A2(
                    timjs$elm_collage$Collage$styled,
                    _Utils_Tuple2(
                        timjs$elm_collage$Collage$uniform(
                            A3(avh4$elm_color$Color$rgb255, 255, 180, 255)),
                        A2(
                            timjs$elm_collage$Collage$solid,
                            timjs$elm_collage$Collage$thin,
                            timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$black))),
                    timjs$elm_collage$Collage$polygon(points)));
        });
    var author$project$Tree$Draw$loopBoxShape = F3(
        function (nodeType, w, h) {
            var points = _List_fromArray(
                [
                    _Utils_Tuple2(0, h),
                    _Utils_Tuple2(0, -h),
                    _Utils_Tuple2((w + author$project$Tree$Draw$unit) / 2, -(h * 1.5)),
                    _Utils_Tuple2(w + author$project$Tree$Draw$unit, -h),
                    _Utils_Tuple2(w + author$project$Tree$Draw$unit, h)
                ]);
            var boxColor = function () {
                switch (nodeType.$) {
                    case 'WhileNode':
                        return A3(avh4$elm_color$Color$rgb255, 180, 255, 180);
                    case 'ForEachNode':
                        return A3(avh4$elm_color$Color$rgb255, 150, 255, 255);
                    default:
                        return A2(
                            elm$core$Debug$log,
                            'Tried to instantiate a loopBox of a node type that is not While or ForEach. Proceeding with white: ',
                            A3(avh4$elm_color$Color$rgb255, 0, 0, 0));
                }
            }();
            return timjs$elm_collage$Collage$Layout$center(
                A2(
                    timjs$elm_collage$Collage$styled,
                    _Utils_Tuple2(
                        timjs$elm_collage$Collage$uniform(boxColor),
                        A2(
                            timjs$elm_collage$Collage$solid,
                            timjs$elm_collage$Collage$thin,
                            timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$black))),
                    timjs$elm_collage$Collage$polygon(points)));
        });
    var author$project$Tree$Draw$statementBoxShape = F2(
        function (w, h) {
            return A2(
                timjs$elm_collage$Collage$styled,
                _Utils_Tuple2(
                    timjs$elm_collage$Collage$uniform(
                        A3(avh4$elm_color$Color$rgb255, 255, 255, 150)),
                    A2(
                        timjs$elm_collage$Collage$solid,
                        timjs$elm_collage$Collage$thin,
                        timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$black))),
                A2(timjs$elm_collage$Collage$rectangle, w + (2 * author$project$Tree$Draw$unit), h + (3 * author$project$Tree$Draw$unit)));
        });
    var timjs$elm_collage$Collage$Core$Ellipse = F2(
        function (a, b) {
            return {$: 'Ellipse', a: a, b: b};
        });
    var timjs$elm_collage$Collage$ellipse = timjs$elm_collage$Collage$Core$Ellipse;
    var author$project$Tree$Draw$boxNonEditable = F2(
        function (label, nodeType) {
            var text = timjs$elm_collage$Collage$rendered(
                timjs$elm_collage$Collage$Text$fromString(label));
            var w = A2(
                elm$core$Basics$max,
                timjs$elm_collage$Collage$Layout$width(text),
                40);
            var h = 19;
            var shape = function () {
                switch (nodeType.$) {
                    case 'StatementNode':
                        return A2(author$project$Tree$Draw$statementBoxShape, w, h);
                    case 'IfNode':
                        return A2(author$project$Tree$Draw$ifBoxShape, w, h);
                    case 'WhileNode':
                        return A3(author$project$Tree$Draw$loopBoxShape, author$project$Tree$State$WhileNode, w, h);
                    case 'ForEachNode':
                        return A3(author$project$Tree$Draw$loopBoxShape, author$project$Tree$State$ForEachNode, w, h);
                    default:
                        return A4(
                            elm$core$Debug$log,
                            'Tried to create non editable box for Precondition, Postcondition or FlowchartName. Drawing ellipse instead: ',
                            timjs$elm_collage$Collage$filled,
                            timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$red),
                            A2(timjs$elm_collage$Collage$ellipse, 4, 1));
                }
            }();
            return timjs$elm_collage$Collage$Layout$stack(
                _List_fromArray(
                    [text, shape]));
        });
    var author$project$Tree$State$FillEmpty = F2(
        function (a, b) {
            return {$: 'FillEmpty', a: a, b: b};
        });
    var avh4$elm_color$Color$darkGray = A4(avh4$elm_color$Color$RgbaSpace, 186 / 255, 189 / 255, 182 / 255, 1.0);
    var timjs$elm_collage$Collage$Layout$Right = {$: 'Right'};
    var timjs$elm_collage$Collage$Layout$envelope = F2(
        function (dir, col) {
            var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
            var toTop = _n0.toTop;
            var toBottom = _n0.toBottom;
            var toLeft = _n0.toLeft;
            var toRight = _n0.toRight;
            switch (dir.$) {
                case 'Up':
                    return toTop;
                case 'Down':
                    return toBottom;
                case 'Right':
                    return toRight;
                default:
                    return toLeft;
            }
        });
    var timjs$elm_collage$Collage$Layout$Down = {$: 'Down'};
    var timjs$elm_collage$Collage$Layout$Left = {$: 'Left'};
    var timjs$elm_collage$Collage$Layout$Up = {$: 'Up'};
    var timjs$elm_collage$Collage$Layout$facing = function (dir) {
        switch (dir.$) {
            case 'Up':
                return timjs$elm_collage$Collage$Layout$Down;
            case 'Down':
                return timjs$elm_collage$Collage$Layout$Up;
            case 'Right':
                return timjs$elm_collage$Collage$Layout$Left;
            default:
                return timjs$elm_collage$Collage$Layout$Right;
        }
    };
    var timjs$elm_collage$Collage$Layout$place = F3(
        function (dir, a, b) {
            var len = A2(timjs$elm_collage$Collage$Layout$envelope, dir, a) + A2(
                timjs$elm_collage$Collage$Layout$envelope,
                timjs$elm_collage$Collage$Layout$facing(dir),
                b);
            var move = function () {
                switch (dir.$) {
                    case 'Up':
                        return _Utils_Tuple2(0, len);
                    case 'Down':
                        return _Utils_Tuple2(0, -len);
                    case 'Right':
                        return _Utils_Tuple2(len, 0);
                    default:
                        return _Utils_Tuple2(-len, 0);
                }
            }();
            return A2(timjs$elm_collage$Collage$shift, move, b);
        });
    var timjs$elm_collage$Collage$Layout$beside = F3(
        function (dir, a, b) {
            return timjs$elm_collage$Collage$Layout$stack(
                _List_fromArray(
                    [
                        a,
                        A3(timjs$elm_collage$Collage$Layout$place, dir, a, b)
                    ]));
        });
    var timjs$elm_collage$Collage$Layout$empty = A2(timjs$elm_collage$Collage$Layout$spacer, 0, 0);
    var timjs$elm_collage$Collage$Layout$horizontal = A2(
        elm$core$List$foldr,
        timjs$elm_collage$Collage$Layout$beside(timjs$elm_collage$Collage$Layout$Right),
        timjs$elm_collage$Collage$Layout$empty);
    var author$project$Tree$Draw$emptyBox = function (idEmpty) {
        var menuGap = A2(timjs$elm_collage$Collage$Layout$spacer, author$project$Tree$Draw$unit, author$project$Tree$Draw$unit);
        var options = timjs$elm_collage$Collage$Layout$center(
            timjs$elm_collage$Collage$Layout$horizontal(
                A2(
                    elm$core$List$intersperse,
                    menuGap,
                    _List_fromArray(
                        [
                            A2(
                            timjs$elm_collage$Collage$Events$onClick,
                            A2(author$project$Tree$State$FillEmpty, author$project$Tree$State$StatementNode, idEmpty),
                            A2(author$project$Tree$Draw$boxNonEditable, 'statement', author$project$Tree$State$StatementNode)),
                            A2(
                            timjs$elm_collage$Collage$Events$onClick,
                            A2(author$project$Tree$State$FillEmpty, author$project$Tree$State$IfNode, idEmpty),
                            A2(author$project$Tree$Draw$boxNonEditable, 'if', author$project$Tree$State$IfNode)),
                            A2(
                            timjs$elm_collage$Collage$Events$onClick,
                            A2(author$project$Tree$State$FillEmpty, author$project$Tree$State$WhileNode, idEmpty),
                            A2(author$project$Tree$Draw$boxNonEditable, 'while', author$project$Tree$State$WhileNode)),
                            A2(
                            timjs$elm_collage$Collage$Events$onClick,
                            A2(author$project$Tree$State$FillEmpty, author$project$Tree$State$ForEachNode, idEmpty),
                            A2(author$project$Tree$Draw$boxNonEditable, 'forEach', author$project$Tree$State$ForEachNode))
                        ]))));
        var _n0 = _Utils_Tuple2(
            timjs$elm_collage$Collage$Layout$width(options),
            timjs$elm_collage$Collage$Layout$height(options));
        var w = _n0.a;
        var h = _n0.b;
        var shape = A2(
            timjs$elm_collage$Collage$styled,
            _Utils_Tuple2(
                timjs$elm_collage$Collage$uniform(
                    A3(avh4$elm_color$Color$rgb255, 255, 202, 255)),
                A2(
                    timjs$elm_collage$Collage$dash,
                    timjs$elm_collage$Collage$thin,
                    timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$darkGray))),
            A2(timjs$elm_collage$Collage$rectangle, w + author$project$Tree$Draw$unit, h + author$project$Tree$Draw$unit));
        return timjs$elm_collage$Collage$Layout$stack(
            _List_fromArray(
                [options, shape]));
    };
    var author$project$Tree$Draw$ifBoxEditable = F2(
        function (id, label) {
            var maxWidth = 23;
            var _n0 = _Utils_Tuple2(10, 1);
            var minW = _n0.a;
            var minH = _n0.b;
            var _n1 = A6(author$project$Tree$Draw$multilineEditableTextBox, id, author$project$Tree$State$IfNode, label, minW, minH, maxWidth);
            var htmlTextArea = _n1.a;
            var wta = _n1.b;
            var hta = _n1.c;
            var _n2 = _Utils_Tuple2(
                A2(elm$core$Basics$max, minW, wta) * 9,
                (A2(elm$core$Basics$max, minH, hta) * 7.8) + 10);
            var w = _n2.a;
            var h = _n2.b;
            var htmlBox = A2(
                timjs$elm_collage$Collage$html,
                _Utils_Tuple2(w, h * 2),
                rtfeldman$elm_css$Html$Styled$toUnstyled(htmlTextArea));
            return timjs$elm_collage$Collage$Layout$stack(
                _List_fromArray(
                    [
                        A2(
                        timjs$elm_collage$Collage$shift,
                        _Utils_Tuple2(0, -7),
                        htmlBox),
                        A2(author$project$Tree$Draw$ifBoxShape, w, h)
                    ]));
        });
    var timjs$elm_collage$Collage$Text$Italic = {$: 'Italic'};
    var timjs$elm_collage$Collage$Text$shape = F2(
        function (newshape, _n0) {
            var sty = _n0.a;
            var str = _n0.b;
            return A2(
                timjs$elm_collage$Collage$Core$Chunk,
                _Utils_update(
                    sty,
                    {shape: newshape}),
                str);
        });
    var timjs$elm_collage$Collage$Text$size = F2(
        function (newsize, _n0) {
            var sty = _n0.a;
            var str = _n0.b;
            return A2(
                timjs$elm_collage$Collage$Core$Chunk,
                _Utils_update(
                    sty,
                    {size: newsize}),
                str);
        });
    var timjs$elm_collage$Collage$Text$small = 13;
    var author$project$Tree$Draw$labelText = function (string) {
        return timjs$elm_collage$Collage$rendered(
            A2(
                timjs$elm_collage$Collage$Text$shape,
                timjs$elm_collage$Collage$Text$Italic,
                A2(
                    timjs$elm_collage$Collage$Text$size,
                    timjs$elm_collage$Collage$Text$small,
                    timjs$elm_collage$Collage$Text$fromString(string))));
    };
    var author$project$Tree$Draw$loopBoxEditable = F3(
        function (nodeType, id, label) {
            var maxCharacters = 25;
            var _n0 = _Utils_Tuple2(10, 1);
            var minW = _n0.a;
            var minH = _n0.b;
            var _n1 = A6(author$project$Tree$Draw$multilineEditableTextBox, id, nodeType, label, minW, minH, maxCharacters);
            var htmlTextArea = _n1.a;
            var wta = _n1.b;
            var hta = _n1.c;
            var _n2 = _Utils_Tuple2(
                A2(elm$core$Basics$max, minW, wta) * 9,
                (A2(elm$core$Basics$max, minH, hta) * 7.8) + 5);
            var w = _n2.a;
            var h = _n2.b;
            var htmlBox = A2(
                timjs$elm_collage$Collage$html,
                _Utils_Tuple2(w, h * 2),
                rtfeldman$elm_css$Html$Styled$toUnstyled(htmlTextArea));
            return timjs$elm_collage$Collage$Layout$stack(
                _List_fromArray(
                    [
                        htmlBox,
                        A3(author$project$Tree$Draw$loopBoxShape, nodeType, w, h)
                    ]));
        });
    var author$project$Tree$Draw$statementBoxEditable = F2(
        function (id, label) {
            var maxWidth = 22;
            var _n0 = _Utils_Tuple2(10, 1);
            var minW = _n0.a;
            var minH = _n0.b;
            var _n1 = A6(author$project$Tree$Draw$multilineEditableTextBox, id, author$project$Tree$State$StatementNode, label, minW, minH, maxWidth);
            var htmlTextArea = _n1.a;
            var wta = _n1.b;
            var hta = _n1.c;
            var _n2 = _Utils_Tuple2(
                A2(elm$core$Basics$max, minW, wta) * 9,
                A2(elm$core$Basics$max, minH, hta) * 22);
            var w = _n2.a;
            var h = _n2.b;
            var htmlBox = A2(
                timjs$elm_collage$Collage$html,
                _Utils_Tuple2(w, h * 1.3),
                rtfeldman$elm_css$Html$Styled$toUnstyled(htmlTextArea));
            return timjs$elm_collage$Collage$Layout$stack(
                _List_fromArray(
                    [
                        htmlBox,
                        A2(author$project$Tree$Draw$statementBoxShape, w, h)
                    ]));
        });
    var author$project$Tree$Draw$stubBox = function (stubText) {
        var text = timjs$elm_collage$Collage$rendered(
            timjs$elm_collage$Collage$Text$fromString(stubText));
        var shape = A2(
            timjs$elm_collage$Collage$styled,
            _Utils_Tuple2(
                timjs$elm_collage$Collage$uniform(
                    A3(avh4$elm_color$Color$rgb255, 200, 170, 255)),
                A2(
                    timjs$elm_collage$Collage$solid,
                    timjs$elm_collage$Collage$thin,
                    timjs$elm_collage$Collage$uniform(avh4$elm_color$Color$black))),
            A2(timjs$elm_collage$Collage$ellipse, 50, 25));
        return A2(
            timjs$elm_collage$Collage$Layout$name,
            stubText,
            timjs$elm_collage$Collage$Layout$stack(
                _List_fromArray(
                    [text, shape])));
    };
    var author$project$Tree$Draw$voidBox = A2(timjs$elm_collage$Collage$Layout$spacer, 0, 0);
    var timjs$elm_collage$Collage$Layout$bottomRight = function (col) {
        var _n0 = timjs$elm_collage$Collage$Layout$distances(col);
        var toRight = _n0.toRight;
        var toBottom = _n0.toBottom;
        return _Utils_Tuple2(toRight, -toBottom);
    };
    var timjs$elm_collage$Collage$Layout$vertical = A2(
        elm$core$List$foldr,
        timjs$elm_collage$Collage$Layout$beside(timjs$elm_collage$Collage$Layout$Down),
        timjs$elm_collage$Collage$Layout$empty);
    var author$project$Tree$Draw$drawTree = F2(
        function (model, node) {
            var _n7 = node.basicTree;
            switch (_n7.$) {
                case 'Start':
                    var child = _n7.a;
                    return timjs$elm_collage$Collage$Layout$vertical(
                        _List_fromArray(
                            [
                                A3(
                                author$project$Tree$Draw$addBottomArrow,
                                0,
                                child.basicTree,
                                A3(
                                    author$project$Tree$Draw$addOverlayMenu,
                                    model.highlightedBox,
                                    node,
                                    author$project$Tree$Draw$stubBox('Start'))),
                                A2(author$project$Tree$Draw$drawTree, model, child)
                            ]));
                case 'End':
                    return A3(
                        author$project$Tree$Draw$addOverlayMenu,
                        model.highlightedBox,
                        node,
                        author$project$Tree$Draw$stubBox('Einde'));
                case 'Empty':
                    var child = _n7.a;
                    return timjs$elm_collage$Collage$Layout$vertical(
                        _List_fromArray(
                            [
                                A3(
                                author$project$Tree$Draw$addBottomArrow,
                                0,
                                child.basicTree,
                                A3(
                                    author$project$Tree$Draw$addOverlayMenu,
                                    model.highlightedBox,
                                    node,
                                    author$project$Tree$Draw$emptyBox(node.id))),
                                A2(author$project$Tree$Draw$drawTree, model, child)
                            ]));
                case 'Void':
                    return author$project$Tree$Draw$voidBox;
                case 'Statement':
                    var text = _n7.a;
                    var child = _n7.b;
                    return timjs$elm_collage$Collage$Layout$vertical(
                        _List_fromArray(
                            [
                                A3(
                                author$project$Tree$Draw$addBottomArrow,
                                0,
                                child.basicTree,
                                A3(
                                    author$project$Tree$Draw$addOverlayMenu,
                                    model.highlightedBox,
                                    node,
                                    A2(author$project$Tree$Draw$statementBoxEditable, node.id, text))),
                                A2(author$project$Tree$Draw$drawTree, model, child)
                            ]));
                case 'If':
                    var text = _n7.a;
                    var child1 = _n7.b;
                    var child2 = _n7.c;
                    var child3 = _n7.d;
                    return timjs$elm_collage$Collage$Layout$vertical(
                        _List_fromArray(
                            [
                                A3(
                                author$project$Tree$Draw$addBottomArrow,
                                0,
                                child3.basicTree,
                                A6(author$project$Tree$Draw$ifHelper, model, node, text, child1, child2, child3)),
                                A2(author$project$Tree$Draw$drawTree, model, child3)
                            ]));
                case 'While':
                    var text = _n7.a;
                    var child1 = _n7.b;
                    var child2 = _n7.c;
                    return timjs$elm_collage$Collage$Layout$vertical(
                        _List_fromArray(
                            [
                                A6(author$project$Tree$Draw$loopHelper, author$project$Tree$State$WhileNode, model, node, text, child1, child2),
                                A2(author$project$Tree$Draw$drawTree, model, child2)
                            ]));
                default:
                    var text = _n7.a;
                    var child1 = _n7.b;
                    var child2 = _n7.c;
                    return timjs$elm_collage$Collage$Layout$vertical(
                        _List_fromArray(
                            [
                                A6(author$project$Tree$Draw$loopHelper, author$project$Tree$State$ForEachNode, model, node, text, child1, child2),
                                A2(author$project$Tree$Draw$drawTree, model, child2)
                            ]));
            }
        });
    var author$project$Tree$Draw$ifHelper = F6(
        function (model, node, text, child1, child2, child3) {
            var topArrow = F4(
                function (child, dir, length, collage) {
                    if (child.$ === 'Void') {
                        return A2(
                            timjs$elm_collage$Collage$Layout$align,
                            timjs$elm_collage$Collage$Layout$top,
                            A3(
                                author$project$Tree$Draw$imposeAt,
                                dir,
                                A2(
                                    timjs$elm_collage$Collage$rotate,
                                    elm$core$Basics$degrees(90),
                                    A2(
                                        timjs$elm_collage$Collage$traced,
                                        timjs$elm_collage$Collage$defaultLineStyle,
                                        timjs$elm_collage$Collage$line(length))),
                                collage));
                    } else {
                        return A2(
                            timjs$elm_collage$Collage$Layout$align,
                            timjs$elm_collage$Collage$Layout$top,
                            A3(
                                author$project$Tree$Draw$imposeAt,
                                dir,
                                author$project$Tree$Draw$arrow(length),
                                collage));
                    }
                });
            var lineToBottom = F2(
                function (max, tree) {
                    return timjs$elm_collage$Collage$Layout$vertical(
                        _List_fromArray(
                            [
                                tree,
                                A2(
                                timjs$elm_collage$Collage$rotate,
                                elm$core$Basics$pi / 2,
                                A2(
                                    timjs$elm_collage$Collage$traced,
                                    timjs$elm_collage$Collage$defaultLineStyle,
                                    timjs$elm_collage$Collage$line(
                                        max - timjs$elm_collage$Collage$Layout$height(tree))))
                            ]));
                });
            var decoratedTextBox = A3(
                author$project$Tree$Draw$imposeAt,
                timjs$elm_collage$Collage$Layout$topLeft,
                A2(
                    timjs$elm_collage$Collage$Layout$align,
                    timjs$elm_collage$Collage$Layout$left,
                    author$project$Tree$Draw$labelText('if')),
                A3(
                    author$project$Tree$Draw$addOverlayMenu,
                    model.highlightedBox,
                    node,
                    A2(author$project$Tree$Draw$ifBoxEditable, node.id, text)));
            var _n5 = _Utils_Tuple2(
                A2(author$project$Tree$Draw$drawTree, model, child1),
                A2(author$project$Tree$Draw$drawTree, model, child2));
            var leftPiece = _n5.a;
            var rightPiece = _n5.b;
            var maxHeight = A2(
                elm$core$Basics$max,
                timjs$elm_collage$Collage$Layout$height(leftPiece),
                timjs$elm_collage$Collage$Layout$height(rightPiece)) + (author$project$Tree$Draw$unit * 5);
            var midLength = A2(
                elm$core$Basics$max,
                (A2(timjs$elm_collage$Collage$Layout$envelope, timjs$elm_collage$Collage$Layout$Left, rightPiece) + A2(timjs$elm_collage$Collage$Layout$envelope, timjs$elm_collage$Collage$Layout$Right, leftPiece)) + (author$project$Tree$Draw$unit * 2),
                timjs$elm_collage$Collage$Layout$width(decoratedTextBox) + (6 * author$project$Tree$Draw$unit));
            var bottomLine = A3(
                author$project$Tree$Draw$addSeparateBelowPlus,
                model,
                node,
                A2(
                    timjs$elm_collage$Collage$traced,
                    timjs$elm_collage$Collage$defaultLineStyle,
                    timjs$elm_collage$Collage$line(midLength)));
            var topArrows = timjs$elm_collage$Collage$Layout$center(
                A4(
                    topArrow,
                    child2.basicTree,
                    timjs$elm_collage$Collage$Layout$right,
                    (timjs$elm_collage$Collage$Layout$height(decoratedTextBox) / 2) + (2 * author$project$Tree$Draw$unit),
                    timjs$elm_collage$Collage$Layout$center(
                        A4(
                            topArrow,
                            child1.basicTree,
                            timjs$elm_collage$Collage$Layout$left,
                            (timjs$elm_collage$Collage$Layout$height(decoratedTextBox) / 2) + (2 * author$project$Tree$Draw$unit),
                            A3(
                                timjs$elm_collage$Collage$Layout$beside,
                                timjs$elm_collage$Collage$Layout$Up,
                                A2(
                                    timjs$elm_collage$Collage$Layout$spacer,
                                    0,
                                    (timjs$elm_collage$Collage$Layout$height(decoratedTextBox) / 2) + (2 * author$project$Tree$Draw$unit)),
                                A2(
                                    timjs$elm_collage$Collage$Layout$align,
                                    timjs$elm_collage$Collage$Layout$left,
                                    A3(
                                        author$project$Tree$Draw$imposeAt,
                                        timjs$elm_collage$Collage$Layout$topLeft,
                                        A2(
                                            timjs$elm_collage$Collage$Layout$align,
                                            timjs$elm_collage$Collage$Layout$bottomLeft,
                                            author$project$Tree$Draw$labelText('niet waar')),
                                        A3(
                                            author$project$Tree$Draw$imposeAt,
                                            timjs$elm_collage$Collage$Layout$topRight,
                                            A2(
                                                timjs$elm_collage$Collage$Layout$align,
                                                timjs$elm_collage$Collage$Layout$bottomRight,
                                                author$project$Tree$Draw$labelText('waar')),
                                            A2(
                                                timjs$elm_collage$Collage$traced,
                                                timjs$elm_collage$Collage$defaultLineStyle,
                                                timjs$elm_collage$Collage$line(midLength))))))))));
            var widthMidGap = (midLength - A2(timjs$elm_collage$Collage$Layout$envelope, timjs$elm_collage$Collage$Layout$Left, rightPiece)) - A2(timjs$elm_collage$Collage$Layout$envelope, timjs$elm_collage$Collage$Layout$Right, leftPiece);
            var midPiece = A2(
                timjs$elm_collage$Collage$shift,
                _Utils_Tuple2((-midLength) / 2, 0),
                timjs$elm_collage$Collage$Layout$horizontal(
                    A2(
                        elm$core$List$map,
                        timjs$elm_collage$Collage$Layout$align(timjs$elm_collage$Collage$Layout$top),
                        _List_fromArray(
                            [
                                A2(
                                timjs$elm_collage$Collage$Layout$name,
                                'leftPiece',
                                A2(lineToBottom, maxHeight, leftPiece)),
                                A2(timjs$elm_collage$Collage$Layout$spacer, widthMidGap, 0),
                                A2(
                                timjs$elm_collage$Collage$Layout$name,
                                'rightPiece',
                                A2(lineToBottom, maxHeight, rightPiece))
                            ]))));
            return A3(
                timjs$elm_collage$Collage$Layout$at,
                timjs$elm_collage$Collage$Layout$top,
                decoratedTextBox,
                timjs$elm_collage$Collage$Layout$vertical(
                    _List_fromArray(
                        [topArrows, midPiece, bottomLine])));
        });
    var author$project$Tree$Draw$loopHelper = F6(
        function (nodeType, model, node, text, child1, child2) {
            var _n0 = function () {
                switch (nodeType.$) {
                    case 'WhileNode':
                        return _Utils_Tuple2(
                            'while',
                            _Utils_Tuple2('niet waar   ', '   waar'));
                    case 'ForEachNode':
                        return _Utils_Tuple2(
                            'for each',
                            _Utils_Tuple2('klaar   ', '  herhaal'));
                    default:
                        var a = nodeType;
                        return A2(
                            elm$core$Debug$log,
                            'Tried to create loopHelper with non-loop type: ' + (elm$core$Debug$toString(a) + ' continueing without change.'),
                            _Utils_Tuple2(
                                'report',
                                _Utils_Tuple2('this', 'please')));
                }
            }();
            var typeLabel = _n0.a;
            var _n1 = _n0.b;
            var leftTag = _n1.a;
            var bottomTag = _n1.b;
            var decoratedLoopBox = A3(
                author$project$Tree$Draw$imposeAt,
                timjs$elm_collage$Collage$Layout$bottom,
                A2(
                    timjs$elm_collage$Collage$Layout$align,
                    timjs$elm_collage$Collage$Layout$topLeft,
                    author$project$Tree$Draw$labelText(bottomTag)),
                A3(
                    author$project$Tree$Draw$imposeAt,
                    timjs$elm_collage$Collage$Layout$left,
                    A2(
                        timjs$elm_collage$Collage$Layout$align,
                        timjs$elm_collage$Collage$Layout$bottomRight,
                        author$project$Tree$Draw$labelText(leftTag)),
                    A3(
                        author$project$Tree$Draw$imposeAt,
                        timjs$elm_collage$Collage$Layout$topLeft,
                        A2(
                            timjs$elm_collage$Collage$Layout$align,
                            timjs$elm_collage$Collage$Layout$bottom,
                            author$project$Tree$Draw$labelText(typeLabel)),
                        A3(
                            author$project$Tree$Draw$addOverlayMenu,
                            model.highlightedBox,
                            node,
                            A3(
                                author$project$Tree$Draw$imposeAt,
                                timjs$elm_collage$Collage$Layout$right,
                                A2(
                                    timjs$elm_collage$Collage$Layout$align,
                                    timjs$elm_collage$Collage$Layout$left,
                                    A2(timjs$elm_collage$Collage$rotate, (elm$core$Basics$pi * 3) / 2, author$project$Tree$Draw$arrowTriangle)),
                                A3(author$project$Tree$Draw$loopBoxEditable, nodeType, node.id, text))))));
            var inner = timjs$elm_collage$Collage$Layout$vertical(
                _List_fromArray(
                    [
                        author$project$Tree$Draw$arrow(
                        timjs$elm_collage$Collage$Layout$height(decoratedLoopBox) / 2),
                        A2(author$project$Tree$Draw$drawTree, model, child1)
                    ]));
            var _n3 = _Utils_Tuple3(
                A2(timjs$elm_collage$Collage$Layout$envelope, timjs$elm_collage$Collage$Layout$Up, inner) + author$project$Tree$Draw$unit,
                A2(
                    elm$core$Basics$max,
                    A2(timjs$elm_collage$Collage$Layout$envelope, timjs$elm_collage$Collage$Layout$Left, inner) + author$project$Tree$Draw$unit,
                    (timjs$elm_collage$Collage$Layout$width(decoratedLoopBox) / 2) + (2 * author$project$Tree$Draw$unit)),
                _Utils_Tuple2(
                    A2(timjs$elm_collage$Collage$Layout$envelope, timjs$elm_collage$Collage$Layout$Down, inner),
                    A2(
                        elm$core$Basics$max,
                        A2(timjs$elm_collage$Collage$Layout$envelope, timjs$elm_collage$Collage$Layout$Right, inner) + author$project$Tree$Draw$unit,
                        (timjs$elm_collage$Collage$Layout$width(decoratedLoopBox) / 2) + (2 * author$project$Tree$Draw$unit))));
            var topInner = _n3.a;
            var leftInner = _n3.b;
            var _n4 = _n3.c;
            var downInner = _n4.a;
            var rightInner = _n4.b;
            var superPathOne = A2(
                timjs$elm_collage$Collage$traced,
                timjs$elm_collage$Collage$defaultLineStyle,
                timjs$elm_collage$Collage$path(
                    _List_fromArray(
                        [
                            _Utils_Tuple2(0, -downInner),
                            _Utils_Tuple2(rightInner, -downInner),
                            _Utils_Tuple2(rightInner, topInner),
                            _Utils_Tuple2(rightInner, topInner),
                            _Utils_Tuple2(-leftInner, topInner),
                            _Utils_Tuple2(-leftInner, -(downInner + (2 * author$project$Tree$Draw$unit))),
                            _Utils_Tuple2((-1) * author$project$Tree$Draw$unit, -(downInner + (2 * author$project$Tree$Draw$unit))),
                            _Utils_Tuple2(0, -(downInner + (2 * author$project$Tree$Draw$unit)))
                        ])));
            var superPath = timjs$elm_collage$Collage$Layout$vertical(
                _List_fromArray(
                    [
                        superPathOne,
                        A3(
                        author$project$Tree$Draw$addSeparateBelowPlus,
                        model,
                        node,
                        A2(
                            timjs$elm_collage$Collage$traced,
                            timjs$elm_collage$Collage$invisible,
                            timjs$elm_collage$Collage$line(1)))
                    ]));
            var widthInner = A2(
                elm$core$Basics$max,
                timjs$elm_collage$Collage$Layout$width(decoratedLoopBox) + (4 * author$project$Tree$Draw$unit),
                timjs$elm_collage$Collage$Layout$width(
                    A2(author$project$Tree$Draw$drawTree, model, child1)));
            return A3(
                author$project$Tree$Draw$addBottomArrow,
                0,
                child2.basicTree,
                A3(
                    timjs$elm_collage$Collage$Layout$at,
                    timjs$elm_collage$Collage$Layout$top,
                    decoratedLoopBox,
                    timjs$elm_collage$Collage$Layout$stack(
                        _List_fromArray(
                            [superPath, inner]))));
        });
    var author$project$Tree$Draw$completeTree = function (model) {
        return A3(
            timjs$elm_collage$Collage$Layout$at,
            timjs$elm_collage$Collage$Layout$right,
            author$project$Tree$Draw$gap,
            A3(
                timjs$elm_collage$Collage$Layout$at,
                timjs$elm_collage$Collage$Layout$top,
                author$project$Tree$Draw$gap,
                A2(author$project$Tree$Draw$drawTree, model, model.tree)));
    };
    var rtfeldman$elm_css$Html$Styled$div = rtfeldman$elm_css$Html$Styled$node('div');
    var rtfeldman$elm_css$VirtualDom$Styled$unstyledNode = rtfeldman$elm_css$VirtualDom$Styled$Unstyled;
    var rtfeldman$elm_css$Html$Styled$fromUnstyled = rtfeldman$elm_css$VirtualDom$Styled$unstyledNode;
    var elm$html$Html$div = _VirtualDom_node('div');
    var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
    var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
    var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
    var elm$svg$Svg$Attributes$version = _VirtualDom_attribute('version');
    var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
    var elm$svg$Svg$circle = elm$svg$Svg$trustedNode('circle');
    var elm$svg$Svg$ellipse = elm$svg$Svg$trustedNode('ellipse');
    var elm$svg$Svg$foreignObject = elm$svg$Svg$trustedNode('foreignObject');
    var elm$svg$Svg$g = elm$svg$Svg$trustedNode('g');
    var elm$svg$Svg$image = elm$svg$Svg$trustedNode('image');
    var elm$svg$Svg$polygon = elm$svg$Svg$trustedNode('polygon');
    var elm$svg$Svg$polyline = elm$svg$Svg$trustedNode('polyline');
    var elm$svg$Svg$rect = elm$svg$Svg$trustedNode('rect');
    var elm$svg$Svg$text = elm$virtual_dom$VirtualDom$text;
    var elm$svg$Svg$text_ = elm$svg$Svg$trustedNode('text');
    var elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
    var elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
    var elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
    var elm$svg$Svg$Attributes$rx = _VirtualDom_attribute('rx');
    var elm$svg$Svg$Attributes$ry = _VirtualDom_attribute('ry');
    var elm$svg$Svg$Attributes$xlinkHref = function (value) {
        return A3(
            _VirtualDom_attributeNS,
            'http://www.w3.org/1999/xlink',
            'xlink:href',
            _VirtualDom_noJavaScriptUri(value));
    };
    var elm$svg$Svg$Attributes$dominantBaseline = _VirtualDom_attribute('dominant-baseline');
    var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
    var elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
    var elm$svg$Svg$Attributes$fontFamily = _VirtualDom_attribute('font-family');
    var elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute('font-size');
    var elm$svg$Svg$Attributes$fontStyle = _VirtualDom_attribute('font-style');
    var elm$svg$Svg$Attributes$fontVariant = _VirtualDom_attribute('font-variant');
    var elm$svg$Svg$Attributes$fontWeight = _VirtualDom_attribute('font-weight');
    var elm$svg$Svg$Attributes$opacity = _VirtualDom_attribute('opacity');
    var elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
    var elm$svg$Svg$Attributes$strokeDasharray = _VirtualDom_attribute('stroke-dasharray');
    var elm$svg$Svg$Attributes$strokeDashoffset = _VirtualDom_attribute('stroke-dashoffset');
    var elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
    var elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
    var elm$svg$Svg$Attributes$strokeOpacity = _VirtualDom_attribute('stroke-opacity');
    var elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
    var elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
    var elm$svg$Svg$Attributes$textDecoration = _VirtualDom_attribute('text-decoration');
    var elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
    var timjs$elm_collage$Collage$Render$decodeCap = function (cap) {
        switch (cap.$) {
            case 'Round':
                return 'round';
            case 'Padded':
                return 'square';
            default:
                return 'butt';
        }
    };
    var timjs$elm_collage$Collage$Render$decodeDashing = function (ds) {
        var decodeOnOff = function (_n0) {
            var x = _n0.a;
            var y = _n0.b;
            return A2(
                elm$core$String$join,
                ',',
                _List_fromArray(
                    [
                        elm$core$String$fromInt(x),
                        elm$core$String$fromInt(y)
                    ]));
        };
        return A2(
            elm$core$String$join,
            ' ',
            A2(elm$core$List$map, decodeOnOff, ds));
    };
    var avh4$elm_color$Color$rgb = F3(
        function (r, g, b) {
            return A4(avh4$elm_color$Color$RgbaSpace, r, g, b, 1.0);
        });
    var avh4$elm_color$Color$toCssString = function (_n0) {
        var r = _n0.a;
        var g = _n0.b;
        var b = _n0.c;
        var a = _n0.d;
        var roundTo = function (x) {
            return elm$core$Basics$round(x * 1000) / 1000;
        };
        var pct = function (x) {
            return elm$core$Basics$round(x * 10000) / 100;
        };
        return elm$core$String$concat(
            _List_fromArray(
                [
                    'rgba(',
                    elm$core$String$fromFloat(
                    pct(r)),
                    '%,',
                    elm$core$String$fromFloat(
                    pct(g)),
                    '%,',
                    elm$core$String$fromFloat(
                    pct(b)),
                    '%,',
                    elm$core$String$fromFloat(
                    roundTo(a)),
                    ')'
                ]));
    };
    var avh4$elm_color$Color$toRgba = function (_n0) {
        var r = _n0.a;
        var g = _n0.b;
        var b = _n0.c;
        var a = _n0.d;
        return {alpha: a, blue: b, green: g, red: r};
    };
    var timjs$elm_collage$Collage$Render$decodeColor = function (c) {
        var _n0 = avh4$elm_color$Color$toRgba(c);
        var red = _n0.red;
        var green = _n0.green;
        var blue = _n0.blue;
        return avh4$elm_color$Color$toCssString(
            A3(avh4$elm_color$Color$rgb, red, green, blue));
    };
    var timjs$elm_collage$Collage$Render$decodeFill = function (fs) {
        if (fs.$ === 'Uniform') {
            var c = fs.a;
            return timjs$elm_collage$Collage$Render$decodeColor(c);
        } else {
            return 'none';
        }
    };
    var timjs$elm_collage$Collage$Render$decodeOpacity = function (c) {
        var _n0 = avh4$elm_color$Color$toRgba(c);
        var alpha = _n0.alpha;
        return elm$core$String$fromFloat(alpha);
    };
    var timjs$elm_collage$Collage$Render$decodeFillOpacity = function (fs) {
        if (fs.$ === 'Uniform') {
            var c = fs.a;
            return timjs$elm_collage$Collage$Render$decodeOpacity(c);
        } else {
            return '0';
        }
    };
    var timjs$elm_collage$Collage$Render$decodeJoin = function (join) {
        switch (join.$) {
            case 'Smooth':
                return 'round';
            case 'Sharp':
                return 'miter';
            default:
                return 'bevel';
        }
    };
    var elm$core$Tuple$second = function (_n0) {
        var y = _n0.b;
        return y;
    };
    var timjs$elm_collage$Collage$Render$decodeTransform = function (collage) {
        var sy = elm$core$String$fromFloat(collage.scale.b);
        var sx = elm$core$String$fromFloat(collage.scale.a);
        var r = elm$core$String$fromFloat((((-collage.rotation) / 2) / elm$core$Basics$pi) * 360);
        var dy = elm$core$String$fromFloat(-collage.shift.b);
        var dx = elm$core$String$fromFloat(collage.shift.a);
        return elm$core$String$concat(
            _List_fromArray(
                ['translate(', dx, ',', dy, ') scale(', sx, ',', sy, ') rotate(', r, ')']));
    };
    var timjs$elm_collage$Collage$Render$attrs = function (collage) {
        var _n0 = collage.basic;
        switch (_n0.$) {
            case 'Path':
                var line = _n0.a;
                return _List_fromArray(
                    [
                        elm$svg$Svg$Attributes$stroke(
                        timjs$elm_collage$Collage$Render$decodeFill(line.fill)),
                        elm$svg$Svg$Attributes$strokeOpacity(
                        timjs$elm_collage$Collage$Render$decodeFillOpacity(line.fill)),
                        elm$svg$Svg$Attributes$strokeWidth(
                        elm$core$String$fromFloat(line.thickness)),
                        elm$svg$Svg$Attributes$strokeLinecap(
                        timjs$elm_collage$Collage$Render$decodeCap(line.cap)),
                        elm$svg$Svg$Attributes$strokeLinejoin(
                        timjs$elm_collage$Collage$Render$decodeJoin(line.join)),
                        elm$svg$Svg$Attributes$fill('none'),
                        elm$svg$Svg$Attributes$opacity(
                        elm$core$String$fromFloat(collage.opacity)),
                        elm$svg$Svg$Attributes$transform(
                        timjs$elm_collage$Collage$Render$decodeTransform(collage)),
                        elm$svg$Svg$Attributes$strokeDashoffset(
                        elm$core$String$fromInt(line.dashPhase)),
                        elm$svg$Svg$Attributes$strokeDasharray(
                        timjs$elm_collage$Collage$Render$decodeDashing(line.dashPattern))
                    ]);
            case 'Shape':
                var _n1 = _n0.a;
                var fill = _n1.a;
                var line = _n1.b;
                return _List_fromArray(
                    [
                        elm$svg$Svg$Attributes$fill(
                        timjs$elm_collage$Collage$Render$decodeFill(fill)),
                        elm$svg$Svg$Attributes$fillOpacity(
                        timjs$elm_collage$Collage$Render$decodeFillOpacity(fill)),
                        elm$svg$Svg$Attributes$stroke(
                        timjs$elm_collage$Collage$Render$decodeFill(line.fill)),
                        elm$svg$Svg$Attributes$strokeOpacity(
                        timjs$elm_collage$Collage$Render$decodeFillOpacity(line.fill)),
                        elm$svg$Svg$Attributes$strokeWidth(
                        elm$core$String$fromFloat(line.thickness)),
                        elm$svg$Svg$Attributes$strokeLinecap(
                        timjs$elm_collage$Collage$Render$decodeCap(line.cap)),
                        elm$svg$Svg$Attributes$strokeLinejoin(
                        timjs$elm_collage$Collage$Render$decodeJoin(line.join)),
                        elm$svg$Svg$Attributes$opacity(
                        elm$core$String$fromFloat(collage.opacity)),
                        elm$svg$Svg$Attributes$transform(
                        timjs$elm_collage$Collage$Render$decodeTransform(collage)),
                        elm$svg$Svg$Attributes$strokeDashoffset(
                        elm$core$String$fromInt(line.dashPhase)),
                        elm$svg$Svg$Attributes$strokeDasharray(
                        timjs$elm_collage$Collage$Render$decodeDashing(line.dashPattern))
                    ]);
            case 'Text':
                var _n2 = _n0.b;
                var style = _n2.a;
                var str = _n2.b;
                return _List_fromArray(
                    [
                        elm$svg$Svg$Attributes$fill(
                        timjs$elm_collage$Collage$Render$decodeFill(
                            timjs$elm_collage$Collage$Core$Uniform(style.color))),
                        elm$svg$Svg$Attributes$fontFamily(
                        function () {
                            var _n3 = style.typeface;
                            switch (_n3.$) {
                                case 'Serif':
                                    return 'serif';
                                case 'Sansserif':
                                    return 'sans-serif';
                                case 'Monospace':
                                    return 'monospace';
                                default:
                                    var name = _n3.a;
                                    return name;
                            }
                        }()),
                        elm$svg$Svg$Attributes$fontSize(
                        elm$core$String$fromInt(style.size)),
                        elm$svg$Svg$Attributes$fontWeight(
                        function () {
                            var _n4 = style.weight;
                            switch (_n4.$) {
                                case 'Thin':
                                    return '200';
                                case 'Light':
                                    return '300';
                                case 'Regular':
                                    return 'normal';
                                case 'Medium':
                                    return '500';
                                case 'SemiBold':
                                    return '600';
                                case 'Bold':
                                    return 'bold';
                                default:
                                    return '800';
                            }
                        }()),
                        elm$svg$Svg$Attributes$fontStyle(
                        function () {
                            var _n5 = style.shape;
                            switch (_n5.$) {
                                case 'Upright':
                                    return 'normal';
                                case 'SmallCaps':
                                    return 'normal';
                                case 'Slanted':
                                    return 'oblique';
                                default:
                                    return 'italic';
                            }
                        }()),
                        elm$svg$Svg$Attributes$fontVariant(
                        function () {
                            var _n6 = style.shape;
                            if (_n6.$ === 'SmallCaps') {
                                return 'small-caps';
                            } else {
                                return 'normal';
                            }
                        }()),
                        elm$svg$Svg$Attributes$textDecoration(
                        function () {
                            var _n7 = style.line;
                            switch (_n7.$) {
                                case 'None':
                                    return 'none';
                                case 'Under':
                                    return 'underline';
                                case 'Over':
                                    return 'overline';
                                default:
                                    return 'line-through';
                            }
                        }()),
                        elm$svg$Svg$Attributes$textAnchor('middle'),
                        elm$svg$Svg$Attributes$dominantBaseline('middle'),
                        elm$svg$Svg$Attributes$transform(
                        timjs$elm_collage$Collage$Render$decodeTransform(collage))
                    ]);
            default:
                return _List_fromArray(
                    [
                        elm$svg$Svg$Attributes$transform(
                        timjs$elm_collage$Collage$Render$decodeTransform(collage))
                    ]);
        }
    };
    var elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
    var elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
    var timjs$elm_collage$Collage$Render$box = F2(
        function (w, h) {
            return _List_fromArray(
                [
                    elm$svg$Svg$Attributes$width(
                    elm$core$String$fromFloat(w)),
                    elm$svg$Svg$Attributes$height(
                    elm$core$String$fromFloat(h)),
                    elm$svg$Svg$Attributes$x(
                    elm$core$String$fromFloat((-w) / 2)),
                    elm$svg$Svg$Attributes$y(
                    elm$core$String$fromFloat((-h) / 2))
                ]);
        });
    var timjs$elm_collage$Collage$Render$decodePoints = function (ps) {
        return A2(
            elm$core$String$join,
            ' ',
            A2(
                elm$core$List$map,
                function (_n0) {
                    var x = _n0.a;
                    var y = _n0.b;
                    return A2(
                        elm$core$String$join,
                        ',',
                        _List_fromArray(
                            [
                                elm$core$String$fromFloat(x),
                                elm$core$String$fromFloat(-y)
                            ]));
                },
                ps));
    };
    var elm$html$Html$Events$on = F2(
        function (event, decoder) {
            return A2(
                elm$virtual_dom$VirtualDom$on,
                event,
                elm$virtual_dom$VirtualDom$Normal(decoder));
        });
    var elm$svg$Svg$Events$on = elm$html$Html$Events$on;
    var elm_community$basics_extra$Basics$Extra$uncurry = F2(
        function (f, _n0) {
            var a = _n0.a;
            var b = _n0.b;
            return A2(f, a, b);
        });
    var timjs$elm_collage$Collage$Render$events = function (handlers) {
        return A2(
            elm$core$List$map,
            elm_community$basics_extra$Basics$Extra$uncurry(elm$svg$Svg$Events$on),
            handlers);
    };
    var timjs$elm_collage$Collage$Render$render = function (collage) {
        render:
        while (true) {
            var name = A2(elm$core$Maybe$withDefault, '_unnamed_', collage.name);
            var _n0 = collage.basic;
            switch (_n0.$) {
                case 'Path':
                    var style = _n0.a;
                    var path = _n0.b;
                    var ps = path.a;
                    return A2(
                        elm$svg$Svg$polyline,
                        _Utils_ap(
                            _List_fromArray(
                                [
                                    elm$svg$Svg$Attributes$id(name),
                                    elm$svg$Svg$Attributes$points(
                                    timjs$elm_collage$Collage$Render$decodePoints(ps))
                                ]),
                            _Utils_ap(
                                timjs$elm_collage$Collage$Render$attrs(collage),
                                timjs$elm_collage$Collage$Render$events(collage.handlers))),
                        _List_Nil);
                case 'Shape':
                    var _n2 = _n0.a;
                    var fill = _n2.a;
                    var line = _n2.b;
                    var shape = _n0.b;
                    switch (shape.$) {
                        case 'Polygon':
                            var ps = shape.a;
                            return A2(
                                elm$svg$Svg$polygon,
                                _Utils_ap(
                                    _List_fromArray(
                                        [
                                            elm$svg$Svg$Attributes$id(name),
                                            elm$svg$Svg$Attributes$points(
                                            timjs$elm_collage$Collage$Render$decodePoints(ps))
                                        ]),
                                    _Utils_ap(
                                        timjs$elm_collage$Collage$Render$attrs(collage),
                                        timjs$elm_collage$Collage$Render$events(collage.handlers))),
                                _List_Nil);
                        case 'Circle':
                            var r = shape.a;
                            return A2(
                                elm$svg$Svg$circle,
                                _Utils_ap(
                                    _List_fromArray(
                                        [
                                            elm$svg$Svg$Attributes$id(name),
                                            elm$svg$Svg$Attributes$r(
                                            elm$core$String$fromFloat(r))
                                        ]),
                                    _Utils_ap(
                                        timjs$elm_collage$Collage$Render$attrs(collage),
                                        timjs$elm_collage$Collage$Render$events(collage.handlers))),
                                _List_Nil);
                        case 'Ellipse':
                            var rx = shape.a;
                            var ry = shape.b;
                            return A2(
                                elm$svg$Svg$ellipse,
                                _Utils_ap(
                                    _List_fromArray(
                                        [
                                            elm$svg$Svg$Attributes$id(name),
                                            elm$svg$Svg$Attributes$rx(
                                            elm$core$String$fromFloat(rx)),
                                            elm$svg$Svg$Attributes$ry(
                                            elm$core$String$fromFloat(ry))
                                        ]),
                                    _Utils_ap(
                                        timjs$elm_collage$Collage$Render$attrs(collage),
                                        timjs$elm_collage$Collage$Render$events(collage.handlers))),
                                _List_Nil);
                        case 'Rectangle':
                            var w = shape.a;
                            var h = shape.b;
                            var r = shape.c;
                            return A2(
                                elm$svg$Svg$rect,
                                _Utils_ap(
                                    _List_fromArray(
                                        [
                                            elm$svg$Svg$Attributes$id(name),
                                            elm$svg$Svg$Attributes$rx(
                                            elm$core$String$fromFloat(r)),
                                            elm$svg$Svg$Attributes$ry(
                                            elm$core$String$fromFloat(r))
                                        ]),
                                    _Utils_ap(
                                        A2(timjs$elm_collage$Collage$Render$box, w, h),
                                        _Utils_ap(
                                            timjs$elm_collage$Collage$Render$attrs(collage),
                                            timjs$elm_collage$Collage$Render$events(collage.handlers)))),
                                _List_Nil);
                        default:
                            var path = shape.a;
                            var $temp$collage = _Utils_update(
                                collage,
                                {
                                    basic: A2(timjs$elm_collage$Collage$Core$Path, line, path)
                                });
                            collage = $temp$collage;
                            continue render;
                    }
                case 'Text':
                    var _n4 = _n0.b;
                    var style = _n4.a;
                    var str = _n4.b;
                    return A2(
                        elm$svg$Svg$text_,
                        _Utils_ap(
                            _List_fromArray(
                                [
                                    elm$svg$Svg$Attributes$id(name)
                                ]),
                            _Utils_ap(
                                timjs$elm_collage$Collage$Render$attrs(collage),
                                timjs$elm_collage$Collage$Render$events(collage.handlers))),
                        _List_fromArray(
                            [
                                elm$svg$Svg$text(str)
                            ]));
                case 'Image':
                    var _n5 = _n0.a;
                    var w = _n5.a;
                    var h = _n5.b;
                    var url = _n0.b;
                    return A2(
                        elm$svg$Svg$image,
                        _Utils_ap(
                            _List_fromArray(
                                [
                                    elm$svg$Svg$Attributes$id(name),
                                    elm$svg$Svg$Attributes$xlinkHref(url)
                                ]),
                            _Utils_ap(
                                A2(timjs$elm_collage$Collage$Render$box, w, h),
                                _Utils_ap(
                                    timjs$elm_collage$Collage$Render$attrs(collage),
                                    timjs$elm_collage$Collage$Render$events(collage.handlers)))),
                        _List_Nil);
                case 'Html':
                    var _n6 = _n0.a;
                    var w = _n6.a;
                    var h = _n6.b;
                    var html = _n0.b;
                    return A2(
                        elm$svg$Svg$foreignObject,
                        _Utils_ap(
                            _List_fromArray(
                                [
                                    elm$svg$Svg$Attributes$id(name)
                                ]),
                            _Utils_ap(
                                A2(timjs$elm_collage$Collage$Render$box, w, h),
                                _Utils_ap(
                                    timjs$elm_collage$Collage$Render$attrs(collage),
                                    timjs$elm_collage$Collage$Render$events(collage.handlers)))),
                        _List_fromArray(
                            [html]));
                case 'Group':
                    var collages = _n0.a;
                    return A2(
                        elm$svg$Svg$g,
                        A2(
                            elm$core$List$cons,
                            elm$svg$Svg$Attributes$id(name),
                            _Utils_ap(
                                timjs$elm_collage$Collage$Render$attrs(collage),
                                timjs$elm_collage$Collage$Render$events(collage.handlers))),
                        A3(
                            elm$core$List$foldl,
                            F2(
                                function (col, res) {
                                    return A2(
                                        elm$core$List$cons,
                                        timjs$elm_collage$Collage$Render$render(col),
                                        res);
                                }),
                            _List_Nil,
                            collages));
                default:
                    var fore = _n0.a;
                    var back = _n0.b;
                    var $temp$collage = _Utils_update(
                        collage,
                        {
                            basic: timjs$elm_collage$Collage$Core$Group(
                                _List_fromArray(
                                    [fore, back]))
                        });
                    collage = $temp$collage;
                    continue render;
            }
        }
    };
    var timjs$elm_collage$Collage$Render$svgAbsolute = F2(
        function (_n0, collage) {
            var width = _n0.a;
            var height = _n0.b;
            var w = elm$core$String$fromFloat(width);
            var h = elm$core$String$fromFloat(height);
            return A2(
                elm$html$Html$div,
                _List_Nil,
                _List_fromArray(
                    [
                        A2(
                        elm$svg$Svg$svg,
                        _List_fromArray(
                            [
                                elm$svg$Svg$Attributes$width(w),
                                elm$svg$Svg$Attributes$height(h),
                                elm$svg$Svg$Attributes$version('1.1')
                            ]),
                        _List_fromArray(
                            [
                                timjs$elm_collage$Collage$Render$render(collage)
                            ]))
                    ]));
        });
    var timjs$elm_collage$Collage$Render$svg = function (collage) {
        return A2(
            timjs$elm_collage$Collage$Render$svgAbsolute,
            _Utils_Tuple2(
                timjs$elm_collage$Collage$Layout$width(collage),
                timjs$elm_collage$Collage$Layout$height(collage)),
            A2(timjs$elm_collage$Collage$Layout$align, timjs$elm_collage$Collage$Layout$topLeft, collage));
    };
    var author$project$Tree$Draw$treeWithConditions = F2(
        function (model, msgAttributeHtmlList) {
            return A2(
                rtfeldman$elm_css$Html$Styled$div,
                msgAttributeHtmlList,
                _List_fromArray(
                    [
                        rtfeldman$elm_css$Html$Styled$fromUnstyled(
                        timjs$elm_collage$Collage$Render$svg(
                            A2(
                                author$project$Tree$Draw$addConditions,
                                model,
                                author$project$Tree$Draw$completeTree(model))))
                    ]));
        });
    var rtfeldman$elm_css$Css$absolute = {position: rtfeldman$elm_css$Css$Structure$Compatible, value: 'absolute'};
    var rtfeldman$elm_css$Css$overflowY = rtfeldman$elm_css$Css$prop1('overflow-y');
    var rtfeldman$elm_css$Css$paddingBottom = rtfeldman$elm_css$Css$prop1('padding-bottom');
    var rtfeldman$elm_css$Css$relative = {position: rtfeldman$elm_css$Css$Structure$Compatible, value: 'relative'};
    var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
    var rtfeldman$elm_css$VirtualDom$Styled$KeyedNode = F3(
        function (a, b, c) {
            return {$: 'KeyedNode', a: a, b: b, c: c};
        });
    var rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS = F4(
        function (a, b, c, d) {
            return {$: 'KeyedNodeNS', a: a, b: b, c: c, d: d};
        });
    var rtfeldman$elm_css$VirtualDom$Styled$NodeNS = F4(
        function (a, b, c, d) {
            return {$: 'NodeNS', a: a, b: b, c: c, d: d};
        });
    var elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
    var rtfeldman$elm_css$VirtualDom$Styled$mapAttribute = F2(
        function (transform, _n0) {
            var prop = _n0.a;
            var styles = _n0.b;
            var classname = _n0.c;
            return A3(
                rtfeldman$elm_css$VirtualDom$Styled$Attribute,
                A2(elm$virtual_dom$VirtualDom$mapAttribute, transform, prop),
                styles,
                classname);
        });
    var rtfeldman$elm_css$VirtualDom$Styled$map = F2(
        function (transform, vdomNode) {
            switch (vdomNode.$) {
                case 'Node':
                    var elemType = vdomNode.a;
                    var properties = vdomNode.b;
                    var children = vdomNode.c;
                    return A3(
                        rtfeldman$elm_css$VirtualDom$Styled$Node,
                        elemType,
                        A2(
                            elm$core$List$map,
                            rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
                            properties),
                        A2(
                            elm$core$List$map,
                            rtfeldman$elm_css$VirtualDom$Styled$map(transform),
                            children));
                case 'NodeNS':
                    var ns = vdomNode.a;
                    var elemType = vdomNode.b;
                    var properties = vdomNode.c;
                    var children = vdomNode.d;
                    return A4(
                        rtfeldman$elm_css$VirtualDom$Styled$NodeNS,
                        ns,
                        elemType,
                        A2(
                            elm$core$List$map,
                            rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
                            properties),
                        A2(
                            elm$core$List$map,
                            rtfeldman$elm_css$VirtualDom$Styled$map(transform),
                            children));
                case 'KeyedNode':
                    var elemType = vdomNode.a;
                    var properties = vdomNode.b;
                    var children = vdomNode.c;
                    return A3(
                        rtfeldman$elm_css$VirtualDom$Styled$KeyedNode,
                        elemType,
                        A2(
                            elm$core$List$map,
                            rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
                            properties),
                        A2(
                            elm$core$List$map,
                            function (_n1) {
                                var key = _n1.a;
                                var child = _n1.b;
                                return _Utils_Tuple2(
                                    key,
                                    A2(rtfeldman$elm_css$VirtualDom$Styled$map, transform, child));
                            },
                            children));
                case 'KeyedNodeNS':
                    var ns = vdomNode.a;
                    var elemType = vdomNode.b;
                    var properties = vdomNode.c;
                    var children = vdomNode.d;
                    return A4(
                        rtfeldman$elm_css$VirtualDom$Styled$KeyedNodeNS,
                        ns,
                        elemType,
                        A2(
                            elm$core$List$map,
                            rtfeldman$elm_css$VirtualDom$Styled$mapAttribute(transform),
                            properties),
                        A2(
                            elm$core$List$map,
                            function (_n2) {
                                var key = _n2.a;
                                var child = _n2.b;
                                return _Utils_Tuple2(
                                    key,
                                    A2(rtfeldman$elm_css$VirtualDom$Styled$map, transform, child));
                            },
                            children));
                default:
                    var vdom = vdomNode.a;
                    return rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
                        A2(elm$virtual_dom$VirtualDom$map, transform, vdom));
            }
        });
    var rtfeldman$elm_css$Html$Styled$map = rtfeldman$elm_css$VirtualDom$Styled$map;
    var author$project$Main$view = function (model) {
        var treeLayout = rtfeldman$elm_css$Html$Styled$Attributes$css(
            _List_fromArray(
                [
                    rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$relative),
                    rtfeldman$elm_css$Css$paddingBottom(
                    rtfeldman$elm_css$Css$px(50)),
                    rtfeldman$elm_css$Css$zIndex(
                    rtfeldman$elm_css$Css$int(0))
                ]));
        return rtfeldman$elm_css$Html$Styled$toUnstyled(
            A2(
                rtfeldman$elm_css$Html$Styled$div,
                _List_fromArray(
                    [
                        rtfeldman$elm_css$Html$Styled$Attributes$css(
                        _List_fromArray(
                            [
                                rtfeldman$elm_css$Css$overflowY(rtfeldman$elm_css$Css$auto)
                            ]))
                    ]),
                _List_fromArray(
                    [
                        A2(
                        rtfeldman$elm_css$Html$Styled$div,
                        _List_fromArray(
                            [
                                rtfeldman$elm_css$Html$Styled$Attributes$css(
                                _List_fromArray(
                                    [
                                        rtfeldman$elm_css$Css$position(rtfeldman$elm_css$Css$absolute),
                                        rtfeldman$elm_css$Css$zIndex(
                                        rtfeldman$elm_css$Css$int(-1))
                                    ]))
                            ]),
                        _List_fromArray(
                            [
                                A2(
                                rtfeldman$elm_css$Html$Styled$map,
                                author$project$Main$Save,
                                author$project$Save$view(model.state)),
                                A2(
                                rtfeldman$elm_css$Html$Styled$map,
                                author$project$Main$Tree,
                                A2(
                                    author$project$Tree$Draw$treeWithConditions,
                                    model.state,
                                    _List_fromArray(
                                        [treeLayout])))
                            ]))
                    ])));
    };
    var elm$browser$Browser$element = _Browser_element;
    var author$project$Main$main = elm$browser$Browser$element(
        {init: author$project$Main$init, subscriptions: author$project$Main$subscriptions, update: author$project$Main$update, view: author$project$Main$view});
    _Platform_export({'Main':{'init':author$project$Main$main(
        elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));