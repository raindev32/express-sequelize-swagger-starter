import jwt from 'passport-jwt'
import passport from 'passport'
import project from '../../config/project.config'
import { getUserById } from '../services/users/usersService'
import { getCurrentTime } from '../services/utils/timeService'

const JwtStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: project.auth_secret
}

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (async (payload, done) => {
  if (payload.id) {
    const user = await getUserById(payload.id, true)
    const currentTime = await getCurrentTime()
    if (user && user.banned && (user.bannedUntil > currentTime)) {
      return done(null, false)
    }
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  }
}))

// Setting up JWT login strategy
const adminLogin = new JwtStrategy(jwtOptions, (async (payload, done) => {
  if (payload.id) {
    const user = await getUserById(payload.id, true)
    const currentTime = await getCurrentTime()
    if (user && user.banned && (user.bannedUntil > currentTime)) {
      return done(null, false)
    }
    if (user && !user.admin) return done(null, false)
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  }
}))

passport.use('jwt', jwtLogin)
passport.use('admin', adminLogin)
