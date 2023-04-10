// --> Modelo + Validaciones<--
const Follow = require('../database/models/Follow');
const User = require('../database/models/User');

//Guardar follow (empezar a seguir) 
const followTo = async (req, res) => {

    try {

        //Ids para guardar (usuario logueado(token) + usuario a ser seguido(body))
        let userToFollow = req.body.followed;
        let userLogin = req.user.id

        //Crear un objeto nuevo
        const FOLLOW = new Follow({
            user: userLogin,
            followed: userToFollow
        });

        //Guardar objeto en base de datos
        await FOLLOW.save();
        return res.status(200).json({
            identity: req.user,
            status: 'Success',
            follow: FOLLOW
        });

    } catch (error) {
        return res.status(404).json({
            status: 'Error',
            message: 'Error al seguir a usuario'
        });
    };
};

//Eliminar follow (dejar de seguir)
const unFollow = async (req, res) => {

    try {
        //Id de usuario a ser dejado de seguir(body))
        let userToUnFollow = req.body.unfollow;
        let userLogin = req.user.id

        //Buscar en la lista de follows si existe el registro 
        let follow = await Follow.findOne({followed: userToUnFollow});

        //Elimino si el id del usuario logueado es === al usuario que es seguidor en el registro
        if(userLogin === follow.user.toString()){
            
            await Follow.findByIdAndDelete({_id: follow._id});
             
            //Devolver resultados
            return res.status(200).json({
                status: 'Success',
                identity: req.user,
                userUnFollowed: userToUnFollow
            });
        };
        //Si no es el mismo usuario retorno que no se siguen
        return res.status(400).json({
            status: 'Error',
            message: '¡No sigue al usuario!'
        });
     
    } catch (error) {
        return res.status(404).json({
            status: 'Error',
            message: 'Usuario no encontrado dentro de los follows'
        });
    };
};

//Listado de usuarios que estoy siguiendo
const myFollows = async (req, res) => {

    //Quien esta logueado?
    const USERLOGIN = req.user.id;

    try {
        //Todos los follows
        let allFollows = await Follow.find();

        //Filtrar
        let myFollows = allFollows.filter(element => element.user.toString() === USERLOGIN);
        
        //Si no hay ningún seguidor
        if (myFollows.length <= 0) {
            return res.status(200).json({
                status: 'Success',
                message: 'Aún no sigues a nadie'
            });
        };

        return res.status(200).json({
            status: 'Success',
            identity: USERLOGIN,
            quantity: myFollows.length,
            follows: myFollows
        });

    } catch (error) {
        return res.status(404).json({
            status: 'Error',
            message: 'Error al verificar a quien sigues'
        });
    };
};

//Listado de usuarios que me siguen
const myFollowers = async (req, res) => {

    //Quien esta logueado?
    const USERLOGIN = req.user.id;

    try {
        //Todos los follows
        let allFollows = await Follow.find();
 
        //Filtrar
        let followers = allFollows.filter(element => element.followed.toString() === USERLOGIN);
         
        //Si no hay ningún seguidor
        if (followers.length <= 0) {
             return res.status(200).json({
                status: 'Success',
                message: 'Aún no tienes seguidores'
            });
        };
 
        return res.status(200).json({
            status: 'Success',
            identity: USERLOGIN,
            quantity: followers.length,
            followers: followers
        });
 
    }catch (error) {
        return res.status(404).json({
            status: 'Error',
            message: 'Error al verificar mis seguidores'
        });
    };
};
module.exports = {followTo, unFollow, myFollows, myFollowers};