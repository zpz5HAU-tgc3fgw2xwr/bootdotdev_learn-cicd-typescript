import { Request, Response, NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';
import { respondWithError } from './json.js';
import { getUser } from '../db/queries/users.js';
import { User } from '../db/schema.js';

export function middlewareAuth(handler: (req: Request, res: Response, user: User) => void) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const apiKey = getAPIKey(req.headers);
            if (!apiKey) {
                respondWithError(res, 401, "Couldn't find api key");
                return;
            }

            const user = await getUser(apiKey);
            if (!user) {
                respondWithError(res, 404, "Couldn't get user");
                return;
            }

            handler(req, res, user);
        } catch (error) {
            respondWithError(res, 500, "Internal Server Error");
        }
    };
}

function getAPIKey(headers: IncomingHttpHeaders): string | null {
    const authHeader = headers['authorization'];
    if (!authHeader) {
        return null;
    }

    const splitAuth = authHeader.split(' ');
    if (splitAuth.length < 2 || splitAuth[0] !== 'ApiKey') {
        return null;
    }

    return splitAuth[1];
}
