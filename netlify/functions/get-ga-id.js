exports.handler = async function() {
    return {
        statusCode: 200,
        body: process.env.GA_MEASUREMENT_ID
    };
};
