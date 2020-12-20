import { apiMiddleware, RSAA, isRSAA } from 'redux-api-middleware';
import * as URI from 'urijs';
import * as querystring from 'query-string';
const { AbortController, abortableFetch } = require('abortcontroller-polyfill/dist/cjs-ponyfill');
const _crossFetch = require('cross-fetch');
const { fetch, Request } = abortableFetch({fetch: _crossFetch, Request: _crossFetch.Request});

export default store => next => action => {
    if (!isRSAA(action)) {
        return next(action);
    }
    let params = '', {
        path,
        host,
        ...rest
    } = action[RSAA];

    const controller = new AbortController();

    rest.headers = {
        ...{'Content-Type': 'application/json'  },
        ...(rest.headers || {})
    };

    if (rest.headers['Content-Type'] === 'application/json' && rest.method !== 'GET') {
        rest.body = typeof rest.body === 'string' ? rest.body : JSON.stringify(rest.body);
    }
    else if (rest.method === 'GET') {
        params = '?' + querystring.stringify(rest.body, { arrayFormat: 'bracket' });
        rest.body = null;
    }

    rest.endpoint = rest.endpoint + params;
    rest.types[2] = {
        type: rest.types[2] && rest.types[2].type ? rest.types[2].type : rest.types[2],
        meta: rest.types[2] && rest.types[2].meta ? rest.types[2].meta : {
            host,
            path,
            ...rest
        }
    };

    rest.types[0] = {
        type: rest.types[0] && rest.types[0].type ? rest.types[0].type : rest.types[0],
        meta: {
            controller: controller
        }
    }


    rest.fetch = !rest.fetch ? async (...args) => {
        let json;
        const timeout = setTimeout(() => controller.abort(), 120000);
        const res = await fetch(Request(args[0], {...args[1], signal: controller.signal}));
        clearTimeout(timeout);
        if (res.status !== 204 && res.status !== 205) {
            json = await res.json();
        }
        if (Array.isArray(json)) {
            return new Response(
                JSON.stringify(
                    [...json],
                    controller
                ), {
                    status: res.status,
                    headers: {
                      'Content-Type': 'application/json'
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                ...json,
                controller
            }),
            {
                status: res.status,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
        );
    } : rest.fetch;
    return apiMiddleware(store)(next)({
        [RSAA]: rest
    });
}