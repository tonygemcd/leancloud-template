import express from 'express'
import AV from 'leanengine'
import Joi from 'joi'

const router = express.Router()

router.post('/register', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  let jSchema = Joi.object().keys({
    username: Joi.string().min(10).max(30).required(),
    password: Joi.string().min(1).required()
  })

  let validate = Joi.validate({
    username: username,
    password: password
  }, jSchema)

  if (validate.error) {
    log.error({
      username: username,
      password: password
    }, '注册的账号密码有误')

    return res.json({
      error: {
        code: 1001,
        message: '账号密码有误'
      }
    })
  }

  let newUser = new AV.User()
  newUser.set('username', username)
  newUser.set('password', password)
  newUser.signUp()
    .then((user) => {
      res.saveCurrentUser(user)
      res.json({
        user: user
      })
    }, (err) => {
      res.json({
        error: {
          code: 1002,
          message: '服务器繁忙',
          detail: err
        }
      })
    })
    .catch(next)
})

router.post('/login', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  AV.User.logIn(username, password)
    .then((user) => {
      res.saveCurrentUser(user)
      res.json({
        user: user
      })
    }, (err) => {
      res.json({
        error: {
          code: 1002,
          message: '服务器繁忙',
          detail: err
        }
      })
    })
    .catch(next)
})

router.get('/logout', (req, res, next) => {
  req.currentUser.logOut()
  res.clearCurrentUser()
})

export default router
