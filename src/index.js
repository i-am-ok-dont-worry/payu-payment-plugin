/**
 * This plugin provides support for PayU payments
 * @param config VSF api configuration
 * @param db ElasticSearch client
 * @param router Express router
 * @param cache Cache manger instance
 * @param apiStatus Api status helper
 * @param apiError Api error helper
 * @param getRestApiClient Method for retrieving Magento Rest API
 * @returns {{router: *, route: string, pluginName: string, domainName: string}}
 */
module.exports = ({ config, db, router, cache, apiStatus, apiError, getRestApiClient }) => {
    const createMage2RestClient = () => {
        const client = getRestApiClient();
        client.addMethods('payu', (restClient) => {
            const module = {};
            module.form = (orderId) => {
                return restClient.get(`/payu/get-payment-url/${orderId}`);
            };
            module.status = (orderId) => {
                return restClient.get(`/payu/status/${orderId}`);
            };

            return module;
        });

        return client;
    };

    router.get('/url/:orderId', async (req, res) => {
        const { orderId } = req.params;
        try {
            if (!orderId) { throw new Error('Order id is required'); }
            const client = createMage2RestClient();
            const response = await client.payu.form(orderId);
            apiStatus(res, response, 200);
        } catch (e) {
            apiError(res, e);
        }
    });

    router.get('/status/:orderId', async (req, res) => {
        const { orderId } = req.params;
        try {
            if (!orderId) { throw new Error(`Order id is required`); }
            const client = createMage2RestClient();
            const response = await client.payu.status(orderId);
            apiStatus(res, response, 200);
        } catch (e) {
            apiError(res, e);
        }
    });

    return {
        domainName: '@grupakmk',
        pluginName: 'payu-payment',
        route: '/payu',
        router
    };
};
