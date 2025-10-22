'use strict';
console.log('policy is running');
module.exports = async (policyContext, config, { strapi }) => {

    const user = policyContext.state.user;
    console.log('Utilisateur courant :', user);

    // Si pas connecté → erreur 401
    if (!user) {
        return policyContext.unauthorized('Vous devez être connecté pour exécuter cette action');
    }

    // Si rôle = AdminFront → OK
    // if (user.role && user.role.name === 'AdminFront') {
    //     return true;
    // }
    if (user.role?.name === 'AdminFront' || user.roles?.some(r => r.name === 'AdminFront')) {
        return true;
    }

    // Sinon → erreur 403
    return policyContext.forbidden('Accès refusé : seuls les AdminFront peuvent exécuter cette action');
};