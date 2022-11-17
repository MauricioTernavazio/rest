const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, existeUsusarioPorId } = require('../helpers/db-validators');
const { correoExiste } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete,
        usuariosPatch, } = require('../controllers/usuarios');



const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    check('id', ' No es un ID valid').isMongoId(),
    check('id').custom( existeUsusarioPorId ),
    check('rol').custom(esRoleValido),
    validarCampos 
],usuariosPut);


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6}),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(correoExiste),
    check('rol').custom(esRoleValido),
    validarCampos   
],usuariosPost );

router.delete('/:id',[
    check('id', ' No es un ID valid').isMongoId(),
    check('id').custom( existeUsusarioPorId ),
    validarCampos
],usuariosDelete);
  
router.patch('/', usuariosPatch);


module.exports = router;
