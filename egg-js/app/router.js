'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/getuser', controller.user.getuser);
  router.get('/api/getstore', controller.user.getstore);
  router.get('/api/getdongtai', controller.user.getdongtai);
  // =====================================
  router.post('/api/changestore',controller.store.changestore);
  router.post('/api/changeimg',controller.store.changeimg);
  router.get('/api/getsort',controller.store.getsort);
};
