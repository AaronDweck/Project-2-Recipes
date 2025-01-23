export default function errorHandler(error, req, res, next) {
    console.log(error)
    if (error.name === 'TypeError') {
        res.redirect(`${res.locals.page}?error=TypeError`)
    }
    console.log('hello')
}