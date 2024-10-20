import { rateLimit }  from 'express-rate-limit'

const rateLimiterConfig = rateLimit({
    windowMs: 1000 * 60 * 7,
    max: 500,
    message: "Too many requests from this IP, try again later",
    limit: 100,
})

export default rateLimiterConfig;