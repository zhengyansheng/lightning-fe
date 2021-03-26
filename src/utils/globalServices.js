function getPortList(context) {
    const port = {};
    const data = context.keys().map(value => {
        return {
            name: value.replace(/(.*\/)*([^.]+).*/ig, '$2'),
            data: context(value).default
        };
    });

    data.forEach(value => {
        port[value.name] = value.data
    })
    return port;
}

export default getPortList(require.context('@services', true, /\.js$/));