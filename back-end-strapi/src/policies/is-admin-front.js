'use strict';
module.exports = async (policyContext, config, { strapi }) => {
  const user = policyContext?.state?.user; // pour avoir une navigation plus sûr

  if (!user) {
    // Strapi v4 : ctx.throw pour renvoyer des erreurs HTTP
    const ctx = policyContext.ctx;
    if (ctx) {
      return ctx.throw(401, 'Vous devez être connecté pour exécuter cette action');
    }
    // fallback si ctx n'existe pas
    throw new Error('Utilisateur non authentifié');
  }

  if (user.role?.name === 'AdminFront' || user.roles?.some(r => r.name === 'AdminFront')) {
    return true;
  }

  const ctx = policyContext.ctx;
  if (ctx) {
    return ctx.throw(403, "Accès refusé : vous n'avez pas le bon rôle pour faire cette action");
  }
  throw new Error('Accès refusé : seuls les AdminFront peuvent exécuter cette action');
};