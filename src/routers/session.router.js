import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/github', passport.authenticate('github', {scope: ['user: email']}), (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/session/login'}), 
    async(req, res) => {
        req.session.user = req.user
        res.redirect('/')
    })

export default router