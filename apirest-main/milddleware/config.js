
var config = {
	user: 'sa',
	password: 'Monorata',
	server: 'charkomiguel.no-ip.org',
	database: 'melitest',
	site_id:'MLA',
	api_root_url: 'https://api.mercadolibre.com',
	auth_url: 'http://auth.mercadolibre.com.ar/authorization',
	oauth_url: 'https://api.mercadolibre.com/oauth/token',
	user_test: 'https://api.mercadolibre.com/users/test_user',
	user_me: 'https://api.mercadolibre.com/users/me',
	datos_faturacion:'https://api.mercadolibre.com/orders/',
	ordenes_recientes: 'https://api.mercadolibre.com/orders/search?seller=',
	informacion_cuenta:"https://api.mercadolibre.com/users/me",
	informacion_envios: 'https://api.mercadolibre.com/shipments/'
}

module.exports = {config}